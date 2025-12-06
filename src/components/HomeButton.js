import React from 'react';

export default function HomeButton() {
  const goHome = () => {
    if (typeof window !== 'undefined') {
      window.location.replace('/#/');
    }
  };
  return (
    <button
      className="btn"
      onClick={goHome}
      aria-label="Home"
      title="Home"
      style={{
        position: 'absolute',
        top: 12,
        left: 72,
        padding: '4px 8px',
        fontSize: 12,
        lineHeight: '16px'
      }}
    >
      Home
    </button>
  );
}
