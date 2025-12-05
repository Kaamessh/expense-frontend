import React, { useEffect } from 'react';

// Reads token from URL, stores it, and redirects to the main dashboard
export default function AuthSuccess({ api, onToken }) {
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
      localStorage.setItem('token', token);
      if (typeof onToken === 'function') onToken(token);
    }
    // After storing token, check if username exists; if not, redirect to set-username
    const checkProfile = async () => {
      try {
        const res = await fetch(`${api}/api/v1/auth/me`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await res.json().catch(() => ({}));
            if (data && data.name && data.name.trim()) {
          window.location.replace('/');
        } else {
          window.location.replace('/set-username');
        }
      } catch (_) {
        window.location.replace('/');
      }
    };
    checkProfile();
  }, []);

  return (
    <div className="card" style={{ padding: 24 }}>
      <h2>Signing you in…</h2>
      <div>Please wait while we set up your session.</div>
    </div>
  );
}
