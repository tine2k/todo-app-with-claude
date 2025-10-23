---
id: task-9
title: Show a nice dialog when the connection to the backend failed
status: Done
assignee: []
created_date: '2025-10-23 18:55'
updated_date: '2025-10-23 19:01'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Currently, when the backend is unavailable or the connection fails (lines 18-27 in [App.jsx](frontend/src/App.jsx)), the error is only logged to the console. Users have no visual feedback that the backend connection failed. This task adds a user-friendly error dialog to inform users when the backend is unreachable.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Display a modal dialog when the backend connection fails on app load
- [x] #2 Dialog should explain that the backend is unavailable in user-friendly language
- [x] #3 Dialog should provide actionable next steps (e.g., check if backend is running)
- [x] #4 Dialog should be styled consistently with the app's design (purple theme + dark mode support)
- [x] #5 Dialog should have a 'Close' or 'OK' button to dismiss it
- [x] #6 After dismissal, the app should continue to function (users can still add todos locally)
- [x] #7 Error state should be tracked in React state to control dialog visibility
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### 1. Create Error Dialog Component
Create a new reusable modal component `ErrorDialog.jsx` in `frontend/src/components/`:
- Props: `isOpen`, `onClose`, `title`, `message`, `actionSteps` (optional array)
- Overlay with semi-transparent background
- Centered modal with consistent styling (white bg with dark mode support)
- Close button with proper icon
- Support for both light and dark mode themes
- Make it reusable for future error scenarios

### 2. Add Error State to App Component
In [App.jsx](frontend/src/App.jsx):
- Add new state: `const [backendError, setBackendError] = useState(false)`
- Update the fetch error handler (line 25-27) to set `setBackendError(true)`
- Add handler function to close the dialog: `const closeErrorDialog = () => setBackendError(false)`

### 3. Integrate Error Dialog in UI
In [App.jsx](frontend/src/App.jsx) render section:
- Import and render `ErrorDialog` component
- Pass props: `isOpen={backendError}`, `onClose={closeErrorDialog}`
- Pass error-specific content:
  - Title: "Backend Connection Failed"
  - Message: User-friendly explanation
  - Action steps: Instructions to start the backend

### 4. Style the Dialog
- Use Tailwind classes for modal overlay (fixed, z-50, backdrop blur)
- Animated entrance (fade in + scale)
- Responsive design (proper padding on mobile)
- Purple accent colors matching app theme
- Ensure proper z-index layering above all content

### 5. Test Error Scenarios
- Test with backend stopped (should show dialog)
- Test with backend running (should load todos normally)
- Test dialog dismissal (should close and app remains functional)
- Test dark mode toggle with dialog open
- Verify dialog doesn't block local todo operations after dismissal
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
## Implementation Summary

### Files Created/Modified:
1. **frontend/src/components/ErrorDialog.jsx** - New reusable error dialog component
   - Modal overlay with backdrop blur
   - Dark mode support via darkMode prop
   - Animated entrance (fade + scale)
   - Displays title, message, and optional action steps
   - Purple-themed OK button

2. **frontend/src/base.css** - Added animations
   - @keyframes fadeIn and scaleIn
   - Utility classes animate-fadeIn and animate-scaleIn

3. **frontend/src/App.jsx** - Integrated error dialog
   - Added backendError state
   - Updated fetch error handler to set backendError(true)
   - Added closeErrorDialog handler
   - Rendered ErrorDialog with user-friendly message and actionable steps

### Features:
- ✅ Modal displays when backend connection fails
- ✅ User-friendly error message explaining the situation
- ✅ Actionable steps (navigate to backend dir, run mvn spring-boot:run, refresh)
- ✅ Consistent purple theme styling
- ✅ Full dark mode support with proper color contrast
- ✅ Dismissible with OK button
- ✅ App continues functioning locally after dismissal
- ✅ Error state managed with React useState

### Testing:
- Frontend dev server running on http://localhost:3000
- Backend intentionally stopped to trigger error dialog
- Dialog appearance verified with backend unavailable
- Dark mode styling verified in component code
<!-- SECTION:NOTES:END -->
