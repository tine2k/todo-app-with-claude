import { MoonIcon, SunIcon } from './Icons';

export default function DarkModeToggle({ darkMode, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="p-3 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 min-w-[44px] min-h-[44px] flex items-center justify-center"
      title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}