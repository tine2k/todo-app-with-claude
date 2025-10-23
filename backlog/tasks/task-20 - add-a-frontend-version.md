---
id: task-20
title: add a frontend version
status: Done
assignee: []
created_date: '2025-10-23 21:45'
updated_date: '2025-10-23 21:57'
labels: []
dependencies: []
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add a version indicator to the frontend application that displays the current version from package.json. This will help users and developers identify which version of the app is running.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Version number from package.json is displayed in the UI
- [x] #2 Version display adapts to dark/light mode theme
- [x] #3 Version is visible but not intrusive
- [x] #4 Version updates correctly when package.json version changes
- [x] #5 No console errors or warnings related to version display
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### 1. Configure Vite to Expose Version
- Modify [vite.config.mjs](frontend/vite.config.mjs) to use `define` option
- Expose `__APP_VERSION__` from package.json version field
- Use `import.meta.env` pattern for accessing the version at runtime

### 2. Display Version in UI
- Add version display to the footer or header of [App.jsx](frontend/src/App.jsx)
- Position it in a subtle, non-intrusive location (e.g., bottom-right corner)
- Style it to match the dark/light mode theme
- Make it small and unobtrusive but readable

### 3. Styling Considerations
- Use Tailwind CSS classes for styling
- Ensure proper contrast in both dark and light modes
- Consider using a muted color (gray-400/gray-500)
- Position with fixed or absolute positioning for consistent placement

### 4. Testing
- Verify version displays correctly in both modes
- Check that version updates when package.json is changed
- Test that build includes the correct version
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
## Implementation Summary

### Changes Made
1. **Modified [vite.config.mjs](frontend/vite.config.mjs)**:
   - Added `readFileSync` import from 'fs'
   - Read package.json and parsed version
   - Added `define` option to expose `__APP_VERSION__` global constant

2. **Modified [App.jsx](frontend/src/App.jsx:367-369)**:
   - Added version display at bottom of card
   - Styled with text-xs and responsive dark/light mode colors
   - Positioned with mt-6 margin and centered text

### Testing Results
- ✓ Dev server starts successfully (port 3001)
- ✓ Production build completes without errors
- ✓ Version string "1.0.0" found in built JavaScript
- ✓ Dark mode styling: text-gray-500
- ✓ Light mode styling: text-gray-400

### Notes
- Version changes require dev server restart (config is evaluated once at startup)
- This is acceptable as version changes are infrequent
- Version displays as "v1.0.0" in a subtle, non-intrusive manner
<!-- SECTION:NOTES:END -->
