import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
<<<<<<< HEAD
import registerSW from './serviceWorkerRegistration';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

// Register service worker for PWA install (no UI changes)
registerSW();
=======
import './theme.css';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
>>>>>>> afa80d964c82e4a7ac7998a9fe8d3baf49734c2e
