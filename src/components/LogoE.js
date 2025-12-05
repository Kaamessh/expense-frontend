import React from 'react';

// Stylish neon alphabet 'E' as a ticker/logo
export default function LogoE() {
  return (
    <div style={{ width:40, height:40, borderRadius:12, background:'linear-gradient(135deg, #7c4dff, #3ddbf2)', boxShadow:'0 8px 16px rgba(124,77,255,.35)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 4h14" stroke="#0b0b1f" strokeWidth="2" strokeLinecap="round"/>
        <path d="M5 12h12" stroke="#0b0b1f" strokeWidth="2" strokeLinecap="round"/>
        <path d="M5 20h10" stroke="#0b0b1f" strokeWidth="2" strokeLinecap="round"/>
        <path d="M5 4v16" stroke="#0b0b1f" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
  );
}
