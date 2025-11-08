import React from 'react';

function formatCurrency(value) {
  const sign = value < 0 ? '-' : '';
  const abs = Math.abs(value);
  return `${sign}$${abs.toFixed(2)}`;
}

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

export default function TransactionsList({ items = [] }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <h3 className="text-sm font-medium text-white/90">All Transactions</h3>
        <span className="text-xs text-white/60">{items.length}</span>
      </div>
      <div className="max-h-80 overflow-auto">
        {items.length === 0 ? (
          <div className="p-6 text-center text-white/60 text-sm">No transactions to show.</div>
        ) : (
          <ul className="divide-y divide-white/5">
            {items.map((t) => (
              <li key={t.id} className="px-4 py-3 hover:bg-white/[0.04] transition-colors">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate font-medium text-white/90">{t.merchant || 'Merchant'}</p>
                      <span className={`shrink-0 text-sm tabular-nums font-semibold ${t.amount < 0 ? 'text-rose-300' : 'text-emerald-300'}`}>
                        {formatCurrency(t.amount)}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-white/60 truncate">{t.description}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-white/50">
                      <span>{formatDate(t.date)}</span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.06] px-2 py-0.5 text-[11px] text-white/80 border border-white/10">
                        {t.category && t.category.length > 0 ? t.category : 'Uncategorized'}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
