import React, { useState, useEffect, useMemo } from 'react';
import { Grid } from './components/Grid';
import { ProgressBar } from './components/ProgressBar';
import { StatsCard } from './components/StatsCard';
import { Advisor } from './components/Advisor';
import { saveState, loadState, generateInitialGrid } from './services/storageService';
import { GridItem, Milestone } from './types';

const ITEM_COUNT = 300;
// Sum of sequence 1 to 300 is (300 * 301) / 2 = 45150
const TARGET_AMOUNT = (ITEM_COUNT * (ITEM_COUNT + 1)) / 2;

function App() {
  const [items, setItems] = useState<GridItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize Data
  useEffect(() => {
    const saved = loadState();
    if (saved && saved.length > 0) {
      setItems(saved);
    } else {
      const initial = generateInitialGrid(ITEM_COUNT);
      setItems(initial);
    }
    setIsInitialized(true);
  }, []);

  // Persistence
  useEffect(() => {
    if (isInitialized) {
      saveState(items);
    }
  }, [items, isInitialized]);

  const toggleItem = (id: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return { 
          ...item, 
          isPaid: !item.isPaid, 
          datePaid: !item.isPaid ? new Date().toISOString() : undefined 
        };
      }
      return item;
    }));
  };

  // Stats Calculations
  const stats = useMemo(() => {
    const totalSaved = items.reduce((acc, curr) => curr.isPaid ? acc + curr.value : acc, 0);
    const countSaved = items.filter(i => i.isPaid).length;
    
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const savedThisMonth = items.reduce((acc, curr) => {
      if (curr.isPaid && curr.datePaid) {
        const d = new Date(curr.datePaid);
        if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
          return acc + curr.value;
        }
      }
      return acc;
    }, 0);

    const savedThisYear = items.reduce((acc, curr) => {
        if (curr.isPaid && curr.datePaid) {
          const d = new Date(curr.datePaid);
          if (d.getFullYear() === currentYear) {
            return acc + curr.value;
          }
        }
        return acc;
      }, 0);

    return { totalSaved, countSaved, savedThisMonth, savedThisYear };
  }, [items]);

  const milestones: Milestone[] = [
    { amount: 5000, label: '5k Salve!', achieved: stats.totalSaved >= 5000 },
    { amount: 10000, label: '10k', achieved: stats.totalSaved >= 10000 },
    { amount: 15000, label: '15k', achieved: stats.totalSaved >= 15000 },
    { amount: 20000, label: '20k', achieved: stats.totalSaved >= 20000 },
    { amount: 25000, label: '25k', achieved: stats.totalSaved >= 25000 },
    { amount: 30000, label: '30k', achieved: stats.totalSaved >= 30000 },
    { amount: 35000, label: '35k', achieved: stats.totalSaved >= 35000 },
    { amount: 40000, label: '40k', achieved: stats.totalSaved >= 40000 },
    { amount: 45000, label: 'Meta!', achieved: stats.totalSaved >= 45000 },
  ];

  if (!isInitialized) return null;

  return (
    <div className="min-h-screen bg-slate-900 pb-20">
      {/* Header / Hero */}
      <div className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 bg-opacity-95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Cofrinho <span className="text-emerald-500">2026</span></h1>
                <p className="text-sm text-slate-400">Desafio 1 a 300 (Meta: R$ {TARGET_AMOUNT.toLocaleString('pt-BR')})</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-400 font-semibold uppercase">Total Economizado</p>
                <p className="text-3xl font-extrabold text-emerald-400">R$ {stats.totalSaved.toLocaleString('pt-BR')}</p>
              </div>
           </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Progress Section */}
        <section className="mb-10">
          <ProgressBar current={stats.totalSaved} total={TARGET_AMOUNT} milestones={milestones} />
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatsCard 
            title="Depósitos Feitos" 
            value={`${stats.countSaved} / ${ITEM_COUNT}`} 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
          />
          <StatsCard 
            title="Salvo este Mês" 
            value={`R$ ${stats.savedThisMonth.toLocaleString('pt-BR')}`} 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
          />
           <StatsCard 
            title="Salvo este Ano" 
            value={`R$ ${stats.savedThisYear.toLocaleString('pt-BR')}`} 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
           <StatsCard 
            title="Falta" 
            value={`R$ ${(TARGET_AMOUNT - stats.totalSaved).toLocaleString('pt-BR')}`} 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
            highlight={false}
          />
        </section>

        {/* The Grid */}
        <section className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">Tabela 1 a 300</h2>
              <p className="text-slate-400 text-sm mt-1">Clique num número para marcá-lo como "Pago" no cofrinho.</p>
            </div>
          </div>
          <Grid items={items} onToggle={toggleItem} />
        </section>

        {/* AI Section */}
        <Advisor />

      </main>
    </div>
  );
}

export default App;