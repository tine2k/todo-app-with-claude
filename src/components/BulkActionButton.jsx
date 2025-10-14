import { cloneElement } from 'react';

export default function BulkActionButton({ onClick, variant, icon, children }) {
  // Map variant to Tailwind CSS classes
  const variantStyles = {
    success: 'border-green-500 bg-green-50 text-green-700 hover:bg-green-100',
    info: 'border-blue-500 bg-blue-50 text-blue-700 hover:bg-blue-100',
    danger: 'border-red-500 bg-red-50 text-red-700 hover:bg-red-100',
  };

  // Base styles applied to all variants
  const baseStyles = 'px-4 py-2 border-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap';

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
