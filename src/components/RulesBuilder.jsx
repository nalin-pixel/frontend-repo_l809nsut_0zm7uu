import React, { useMemo, useState } from 'react';
import { Filter, Save, Trash } from 'lucide-react';

// Simple client-side rule builder: merchant contains -> category
export default function RulesBuilder({ categories = [], rules = [], onChange }) {
  const empty = { field: 'merchant', operator: 'contains', value: '', category: categories[0] || '' };
  const [draft, setDraft] = useState(empty);

  const addRule = () => {
    if (!draft.value || !draft.category) return;
    onChange?.([...rules, { ...draft, id: crypto.randomUUID() }]);
    setDraft(empty);
  };

  const removeRule = (id) => onChange?.(rules.filter((r) => r.id !== id));

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 text-white/90">
      <div className="flex items-center justify-between mb-3">
        <div className="inline-flex items-center gap-2 text-white/80">
          <Filter className="h-4 w-4" /> Auto-categorize rules
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
        <input
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none placeholder:text-white/40"
          placeholder="Merchant contains..."
          value={draft.value}
          onChange={(e) => setDraft({ ...draft, value: e.target.value })}
        />
        <select
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none"
          value={draft.category}
          onChange={(e) => setDraft({ ...draft, category: e.target.value })}
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button onClick={addRule} className="rounded-xl border border-emerald-400/30 bg-emerald-500/15 text-emerald-200 px-3 py-2 text-sm hover:bg-emerald-500/25 transition">
          <Save className="inline-block h-4 w-4 mr-2" /> Save rule
        </button>
      </div>

      <div className="space-y-2">
        {rules.map((r) => (
          <div key={r.id} className="flex items-center justify-between text-sm bg-white/5 border border-white/10 rounded-xl px-3 py-2">
            <span>
              If merchant contains "{r.value}" → <span className="text-emerald-300 font-medium">{r.category}</span>
            </span>
            <button onClick={() => removeRule(r.id)} className="text-white/60 hover:text-red-300">
              <Trash className="h-4 w-4" />
            </button>
          </div>
        ))}
        {rules.length === 0 && <div className="text-white/50 text-sm">No rules added yet.</div>}
      </div>
    </div>
  );
}
