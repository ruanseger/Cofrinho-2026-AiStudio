import React from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, highlight }) => {
  return (
    <div className={`p-4 rounded-xl border ${highlight ? 'bg-emerald-900/20 border-emerald-500/30' : 'bg-slate-800 border-slate-700'} flex items-center space-x-4`}>
      <div className={`p-3 rounded-full ${highlight ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">{title}</p>
        <p className={`text-xl font-bold ${highlight ? 'text-white' : 'text-slate-200'}`}>{value}</p>
      </div>
    </div>
  );
};