import React from 'react';

interface RenderingBadgeProps {
  strategy: 'SSG' | 'ISR' | 'SSR' | 'CSR';
  revalidateSeconds?: number;
  routeName: string;
  reason: string;
}

export function RenderingBadge({
  strategy,
  revalidateSeconds,
  routeName,
  reason,
}: RenderingBadgeProps) {
  const getBadgeColor = () => {
    switch (strategy) {
      case 'SSG':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'ISR':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'SSR':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
      case 'CSR':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <div className="w-full bg-slate-900/90 text-slate-100 border border-slate-800 rounded-xl p-4 mb-6 shadow-md backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getBadgeColor()}`}
          >
            ⚡ Rendering Strategy: {strategy}
            {revalidateSeconds ? ` (revalidate: ${revalidateSeconds}s)` : ''}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Route: <code className="text-indigo-300 font-semibold">{routeName}</code>
          </span>
        </div>
        <div className="text-xs font-medium text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
          Thesis Demo Mode
        </div>
      </div>
      <p className="mt-2 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-2">
        <strong className="text-slate-200">Lý do áp dụng:</strong> {reason}
      </p>
    </div>
  );
}
