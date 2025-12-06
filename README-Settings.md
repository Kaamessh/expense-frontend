# Settings Page Integration Guide

This repo implements a full-featured Settings page for the React frontend.

## Features Implemented
- Currency selection with at least 10 options (INR default)
- Theme mode: Light / Dark / System Default (applies globally)
- Language selection: English, தமிழ், हिन्दी (simple i18n provider)
- Logout button (use existing header; add Google flow hooks as needed)
- Profile section: shows email/avatar and editable local display name
- Monthly budget limit: numeric input prefixed with selected currency symbol
- App Lock (PIN): set/confirm/verify, enable/disable (stored securely via Web Crypto hash when available)
- Notification toggles with persistence
- Backup & Restore: export/import JSON of settings
- Default Home Screen selection with persistence
- Reset App Data with 2-step confirmation, clears LocalStorage settings & PIN
- Pro Settings stubs: Category management, Auto Sync toggle, Privacy toggles

## File Structure Additions
```
frontend/src/
  settings/
    SettingsContext.js   # global settings context and theme apply
    storage.js           # helpers for persistence & PIN hashing
  i18n/
    index.js             # minimal i18n provider
  pages/
    Settings.js          # Settings page UI
  components/
    BackButton.js        # small top-left back button
    HomeButton.js        # small top-left home button
```

## Usage
- App is wrapped with `SettingsProvider` and `I18nProvider` in `src/App.js`.
- Settings page accessible via `/#/settings` and header link.
- Currency symbol appears next to the amount input in `components/ExpenseForm.js`.

## Environment & Hooks
- Logout: integrate with your backend by calling a logout endpoint and clearing tokens; ensure cross-origin cookies use `credentials: 'include'`.
- Backup sync: wire Google Drive or backend API where indicated with TODOs.

## Extensibility
- Add more currencies by extending the `currencies` array in `pages/Settings.js`.
- Add more languages by expanding `i18n/index.js` strings and wiring keys in components.

## Tests (examples)
- Create unit tests for `settings/storage.js` functions `saveSettings`, `loadSettings`, and `verifyPin` using Jest.
- Widget/Component tests: simulate selecting a currency and assert symbol changes on amount box.

## Notes
- Web: stores settings in `localStorage`. Mobile (Flutter) implementation not included here; if needed, create a parallel `/flutter` folder with Provider+SharedPreferences.
- Security trade-offs: PIN is hashed client-side; for true security, require a backend and secure enclave on mobile.
