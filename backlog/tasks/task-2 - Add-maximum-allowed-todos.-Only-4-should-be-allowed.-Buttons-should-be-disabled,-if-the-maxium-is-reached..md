---
id: task-2
title: >-
  Add maximum allowed todos. Only 4 should be allowed. Buttons should be
  disabled, if the maxium is reached.
status: Done
assignee: []
created_date: '2025-10-14 19:02'
updated_date: '2025-10-14 20:00'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Implement a maximum limit of 4 todos in the application. When the limit is reached, disable the Add button in the TodoInput component and prevent adding new todos. Provide user feedback about the limit.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Maximum of 4 todos can be added to the list
- [x] #2 Add button is disabled when 4 todos exist
- [x] #3 Input field is disabled when 4 todos exist
- [x] #4 User receives clear feedback (alert) when trying to add more than 4 todos
- [x] #5 Disabled state has appropriate visual styling (reduced opacity, cursor change)
- [x] #6 After deleting a todo, Add button becomes enabled again
- [x] #7 Disabled state works correctly in both light and dark modes
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### 1. Define Maximum Todo Constant
- Add a constant `MAX_TODOS = 4` at the top of [App.jsx](src/App.jsx)
- This makes it easy to adjust the limit in the future

### 2. Update addTodo Function
- Modify the `addTodo` function in [App.jsx:39](src/App.jsx#L39)
- Add check: if `todos.length >= MAX_TODOS`, show alert and return early
- Alert message: "Maximum of 4 todos allowed. Please complete or delete existing tasks."

### 3. Calculate isMaxReached State
- In [App.jsx](src/App.jsx), calculate `isMaxReached = todos.length >= MAX_TODOS`
- Pass this value to TodoInput component

### 4. Update TodoInput Component
- Modify [TodoInput.jsx](src/components/TodoInput.jsx) to accept `disabled` prop
- Disable the input field when limit is reached
- Disable the Add button when limit is reached
- Add visual styling for disabled state (opacity, cursor-not-allowed)
- Update button and input classes to show disabled state

### 5. Add Visual Feedback
- When disabled, show reduced opacity on input and button
- Change cursor to not-allowed on hover
- Consider adding a tooltip or helper text showing "4/4 todos limit reached"

### 6. Testing
- Test that exactly 4 todos can be added
- Verify 5th todo cannot be added
- Check that alert message displays correctly
- Test that buttons are visually disabled
- Verify that deleting a todo re-enables the Add functionality
- Test in both light and dark modes
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
## Implementation Complete

Maximum todos limit has been successfully implemented with the following features:

### Files Modified:
- [src/App.jsx](src/App.jsx) - Added MAX_TODOS constant, limit check in addTodo function, and isMaxReached calculation
- [src/components/TodoInput.jsx](src/components/TodoInput.jsx) - Added disabled prop support with visual feedback

### Features Implemented:
1. **MAX_TODOS Constant** - Set to 4, defined at the top of App.jsx for easy configuration
2. **addTodo Validation** - Checks if todos.length >= MAX_TODOS before adding, shows alert if limit reached
3. **Alert Message** - "Maximum of 4 todos allowed. Please complete or delete existing tasks."
4. **Disabled State** - Input and Add button both disabled when limit is reached
5. **Visual Feedback**:
   - Input placeholder changes to "Maximum 4 todos reached"
   - Gray background and border for disabled input
   - Gray button with reduced opacity (60%)
   - cursor-not-allowed on both input and button
   - Works in both light and dark modes
6. **Enter Key Prevention** - Enter key disabled when limit is reached
7. **Dynamic Re-enabling** - Deleting a todo automatically re-enables the Add functionality

### Testing:
The implementation has been tested with:
- Adding 4 todos successfully
- Verifying 5th todo cannot be added
- Alert displays correctly when trying to exceed limit
- Visual disabled state appears in both light and dark modes
- Deleting a todo re-enables Add button
- Enter key respects disabled state

Dev server running at http://localhost:3000/
<!-- SECTION:NOTES:END -->
