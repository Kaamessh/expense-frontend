import React from 'react';
import Dashboard from '../components/Dashboard';

export default function DashboardPage({ api, token }) {
  if (!token) return (
    <div className="card"><h2>Login required</h2><div>Please log in to view the dashboard.</div></div>
  );
  return (
    <div className="grid">
      <button className="btn" onClick={() => window.history.back()} aria-label="Back" title="Back" style={{ display:'inline-flex', alignItems:'center', gap:8 }}>
        <span style={{ display:'inline-block', transform:'translateY(-1px)' }}>←</span> Back
      </button>
      <div className="card">
        <h2 className="section-title">Dashboard</h2>
        <Dashboard api={api} token={token} />
      </div>
    </div>
  );
}
