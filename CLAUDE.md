# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A React todo application with localStorage persistence and Tailwind CSS styling. Built with Vite for modern development and optimized production builds.

## Project Structure

```
todo-app/
├── src/
│   ├── components/
│   │   ├── BulkActionButton.jsx  # Reusable button for bulk actions
│   │   ├── BulkActions.jsx       # Bulk action buttons container
│   │   ├── Icons.jsx              # SVG icon components
│   │   ├── TodoInput.jsx          # Input field and Add button
│   │   └── TodoItem.jsx           # Individual todo item component
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # React entry point
│   ├── index.html        # HTML entry point
│   └── base.css          # Tailwind CSS base file
├── dist/                 # Production build output (gitignored)
├── tests/                # Test files (empty)
├── vite.config.mjs       # Vite build configuration with React plugin
├── tailwind.config.js    # Tailwind CSS v4 configuration
├── postcss.config.cjs    # PostCSS configuration for Tailwind
├── package.json          # Project configuration
└── CLAUDE.md            # This file
```

## Development Commands

- `npm run dev` - Start Vite development server on port 3000 with hot module replacement
- `npm run build` - Build for production (outputs to `dist/` directory)
- `npm run preview` - Preview production build locally
- `npm test` - Run tests (not yet configured)

## Build System

The project uses Vite as the build tool with React and integrated Tailwind CSS:
- **Development**: Fast HMR (Hot Module Replacement) with Vite dev server and React Fast Refresh
- **Production**: Optimized bundle with code splitting and minification
- **Module System**: ES modules with JSX support via `@vitejs/plugin-react`
- **CSS Processing**: Tailwind CSS v4 via PostCSS with `@tailwindcss/postcss` plugin
  - Source: `src/input.css` (contains Tailwind import directive)
  - Built automatically by Vite during development and production builds
  - Supports full Tailwind feature set with proper purging

## Dependencies

### Core Dependencies
- **react** (^19.2.0) - React library
- **react-dom** (^19.2.0) - React DOM rendering

### Dev Dependencies
- **@vitejs/plugin-react** (^5.0.4) - Vite plugin for React with Fast Refresh
- **vite** (^7.1.9) - Build tool and dev server
- **tailwindcss** (^4.1.14) - Utility-first CSS framework
- **@tailwindcss/postcss** (^4.1.14) - PostCSS plugin for Tailwind v4
- **postcss** (^8.5.6) - CSS processor
- **autoprefixer** (^10.4.21) - Vendor prefix automation

## Architecture

### Component Hierarchy

```
App (src/App.jsx)
├── TodoItem (for each todo)
│   └── TrashIcon
├── BulkActions (conditionally rendered)
│   ├── BulkActionButton (All Done)
│   │   └── CheckCircleIcon
│   ├── BulkActionButton (All Open)
│   │   └── PauseCircleIcon
│   └── BulkActionButton (Delete All)
│       └── TrashIcon
└── TodoInput
    └── PlusIcon
```

### Main Application Component (src/App.jsx)

The main application uses React hooks for state management:

**State:**
- `todos` - Array of todo objects (useState)
- `inputValue` - Current input field value (useState)

**Effects:**
- Load todos from localStorage on mount (useEffect)
- Save todos to localStorage whenever they change (useEffect)

**Functions:**
- `addTodo()` - Creates new todo items (validates non-empty input)
- `toggleTodo(id)` - Toggles todo completion status
- `deleteTodo(id)` - Removes individual todos
- `deleteAll()` - Clears all todos (with confirmation dialog)
- `markAllComplete()` - Sets all todos to completed: true
- `markAllIncomplete()` - Sets all todos to completed: false

### Component Details

#### BulkActionButton (src/components/BulkActionButton.jsx)
Generic button component for bulk actions with variant support:
- **Props**: `onClick`, `variant` (success/info/danger), `icon`, `children`
- **Variants**: success (green), info (blue), danger (red)
- Automatically applies proper icon sizing and flex-shrink-0

#### BulkActions (src/components/BulkActions.jsx)
Container for bulk action buttons:
- All Done - Marks all todos as complete
- All Open - Marks all todos as incomplete
- Delete All - Clears all todos (with confirmation)
- Only rendered when `todos.length > 0`

#### TodoItem (src/components/TodoItem.jsx)
Individual todo item component:
- **Props**: `todo` (object), `onToggle` (function), `onDelete` (function)
- Checkbox for toggling completion
- Text with line-through when completed
- Delete button with trash icon

#### TodoInput (src/components/TodoInput.jsx)
Input section component:
- **Props**: `value`, `onChange`, `onSubmit`
- Text input with purple focus border
- Add button with plus icon
- Supports Enter key to submit

#### Icons (src/components/Icons.jsx)
Reusable SVG icon components:
- `CheckCircleIcon` - Checkmark in circle (All Done)
- `PauseCircleIcon` - Pause symbol in circle (All Open)
- `TrashIcon` - Trash can (Delete buttons)
- `PlusIcon` - Plus symbol (Add button)

### Data Model

Todos are stored as objects with:
- `id` - Timestamp-based unique identifier (Date.now())
- `text` - Todo description string
- `completed` - Boolean completion status

### Storage

All todos are persisted in localStorage under the key `'todos'` as a JSON string.

## React Patterns Used

- **Functional Components** - All components use function syntax
- **Hooks**:
  - `useState` - State management for todos and input value
  - `useEffect` - Side effects for localStorage sync
- **Props** - Pass data and callbacks between components
- **Controlled Components** - Input value controlled by React state
- **Conditional Rendering** - Show/hide bulk actions based on todo count
- **Event Handlers** - onClick, onChange, onKeyPress
- **Component Composition** - Break down UI into reusable pieces
- **cloneElement** - Dynamically add props to icon components

## Styling

- **Tailwind CSS v4** - Utility-first CSS framework
- **Color Scheme**:
  - Purple gradient background (from-purple-600 to-purple-900)
  - Green for success actions (All Done)
  - Blue for info actions (All Open)
  - Red for destructive actions (Delete)
  - Purple for primary actions (Add)
- **Responsive Design** - Mobile-friendly with proper padding and spacing
- **Hover Effects** - Smooth transitions on all interactive elements
- **Icon Sizing** - Consistent w-4 h-4 for bulk buttons, w-5 h-5 for Add button
- **Typography** - System font stack for optimal performance
