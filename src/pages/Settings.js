import React, { useEffect, useState } from 'react';
import { useSettings } from '../settings/SettingsContext';
import { useI18n } from '../i18n';

// Currency options
const currencies = [
  { code: 'INR', symbol: '₹', label: 'INR – ₹' },
  { code: 'USD', symbol: '$', label: 'USD – $' },
  { code: 'EUR', symbol: '€', label: 'EUR – €' },
  { code: 'GBP', symbol: '£', label: 'GBP – £' },
  { code: 'JPY', symbol: '¥', label: 'JPY – ¥' },
  { code: 'AUD', symbol: 'A$', label: 'AUD – A$' },
  { code: 'CAD', symbol: 'C$', label: 'CAD – C$' },
  { code: 'CHF', symbol: 'CHF', label: 'CHF – CHF' },
  { code: 'CNY', symbol: '¥', label: 'CNY – ¥' },
  { code: 'SGD', symbol: 'S$', label: 'SGD – S$' },
];

const themeModes = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System Default' },
];

const languages = [
  { value: 'en', label: 'English' },
  { value: 'ta', label: 'தமிழ்' },
  { value: 'hi', label: 'हिन्दी' },
];

export default function SettingsPage() {
  const { settings, setSettings, resetSettings, setPin, verifyPin } = useSettings();
  const { t } = useI18n();
  const [localName, setLocalName] = useState(settings.profile?.name || '');
  const [monthlyLimit, setMonthlyLimit] = useState(settings.budget?.monthlyLimit || 0);
  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pinEnabled, setPinEnabled] = useState(!!settings.security?.pinEnabled);
  const [verifyInput, setVerifyInput] = useState('');
  const [verifyStatus, setVerifyStatus] = useState('');

  useEffect(() => {
    setLocalName(settings.profile?.name || '');
    setMonthlyLimit(settings.budget?.monthlyLimit || 0);
    setPinEnabled(!!settings.security?.pinEnabled);
  }, [settings]);

  const onCurrencyChange = (e) => {
    const code = e.target.value;
    const opt = currencies.find((c) => c.code === code) || currencies[0];
    setSettings({ currency: { code: opt.code, symbol: opt.symbol } });
  };

  const onThemeChange = (e) => setSettings({ theme: e.target.value });
  const onLanguageChange = (e) => setSettings({ language: e.target.value });
  const onDefaultHomeChange = (e) => setSettings({ defaultHome: e.target.value });

  const onProfileSave = () => setSettings({ profile: { ...(settings.profile || {}), name: localName } });
  const onBudgetSave = () => setSettings({ budget: { monthlyLimit: Number(monthlyLimit) || 0 } });

  const onNotifToggle = (key) => {
    setSettings({ notifications: { ...(settings.notifications || {}), [key]: !settings.notifications?.[key] } });
  };

  const onPinSave = async () => {
    if (!pin1 || pin1 !== pin2) return alert('PINs do not match');
    await setPin(pin1);
    setSettings({ security: { pinEnabled: true } });
    setPin1('');
    setPin2('');
    alert('PIN set successfully');
  };

  const onPinDisable = () => {
    setSettings({ security: { pinEnabled: false } });
    alert('PIN disabled');
  };

  const onPinVerify = async () => {
    const ok = await verifyPin(verifyInput);
    setVerifyStatus(ok ? 'PIN verified' : 'Invalid PIN');
  };

  const onResetAll = () => {
    const a = confirm('This will reset all local app data. Continue?');
    if (!a) return;
    const b = confirm('Are you absolutely sure? This cannot be undone.');
    if (!b) return;
    resetSettings();
    window.location.reload();
  };

  const { symbol } = settings.currency || { symbol: '₹' };

  return (
    <div className="grid" style={{ position:'relative' }}>
      <div className="card">
        <h2 className="section-title">{t('settings')}</h2>

        {/* Currency Selection */}
        <h3>{t('chooseCurrency')}</h3>
        <select className="input" value={settings.currency?.code || 'INR'} onChange={onCurrencyChange} aria-label="Currency">
          {currencies.map((c) => <option key={c.code} value={c.code}>{c.label}</option>)}
        </select>
        <div style={{ marginTop: 6 }}>Selected: {settings.currency?.code || 'INR'} ({symbol})</div>

        {/* Theme Mode */}
        <h3 style={{ marginTop: 16 }}>{t('themeMode')}</h3>
        <select className="input" value={settings.theme || 'system'} onChange={onThemeChange} aria-label="Theme Mode">
          {themeModes.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
        </select>

        {/* Language Selection */}
        <h3 style={{ marginTop: 16 }}>{t('language')}</h3>
        <select className="input" value={settings.language || 'en'} onChange={onLanguageChange} aria-label="Language">
          {languages.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
        </select>

        {/* Profile Section */}
        <h3 style={{ marginTop: 16 }}>{t('profile')}</h3>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          {settings.profile?.avatar && (
            <img src={settings.profile.avatar} alt="avatar" style={{ width:40, height:40, borderRadius:20 }} />
          )}
          <div>{settings.profile?.email || ''}</div>
        </div>
        <input className="input" placeholder="Display name" value={localName} onChange={(e) => setLocalName(e.target.value)} style={{ marginTop: 8 }} />
        <button className="btn" onClick={onProfileSave} style={{ marginTop: 8 }}>Save Name (local)</button>

        {/* Monthly Budget Limit */}
        <h3 style={{ marginTop: 16 }}>{t('budgetLimit')}</h3>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span aria-hidden="true" style={{ fontWeight:600 }}>{symbol}</span>
          <input className="input" type="number" min="0" step="0.01" value={monthlyLimit} onChange={(e) => setMonthlyLimit(e.target.value)} />
          <button className="btn" onClick={onBudgetSave}>Save Budget</button>
        </div>
        <div style={{ fontSize:12, opacity:0.8 }}>Example: usage% = (sum(month) / monthlyLimit) * 100. Warn at ≥ 80%.</div>

        {/* App Lock (PIN) */}
        <h3 style={{ marginTop: 16 }}>{t('appLock')}</h3>
        <div style={{ display:'grid', gap:6, maxWidth:320 }}>
          <label>Enable PIN: <input type="checkbox" checked={pinEnabled} onChange={(e) => setPinEnabled(e.target.checked)} onBlur={() => setSettings({ security: { pinEnabled } })} /></label>
          <input className="input" type="password" placeholder="Set PIN" value={pin1} onChange={(e) => setPin1(e.target.value)} />
          <input className="input" type="password" placeholder="Confirm PIN" value={pin2} onChange={(e) => setPin2(e.target.value)} />
          <button className="btn" onClick={onPinSave}>Save PIN</button>
          <button className="btn" onClick={onPinDisable}>Disable PIN</button>
          <div style={{ display:'flex', gap:8 }}>
            <input className="input" type="password" placeholder="Verify PIN" value={verifyInput} onChange={(e) => setVerifyInput(e.target.value)} />
            <button className="btn" onClick={onPinVerify}>Verify</button>
            <div aria-live="polite" style={{ fontSize:12 }}>{verifyStatus}</div>
          </div>
        </div>

        {/* Notification Settings */}
        <h3 style={{ marginTop: 16 }}>{t('notifications')}</h3>
        <label><input type="checkbox" checked={!!settings.notifications?.expenseAdded} onChange={() => onNotifToggle('expenseAdded')} /> Expense added successfully</label>
        <label><input type="checkbox" checked={!!settings.notifications?.reminderTrack} onChange={() => onNotifToggle('reminderTrack')} /> Reminder to track expenses</label>
        <label><input type="checkbox" checked={!!settings.notifications?.monthlySummary} onChange={() => onNotifToggle('monthlySummary')} /> Monthly summary report</label>

        {/* Backup & Restore */}
        <h3 style={{ marginTop: 16 }}>{t('backupRestore')}</h3>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          <button className="btn" onClick={() => exportData()}>Export Data (JSON)</button>
          <label className="btn" style={{ cursor:'pointer' }}>
            Import Data (JSON)
            <input type="file" accept="application/json" style={{ display:'none' }} onChange={(e) => importData(e)} />
          </label>
        </div>
        <div style={{ fontSize:12, opacity:0.8 }}>TODO: Integrate Google Drive / backend sync.</div>

        {/* Default Home Screen */}
        <h3 style={{ marginTop: 16 }}>{t('defaultHome')}</h3>
        <select className="input" value={settings.defaultHome || 'add-expense'} onChange={onDefaultHomeChange} aria-label="Default Home">
          <option value="dashboard">Dashboard</option>
          <option value="add-expense">Add Expense</option>
          <option value="categories">Categories</option>
          <option value="reports">Reports</option>
        </select>

        {/* Reset App Data */}
        <h3 style={{ marginTop: 16 }}>{t('resetData')}</h3>
        <button className="btn" onClick={onResetAll}>Reset All Local Data</button>
        <div style={{ fontSize:12 }}>Clears LocalStorage settings and PIN hash. Does not affect backend data.</div>

        {/* Bonus Pro Settings Stubs */}
        <h3 style={{ marginTop: 16 }}>Pro Settings (Stubs)</h3>
        <ul>
          <li>Category Management (icons/colors) — TODO</li>
          <li>Auto Sync Toggle — TODO</li>
          <li>Privacy: Allow Analytics, Allow Error Reports — TODO</li>
        </ul>
      </div>
    </div>
  );

  function exportData() {
    try {
      const raw = localStorage.getItem('app_settings_v1') || '{}';
      const blob = new Blob([raw], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'expense-settings.json';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert('Export failed');
    }
  }

  function importData(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result);
        setSettings(json);
        alert('Import successful');
      } catch (_) {
        alert('Invalid JSON');
      }
    };
    reader.readAsText(file);
  }
}
