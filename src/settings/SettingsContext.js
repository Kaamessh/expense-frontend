// Global settings context: currency, theme, language, profile, notifications, defaults, PIN, budget
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadSettings, saveSettings, resetSettings, verifyPin, setPin } from './storage';

const defaultSettings = {
  currency: { code: 'INR', symbol: '₹' },
  theme: 'system', // 'light' | 'dark' | 'system'
  language: 'en', // 'en' | 'ta' | 'hi'
  profile: { name: '', email: '', avatar: '' },
  budget: { monthlyLimit: 0 },
  notifications: {
    expenseAdded: true,
    reminderTrack: false,
    monthlySummary: true,
  },
  defaultHome: 'add-expense', // 'dashboard' | 'add-expense' | 'categories' | 'reports'
  security: { pinEnabled: false },
};

const SettingsContext = createContext({ settings: defaultSettings, setSettings: () => {}, applyTheme: () => {} });

export function SettingsProvider({ children }) {
  const [settings, setSettingsState] = useState(defaultSettings);

  useEffect(() => {
    const loaded = loadSettings();
    if (loaded) setSettingsState({ ...defaultSettings, ...loaded });
  }, []);

  useEffect(() => {
    // persist on change
    saveSettings(settings);
    // apply theme
    applyTheme(settings.theme);
  }, [settings]);

  const setSettings = (patch) => {
    setSettingsState((prev) => ({ ...prev, ...patch }));
  };

  const applyTheme = (mode) => {
    const root = document.documentElement;
    const preferDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const active = mode === 'system' ? (preferDark ? 'dark' : 'light') : mode;
    root.setAttribute('data-theme', active);
  };

  const value = useMemo(() => ({ settings, setSettings, applyTheme, resetSettings, verifyPin, setPin }), [settings]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  return useContext(SettingsContext);
}
