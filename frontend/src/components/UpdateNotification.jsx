import { XMarkIcon } from './Icons';

export default function UpdateNotification({ isVisible, onUpdate, onDismiss }) {
  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4 animate-slide-down">
      <div className="rounded-lg shadow-2xl p-4 flex items-center justify-between bg-white dark:bg-gray-800 border border-purple-200 dark:border-gray-700">
        <div className="flex-1 mr-4">
          <p className="font-semibold mb-1 text-gray-900 dark:text-white">
            Update Available!
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            A new version is ready. Refresh to get the latest features.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onUpdate}
            className="px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer bg-purple-600 hover:bg-purple-700 text-white"
          >
            Update Now
          </button>

          <button
            onClick={onDismiss}
            className="p-2 rounded-lg transition-colors cursor-pointer text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700"
            aria-label="Dismiss notification"
          >
            <XMarkIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
