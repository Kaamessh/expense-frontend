import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard({ api, token }) {
  const [range, setRange] = useState('monthly');
  const [groupBy, setGroupBy] = useState('daily');
  const [data, setData] = useState([]);

  const fetchStats = async () => {
    const params = new URLSearchParams({ range, groupBy });
    const res = await fetch(`${api}/api/v1/stats?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const json = await res.json();
    if (!res.ok) return;
    const formatItem = (it) => {
      const id = it._id;
      const label = id.day ? `${id.year}-${String(id.month).padStart(2,'0')}-${String(id.day).padStart(2,'0')}`
        : id.week ? `${id.year}-W${id.week}`
        : `${id.year}-${String(id.month).padStart(2,'0')}`;
      return { label, total: it.total };
    };
    setData(json.results.map(formatItem));
  };

  useEffect(() => { fetchStats(); }, [range, groupBy]);

  return (
    <div>
      <div style={{ display: 'flex', gap: 8 }}>
        <select className="select" value={range} onChange={(e) => setRange(e.target.value)}>
          <option value="weekly">Last 7 days</option>
          <option value="monthly">Last 30 days</option>
          <option value="custom">Custom (uses defaults)</option>
        </select>
        <select className="select" value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <div className="chart" style={{ marginTop: 16 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="rgba(255,255,255,.08)" />
            <XAxis stroke="#9aa3b2" dataKey="label" tick={{ fill: '#9aa3b2' }} />
            <YAxis stroke="#9aa3b2" tick={{ fill: '#9aa3b2' }} />
            <Tooltip contentStyle={{ background:'#14143a', border:'1px solid #2a2a5a', borderRadius:12, color:'#e6e6f0' }} />
            <Line type="monotone" dataKey="total" stroke="#7c4dff" strokeWidth={2} dot={{ r: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
