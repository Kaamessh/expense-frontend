// Simple i18n provider with three languages: English, Tamil, Hindi
import React, { createContext, useContext, useMemo } from 'react';
import { useSettings } from '../settings/SettingsContext';

const strings = {
  en: {
    settings: 'Settings',
    chooseCurrency: 'Choose Currency Type',
    themeMode: 'Theme Mode',
    language: 'Language',
    logout: 'Logout',
    profile: 'Profile',
    budgetLimit: 'Monthly Budget Limit',
    appLock: 'App Lock (PIN)',
    notifications: 'Notifications',
    backupRestore: 'Backup & Restore',
    defaultHome: 'Default Home Screen',
    resetData: 'Reset App Data',
  },
  ta: {
    settings: 'அமைப்புகள்',
    chooseCurrency: 'நாணய வகையைத் தேர்வுசெய்க',
    themeMode: 'தீம் முறை',
    language: 'மொழி',
    logout: 'வெளியேறு',
    profile: 'சுயவிவரம்',
    budgetLimit: 'மாதாந்திர பட்ஜெட் வரம்பு',
    appLock: 'பயன்பாட்டு பூட்டு (PIN)',
    notifications: 'அறிவிப்புகள்',
    backupRestore: 'காப்புப்பிரதி & மீட்பு',
    defaultHome: 'இயல்புநிலை முகப்பு திரை',
    resetData: 'தரவை மீட்டமை',
  },
  hi: {
    settings: 'सेटिंग्स',
    chooseCurrency: 'मुद्रा प्रकार चुनें',
    themeMode: 'थीम मोड',
    language: 'भाषा',
    logout: 'लॉगआउट',
    profile: 'प्रोफ़ाइल',
    budgetLimit: 'मासिक बजट सीमा',
    appLock: 'ऐप लॉक (PIN)',
    notifications: 'सूचनाएँ',
    backupRestore: 'बैकअप और रिस्टोर',
    defaultHome: 'डिफ़ॉल्ट होम स्क्रीन',
    resetData: 'डेटा रीसेट',
  },
};

const I18nContext = createContext({ t: (k) => k });

export function I18nProvider({ children }) {
  const { settings } = useSettings();
  const lang = settings.language || 'en';
  const dict = strings[lang] || strings.en;
  const t = (k) => dict[k] || strings.en[k] || k;
  const value = useMemo(() => ({ t, lang }), [t, lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
