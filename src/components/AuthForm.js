import React, { useState } from 'react';
import GoogleLoginButton from './GoogleLoginButton';

export default function AuthForm({ api, onAuth }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    const body = mode === 'register' ? { name, email, password } : { email, password };
    try {
      const res = await fetch(`${api}/api/v1/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json().catch(() => ({ error: 'Invalid JSON response' }));
      if (!res.ok) return setError(data.error || 'Request failed');
      onAuth(data.token);
    } catch (err) {
      setError('Network error: failed to reach server');
    }
  };

  return (
    <div>
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={submit} className="form" style={{ maxWidth: 420 }}>
        {mode === 'register' && (
          <input className="input" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} required />
        )}
        <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <div className="error">{error}</div>}
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
      <button className="btn" onClick={() => setMode(mode === 'login' ? 'register' : 'login')} style={{ marginTop: 8 }}>
        Switch to {mode === 'login' ? 'Register' : 'Login'}
      </button>
      <div style={{ marginTop: 12 }}>
        <GoogleLoginButton />
      </div>
    </div>
  );
}
