import React, { useState } from 'react';
import { getSavingsAdvice } from '../services/geminiService';
import ReactMarkdown from 'react-markdown'; // Note: ReactMarkdown is not standard, using basic HTML or simple text is safer for this prompt without external deps, but I will simulate markdown rendering with simple text replacement or just whitespace preservation. 

// Since I cannot install react-markdown in this environment, I will use a simple text display with whitespace preservation.

export const Advisor: React.FC = () => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetAdvice = async () => {
    setLoading(true);
    const result = await getSavingsAdvice();
    setAdvice(result);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 mt-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl"></div>
      
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Coach Financeiro IA
        </h3>
        <p className="text-slate-300 text-sm mb-6 max-w-2xl">
          Quer acelerar sua meta de 30k em 2026? Peça à IA estratégias personalizadas além do método do cofrinho.
        </p>

        {!advice && !loading && (
          <button 
            onClick={handleGetAdvice}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-colors shadow-lg shadow-indigo-900/50 flex items-center gap-2"
          >
            <span>✨</span> Gerar Dicas de Economia
          </button>
        )}

        {loading && (
          <div className="flex items-center gap-3 text-indigo-300 animate-pulse">
            <div className="w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
            Pensando em estratégias...
          </div>
        )}

        {advice && (
          <div className="bg-slate-950/50 rounded-xl p-6 border border-indigo-500/20">
            <div className="prose prose-invert prose-sm max-w-none text-slate-300 whitespace-pre-line leading-relaxed">
              {advice}
            </div>
            <button 
              onClick={handleGetAdvice}
              className="mt-6 text-xs text-indigo-400 hover:text-indigo-300 font-semibold uppercase tracking-wider"
            >
              Pedir novas dicas
            </button>
          </div>
        )}
      </div>
    </div>
  );
};