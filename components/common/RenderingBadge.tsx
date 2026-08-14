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
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'ISR':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'SSR':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'CSR':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="w-full bg-white text-slate-900 border border-slate-200 rounded-2xl p-4 mb-6 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getBadgeColor()}`}
          >
            ⚡ Rendering Strategy: {strategy}
            {revalidateSeconds ? ` (revalidate: ${revalidateSeconds}s)` : ''}
          </span>
          <span className="text-xs text-slate-500 font-mono">
            Route: <code className="text-indigo-600 font-semibold">{routeName}</code>
          </span>
        </div>
        <div className="text-xs font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
          Thesis Demo Mode
        </div>
      </div>
      <p className="mt-2 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
        <strong className="text-slate-800">Lý do áp dụng:</strong> {reason}
      </p>
    </div>
  );
}
