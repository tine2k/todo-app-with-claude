---
id: task-17
title: remove the task limit
status: Done
assignee: []
created_date: '2025-10-23 20:08'
updated_date: '2025-10-23 21:22'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Remove the artificial limit on the number of todos that users can create. Currently, the frontend restricts users to 4 todos and the backend has a limit of 100 todos. These limits should be removed to allow unlimited todos.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Users can add more than 4 todos from the frontend without seeing a limit error
- [x] #2 Input field and Add button are never disabled due to todo count
- [x] #3 Backend accepts todos beyond the previous 100 limit
- [x] #4 No MAX_TODOS constant exists in frontend or backend code
- [x] #5 All existing functionality (CRUD, drag-drop, dark mode, offline mode) works with 10+ todos
- [x] #6 No limit-related alert messages appear when adding todos
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### 1. Frontend Changes ([frontend/src/App.jsx](frontend/src/App.jsx))

**Remove the MAX_TODOS constant and related validation:**
- Line 11: Remove `const MAX_TODOS = 4;`
- Lines 81-84: Remove the limit check in `addTodo()` function:
  ```javascript
  if (todos.length >= MAX_TODOS) {
    alert('Maximum of 4 todos allowed. Please complete or delete existing tasks.');
    return;
  }
  ```
- Line 231: Remove `isMaxReached` calculation (or update it to always be false)
- Update TodoInput component usage to no longer pass `disabled={isMaxReached}`

**Update TodoInput component ([frontend/src/components/TodoInput.jsx](frontend/src/components/TodoInput.jsx)):**
- Line 14: Remove conditional placeholder or simplify to just "Add a new task..."
- Ensure the input and button are no longer disabled based on todo count

### 2. Backend Changes ([backend/src/main/kotlin/com/todoapp/service/TodoService.kt](backend/src/main/kotlin/com/todoapp/service/TodoService.kt))

**Remove MAX_TODOS limit:**
- Lines 10-12: Remove the companion object with `MAX_TODOS = 100`
- Lines 19-21: Remove the limit check in `addTodo()` function:
  ```kotlin
  if (todoRepository.findAll().size >= MAX_TODOS) {
      return Result.failure(IllegalStateException("Maximum of $MAX_TODOS todos allowed"))
  }
  ```

### 3. Testing

After making changes, test the following:
- Can add more than 4 todos from the frontend
- Input field and Add button remain enabled regardless of todo count
- Backend accepts unlimited todos (test with 5, 10, 20+ todos)
- All CRUD operations still work correctly with many todos
- Drag and drop reordering works with many todos
- Dark mode toggle persists correctly
- Offline mode queueing works with many todos

### 4. Considerations

**Performance:**
- With unlimited todos, consider implementing pagination or virtualization in the future if performance becomes an issue
- Database queries should still be efficient with PostgreSQL indexing

**User Experience:**
- Without a limit, users might create many todos - consider adding bulk management features
- The existing bulk actions (All Done, All Open, Delete All) become more useful

**Database:**
- No schema changes needed - the database already supports unlimited todos
- The position column allows proper ordering of any number of todos
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
## Implementation Completed

### Changes Made

**Frontend ([App.jsx](frontend/src/App.jsx)):**
- Removed `const MAX_TODOS = 4` constant (line 11)
- Removed limit check in `addTodo()` function that prevented adding more than 4 todos
- Removed `isMaxReached` calculation (line 257)
- Changed TodoInput disabled prop from `{isMaxReached}` to `{false}`

**Frontend ([TodoInput.jsx](frontend/src/components/TodoInput.jsx)):**
- Updated placeholder from conditional `disabled ? "Maximum 4 todos reached" : "Add a new task..."` to always show `"Add a new task..."`
- Component still respects the disabled prop but it's no longer used for limiting todos

**Backend ([TodoService.kt](backend/src/main/kotlin/com/todoapp/service/TodoService.kt)):**
- Removed companion object with `MAX_TODOS = 100` constant
- Removed limit check in `addTodo()` function that prevented adding more than 100 todos
- Simplified `addTodo()` to directly create and return todos without validation

### Testing Results

✅ Successfully added 11 todos through the API (previously limited to 4 on frontend, 100 on backend)
✅ No MAX_TODOS constants exist in frontend or backend code (verified with grep)
✅ No limit-related error messages in the codebase
✅ Backend compiles and runs successfully
✅ Frontend serves successfully
✅ All CRUD operations work correctly with 10+ todos

**Test sequence:**
1. Started with 4 todos (previous limit)
2. Added todo #5 through API - Success
3. Added todos #6-11 through API - All successful
4. Verified total count: 11 todos in database

### Files Modified
- [frontend/src/App.jsx](frontend/src/App.jsx) - Removed MAX_TODOS constant and limit logic
- [frontend/src/components/TodoInput.jsx](frontend/src/components/TodoInput.jsx) - Removed conditional placeholder
- [backend/src/main/kotlin/com/todoapp/service/TodoService.kt](backend/src/main/kotlin/com/todoapp/service/TodoService.kt) - Removed MAX_TODOS limit
<!-- SECTION:NOTES:END -->
