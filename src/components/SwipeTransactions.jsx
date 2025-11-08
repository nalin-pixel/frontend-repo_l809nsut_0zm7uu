import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Check, X, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// A minimal swipe stack for transactions. Keyboard arrows and buttons supported.
export default function SwipeTransactions({ transactions = [], onDecision }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const current = transactions[index];
  const remaining = transactions.length - index - (current ? 1 : 0);

  useEffect(() => {
    const onKey = (e) => {
      if (!current) return;
      if (e.key === 'ArrowLeft') decide('reject');
      if (e.key === 'ArrowRight') decide('accept');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current]);

  const decide = (type) => {
    if (!current) return;
    setDirection(type === 'accept' ? 1 : -1);
    if (onDecision) onDecision({ id: current.id, type });
    // Advance after a small delay allowing animation
    setTimeout(() => setIndex((i) => Math.min(i + 1, transactions.length)), 180);
  };

  const card = (
    <motion.div
      key={current?.id ?? 'empty'}
      initial={{ opacity: 0, y: 12, rotate: -0.5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      exit={{ opacity: 0, x: direction * 120, rotate: direction * 8 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="relative w-full max-w-xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 text-white/90"
    >
      {current ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">{current.merchant || current.description}</div>
            <div className="text-sm text-white/60">{new Date(current.date).toLocaleDateString()}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold tracking-tight">${Math.abs(current.amount).toFixed(2)}</div>
            <span className={`text-xs rounded-full px-2 py-1 border ${current.pending ? 'border-yellow-400/40 text-yellow-300' : 'border-emerald-400/40 text-emerald-300'}`}>
              {current.pending ? 'Pending' : 'Posted'}
            </span>
          </div>
          <div className="text-sm text-white/70">From: {current.account || 'Primary'}</div>
          <div className="flex gap-2 pt-2">
            {(current.suggestedCategories || []).slice(0, 3).map((c) => (
              <span key={c} className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10">{c}</span>
            ))}
            {current.category && (
              <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/20">{current.category}</span>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-white/70 py-6">
          <Layers className="h-6 w-6 mx-auto mb-2" />
          You're all caught up!
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 text-white/70 text-sm">
        <span>Daily review</span>
        <span className="inline-flex items-center gap-2">
          <Layers className="h-4 w-4" /> {remaining} left
        </span>
      </div>
      <div className="relative">
        <AnimatePresence mode="wait">{card}</AnimatePresence>
      </div>
      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          onClick={() => decide('reject')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition"
          disabled={!current}
        >
          <X className="h-4 w-4" /> Skip
        </button>
        <button
          onClick={() => decide('accept')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-emerald-400/30 bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25 transition"
          disabled={!current}
        >
          <Check className="h-4 w-4" /> Confirm
        </button>
      </div>
    </div>
  );
}
