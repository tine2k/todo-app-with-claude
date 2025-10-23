export default function ErrorDialog({ isOpen, onClose, title, message, actionSteps, darkMode }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative rounded-xl shadow-2xl p-6 max-w-md w-full animate-scaleIn ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      }`}>
        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-red-500">
          {title}
        </h2>

        {/* Message */}
        <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {message}
        </p>

        {/* Action Steps */}
        {actionSteps && actionSteps.length > 0 && (
          <div className={`mb-6 p-4 rounded-lg ${
            darkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <p className={`font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              What to do:
            </p>
            <ol className={`list-decimal list-inside space-y-1 text-sm ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
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
