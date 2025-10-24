# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A full-stack todo application with a React frontend and Spring Boot Kotlin backend. The frontend uses localStorage persistence and Tailwind CSS styling, built with Vite. The backend provides REST API capabilities with Spring Boot 3.x and Kotlin 2.x.

## Project Structure

```
todo-app/
├── frontend/             # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── BulkActionButton.jsx  # Reusable button for bulk actions
│   │   │   ├── BulkActions.jsx       # Bulk action buttons container
│   │   │   ├── Icons.jsx              # SVG icon components
│   │   │   ├── TodoInput.jsx          # Input field and Add button
│   │   │   └── TodoItem.jsx           # Individual todo item component
│   │   ├── App.jsx                    # Main application component
│   │   ├── main.jsx                   # React entry point
│   │   ├── index.html                 # HTML entry point
│   │   └── base.css                   # Tailwind CSS base file
│   ├── dist/                          # Production build output (gitignored)
│   ├── vite.config.mjs                # Vite build configuration
│   ├── tailwind.config.js             # Tailwind CSS v4 configuration
│   ├── postcss.config.cjs             # PostCSS configuration
│   └── package.json                   # Frontend dependencies
├── backend/              # Spring Boot Kotlin application
│   ├── src/main/
│   │   ├── kotlin/com/todoapp/
│   │   │   ├── TodoBackendApplication.kt  # Main application class
│   │   │   ├── model/
│   │   │   │   └── Todo.kt                # Todo data model
│   │   │   ├── database/
│   │   │   │   ├── TodoTable.kt           # Exposed table schema
│   │   │   │   └── DatabaseConfig.kt      # Database initialization
│   │   │   ├── repository/
│   │   │   │   ├── TodoRepository.kt      # Repository interface
│   │   │   │   └── TodoRepositoryImpl.kt  # Repository implementation
│   │   │   ├── service/
│   │   │   │   └── TodoService.kt         # Business logic
│   │   │   ├── config/
│   │   │   │   └── CorsConfig.kt          # CORS configuration
│   │   │   ├── controller/
│   │   │   │   ├── HealthController.kt    # Health check endpoint
│   │   │   │   └── TodoController.kt      # Todo API endpoints
│   │   │   └── dto/
│   │   │       ├── CreateTodoRequest.kt   # Create todo DTO
│   │   │       ├── UpdateTodoRequest.kt   # Update todo DTO
│   │   │       └── ReorderRequest.kt      # Reorder todos DTO
│   │   └── resources/
│   │       └── application.properties     # App configuration (port 8080, DB config)
│   ├── target/                        # Maven build output (gitignored)
│   ├── docker-compose.yml             # PostgreSQL database configuration
│   ├── pom.xml                        # Maven configuration
│   └── .gitignore                     # Backend-specific ignores
├── backlog/              # Task management (gitignored)
├── CLAUDE.md             # This file
└── README.md             # Project documentation
```

## Development Commands

### Frontend (from `frontend/` directory)
- `npm run dev` - Start Vite development server on port 3000 with hot module replacement
- `npm run build` - Build for production (outputs to `dist/` directory)
- `npm run preview` - Preview production build locally
- `npm test` - Run tests with Vitest

### Backend (from `backend/` directory)
- `docker compose up -d` - Start PostgreSQL database in Docker
- `docker compose down` - Stop PostgreSQL database
- `mvn spring-boot:run` - Start Spring Boot application on port 8080
- `mvn clean package` - Build JAR file (outputs to `target/` directory)
- `mvn test` - Run backend tests

**Note**: PostgreSQL database must be running before starting the Spring Boot application.

## Frontend Versioning

**CRITICAL**: Whenever you make ANY changes to the frontend code (components, styles, logic, etc.), you MUST increment the `APP_VERSION` constant.

- **Location**: [frontend/src/App.jsx](frontend/src/App.jsx) - exported constant at the top of the file
- **Format**: Semantic versioning (e.g., "1.0.0", "1.0.1", "1.1.0")
- **Purpose**: Triggers service worker updates and notifies users to reload for new features/fixes
- **When to update**:
  - Bug fixes → increment patch version (1.0.0 → 1.0.1)
  - New features → increment minor version (1.0.1 → 1.1.0)
  - Breaking changes → increment major version (1.1.0 → 2.0.0)

**Workflow**:
1. Make your frontend changes
2. Increment APP_VERSION in [App.jsx](frontend/src/App.jsx)
3. Build the application with `npm run build`
4. The service worker will detect the version change and prompt users to update

**Why this matters**: The PWA service worker caches all frontend assets. Without a version bump, users won't receive updates until they manually clear their cache. The APP_VERSION is displayed in the update notification to inform users what version they're updating to.

## Build Systems

### Frontend Build (Vite)
The frontend uses Vite as the build tool with React and integrated Tailwind CSS:
- **Development**: Fast HMR (Hot Module Replacement) with Vite dev server and React Fast Refresh
- **Production**: Optimized bundle with code splitting and minification
- **Module System**: ES modules with JSX support via `@vitejs/plugin-react`
- **CSS Processing**: Tailwind CSS v4 via PostCSS with `@tailwindcss/postcss` plugin
  - Source: `src/input.css` (contains Tailwind import directive)
  - Built automatically by Vite during development and production builds
  - Supports full Tailwind feature set with proper purging

### Backend Build (Maven)
The backend uses Maven for dependency management and building:
- **Build Tool**: Maven 3.6+
- **Compiler**: Kotlin Maven Plugin with spring-plugin for Spring Boot compatibility
- **Java Target**: Java 21
- **Kotlin Version**: 2.0.21
- **Packaging**: JAR file with embedded Tomcat server

## Dependencies

### Frontend Dependencies
**Core:**
- **react** (^19.2.0) - React library
- **react-dom** (^19.2.0) - React DOM rendering

**Dev:**
- **@vitejs/plugin-react** (^5.0.4) - Vite plugin for React with Fast Refresh
- **vite** (^7.1.9) - Build tool and dev server
- **vite-plugin-pwa** (^1.1.0) - PWA plugin for Vite with Workbox integration
- **workbox-window** (^7.3.0) - Service worker window library for update notifications
- **tailwindcss** (^4.1.14) - Utility-first CSS framework
- **@tailwindcss/postcss** (^4.1.14) - PostCSS plugin for Tailwind v4
- **postcss** (^8.5.6) - CSS processor
- **autoprefixer** (^10.4.21) - Vendor prefix automation

### Backend Dependencies
**Core:**
- **spring-boot-starter-web** (3.5.5) - Web application support with embedded Tomcat
- **spring-boot-starter-jdbc** (3.5.5) - JDBC support with HikariCP connection pool
- **kotlin-stdlib** (2.0.21) - Kotlin standard library
- **kotlin-reflect** (2.0.21) - Kotlin reflection library (required by Spring)
- **jackson-module-kotlin** - JSON serialization support for Kotlin

**Database:**
- **postgresql** - PostgreSQL JDBC driver
- **exposed-core** (0.56.0) - Kotlin SQL framework core
- **exposed-dao** (0.56.0) - DAO pattern support for Exposed
- **exposed-jdbc** (0.56.0) - JDBC integration for Exposed
- **exposed-spring-boot-starter** (0.56.0) - Spring Boot auto-configuration for Exposed
- **exposed-java-time** (0.56.0) - Java Time API support for Exposed

**Testing:**
- **spring-boot-starter-test** (3.5.5) - Testing framework (test scope)

## Architecture

### Frontend Component Hierarchy

```
App (frontend/src/App.jsx)
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

### Backend Architecture

```
TodoBackendApplication (backend/src/main/kotlin/com/todoapp/)
├── model/
│   └── Todo (data class)
│       └── Properties: id (Long), text (String), completed (Boolean)
├── database/
│   ├── TodoTable (Exposed Table object)
│   │   └── Columns: id (Long), text (String), completed (Boolean), createdAt (Instant)
│   └── TodoSchemaInitializer (ApplicationRunner)
│       └── Creates tables on startup using SchemaUtils
├── repository/
│   ├── TodoRepository (interface)
│   │   └── Methods: findAll, findById, save, update, deleteById, deleteAll
│   └── TodoRepositoryImpl (@Repository)
│       └── Implements CRUD operations using Exposed transaction DSL
├── service/
│   └── TodoService (@Service)
│       └── Business logic layer with repository integration
├── dto/
│   ├── CreateTodoRequest - Request for creating todos
│   ├── UpdateTodoRequest - Request for updating todos
│   └── ReorderRequest - Request for reordering todos
├── config/
│   └── CorsConfig
│       └── Allows: localhost:3000, methods: GET/POST/PUT/DELETE
└── controller/
    ├── HealthController
    │   └── GET /health → {"status":"UP","service":"todo-backend"}
    └── TodoController
        ├── GET /api/todos → List all todos
        ├── POST /api/todos → Create new todo
        ├── PUT /api/todos/{id} → Update todo
        ├── DELETE /api/todos/{id} → Delete todo
        ├── DELETE /api/todos → Delete all todos
        └── PUT /api/todos/reorder → Reorder todos
```

**Technology Stack:**
- **Spring Boot 3.5.5** - Application framework with auto-configuration
- **Embedded Tomcat** - Web server running on port 8080
- **Kotlin 2.0.21** - Primary language with full Spring support
- **Jackson Kotlin Module** - JSON serialization/deserialization
- **Kotlin Exposed 0.56.0** - Kotlin SQL framework with DSL
- **PostgreSQL 16** - Relational database running in Docker
- **HikariCP** - High-performance JDBC connection pool
- **CORS** - Global configuration allowing frontend (port 3000) access

**Configuration:**
- `application.properties` - Server port (8080), database connection, Exposed settings
- `docker-compose.yml` - PostgreSQL container configuration (port 5432)
- `CorsConfig.kt` - CORS configuration for /api/** endpoints

**Database Schema:**
- **Table**: `todos`
  - `id` BIGSERIAL PRIMARY KEY
  - `text` VARCHAR(500)
  - `completed` BOOLEAN DEFAULT FALSE
  - `created_at` TIMESTAMP DEFAULT NOW()

**Data Flow:**
1. Docker Compose starts PostgreSQL database on port 5432
2. Spring Boot connects to database via HikariCP connection pool
3. Exposed framework initializes and creates tables if they don't exist
4. Frontend calls REST API endpoints
5. Controller → Service → Repository → Exposed → PostgreSQL
6. Data persists in PostgreSQL database across application restarts

### Progressive Web App (PWA) Architecture

The frontend is a fully-featured PWA built with **vite-plugin-pwa** and **Workbox**:

**Service Worker:**
- Automatically generated by vite-plugin-pwa using Workbox strategies
- Located at `dist/sw.js` (auto-generated during build, not manually coded)
- Configuration in [vite.config.mjs:11-92](vite.config.mjs#L11-L92)

**Caching Strategies:**
- **Static Assets** (CacheFirst): HTML, CSS, JS, images, icons cached with precaching
- **API Calls** (NetworkFirst): `/api/*` requests attempt network first, fallback to cache
  - Cache timeout: 10 seconds before falling back to cached data
  - Cache expiration: 50 entries max, 24 hours max age
  - Supports both production HTTPS and local `localhost:8080` development

**Registration & Updates:**
- Service worker registered in [main.jsx:14-38](main.jsx#L14-L38) using `registerSW` from `virtual:pwa-register`
- Auto-update on navigation with `registerType: 'autoUpdate'`
- Skip waiting enabled for faster updates (`skipWaiting: true`)
- Automatic client claiming (`clientsClaim: true`)
- Update checks every 60 seconds
- Custom `swUpdateAvailable` event dispatched when new version is available (for UpdateNotification component)

**Manifest:**
- Configured in vite.config.mjs (lines 14-49), not as a separate JSON file
- Generated as `manifest.webmanifest` during build
- App name: "My Todo List", short name: "Todos"
- Theme color: #7c3aed (purple), background: #ffffff
- Display mode: standalone (full-screen app experience)
- Icons: SVG, PNG (16x16, 32x32, 180x180) for various devices

**PWA Features:**
- Installable on mobile (iOS, Android) and desktop (Chrome, Edge)
- Offline functionality with cached API data
- Background sync for pending changes (via service worker)
- Custom install prompt handling in [main.jsx:41-54](main.jsx#L41-L54)
- Dev mode PWA support enabled for testing (`devOptions.enabled: true`)

**Build Output:**
- `sw.js` - Main service worker file (Workbox-generated)
- `workbox-*.js` - Workbox runtime library
- `manifest.webmanifest` - PWA manifest file
- All generated automatically during `npm run build`

### Main Application Component (frontend/src/App.jsx)

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

<!-- BACKLOG.MD MCP GUIDELINES START -->

<CRITICAL_INSTRUCTION>

## BACKLOG WORKFLOW INSTRUCTIONS

This project uses Backlog.md MCP for all task and project management activities.

**CRITICAL RESOURCE**: Read `backlog://workflow/overview` to understand when and how to use Backlog for this project.

- **First time working here?** Read the overview resource IMMEDIATELY to learn the workflow
- **Already familiar?** You should have the overview cached ("## Backlog.md Overview (MCP)")
- **When to read it**: BEFORE creating tasks, or when you're unsure whether to track work

The overview resource contains:
- Decision framework for when to create tasks
- Search-first workflow to avoid duplicates
- Links to detailed guides for task creation, execution, and completion
- MCP tools reference

You MUST read the overview resource to understand the complete workflow. The information is NOT summarized here.

</CRITICAL_INSTRUCTION>

<!-- BACKLOG.MD MCP GUIDELINES END -->
