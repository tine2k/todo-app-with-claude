import { PlusIcon } from './Icons';

export default function TodoInput({ value, onChange, onSubmit, disabled = false }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !disabled) {
      onSubmit();
    }
  };

  return (
    <div className="flex gap-3">
      <input
        type="text"
        placeholder="Add a new task..."
        className={`flex-1 px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
          disabled
            ? 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
            : 'bg-white text-gray-800 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:border-purple-500 dark:focus:border-purple-400'
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <button
        onClick={onSubmit}
        disabled={disabled}
        className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 min-h-[44px] ${
          disabled
            ? 'bg-gray-400 dark:bg-gray-600 text-gray-200 dark:text-gray-400 cursor-not-allowed opacity-60'
            : 'bg-purple-600 dark:bg-purple-500 text-white hover:bg-purple-700 dark:hover:bg-purple-600 cursor-pointer'
        }`}
      >
        <PlusIcon />
        Add
      </button>
    </div>
  );
}
