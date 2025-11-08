import React, { useMemo, useState } from 'react';
import { Tag, Plus, Trash2 } from 'lucide-react';

export default function CategoryManager({ categories, onAdd, onRemove }) {
  const [value, setValue] = useState('');

  const handleAdd = () => {
    const name = value.trim();
    if (!name) return;
    onAdd?.(name);
    setValue('');
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 text-white/90">
      <div className="flex items-center justify-between mb-3">
        <div className="inline-flex items-center gap-2 text-white/80">
          <Tag className="h-4 w-4" /> Categories
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none placeholder:text-white/40"
          placeholder="Add a new category"
        />
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <span key={c} className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10">
            {c}
            <button onClick={() => onRemove?.(c)} className="hover:text-red-300">
              <Trash2 className="h-3 w-3" />
            </button>
          </span>
        ))}
        {categories.length === 0 && (
          <span className="text-white/50 text-sm">No categories yet.</span>
        )}
      </div>
    </div>
  );
}
