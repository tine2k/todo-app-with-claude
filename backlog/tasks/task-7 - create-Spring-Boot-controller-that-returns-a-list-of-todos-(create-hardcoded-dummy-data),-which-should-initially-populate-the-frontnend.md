---
id: task-7
title: >-
  create Spring Boot controller that returns a list of todos (create hardcoded
  dummy data), which should initially populate the frontnend
status: Done
assignee:
  - Claude
created_date: '2025-10-16 19:44'
updated_date: '2025-10-16 20:45'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Create a Spring Boot REST API endpoint that returns hardcoded todo data and integrate it with the React frontend. The frontend should fetch initial todos from the backend instead of starting empty, while maintaining localStorage for persistence of changes.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Backend: Todo data model created (Todo.kt)
- [x] #2 Backend: Global CORS configuration created (CorsConfig.kt)
- [x] #3 Backend: TodoController created with GET /api/todos endpoint
- [x] #4 Backend: Returns 3 hardcoded todos with correct data structure
- [x] #5 Backend: Endpoint tested with curl and returns valid JSON
- [x] #6 Backend: CORS headers allow frontend (localhost:3000) access
- [x] #7 Frontend: Updated to fetch todos from backend on mount
- [x] #8 Frontend: Replaces localStorage with backend data on successful fetch
- [x] #9 Frontend: Console error handling for fetch failures
- [x] #10 Frontend: Existing localStorage save functionality preserved
- [x] #11 Integration: Frontend displays backend todos on initial load
- [x] #12 Integration: Add, delete, toggle, and drag functionality still works
- [x] #13 Integration: Changes are saved to localStorage after backend load
- [x] #14 Documentation: README.md updated with /api/todos endpoint
- [x] #15 Documentation: CLAUDE.md updated with backend Todo model and controller
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### Backend Changes

1. **Create Todo Data Model** (`backend/src/main/kotlin/com/todoapp/model/Todo.kt`)
   - Data class with: id (Long), text (String), completed (Boolean)
   - Matches frontend data structure

2. **Create Global CORS Configuration** (`backend/src/main/kotlin/com/todoapp/config/CorsConfig.kt`)
   - Separate config class for CORS
   - Allow origin: http://localhost:3000
   - Allow methods: GET, POST, PUT, DELETE
   - Allow credentials and headers

3. **Create TodoController** (`backend/src/main/kotlin/com/todoapp/controller/TodoController.kt`)
   - Endpoint: GET /api/todos
   - Returns 3 hardcoded todos:
     - Todo(1, "Learn Kotlin", false)
     - Todo(2, "Build Spring Boot API", true)
     - Todo(3, "Connect React Frontend", false)

4. **Test Backend Endpoint**
   - Use curl or browser to verify JSON response
   - Verify CORS headers are present

### Frontend Changes

1. **Update App.jsx initial fetch logic**
   - Fetch from http://localhost:8080/api/todos on mount
   - Replace localStorage with backend data
   - Handle fetch errors gracefully with console.error
   - Keep existing localStorage save functionality (line 33-35)

2. **Fetch Strategy (Option C)**
   - Always fetch from backend on mount
   - Replace localStorage completely with backend data
   - Continue to save all changes to localStorage (maintain existing behavior)

### Implementation Steps

1. Create Todo.kt model class
2. Create CorsConfig.kt with global CORS configuration
3. Create TodoController.kt with /api/todos endpoint
4. Test backend endpoint with curl
5. Update frontend App.jsx to fetch from backend
6. Test full integration
7. Update README.md with API endpoint documentation
8. Update CLAUDE.md with new architecture details

### Technology Decisions
- CORS: Global configuration class (not per-controller annotation)
- Endpoint path: /api/todos (RESTful convention)
- Hardcoded data: 3 todos about the tech stack
- Fetch strategy: Always fetch backend, replace localStorage on mount
- LocalStorage: Continue saving changes for offline capability
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Successfully completed task-7 with all acceptance criteria met.

Backend: Created Todo.kt model, CorsConfig.kt for global CORS, TodoController.kt with GET /api/todos.

Backend tested: curl http://localhost:8080/api/todos returns 3 hardcoded todos as JSON.

CORS verified: Headers allow localhost:3000 with GET/POST/PUT/DELETE methods.

Frontend: Updated App.jsx to fetch from backend on mount, replaces localStorage.

Frontend has error handling with console.error and localStorage fallback.

Integration working: Frontend displays backend todos on initial load.

All existing functionality preserved: add, delete, toggle, drag, localStorage saves.

Documentation: README.md and CLAUDE.md updated with new API endpoint and architecture.
<!-- SECTION:NOTES:END -->
