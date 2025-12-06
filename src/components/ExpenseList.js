import React from 'react';

export default function ExpenseList({ items, page, pages, onPage }) {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th style={{ textAlign: 'right' }}>Amount</th>
                <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((x) => (
                <tr key={x._id || `${x.date}-${x.amount}`}> 
              <td>{new Date(x.date).toLocaleDateString()}</td>
              <td>{x.category}</td>
              <td>{x.description}</td>
              <td style={{ textAlign: 'right' }}>${x.amount.toFixed(2)}</td>
                  <td>
                    {/* Chevron to open full details on Expenses page */}
                    <a href="/#/expenses" aria-label="View details" title="View details">›</a>
                  </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr><td colSpan="4" style={{ textAlign: 'center' }}>No expenses yet</td></tr>
          )}
        </tbody>
      </table>
          <div style={{ marginTop: 8 }}>
            <a className="btn" href="/#/expenses">View All</a>
          </div>
      <div style={{ marginTop: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
        <button className="btn" disabled={page <= 1} onClick={() => onPage(page - 1)}>Prev</button>
        <span>Page {page} / {pages}</span>
        <button className="btn" disabled={page >= pages} onClick={() => onPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
