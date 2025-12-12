import React from 'react';
import { GridItem } from '../types';

interface GridProps {
  items: GridItem[];
  onToggle: (id: number) => void;
}

export const Grid: React.FC<GridProps> = ({ items, onToggle }) => {
  return (
    <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onToggle(item.id)}
          className={`
            relative group flex items-center justify-center p-2 rounded-lg border transition-all duration-200 aspect-square
            ${item.isPaid 
              ? 'bg-emerald-600 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)] transform scale-95' 
              : 'bg-slate-800 border-slate-700 hover:border-slate-500 hover:bg-slate-750'
            }
          `}
        >
          <span className={`text-sm sm:text-base font-bold ${item.isPaid ? 'text-white' : 'text-emerald-400'}`}>
            {item.value}
          </span>
          {item.isPaid && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-lg">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};