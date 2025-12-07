import React, { useMemo, useState } from 'react';
import { useSettings } from '../settings/SettingsContext';

// Shows currency symbol from settings; defaults to INR
export default function ExpenseForm({ api, token, onAdded }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const { settings } = useSettings();
  const defaultCode = settings?.currency?.code || 'INR';
  const defaultSymbol = settings?.currency?.symbol || '₹';
  const [currencyCode, setCurrencyCode] = useState(defaultCode);
  const currencyMap = useMemo(() => ({
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
  }), []);
  const symbol = currencyMap[currencyCode] || defaultSymbol;

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await fetch(`${api}/api/v1/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ amount: Number(amount), category, description, date, currencyCode, currencySymbol: symbol })
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error || 'Request failed');
    setAmount(''); setCategory(''); setDescription(''); setDate('');
    onAdded();
  };

  return (
    <div>
      <form onSubmit={submit} className="form" style={{ maxWidth: 520 }}>
        {/* Currency selection and Amount input; currency affects only this entry */}
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <label className="sr-only" htmlFor="currency">Currency</label>
          <select id="currency" className="input" aria-label="Currency" value={currencyCode} onChange={(e) => setCurrencyCode(e.target.value)} style={{ maxWidth: 120 }}>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
          </select>
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
