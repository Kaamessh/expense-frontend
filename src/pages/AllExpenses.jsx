import React, { useEffect, useState } from 'react';
import TopControls from '../components/TopControls';

export default function AllExpenses({ api, token }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAll = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${api}/api/v1/expenses?limit=1000&page=1`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to load expenses');
      const data = await res.json();
      setItems(data.items || []);
      setError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const onDelete = async (id) => {
    try {
      const res = await fetch(`${api}/api/v1/expenses/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('Delete failed');
      await fetchAll();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="grid">
      {/* Floating controls are globally mounted; page content takes full width */}
      <div className="card" style={{ width: '100%' }}>
        <h2 className="section-title">All Expenses</h2>
        {error && <div className="alert">{error}</div>}
        {loading ? (
          <div>Loading…</div>
        ) : (
          <table className="table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Description</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
                <th style={{ width: 80 }}></th>
              </tr>
            </thead>
            <tbody>
              {items.map((x) => (
                <tr key={x._id}>
                  <td>{new Date(x.date).toLocaleDateString()}</td>
                  <td>{x.category}</td>
                  <td>{x.description}</td>
                  <td style={{ textAlign: 'right' }}>{x.amount}</td>
                  <td>
                    <button className="btn" aria-label="Delete" title="Delete" onClick={() => onDelete(x._id)}>🗑️</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan="5" style={{ textAlign: 'center' }}>No expenses</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
