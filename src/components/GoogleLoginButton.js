import React from 'react';

// Simple button that redirects to the backend Google OAuth entry point.
// Use absolute backend URL to avoid CRA dev-server handling browser navigations.
export default function GoogleLoginButton() {
  const apiBase =
    process.env.REACT_APP_API ||
    (typeof window !== 'undefined' && window.location && window.location.port === '3000'
      ? 'http://localhost:4000'
      : '');
  const href = `${apiBase}/api/v1/auth/google`;
  return (
    <button className="btn btn-primary" onClick={() => (window.location.href = href)}>
      Continue with Google
    </button>
  );
}
