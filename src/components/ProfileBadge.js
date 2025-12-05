import React, { useEffect, useState } from 'react';

export default function ProfileBadge({ api, token }) {
  const [profile, setProfile] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Seed from JWT so we at least show email immediately
    try {
      const parts = token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        if (payload?.email && !profile) {
          setProfile((p) => p || { name: null, email: payload.email, avatar: null });
        }
      }
    } catch {}

    const fetchMe = async () => {
      try {
        const res = await fetch(`${api}/api/v1/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) return;
        const data = await res.json();
        setProfile(data);
      } catch (e) {}
    };
    fetchMe();
  }, [api, token]);

  const initials = profile?.name && profile.name.trim() ? profile.name.split(' ').map(p => p[0]).join('').slice(0,2).toUpperCase() : (profile?.email ? profile.email[0].toUpperCase() : 'U');

  return (
    <div style={{ position:'relative' }}>
      <button className="btn" onClick={() => setOpen(v => !v)} style={{ display:'flex', alignItems:'center', gap:8 }}>
        <div style={{ width:32, height:32, borderRadius:999, background:'linear-gradient(90deg,#7c4dff,#9f6cff)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:600 }}>
          {initials}
        </div>
        <span style={{ color:'#e6e6f0' }}>{(profile?.name && profile.name.trim()) ? profile.name : (profile?.email || 'Profile')}</span>
      </button>
      {open && (
        <div style={{ position:'absolute', top:'110%', left:0, background:'#14143a', border:'1px solid #2a2a5a', borderRadius:12, padding:12, minWidth:220, boxShadow:'0 12px 24px rgba(0,0,0,.4)' }}>
          <div style={{ fontWeight:600 }}>{profile?.name || profile?.email || 'Unknown'}</div>
          <div style={{ color:'#9aa3b2' }}>{profile?.email || ''}</div>
        </div>
      )}
    </div>
  );
}
