import { FC, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface MultiSelectFieldProps {
  id?: string;
  label?: string;
  values?: (string | number)[] | null; // make optional to handle undefined
  onChange: (values: (string | number)[]) => void;
  options: { label: string; value: string | number }[];
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

const MultiSelectField: FC<MultiSelectFieldProps> = ({
  id,
  label,
  values,
  onChange,
  options,
  placeholder = 'Select options',
  error,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 0,
  });

  // Normalize values to always be an array
  const normalizedValues = Array.isArray(values) ? values : [];
  // Close dropdown when clicking outside
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

  const toggleOption = (value: string | number) => {
    if (normalizedValues.includes(value)) {
      onChange(normalizedValues.filter((v) => v !== value));
    } else {
      onChange([...normalizedValues, value]);
    }
  };

  const removeOption = (value: string | number) => {
    onChange(normalizedValues.filter((v) => v !== value));
  };

  // Calculate dropdown position when opening
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX, width: rect.width });
    }
  }, [isOpen]);

  return (
    <div className="w-full relative" ref={containerRef}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-900 mb-1 capitalize">
          {label}
        </label>
      )}

      <div
        className={`flex flex-wrap items-center gap-1 border rounded-md px-2 py-1 cursor-pointer ${
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus-within:border-blue-500 focus-within:ring-blue-500'
        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
      >
        {normalizedValues.length === 0 && <span className="text-gray-400">{placeholder}</span>}

        {normalizedValues.map((val) => {
          const option = options.find((o) => o.value === val);
          if (!option) return null;
          return (
            <span
              key={val}
              className="flex items-center gap-1 bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-white px-2 py-0.5 rounded-full text-sm"
            >
              {option.label}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeOption(val);
                }}
                className="text-xs font-bold"
              >
                ×
              </button>
            </span>
          );
        })}
      </div>

      {/* Portal dropdown */}
      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: 'absolute',
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: dropdownPosition.width,
              zIndex: 9999,
            }}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md max-h-60 overflow-auto shadow-lg"
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                className={`px-3 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-700 ${
                  normalizedValues.includes(opt.value) ? 'bg-blue-100 dark:bg-blue-700' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation(); // prevent dropdown from closing
                  toggleOption(opt.value);
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

export default MultiSelectField;
