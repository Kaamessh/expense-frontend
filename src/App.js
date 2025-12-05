import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Dashboard from './components/Dashboard';
import AuthSuccess from './pages/AuthSuccess';
import SetUsername from './pages/SetUsername';
import ExpensesPage from './pages/Expenses';
import DashboardPage from './pages/Dashboard';
import ProfileBadge from './components/ProfileBadge';
import LogoE from './components/LogoE';

const API = (typeof window !== 'undefined' && window.location && window.location.port === '3000')
  ? ''
  : (process.env.REACT_APP_API || 'http://localhost:4000');

function BackButton() {
  const navigate = useNavigate();
  return (
    <button className="btn" onClick={() => navigate(-1)} aria-label="Back" title="Back" style={{ display:'inline-flex', alignItems:'center', gap:8 }}>
      <span style={{ display:'inline-block', transform:'translateY(-1px)' }}>←</span> Back
    </button>
  );
}

function AppInner() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [expenses, setExpenses] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
  }, [token]);

  const fetchExpenses = async (page = 1) => {
    const res = await fetch(`${API}/api/v1/expenses?limit=10&page=${page}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) return;
    const data = await res.json();
    setExpenses(data.items);
    setPagination({ page: data.page, pages: data.pages, total: data.total });
  };

  useEffect(() => {
    if (token) fetchExpenses();
  }, [token]);

  // Router-based pages

  return (
    <div className="app">
      <section className="hero" style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <LogoE />
          {token && <ProfileBadge api={API} token={token} />}
          <div>
            <h1 style={{ margin:0 }}>Expense Tracker</h1>
            <div className="subtitle">Track spending with a sleek neon dashboard</div>
          </div>
        </div>
        <div className="subtitle">Track spending with a sleek neon dashboard</div>
        <div className="nav">
          {!token ? (
            <button className="btn">About</button>
          ) : (
            <button className="btn" onClick={() => { setToken(''); localStorage.removeItem('token'); }}>Logout</button>
          )}
          <a className="btn" href="/expenses">Expenses</a>
          <a className="btn" href="/dashboard">Dashboard</a>
        </div>
      </section>
      <Routes>
        <Route path="/" element={
          !token ? (
            <div className="grid">
              <div className="card">
                <AuthForm api={API} onAuth={(t) => setToken(t)} />
              </div>
            </div>
          ) : (
            <div className="grid">
              <div className="card">
                <h2 className="section-title"><span className="badge">New</span> Add Expense</h2>
                <ExpenseForm api={API} token={token} onAdded={() => fetchExpenses(pagination.page)} />
              </div>
              <div className="card">
                <h2 className="section-title">Expenses</h2>
                <ExpenseList items={expenses} page={pagination.page} pages={pagination.pages} onPage={(p) => fetchExpenses(p)} />
              </div>
              <div className="card">
                <h2 className="section-title">Dashboard</h2>
                <Dashboard api={API} token={token} />
              </div>
            </div>
          )
        } />
        <Route path="/auth/success" element={<AuthSuccess api={API} onToken={(t) => setToken(t)} />} />
        <Route path="/set-username" element={<><BackButton /><SetUsername api={API} onDone={() => window.location.replace('/')} /></>} />
        <Route path="/expenses" element={<ExpensesPage api={API} token={token} fetchExpenses={fetchExpenses} expenses={expenses} pagination={pagination} />} />
        <Route path="/dashboard" element={<DashboardPage api={API} token={token} />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
