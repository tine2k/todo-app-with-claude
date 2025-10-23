import { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';
import BulkActions from './components/BulkActions';
import TodoInput from './components/TodoInput';
import DarkModeToggle from './components/DarkModeToggle';
import ErrorDialog from './components/ErrorDialog';
import OfflineIndicator from './components/OfflineIndicator';
import UpdateNotification from './components/UpdateNotification';
import { DocumentIcon } from './components/Icons';
import * as todoApi from './services/todoApi';
import { APP_VERSION } from './version';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [backendError, setBackendError] = useState(false);
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [serviceWorkerRegistration, setServiceWorkerRegistration] = useState(null);

  // Load todos from backend on mount
  useEffect(() => {
    todoApi.fetchTodos()
      .then(data => {
        if (data && data.length > 0) {
          setTodos(data);
        }
      })
      .catch(error => {
        console.error('Failed to fetch todos from backend:', error);
        setBackendError(true);
      });
  }, []);

  // Load dark mode preference from backend on mount, fallback to localStorage
  useEffect(() => {
    todoApi.fetchPreferences()
      .then(preferences => {
        setDarkMode(preferences.darkMode);
        setPreferencesLoaded(true);
        // Sync to localStorage for offline fallback
        localStorage.setItem('darkMode', JSON.stringify(preferences.darkMode));
      })
      .catch(error => {
        console.error('Failed to fetch preferences from backend:', error);
        // Fallback to localStorage
        const storedDarkMode = localStorage.getItem('darkMode');
        if (storedDarkMode !== null) {
          setDarkMode(JSON.parse(storedDarkMode));
        }
        setPreferencesLoaded(true);
      });
  }, []);

  // Save dark mode preference to backend and localStorage whenever it changes
  useEffect(() => {
    // Skip until preferences are loaded from backend
    if (!preferencesLoaded) {
      return;
    }

    // Save to localStorage immediately for offline support
    localStorage.setItem('darkMode', JSON.stringify(darkMode));

    // Save to backend
    todoApi.updatePreferences(darkMode)
      .catch(error => {
        console.error('Failed to save preferences to backend:', error);
        // localStorage already has the value, so no need to revert
      });
  }, [darkMode, preferencesLoaded]);

  // Listen for online event and process offline queue
  useEffect(() => {
    const handleOnline = async () => {
      console.log('[App] Connection restored, processing offline queue');
      try {
        const result = await todoApi.processOfflineQueue();
        if (result && result.synced > 0) {
          console.log(`[App] Synced ${result.synced} offline requests`);
          // Refresh todos after syncing
          const data = await todoApi.fetchTodos();
          if (data && data.length > 0) {
            setTodos(data);
          }
        }
      } catch (error) {
        console.error('[App] Failed to process offline queue:', error);
      }
    };

    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  // Listen for service worker update events
  useEffect(() => {
    const handleUpdateAvailable = (event) => {
      console.log('[App] Update available, showing notification');
      setUpdateAvailable(true);
      setServiceWorkerRegistration(event.detail.registration);
    };

    window.addEventListener('swUpdateAvailable', handleUpdateAvailable);

    return () => {
      window.removeEventListener('swUpdateAvailable', handleUpdateAvailable);
    };
  }, []);

  const addTodo = async () => {
    const text = inputValue.trim();

    if (text === '') {
      alert('Please enter a task!');
      return;
    }

    try {
      const newTodo = await todoApi.createTodo(text);
      setTodos([...todos, newTodo]);
      setInputValue('');
    } catch (error) {
      console.error('Failed to add todo:', error);
      alert(error.message || 'Failed to add todo. Please try again.');
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    // Optimistic update
    const previousTodos = [...todos];
    setTodos(todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));

    try {
      await todoApi.updateTodo(id, { completed: !todo.completed });
    } catch (error) {
      console.error('Failed to toggle todo:', error);
      // Revert on error
      setTodos(previousTodos);
      alert('Failed to update todo. Please try again.');
    }
  };

  const deleteTodo = async (id) => {
    // Optimistic update
    const previousTodos = [...todos];
    setTodos(todos.filter(todo => todo.id !== id));

    try {
      await todoApi.deleteTodo(id);
    } catch (error) {
      console.error('Failed to delete todo:', error);
      // Revert on error
      setTodos(previousTodos);
      alert('Failed to delete todo. Please try again.');
    }
  };

  const deleteAll = async () => {
    if (!confirm('Are you sure you want to delete all todos? This action cannot be undone.')) {
      return;
    }

    // Optimistic update
    const previousTodos = [...todos];
    setTodos([]);

    try {
      await todoApi.deleteAllTodos();
    } catch (error) {
      console.error('Failed to delete all todos:', error);
      // Revert on error
      setTodos(previousTodos);
      alert('Failed to delete all todos. Please try again.');
    }
  };

  const markAllComplete = async () => {
    // Optimistic update
    const previousTodos = [...todos];
    setTodos(todos.map(todo => ({ ...todo, completed: true })));

    try {
      // Update all todos in parallel
      await Promise.all(
        todos.map(todo => todoApi.updateTodo(todo.id, { completed: true }))
      );
    } catch (error) {
      console.error('Failed to mark all complete:', error);
      // Revert on error
      setTodos(previousTodos);
      alert('Failed to mark all todos as complete. Please try again.');
    }
  };

  const markAllIncomplete = async () => {
    // Optimistic update
    const previousTodos = [...todos];
    setTodos(todos.map(todo => ({ ...todo, completed: false })));

    try {
      // Update all todos in parallel
      await Promise.all(
        todos.map(todo => todoApi.updateTodo(todo.id, { completed: false }))
      );
    } catch (error) {
      console.error('Failed to mark all incomplete:', error);
      // Revert on error
      setTodos(previousTodos);
      alert('Failed to mark all todos as incomplete. Please try again.');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const closeErrorDialog = () => {
    setBackendError(false);
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === index) {
      return;
    }

    const newTodos = [...todos];
    const draggedItem = newTodos[draggedIndex];

    // Remove dragged item
    newTodos.splice(draggedIndex, 1);
    // Insert at new position
    newTodos.splice(index, 0, draggedItem);

    setTodos(newTodos);
    setDraggedIndex(index);
  };

  const handleDragEnd = async () => {
    setDraggedIndex(null);

    // Persist the new order to backend
    try {
      const orderedIds = todos.map(todo => todo.id);
      await todoApi.reorderTodos(orderedIds);
    } catch (error) {
      console.error('Failed to save todo order:', error);
      // Don't revert or show error - the visual order is already updated
      // and this is a non-critical operation
    }
  };

  const handleUpdateNow = () => {
    if (serviceWorkerRegistration && serviceWorkerRegistration.waiting) {
      // Tell the service worker to skip waiting and activate immediately
      serviceWorkerRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });

      // Listen for the controlling service worker to change, then reload
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    }
  };

  const handleDismissUpdate = () => {
    setUpdateAvailable(false);
  };

  return (
    <>
      <OfflineIndicator />
      <UpdateNotification
        isVisible={updateAvailable}
        onUpdate={handleUpdateNow}
        onDismiss={handleDismissUpdate}
        darkMode={darkMode}
      />
      <ErrorDialog
        isOpen={backendError}
        onClose={closeErrorDialog}
        title="Backend Connection Failed"
        message="Unable to connect to the todo backend server. The app will continue to work with local storage only."
        actionSteps={[
          'Make sure the backend is running on port 8080',
          'Navigate to the backend directory: cd backend',
          'Start the server: mvn spring-boot:run',
          'Refresh this page once the backend is running'
        ]}
        darkMode={darkMode}
      />
      <div className={`min-h-screen flex items-center justify-center p-5 transition-colors ${
        darkMode
          ? 'bg-gradient-to-br from-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-purple-600 to-purple-900'
      }`}>
        <div className={`rounded-xl shadow-2xl p-8 max-w-md w-full transition-colors ${
          darkMode ? 'bg-gray-800 dark' : 'bg-white'
        }`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Todo List
            </h1>
            <a
              href="/todo-wikipedia.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                darkMode
                  ? 'text-purple-400 hover:text-purple-300 hover:bg-gray-700'
                  : 'text-purple-600 hover:text-purple-700 hover:bg-purple-50'
              }`}
              title="Open Todo Wikipedia PDF"
            >
              <DocumentIcon />
            </a>
          </div>
          <DarkModeToggle darkMode={darkMode} onToggle={toggleDarkMode} />
        </div>

        <ul className="space-y-3 mb-6">
          {todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              index={index}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              isDragging={draggedIndex === index}
            />
          ))}
        </ul>

        {todos.length > 0 && (
          <BulkActions
            onMarkAllDone={markAllComplete}
            onMarkAllOpen={markAllIncomplete}
            onDeleteAll={deleteAll}
          />
        )}

        <TodoInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={addTodo}
          disabled={false}
        />

        <div className={`text-center mt-6 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          v{APP_VERSION}
        </div>
      </div>
    </div>
    </>
  );
}
