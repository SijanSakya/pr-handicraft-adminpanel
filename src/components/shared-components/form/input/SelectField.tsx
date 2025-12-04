import { FC, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface SelectFieldProps {
  id?: string;
  label?: string;
  value: string | number;
  onChange: (value: string | number) => void;
  options: { label: string; value: string | number }[];
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

const SelectField: FC<SelectFieldProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = 'Select',
  error,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full relative" ref={containerRef}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-900 mb-1 capitalize">
          {label}
        </label>
      )}

      {/* Input-like container */}
      <div
        className={`flex items-center justify-between gap-2 border rounded-md px-3 py-2 cursor-pointer ${
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus-within:border-blue-500 focus-within:ring-blue-500'
        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
      >
        <span
          className={`${
            value ? 'text-gray-900 dark:text-white text-sm font-normal' : 'text-gray-400 text-sm font-normal'
          }`}
        >
          {value ? options.find((opt) => opt.value == value)?.label : placeholder}
        </span>
        <svg
          className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown */}
      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: 'absolute',
              top: containerRef.current?.getBoundingClientRect().bottom! + window.scrollY,
              left: containerRef.current?.getBoundingClientRect().left! + window.scrollX,
              width: containerRef.current?.getBoundingClientRect().width,
              zIndex: 9999,
            }}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md max-h-60 overflow-auto shadow-lg"
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                className={`px-3 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-700 ${
                  value === opt.value ? 'bg-blue-100 dark:bg-blue-700' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(opt.value);
                  setIsOpen(false);
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>,
          document.body
        )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default SelectField;
