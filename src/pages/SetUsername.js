import React, { useState } from 'react';

export default function SetUsername({ api, onDone }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${api}/api/v1/auth/username`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name })
      });
      const data = await res.json().catch(() => ({ error: 'Invalid JSON response' }));
      if (!res.ok) return setError(data.error || 'Request failed');
      // On success, go to the main page
      if (typeof onDone === 'function') onDone(data);
      window.location.replace('/#/');
    } catch (err) {
      setError('Network error: failed to reach server');
    }
  };

  // If no token is present, send user to home to initiate login
  if (!token) {
    setTimeout(() => window.location.replace('/#/'), 0);
    return (
      <div className="card" style={{ padding: 24 }}>
        <h2>Missing token</h2>
        <div>Redirecting to home…</div>
      </div>
    );
  }

  return (
    <div>
      <h2>Set your username</h2>
      <form onSubmit={submit} className="form" style={{ maxWidth: 420 }}>
        <input className="input" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} required />
        {error && <div className="error">{error}</div>}
        <button className="btn btn-primary" type="submit">Save</button>
      </form>
    </div>
  );
}
