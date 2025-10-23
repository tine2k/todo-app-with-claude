import { cloneElement } from 'react';

export default function BulkActionButton({ onClick, variant, icon, children }) {
  // Map variant to Tailwind CSS classes
  const variantStyles = {
    success: 'border-green-500 bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900 dark:text-green-300 dark:border-green-400 dark:hover:bg-green-800',
    info: 'border-blue-500 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-400 dark:hover:bg-blue-800',
    danger: 'border-red-500 bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900 dark:text-red-300 dark:border-red-400 dark:hover:bg-red-800',
  };

  // Base styles applied to all variants
  const baseStyles = 'px-4 py-2.5 border-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap min-h-[44px]';

  // Get variant-specific styles
  const variantStyle = variantStyles[variant] || variantStyles.success;

  // Clone icon with consistent sizing and flex-shrink
  const styledIcon = cloneElement(icon, {
    className: 'w-4 h-4 flex-shrink-0'
  });

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyle}`}
    >
      {styledIcon}
      {children}
    </button>
  );
}
