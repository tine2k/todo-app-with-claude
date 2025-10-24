export default function ErrorDialog({ isOpen, onClose, title, message, actionSteps }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative rounded-xl shadow-2xl p-6 max-w-md w-full animate-scaleIn bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-red-500">
          {title}
        </h2>

        {/* Message */}
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          {message}
        </p>

        {/* Action Steps */}
        {actionSteps && actionSteps.length > 0 && (
          <div className="mb-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
            <p className="font-semibold mb-2 text-gray-700 dark:text-gray-200">
              What to do:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
              {actionSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
}
