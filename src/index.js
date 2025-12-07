import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/responsive.css';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

// Register service worker (PWA)
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/service-worker.js')
			.then((reg) => console.log('Service worker registered', reg.scope))
			.catch((err) => console.warn('Service worker registration failed', err));
	});
}
