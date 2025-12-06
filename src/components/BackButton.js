import React from 'react';

export default function BackButton() {
  return (
    <button
      className="btn"
      onClick={() => window.history.back()}
      aria-label="Back"
      title="Back"
      style={{
        position: 'absolute',
        top: 12,
        left: 12,
        padding: '4px 8px',
        fontSize: 12,
        lineHeight: '16px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6
      }}
    >
      <span style={{ display: 'inline-block', transform: 'translateY(-1px)' }}>←</span> Back
    </button>
  );
}
