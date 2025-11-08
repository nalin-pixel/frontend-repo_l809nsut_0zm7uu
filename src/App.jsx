import React, { useMemo, useState } from 'react';
import Hero3D from './components/Hero3D';
import SwipeTransactions from './components/SwipeTransactions';
import CategoryManager from './components/CategoryManager';
import RulesBuilder from './components/RulesBuilder';

function App() {
  // Seed categories
  const [categories, setCategories] = useState([
    'Groceries',
    'Dining',
    'Transport',
    'Bills',
    'Income',
  ]);

  // Seed transactions (simulated Gmail-imported feed)
  const [transactions, setTransactions] = useState([
    {
      id: 't1',
      merchant: 'Starbucks',
      description: 'Card purchase - Starbucks #1234',
      date: new Date().toISOString(),
      amount: -6.45,
      pending: false,
      account: 'Visa •••• 4242',
      category: '',
      suggestedCategories: ['Dining', 'Coffee', 'Treats'],
    },
    {
      id: 't2',
      merchant: 'Whole Foods Market',
      description: 'Thank you for shopping',
      date: new Date(Date.now() - 86400000).toISOString(),
      amount: -58.22,
      pending: false,
      account: 'Visa •••• 4242',
      category: '',
      suggestedCategories: ['Groceries', 'Household'],
    },
    {
      id: 't3',
      merchant: 'Uber',
      description: 'Your trip with Uber',
      date: new Date(Date.now() - 2 * 86400000).toISOString(),
      amount: -17.8,
      pending: true,
      account: 'Visa •••• 4242',
      category: '',
      suggestedCategories: ['Transport', 'Travel'],
    },
    {
      id: 't4',
      merchant: 'ACME Corp Payroll',
      description: 'Direct deposit',
      date: new Date(Date.now() - 3 * 86400000).toISOString(),
      amount: 2450,
      pending: false,
      account: 'Checking •••• 1111',
      category: '',
      suggestedCategories: ['Income'],
    },
  ]);

  const [rules, setRules] = useState([]);
  const [reviewed, setReviewed] = useState(new Set());

  // Apply rules: if merchant contains value → set category
  const applyCategoryByRules = (tx) => {
    for (const r of rules) {
      const hay = (tx.merchant || tx.description || '').toLowerCase();
      const needle = (r.value || '').toLowerCase();
      if (needle && hay.includes(needle)) return { ...tx, category: r.category };
    }
    return tx;
  };

  const queue = useMemo(() => {
    const pendingList = transactions.filter((t) => !reviewed.has(t.id));
    return pendingList.map(applyCategoryByRules);
  }, [transactions, rules, reviewed]);

  const handleDecision = ({ id, type }) => {
    // On confirm, keep rule-applied category; on skip, do nothing.
    setReviewed((prev) => new Set(prev).add(id));
  };

  const addCategory = (name) => {
    if (!categories.includes(name)) setCategories((c) => [...c, name]);
  };

  const removeCategory = (name) => {
    setCategories((c) => c.filter((x) => x !== name));
    // Also clean up rules pointing to removed category
    setRules((rs) => rs.filter((r) => r.category !== name));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white/90">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        <Hero3D />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SwipeTransactions transactions={queue} onDecision={handleDecision} />
          </div>
          <div className="space-y-6">
            <CategoryManager
              categories={categories}
              onAdd={addCategory}
              onRemove={removeCategory}
            />
            <RulesBuilder
              categories={categories}
              rules={rules}
              onChange={setRules}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
