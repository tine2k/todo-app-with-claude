import { XMarkIcon } from './Icons';

export default function UpdateNotification({ isVisible, onUpdate, onDismiss, darkMode }) {
  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4 animate-slide-down`}>
      <div className={`rounded-lg shadow-2xl p-4 flex items-center justify-between ${
        darkMode
          ? 'bg-gray-800 border border-gray-700'
          : 'bg-white border border-purple-200'
      }`}>
        <div className="flex-1 mr-4">
          <p className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Update Available!
          </p>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            A new version is ready. Refresh to get the latest features.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onUpdate}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              darkMode
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            Update Now
          </button>

          <button
            onClick={onDismiss}
            className={`p-2 rounded-lg transition-colors ${
              darkMode
                ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
            aria-label="Dismiss notification"
          >
            <XMarkIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
