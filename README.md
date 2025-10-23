# Todo App

A full-stack todo application with a React frontend and Spring Boot Kotlin backend. Features persistent storage, bulk actions, and a clean purple-themed interface.

## Features

- **CRUD Operations**: Create, read, update, and delete todos
- **Persistent Storage**: Todos are automatically saved to localStorage
- **Bulk Actions**: Mark all todos as complete/incomplete or delete all at once
- **Modern UI**: Clean, responsive design with Tailwind CSS v4
- **Fast Development**: Powered by Vite with Hot Module Replacement (HMR)
- **Component Architecture**: Modular, reusable React components
- **Backend Ready**: Spring Boot Kotlin backend with health check endpoint

## Tech Stack

### Frontend
- **React 19.2.0** - Modern React with hooks
- **Vite 7.1.9** - Lightning-fast build tool and dev server
- **Tailwind CSS 4.1.14** - Utility-first CSS framework
- **localStorage API** - Client-side data persistence

### Backend
- **Spring Boot 3.3.5** - Java application framework
- **Kotlin 2.0.21** - Modern JVM language
- **Maven** - Build automation and dependency management
- **Java 21** - Latest LTS version

## Getting Started

### Prerequisites

- **Node.js 16+** and npm
- **Java 21** (JDK)
- **Maven 3.6+**

### Installation

1. Clone the repository:
```bash
git clone git@github.com:tine2k/todo-app-with-claude.git
cd todo-app-with-claude
```

2. **Frontend Setup**:
```bash
cd frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:3000`

3. **Backend Setup** (in a new terminal):
```bash
cd backend
mvn spring-boot:run
```
The backend will be available at `http://localhost:8080`

## Available Scripts

### Frontend (from `frontend/` directory)
- **`npm run dev`** - Start development server with HMR on port 3000
- **`npm run build`** - Build optimized production bundle to `dist/`
- **`npm run preview`** - Preview production build locally
- **`npm test`** - Run tests with Vitest

### Backend (from `backend/` directory)
- **`mvn spring-boot:run`** - Start backend server on port 8080
- **`mvn clean package`** - Build JAR file
- **`mvn test`** - Run backend tests

### Backend Endpoints
- **`GET /health`** - Health check endpoint
  - Returns: `{"status":"UP","service":"todo-backend"}`
- **`GET /api/todos`** - Get all todos
  - Returns: Array of todo objects `[{"id":1,"text":"Learn Kotlin","completed":false},...]`
  - Currently returns 3 hardcoded todos
  - Frontend fetches this on initial load

## Project Structure

```
todo-app/
├── frontend/                      # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── BulkActionButton.jsx  # Reusable button component
│   │   │   ├── BulkActions.jsx       # Bulk action controls
│   │   │   ├── Icons.jsx              # SVG icon components
│   │   │   ├── TodoInput.jsx          # Input field component
│   │   │   └── TodoItem.jsx           # Individual todo item
│   │   ├── App.jsx                    # Main application component
│   │   ├── main.jsx                   # React entry point
│   │   └── base.css                   # Tailwind CSS imports
│   ├── public/                        # Static assets
│   ├── vite.config.mjs               # Vite configuration
│   ├── tailwind.config.js            # Tailwind configuration
│   ├── postcss.config.cjs            # PostCSS configuration
│   └── package.json                  # Frontend dependencies
├── backend/                       # Spring Boot Kotlin application
│   ├── src/main/
│   │   ├── kotlin/com/todoapp/
│   │   │   ├── TodoBackendApplication.kt  # Main application class
│   │   │   ├── model/
│   │   │   │   └── Todo.kt                # Todo data model
│   │   │   ├── config/
│   │   │   │   └── CorsConfig.kt          # CORS configuration
│   │   │   └── controller/
│   │   │       ├── HealthController.kt    # Health check endpoint
│   │   │       └── TodoController.kt      # Todo API endpoint
│   │   └── resources/
│   │       └── application.properties     # Application configuration
│   ├── pom.xml                   # Maven configuration
│   └── .gitignore               # Backend gitignore
├── backlog/                      # Task management
├── CLAUDE.md                     # Claude Code instructions
└── README.md                     # This file
```

## Component Overview

### App Component
The main component that manages application state using React hooks:
- `useState` for todos and input value management
- `useEffect` for localStorage synchronization
- Handles all todo operations (add, toggle, delete, bulk actions)

### TodoItem
Individual todo item with:
- Checkbox for completion toggle
- Text with strikethrough for completed items
- Delete button with trash icon

### TodoInput
Input field with:
- Controlled input for new todos
- Add button with plus icon
- Enter key support

### BulkActions
Bulk operation buttons:
- **All Done** - Mark all todos as complete
- **All Open** - Mark all todos as incomplete
- **Delete All** - Clear all todos (with confirmation)

### Icons
Reusable SVG icon components:
- CheckCircleIcon, PauseCircleIcon, TrashIcon, PlusIcon

## Data Persistence

Todos are automatically saved to `localStorage` under the key `'todos'`. Each todo contains:
- `id` - Unique timestamp-based identifier
- `text` - Todo description
- `completed` - Boolean completion status

## Styling

The app uses Tailwind CSS v4 with a purple theme:
- Purple gradient background (`from-purple-600` to `to-purple-900`)
- Color-coded actions (green for success, blue for info, red for danger)
- Smooth hover transitions
- Responsive design for mobile and desktop

## Browser Support

Works on all modern browsers that support:
- ES6+ JavaScript
- localStorage API
- CSS Grid and Flexbox

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for learning or personal use.

## Acknowledgments

Built with [Claude Code](https://claude.com/claude-code) - AI-powered coding assistant

## Future Enhancements

Potential features for future development:
- [ ] Todo categories/tags
- [ ] Due dates and reminders
- [ ] Search and filter functionality
- [ ] Export/import todos
- [ ] Multiple todo lists
- [ ] Full backend API integration (REST API for todos)
- [ ] Database persistence (PostgreSQL/MySQL)
- [ ] User authentication and authorization

---

Made with React, Tailwind CSS, Spring Boot, and Kotlin
