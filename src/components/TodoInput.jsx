import { PlusIcon } from './Icons';

export default function TodoInput({ value, onChange, onSubmit }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="flex gap-3">
      <input
        type="text"
        placeholder="Add a new task..."
        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
        onClick={onSubmit}
        className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors cursor-pointer flex items-center gap-2"
      >
        <PlusIcon />
        Add
      </button>
    </div>
  );
}
