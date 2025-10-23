import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './base.css';
import { registerSW } from 'virtual:pwa-register';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker using vite-plugin-pwa
const updateSW = registerSW({
  onNeedRefresh() {
    console.log('[PWA] New content available, please refresh.');
    // Dispatch custom event to notify the app (for UpdateNotification component)
    window.dispatchEvent(new CustomEvent('swUpdateAvailable', {
      detail: { updateSW }
    }));
  },
  onOfflineReady() {
    console.log('[PWA] App ready to work offline');
  },
  onRegistered(registration) {
    console.log('[PWA] Service Worker registered successfully:', registration?.scope);

    // Check for updates periodically
    if (registration) {
      setInterval(() => {
        registration.update();
      }, 60000); // Check every minute
    }
  },
  onRegisterError(error) {
    console.error('[PWA] Service Worker registration failed:', error);
  }
});

// Handle PWA install prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('[PWA] Install prompt available');
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  // Optionally show a custom install button
});

window.addEventListener('appinstalled', () => {
  console.log('[PWA] App installed successfully');
  deferredPrompt = null;
});
