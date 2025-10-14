import { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';
import BulkActions from './components/BulkActions';
import TodoInput from './components/TodoInput';
import { DocumentIcon } from './components/Icons';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Load todos from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('todos');
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const text = inputValue.trim();

    if (text === '') {
      alert('Please enter a task!');
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const deleteAll = () => {
    if (confirm('Are you sure you want to delete all todos? This action cannot be undone.')) {
      setTodos([]);
    }
  };

  const markAllComplete = () => {
    setTodos(todos.map(todo => ({ ...todo, completed: true })));
  };

  const markAllIncomplete = () => {
    setTodos(todos.map(todo => ({ ...todo, completed: false })));
  };

  return (
    <div className="bg-gradient-to-br from-purple-600 to-purple-900 min-h-screen flex items-center justify-center p-5">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <div className="flex items-center justify-center gap-3 mb-8">
          <h1 className="text-4xl font-bold text-gray-800">My Todo List</h1>
          <a
            href="/todo-wikipedia.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
            title="Open Todo Wikipedia PDF"
          >
            <DocumentIcon />
          </a>
        </div>

        <ul className="space-y-3 mb-6">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
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
        />
      </div>
    </div>
  );
}
