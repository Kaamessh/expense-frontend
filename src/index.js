import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import registerSW from './serviceWorkerRegistration';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

// Register service worker for PWA install (no UI changes)
registerSW();
