import React, { useState } from 'react';
import { useSettings } from '../settings/SettingsContext';

// Shows currency symbol from settings; defaults to INR
export default function ExpenseForm({ api, token, onAdded }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const { settings } = useSettings();
  const symbol = settings?.currency?.symbol || '₹';

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await fetch(`${api}/api/v1/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ amount: Number(amount), category, description, date })
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error || 'Request failed');
    setAmount(''); setCategory(''); setDescription(''); setDate('');
    onAdded();
  };

  return (
    <div>
      <form onSubmit={submit} className="form" style={{ maxWidth: 520 }}>
        {/* Amount input with dynamic currency symbol */}
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span aria-hidden="true" style={{ fontWeight:600 }}>{symbol}</span>
          <input className="input" type="number" step="0.01" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>
        <input className="input" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <input className="input" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        {error && <div className="error">{error}</div>}
        <button className="btn btn-primary" type="submit">Add</button>
      </form>
    </div>
  );
}
