// Storage helpers: localStorage for web; secure PIN with Web Crypto fallback.

const KEY = 'app_settings_v1';

export function loadSettings() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(KEY, JSON.stringify(settings));
  } catch (_) {}
}

export function resetSettings() {
  try {
    localStorage.removeItem(KEY);
  } catch (_) {}
}

const PIN_KEY = 'app_pin_hash_v1';

async function sha256(text) {
  if (window.crypto && window.crypto.subtle) {
    const enc = new TextEncoder().encode(text);
    const buf = await window.crypto.subtle.digest('SHA-256', enc);
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback (not as secure):
  let hash = 0;
  for (let i = 0; i < text.length; i++) hash = (hash << 5) - hash + text.charCodeAt(i);
  return String(hash);
}

export async function setPin(pin) {
  const hash = await sha256(pin);
  localStorage.setItem(PIN_KEY, hash);
}

export async function verifyPin(pin) {
  const existing = localStorage.getItem(PIN_KEY) || '';
  const hash = await sha256(pin);
  return existing && existing === hash;
}
