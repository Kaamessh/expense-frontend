import React from 'react';
import Dashboard from '../components/Dashboard';
import BackButton from '../components/BackButton';
import HomeButton from '../components/HomeButton';

export default function DashboardPage({ api, token }) {
  if (!token) return (
    <div className="card"><h2>Login required</h2><div>Please log in to view the dashboard.</div></div>
  );
  return (
    <div className="grid" style={{ position:'relative' }}>
      <BackButton />
      <HomeButton />
      <div className="card" style={{ width:'100%' }}>
        <h2 className="section-title">Dashboard</h2>
        <Dashboard api={api} token={token} />
      </div>
    </div>
  );
}
