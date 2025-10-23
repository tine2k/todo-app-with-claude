import { TrashIcon, GripIcon } from './Icons';

export default function TodoItem({
  todo,
  index,
  onToggle,
  onDelete,
  onDragStart,
  onDragOver,
  onDragEnd,
  isDragging
}) {
  return (
    <li
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDragEnd={onDragEnd}
      className={`flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all ${
        todo.completed ? 'opacity-60' : ''
      } ${
        isDragging ? 'opacity-50 cursor-grabbing' : 'cursor-grab'
      }`}
    >
      <div className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-grab">
        <GripIcon className="w-4 h-4" />
      </div>
      <input
        type="checkbox"
        className="w-5 h-5 text-purple-600 dark:text-purple-400 rounded focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 cursor-pointer"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className={`flex-1 text-gray-800 dark:text-gray-200 ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
        {todo.text}
      </span>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition-colors cursor-pointer flex items-center gap-2"
        onClick={() => onDelete(todo.id)}
      >
        <TrashIcon />
        Delete
      </button>
    </li>
  );
}
