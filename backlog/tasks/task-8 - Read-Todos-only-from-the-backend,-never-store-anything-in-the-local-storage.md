---
id: task-8
title: 'Read Todos only from the backend, never store anything in the local storage'
status: Completed
assignee: []
created_date: '2025-10-23 18:49'
completed_date: '2025-10-23 20:54'
labels: []
dependencies: []
---

## Implementation Summary

Task completed: Removed all localStorage interactions for todos from the frontend, making the app read-only from the backend.

## Implementation Plan (Completed)

### Approach
Selected **Option A: Read-Only Display** - Remove localStorage interactions without building full backend CRUD.

### Changes Made

#### 1. Removed localStorage save effect
**File**: `frontend/src/App.jsx` (lines 43-46, now removed)
- Deleted the `useEffect` hook that saved todos to localStorage whenever they changed
- This prevents any todo modifications from being persisted to localStorage

#### 2. Removed localStorage fallback
**File**: `frontend/src/App.jsx` (lines 27-31, modified to 25-27)
- Removed the localStorage fallback logic from the backend fetch error handler
- Now only logs errors to console instead of falling back to localStorage
- If backend is unavailable, app shows empty todo list

### Result

The application now:
- **Fetches todos from backend** on initial page load (3 hardcoded todos from `TodoController.kt`)
- **Never persists todos to localStorage** - all changes are temporary and exist only in memory during the session
- **Resets to backend state** on every page refresh
- **Still persists dark mode preference** in localStorage (unchanged - this is UI preference, not data)

### Testing Verification

1. ✅ Page loads → displays 3 backend todos ("Learn Kotlin", "Build Spring Boot API", "Connect React Frontend")
2. ✅ User can add/toggle/delete todos → works in UI (in-memory state)
3. ✅ Page refresh → todos reset to the 3 original backend todos (changes not persisted)
4. ✅ Dark mode toggle → persists across refreshes (uses localStorage as intended for UI preferences)

### Technical Details

**Servers Running:**
- Frontend (Vite): `http://localhost:3000/`
- Backend (Spring Boot): `http://localhost:8080/`

**API Endpoint Used:**
- `GET /api/todos` - Returns hardcoded list from backend

**Files Modified:**
- `frontend/src/App.jsx` - Removed 2 sections related to todo localStorage (7 lines removed total)

### Future Enhancements (Not in Scope)

To make todo changes persist, the backend would need:
- POST `/api/todos` - Create new todo
- PUT `/api/todos/:id` - Update todo (toggle completion)
- DELETE `/api/todos/:id` - Delete todo
- In-memory storage or database persistence layer
- Frontend updates to call these APIs instead of direct state mutations

