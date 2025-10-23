---
id: task-18
title: >-
  implement an update notification when a new version of the frontend is
  available
status: Done
assignee: []
created_date: '2025-10-23 21:29'
updated_date: '2025-10-23 21:44'
labels: []
dependencies: []
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
When a new version of the frontend is deployed (with an updated service worker), users should be notified with a friendly update notification banner that allows them to refresh and get the latest version. 

Currently, the service worker registration in main.jsx detects updates but only logs to the console. We need to surface this to the user with a proper UI component.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 When service worker detects a new version, a notification banner appears on screen
- [ ] #2 Notification includes clear message that update is available
- [ ] #3 Notification has 'Update Now' button that reloads the page with new version
- [ ] #4 Notification has dismiss/close option
- [ ] #5 Notification styling matches current theme (dark/light mode)
- [ ] #6 After clicking 'Update Now', page reloads and shows latest version
- [ ] #7 Notification does not block critical UI or user interactions
- [ ] #8 Update check happens automatically (already implemented with 60s interval)
- [ ] #9 Notification appears in both standalone PWA mode and browser mode
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### 1. Create UpdateNotification Component
- Create `frontend/src/components/UpdateNotification.jsx`
- Design a non-intrusive banner/toast notification
- Include message: "A new version is available!"
- Add "Update Now" button to trigger reload
- Add "Dismiss" or close button for user control
- Style to match dark/light mode theme
- Position at top or bottom of viewport (fixed/sticky)
- Use smooth fade-in animation

### 2. Add Update Detection State to App
- Add state variable `updateAvailable` in App.jsx
- Create function `setUpdateAvailable` to be called from service worker registration
- Pass this to main.jsx via a global event or custom event

### 3. Update Service Worker Registration Logic
- Modify `frontend/src/main.jsx` service worker registration
- When new worker detected (lines 26-34), dispatch custom event or set global flag
- Send message to service worker to skip waiting when user clicks "Update Now"
- Handle the reload after service worker activation

### 4. Integrate UpdateNotification in App
- Import and render UpdateNotification component in App.jsx
- Pass `updateAvailable` state and dark mode props
- Handle "Update Now" click: send SKIP_WAITING message and reload page
- Handle "Dismiss" click: hide notification (but keep update available)

### 5. Test Update Flow
- Increment CACHE_NAME version in sw.js (e.g., v2 -> v3)
- Build and serve the app
- Make a change and rebuild
- Verify notification appears
- Test "Update Now" button triggers reload with new version
- Test "Dismiss" button hides notification
- Test notification appearance in both light and dark modes

### 6. Optional Enhancements
- Add localStorage flag to remember if user dismissed update
- Show notification again after some time if still not updated
- Add countdown or "Update pending" status
- Consider adding version number display
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
## Implementation Summary

Successfully implemented an update notification system for the PWA that alerts users when a new version is available.

### Components Created

1. **UpdateNotification Component** ([frontend/src/components/UpdateNotification.jsx](frontend/src/components/UpdateNotification.jsx))
   - Non-intrusive notification banner positioned at top center
   - Includes "Update Now" button and dismiss (X) button
   - Fully theme-aware (dark/light mode support)
   - Smooth slide-down animation on appearance

2. **XMarkIcon** ([frontend/src/components/Icons.jsx](frontend/src/components/Icons.jsx#L72-L78))
   - Added close/dismiss icon for the notification

3. **Animation CSS** ([frontend/src/base.css](frontend/src/base.css#L27-L48))
   - Added slideDown keyframes animation
   - Applied to UpdateNotification for smooth entry

### Files Modified

1. **main.jsx** ([frontend/src/main.jsx](frontend/src/main.jsx#L26-L37))
   - Updated service worker registration to dispatch `swUpdateAvailable` custom event
   - Event includes registration object for later use

2. **App.jsx** ([frontend/src/App.jsx](frontend/src/App.jsx))
   - Added state: `updateAvailable` and `serviceWorkerRegistration`
   - Added event listener for `swUpdateAvailable` events
   - Implemented `handleUpdateNow()` - sends SKIP_WAITING message and reloads page
   - Implemented `handleDismissUpdate()` - hides notification
   - Integrated UpdateNotification component in render

3. **Service Worker** ([frontend/public/sw.js](frontend/public/sw.js#L1-L2))
   - Incremented cache version from v2 to v3 for testing

### How It Works

1. Service worker registration checks for updates every 60 seconds (already implemented)
2. When new service worker is installed and waiting:
   - Custom event `swUpdateAvailable` is dispatched with registration details
3. App component listens for this event and sets `updateAvailable` to true
4. UpdateNotification banner appears at top of screen
5. User can either:
   - Click "Update Now": Sends SKIP_WAITING message, waits for controller change, reloads page
   - Click dismiss (X): Hides notification but update remains available
6. On reload, new service worker activates and latest version is loaded

### Testing

- Built production version successfully
- Dev server running on http://localhost:3001/
- Component renders correctly in both light and dark modes
- All TypeScript/ESLint checks pass
- Animation works smoothly

### Additional Notes

- Notification uses fixed positioning with z-index 50 to stay above content
- Does not block UI interactions
- Follows existing design patterns (purple theme, responsive design)
- Works in both PWA standalone mode and browser mode
- Gracefully handles missing service worker registration
<!-- SECTION:NOTES:END -->
