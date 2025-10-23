---
id: task-10
title: >-
  When adding or modifying todos, save the Todos to the backend. On the backend
  keep them in memory.
status: Done
assignee: []
created_date: '2025-10-23 19:02'
updated_date: '2025-10-23 19:11'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Currently, todos are managed differently on frontend vs backend:
- **Frontend** ([App.jsx](frontend/src/App.jsx#L47-L92)): Adds, modifies, and deletes todos in local React state only (no localStorage anymore after backend integration)
- **Backend** ([TodoController.kt](backend/src/main/kotlin/com/todoapp/controller/TodoController.kt#L13-L18)): Returns hardcoded todos via GET endpoint only

This task implements full CRUD operations with in-memory backend storage, so todo changes persist across the app session and are synchronized between frontend and backend.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Backend stores todos in memory (mutable list in TodoController)
- [x] #2 POST /api/todos endpoint creates new todos
- [x] #3 PUT /api/todos/{id} endpoint updates existing todos (toggle completion, edit text)
- [x] #4 DELETE /api/todos/{id} endpoint deletes individual todos
- [x] #5 DELETE /api/todos endpoint deletes all todos
- [x] #6 Frontend calls backend API for all todo operations (add, toggle, delete, deleteAll, markAll)
- [x] #7 Frontend updates local state after successful backend operations
- [x] #8 Error handling for failed backend requests (show error dialog)
- [x] #9 Drag and drop reordering persists to backend
- [x] #10 Backend validates max 4 todos limit
- [x] #11 ID generation handled by backend (auto-increment or timestamp)
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### Backend Changes

#### 1. Create TodoService for Business Logic
Create `backend/src/main/kotlin/com/todoapp/service/TodoService.kt`:
- Maintain in-memory mutable list of todos: `private val todos = mutableListOf<Todo>()`
- Initialize with sample data
- Methods:
  - `getAllTodos(): List<Todo>` - Return all todos
  - `addTodo(text: String): Todo` - Create new todo with auto-increment ID
  - `updateTodo(id: Long, text: String?, completed: Boolean?): Todo?` - Update todo
  - `deleteTodo(id: Long): Boolean` - Delete by ID
  - `deleteAllTodos()` - Clear all todos
  - `reorderTodos(orderedIds: List<Long>)` - Handle drag & drop reordering
- Enforce MAX_TODOS = 4 validation
- Thread-safe operations with synchronized blocks

#### 2. Update TodoController REST Endpoints
Update [TodoController.kt](backend/src/main/kotlin/com/todoapp/controller/TodoController.kt):
- Inject TodoService
- **GET /api/todos** - Get all todos (already exists, use service)
- **POST /api/todos** - Create todo
  - Request body: `{ "text": "..." }`
  - Returns created Todo with generated ID
  - Returns 400 if max limit reached
- **PUT /api/todos/{id}** - Update todo
  - Request body: `{ "text": "...", "completed": true/false }`
  - Returns updated Todo or 404
- **DELETE /api/todos/{id}** - Delete todo by ID
  - Returns 204 No Content or 404
- **DELETE /api/todos** - Delete all todos
  - Returns 204 No Content
- **PUT /api/todos/reorder** - Reorder todos
  - Request body: `{ "orderedIds": [3, 1, 2, 4] }`
  - Returns 204 No Content

#### 3. Create Request/Response DTOs
Create `backend/src/main/kotlin/com/todoapp/dto/`:
- `CreateTodoRequest.kt` - `data class CreateTodoRequest(val text: String)`
- `UpdateTodoRequest.kt` - `data class UpdateTodoRequest(val text: String?, val completed: Boolean?)`
- `ReorderRequest.kt` - `data class ReorderRequest(val orderedIds: List<Long>)`

#### 4. Update Todo Model (if needed)
Check if [Todo.kt](backend/src/main/kotlin/com/todoapp/model/Todo.kt) needs to be mutable:
- Consider making `data class Todo` mutable or creating copy methods
- Or use immutable pattern with copy() function

### Frontend Changes

#### 5. Create API Service Module
Create `frontend/src/services/todoApi.js`:
- Centralize all backend API calls
- Functions:
  - `fetchTodos()` - GET /api/todos
  - `createTodo(text)` - POST /api/todos
  - `updateTodo(id, updates)` - PUT /api/todos/{id}
  - `deleteTodo(id)` - DELETE /api/todos/{id}
  - `deleteAllTodos()` - DELETE /api/todos
  - `reorderTodos(orderedIds)` - PUT /api/todos/reorder
- Error handling wrapper with consistent error format

#### 6. Update App.jsx Todo Operations
Update [App.jsx](frontend/src/App.jsx):
- **addTodo()** (line 47):
  - Call `createTodo(text)` API
  - Update state with returned todo
  - Show error dialog if fails
- **toggleTodo(id)** (line 70):
  - Find current todo
  - Call `updateTodo(id, { completed: !todo.completed })`
  - Update state with returned todo
  - Revert on error
- **deleteTodo(id)** (line 76):
  - Call `deleteTodo(id)` API
  - Remove from state on success
  - Show error on failure
- **deleteAll()** (line 80):
  - Call `deleteAllTodos()` API
  - Clear state on success
- **markAllComplete/Incomplete()** (lines 86-92):
  - Call `updateTodo(id, { completed: true/false })` for each todo
  - Use Promise.all() for batch updates
  - Update state after all succeed
- **handleDragEnd()** - New: persist reorder
  - Call `reorderTodos(orderedIds)` API
  - Keep optimistic UI update

#### 7. Enhanced Error Handling
- Expand ErrorDialog usage for all failed operations
- Add loading states during API calls
- Optimistic UI updates with rollback on error
- Generic error handler for network failures

#### 8. Remove localStorage Persistence
- Remove any localStorage save logic (no longer needed)
- Backend is now source of truth

### Testing Plan

#### 9. Backend Testing
- Test each endpoint with curl or Postman
- Verify in-memory storage persists during session
- Test max 4 todos validation
- Test error responses (404, 400)

#### 10. Frontend Testing
- Test add todo with backend running
- Test toggle completion syncs to backend
- Test delete todo removes from backend
- Test delete all clears backend
- Test drag & drop reordering persists
- Test error dialog appears when backend fails
- Test max limit enforced by backend

#### 11. Integration Testing
- Start fresh backend, verify initial 3 todos load
- Perform CRUD operations, verify persistence
- Stop backend, verify error dialogs
- Restart backend, verify todos are reset (in-memory)
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
## Implementation Summary

### Backend Implementation

**1. DTOs Created** ([backend/src/main/kotlin/com/todoapp/dto/](backend/src/main/kotlin/com/todoapp/dto/))
- `CreateTodoRequest.kt` - For POST requests with text field
- `UpdateTodoRequest.kt` - For PUT requests with optional text and completed fields
- `ReorderRequest.kt` - For reordering with orderedIds array

**2. TodoService** ([backend/src/main/kotlin/com/todoapp/service/TodoService.kt](backend/src/main/kotlin/com/todoapp/service/TodoService.kt))
- In-memory storage with mutableListOf<Todo>
- Initialized with 3 sample todos
- Auto-increment ID generation (starting at 4)
- Thread-safe operations with @Synchronized
- MAX_TODOS = 4 validation
- Methods: getAllTodos(), addTodo(), updateTodo(), deleteTodo(), deleteAllTodos(), reorderTodos()

**3. TodoController Updated** ([backend/src/main/kotlin/com/todoapp/controller/TodoController.kt](backend/src/main/kotlin/com/todoapp/controller/TodoController.kt))
- GET /api/todos - Returns all todos
- POST /api/todos - Creates new todo (201 Created or 400 Bad Request)
- PUT /api/todos/{id} - Updates todo (200 OK or 404 Not Found)
- DELETE /api/todos/{id} - Deletes todo (204 No Content or 404 Not Found)
- DELETE /api/todos - Deletes all todos (204 No Content)
- PUT /api/todos/reorder - Reorders todos (204 No Content or 400 Bad Request)

### Frontend Implementation

**4. API Service Module** ([frontend/src/services/todoApi.js](frontend/src/services/todoApi.js))
- Centralized API layer with all backend calls
- Functions: fetchTodos(), createTodo(), updateTodo(), deleteTodo(), deleteAllTodos(), reorderTodos()
- Consistent error handling with descriptive messages
- Base URL: http://localhost:8080/api/todos

**5. App.jsx Updated** ([frontend/src/App.jsx](frontend/src/App.jsx))
- All CRUD operations now call backend API
- **addTodo()** - Calls createTodo() API, updates state with returned todo
- **toggleTodo()** - Optimistic update with rollback on error
- **deleteTodo()** - Optimistic update with rollback on error
- **deleteAll()** - Optimistic update with rollback on error
- **markAllComplete/Incomplete()** - Batch updates with Promise.all(), rollback on error
- **handleDragEnd()** - Persists reorder to backend via reorderTodos()
- Error alerts for failed operations

### Testing Results

**Backend Endpoint Tests (curl):**
✅ GET /api/todos - Returns 3 initial todos
✅ POST /api/todos - Creates todo with ID 4
✅ POST /api/todos (5th) - Returns 400 with "Maximum of 4 todos allowed"
✅ PUT /api/todos/1 - Updates completed status to true
✅ DELETE /api/todos/4 - Returns 204 No Content
✅ PUT /api/todos/reorder - Reorders to [3,2,1], returns 204
✅ GET /api/todos - Confirms new order [3,2,1]

**Frontend Integration:**
✅ Frontend dev server running on http://localhost:3000
✅ Backend running on http://localhost:8080
✅ Hot module replacement working
✅ All changes compiled successfully

### Key Features Delivered

1. **In-Memory Persistence** - Todos persist in backend memory during session
2. **Full CRUD Operations** - Create, read, update, delete all working
3. **Max 4 Todos Validation** - Enforced by backend with proper error response
4. **Backend ID Generation** - Auto-increment starting from 4
5. **Optimistic UI Updates** - Immediate feedback with error rollback
6. **Drag & Drop Persistence** - Reordering saved to backend
7. **Error Handling** - User-friendly alerts for failed operations
8. **Thread Safety** - Synchronized methods prevent race conditions
9. **RESTful API** - Proper HTTP methods and status codes
10. **Batch Operations** - markAll functions use Promise.all() for efficiency

### How to Test

1. **Frontend**: Open http://localhost:3000 in browser
2. **Backend**: Running on http://localhost:8080
3. **Try operations:**
   - Add todos (up to 4)
   - Toggle completion status
   - Delete individual todos
   - Mark all complete/incomplete
   - Drag and drop to reorder
   - Delete all todos
4. **Verify persistence:** Changes sync across page refresh
5. **Test limits:** Try adding 5th todo (should show alert)
<!-- SECTION:NOTES:END -->
