import { EyeCloseIcon, EyeIcon } from '@/theme-template/icons';
import React, { FC, useState } from 'react';

interface InputProps {
  type?: 'text' | 'number' | 'email' | 'password' | 'date' | 'time' | string;
  id?: string;
  name?: string;
  placeholder?: string;
  isRequired?: boolean;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
  min?: string;
  max?: string;
  step?: number;
  disabled?: boolean;
  errorMessage?: string | any | undefined;
}

const InputField: FC<InputProps> = ({
  type = 'text',
  id,
  name,
  label,
  placeholder = '',
  value,
  isRequired = false,
  defaultValue,
  onChange,
  className = '',
  min,
  max,
  step,
  disabled = false,
  errorMessage,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full relative">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-900 mb-1 capitalize dark:text-white">
          {label} {isRequired && <span className="">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          type={inputType}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={`flex items-center justify-between gap-2 border rounded-md py-2 text-gray-900 dark:text-white text-sm font-normal bg-white dark:bg-gray-800
            ${isPassword ? 'pl-3 pr-10' : 'px-3'}
            ${
              errorMessage
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }
            placeholder:text-gray-400 focus:outline-none w-full ${className}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? (
              <EyeIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            ) : (
              <EyeCloseIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        )}
      </div>

      {errorMessage && <p className="absolute -bottom-4 text-red-500 text-xs mt-1">{errorMessage}</p>}
    </div>
  );
};

export default InputField;
