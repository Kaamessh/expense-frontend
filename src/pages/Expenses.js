import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
// Back and Home buttons are now placed in the global header

export default function ExpensesPage({ api, token, fetchExpenses, expenses, pagination }) {
  if (!token) return (
    <div className="card"><h2>Login required</h2><div>Please log in to view expenses.</div></div>
  );
  return (
    <div className="grid">
      <div className="card" style={{ width: '100%' }}>
        <h2 className="section-title">Expenses</h2>
        <ExpenseList items={expenses} page={pagination.page} pages={pagination.pages} onPage={(p) => fetchExpenses(p)} />
      </div>
    </div>
  );
}
