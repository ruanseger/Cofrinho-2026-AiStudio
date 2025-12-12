import React from 'react';
import { Milestone } from '../types';

interface ProgressBarProps {
  current: number;
  total: number;
  milestones: Milestone[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, milestones }) => {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className="w-full mb-8 relative">
      <div className="flex justify-between text-xs text-slate-400 mb-1 font-semibold uppercase tracking-wider">
        <span>Início</span>
        <span>Meta: R$ {total.toLocaleString('pt-BR')}</span>
      </div>
      
      <div className="h-6 bg-slate-800 rounded-full overflow-hidden relative shadow-inner border border-slate-700">
        <div 
          className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-700 ease-out flex items-center justify-end pr-2"
          style={{ width: `${percentage}%` }}
        >
           {percentage > 5 && <span className="text-[10px] text-emerald-950 font-bold">{percentage.toFixed(1)}%</span>}
        </div>

        {/* Milestone Markers */}
        {milestones.map((m) => {
           const pos = (m.amount / total) * 100;
           return (
             <div 
                key={m.amount}
                className="absolute top-0 bottom-0 w-0.5 bg-white/20 z-10 pointer-events-none"
                style={{ left: `${pos}%` }}
             />
           );
        })}
      </div>

      <div className="flex justify-between mt-2 overflow-x-auto pb-2 gap-2">
        {milestones.map((m) => (
          <div 
            key={m.label} 
            className={`flex flex-col items-center min-w-[60px] p-2 rounded-lg border ${
              current >= m.amount 
                ? 'bg-emerald-900/30 border-emerald-500/50 text-emerald-300' 
                : 'bg-slate-800/50 border-slate-700 text-slate-500'
            }`}
          >
            <span className="text-[10px] uppercase font-bold">{m.label}</span>
            <span className="text-xs">
              {current >= m.amount ? '🎉' : '🔒'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};