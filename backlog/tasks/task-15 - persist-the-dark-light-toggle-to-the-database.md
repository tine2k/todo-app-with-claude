---
id: task-15
title: persist the dark light toggle to the database
status: Done
assignee: []
created_date: '2025-10-23 20:00'
updated_date: '2025-10-23 20:12'
labels: []
dependencies: []
---

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### 1. Database Layer
- Create `UserPreferencesTable` in backend
  - Columns: id (primary key), darkMode (boolean), updatedAt (timestamp)
  - Use single row (id=1) for global preferences (no user auth yet)
  - Initialize with SchemaUtils on application startup

### 2. Backend API Layer
- Create data model: `UserPreferences.kt`
- Create repository layer:
  - `UserPreferencesRepository.kt` (interface)
  - `UserPreferencesRepositoryImpl.kt` (Exposed implementation)
- Create service: `UserPreferencesService.kt`
- Create controller: `UserPreferencesController.kt`
  - `GET /api/preferences` - Get current preferences
  - `PUT /api/preferences` - Update preferences (accepts { darkMode: boolean })
- Update `DatabaseConfig.kt` to initialize preferences table

### 3. Frontend API Integration
- Update `frontend/src/services/todoApi.js`:
  - Add `fetchPreferences()` function
  - Add `updatePreferences(darkMode)` function
  - Add error handling and offline support

### 4. Frontend UI Integration
- Update `frontend/src/App.jsx`:
  - Replace localStorage-only dark mode with backend API calls
  - Load preferences from backend on mount
  - Save dark mode changes to backend
  - Keep localStorage as fallback for offline/error scenarios
  - Implement graceful degradation if backend unavailable

### 5. Migration Strategy
- Keep localStorage integration as fallback
- On first load, try backend, fallback to localStorage
- Sync localStorage to backend when online
- Handle backend connection errors gracefully

### 6. Testing
- Manual testing:
  - Toggle dark mode → verify saved to database
  - Refresh page → verify preference persists
  - Stop backend → verify localStorage fallback works
  - Restart backend → verify syncs back to database
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
## Implementation Summary

### Backend Changes
Created the following files:
- `backend/src/main/kotlin/com/todoapp/database/UserPreferencesTable.kt` - Database schema
- `backend/src/main/kotlin/com/todoapp/model/UserPreferences.kt` - Data model
- `backend/src/main/kotlin/com/todoapp/repository/UserPreferencesRepository.kt` - Repository interface
- `backend/src/main/kotlin/com/todoapp/repository/UserPreferencesRepositoryImpl.kt` - Repository implementation
- `backend/src/main/kotlin/com/todoapp/service/UserPreferencesService.kt` - Service layer
- `backend/src/main/kotlin/com/todoapp/dto/UpdatePreferencesRequest.kt` - DTO for updates
- `backend/src/main/kotlin/com/todoapp/controller/UserPreferencesController.kt` - REST API controller

Updated:
- `backend/src/main/kotlin/com/todoapp/database/DatabaseConfig.kt` - Added UserPreferencesTable initialization

### Frontend Changes
Updated:
- `frontend/src/services/todoApi.js` - Added fetchPreferences() and updatePreferences() functions
- `frontend/src/App.jsx` - Updated dark mode state management to use backend API with localStorage fallback

### Testing Results
- ✅ Backend API endpoints working correctly:
  - GET /api/preferences returns current preferences
  - PUT /api/preferences successfully updates preferences
  - Preferences persist across server restarts (stored in database)
- ✅ Frontend loads dark mode preference from backend on mount
- ✅ Frontend saves dark mode changes to backend
- ✅ localStorage used as fallback when backend is unavailable
- ✅ Both backend and frontend running successfully

### URLs
- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- Preferences API: http://localhost:8080/api/preferences
<!-- SECTION:NOTES:END -->
