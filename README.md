# Todo App

A modern, lightweight todo application built with React 19 and styled with Tailwind CSS v4. Features persistent storage, bulk actions, and a clean purple-themed interface.

## Features

- **CRUD Operations**: Create, read, update, and delete todos
- **Persistent Storage**: Todos are automatically saved to localStorage
- **Bulk Actions**: Mark all todos as complete/incomplete or delete all at once
- **Modern UI**: Clean, responsive design with Tailwind CSS v4
- **Fast Development**: Powered by Vite with Hot Module Replacement (HMR)
- **Component Architecture**: Modular, reusable React components

## Demo

![Todo App Screenshot](https://via.placeholder.com/800x600?text=Todo+App+Screenshot)

## Tech Stack

- **React 19.2.0** - Modern React with hooks
- **Vite 7.1.9** - Lightning-fast build tool and dev server
- **Tailwind CSS 4.1.14** - Utility-first CSS framework
- **localStorage API** - Client-side data persistence

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone git@github.com:tine2k/todo-app-with-claude.git
cd todo-app-with-claude
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- **`npm run dev`** - Start development server with HMR on port 3000
- **`npm run build`** - Build optimized production bundle to `dist/`
- **`npm run preview`** - Preview production build locally

## Project Structure

```
todo-app/
├── src/
│   ├── components/
│   │   ├── BulkActionButton.jsx  # Reusable button component
│   │   ├── BulkActions.jsx       # Bulk action controls
│   │   ├── Icons.jsx              # SVG icon components
│   │   ├── TodoInput.jsx          # Input field component
│   │   └── TodoItem.jsx           # Individual todo item
│   ├── App.jsx                    # Main application component
│   ├── main.jsx                   # React entry point
│   ├── base.css                   # Tailwind CSS imports
│   └── index.html                 # HTML template
├── public/                        # Static assets
├── vite.config.mjs               # Vite configuration
├── tailwind.config.js            # Tailwind configuration
├── postcss.config.cjs            # PostCSS configuration
└── package.json                  # Project dependencies
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
- [ ] Drag-and-drop reordering
- [ ] Dark/light theme toggle
- [ ] Export/import todos
- [ ] Multiple todo lists
- [ ] Backend API integration

---

Made with React and Tailwind CSS
