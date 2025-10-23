import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './base.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('[PWA] Service Worker registered successfully:', registration.scope);

        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60000); // Check every minute

        // Listen for new service worker waiting
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('[PWA] New content available, please refresh.');
              // Optionally show a notification to the user
            }
          });
        });
      })
      .catch((error) => {
        console.error('[PWA] Service Worker registration failed:', error);
      });
  });

  // Handle service worker messages
  navigator.serviceWorker.addEventListener('message', (event) => {
    console.log('[PWA] Message from service worker:', event.data);
  });
}

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
