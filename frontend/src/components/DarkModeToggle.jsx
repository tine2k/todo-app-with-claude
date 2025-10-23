import { MoonIcon, SunIcon } from './Icons';

export default function DarkModeToggle({ darkMode, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
      title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}