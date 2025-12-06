import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';

export default function ExpensesPage({ api, token, fetchExpenses, expenses, pagination }) {
  if (!token) return (
    <div className="card"><h2>Login required</h2><div>Please log in to manage expenses.</div></div>
  );
  return (
    <div className="grid">
      <button className="btn" onClick={() => window.history.back()} aria-label="Back" title="Back" style={{ display:'inline-flex', alignItems:'center', gap:8 }}>
        <span style={{ display:'inline-block', transform:'translateY(-1px)' }}>←</span> Back
      </button>
      <div className="card">
        <h2 className="section-title"><span className="badge">New</span> Add Expense</h2>
        <ExpenseForm api={api} token={token} onAdded={() => fetchExpenses(pagination.page)} />
      </div>
      <div className="card">
        <h2 className="section-title">Expenses</h2>
        <ExpenseList items={expenses} page={pagination.page} pages={pagination.pages} onPage={(p) => fetchExpenses(p)} />
      </div>
    </div>
  );
}
