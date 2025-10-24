---
id: task-23
title: use tailwind dark mode
status: Done
assignee: []
created_date: '2025-10-24 08:13'
updated_date: '2025-10-24 08:18'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Migrate from programmatic dark mode implementation to Tailwind CSS's class-based dark mode system. Currently, dark mode is handled by passing a darkMode prop to every component and using conditional classes. This should be replaced with Tailwind's dark: variant system where the dark class is set once at the top level (document.documentElement).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 The dark class is set on document.documentElement when dark mode is enabled
- [x] #2 No components receive darkMode prop except DarkModeToggle (for icon state)
- [x] #3 All components use Tailwind dark: variants instead of conditional classes
- [x] #4 Dark mode toggle continues to work correctly
- [x] #5 Dark mode preference persists across page refreshes
- [x] #6 All components render correctly in both light and dark modes
- [x] #7 App.jsx background gradient uses dark: variant
- [x] #8 ErrorDialog uses dark: variants for all styling
- [x] #9 UpdateNotification uses dark: variants for all styling
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Migration Plan

### 1. Update CSS Configuration (base.css)
Add custom dark variant configuration to support manual toggling:
```css
@custom-variant dark (&:where(.dark, .dark *));
```

### 2. Move Dark Class Management to Document Root
- Modify the dark mode effect in App.jsx to set/remove the `dark` class on `document.documentElement` instead of just storing state
- Keep the darkMode state for toggle button UI, but ensure it syncs with the document class

### 3. Remove darkMode Props from All Components
Components that currently receive darkMode prop:
- UpdateNotification
- ErrorDialog
- DarkModeToggle (keep prop for icon display)

### 4. Update Component Styling
Components already using dark: variants (no changes needed):
- TodoItem.jsx ✓ (already uses dark: variants)
- TodoInput.jsx ✓ (already uses dark: variants)

Components that need darkMode prop removed and conditionals simplified:
- **App.jsx**: Remove conditional classes on lines 307-314, replace with dark: variants
- **ErrorDialog.jsx**: Remove darkMode prop, use dark: variants instead of conditionals
- **UpdateNotification.jsx**: Remove darkMode prop, use dark: variants instead of conditionals

### 5. Update DarkModeToggle Component
Keep darkMode prop for icon state, but remove from className (use dark: variant instead)

### 6. Testing
- Test dark/light mode toggle works correctly
- Verify all components render properly in both modes
- Check that preference persists across page refreshes
- Test in different browsers

## Key Benefits
- Cleaner component APIs (no darkMode prop drilling)
- More maintainable code (standard Tailwind pattern)
- Better performance (CSS-based instead of JS conditionals)
- Easier to add new dark mode styles in the future
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
## Implementation Summary

### Changes Made:

1. **base.css** - Added `@custom-variant dark (&:where(.dark, .dark *));` for manual dark mode toggling

2. **App.jsx**:
   - Added document.documentElement dark class management in useEffect (lines 64-69)
   - Replaced conditional background gradients with dark: variants (line 314)
   - Replaced conditional card background with dark: variants (line 315)
   - Replaced conditional h1 color with dark: variant (line 318)
   - Replaced conditional link colors with dark: variants (line 325)
   - Replaced conditional version text color with dark: variant (line 365)
   - Removed darkMode prop from UpdateNotification and ErrorDialog components

3. **ErrorDialog.jsx**:
   - Removed darkMode prop from component signature
   - Replaced all conditional classes with dark: variants
   - Modal background, text colors, and action steps section now use dark: variants

4. **UpdateNotification.jsx**:
   - Removed darkMode prop from component signature  
   - Replaced all conditional classes with dark: variants
   - Notification background, border, text, and dismiss button now use dark: variants

5. **DarkModeToggle.jsx** - Already using dark: variants correctly, no changes needed

### Components Already Using dark: Variants:
- TodoItem.jsx ✓
- TodoInput.jsx ✓
- DarkModeToggle.jsx ✓

### Build Status:
✓ Frontend build successful
✓ All dark mode styling now uses Tailwind's class-based system
✓ Dark class managed at document.documentElement level
<!-- SECTION:NOTES:END -->
