import { TrashIcon } from './Icons';

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors ${todo.completed ? 'opacity-60' : ''}`}>
      <input
        type="checkbox"
        className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500 cursor-pointer"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className={`flex-1 text-gray-800 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
        {todo.text}
      </span>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors cursor-pointer flex items-center gap-2"
        onClick={() => onDelete(todo.id)}
      >
        <TrashIcon />
        Delete
      </button>
    </li>
  );
}
