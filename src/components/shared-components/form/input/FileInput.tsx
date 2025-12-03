import React, { FC, useEffect, useState } from 'react';

interface FileInputProps {
  id?: string;
  value: File | string | null;
  onChange: (file: File | null) => void;
  onRemove?: () => void;
  label?: string;
  errors?: any;
  disabled?: boolean;
  showLabelInside?: boolean;
}

const FileInput: FC<FileInputProps> = ({
  id,
  value,
  onChange,
  onRemove,
  label,
  errors,
  showLabelInside = true,
  disabled = false,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // All accepted image formats
  const ACCEPT_FORMATS = 'image/jpeg,image/jpg,image/png,image/gif';

  // 📌 Handle initial value (string URL or File)
  useEffect(() => {
    if (typeof value === 'string' && value) {
      setPreviewUrl(value);
      setFileType('image');
    } else if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreviewUrl(objectUrl);
      setFileType(value.type.split('/')[0]);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
      setFileType(null);
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (!file) {
      onChange(null);
      return;
    }

    const maxSizeInBytes = 24 * 1024 * 1024; // 24MB limit
    if (file.size > maxSizeInBytes) {
      setError('File size exceeds 24MB limit. Please select a smaller file.');
      onChange(null);
      return;
    }

    // Validate using accepted image MIME types
    if (!ACCEPT_FORMATS.includes(file.type)) {
      setError(`Unsupported file type ${file.type}. Please select a valid image.`);
      onChange(null);
      return;
    }

    setError(null);
    onChange(file);
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    setFileType(null);
    setError(null);
    onChange(null);
    onRemove?.();
  };

  const inputId = id || label || 'file-input';

  return (
    <div className="relative w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium leading-6 text-gray-900 capitalize">
          {label}
        </label>
      )}

      <div className="relative w-44 h-32 border border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-gray-50">
        {!previewUrl ? (
          <>
            <label
              htmlFor={inputId}
              className="cursor-pointer flex flex-col items-center justify-center text-gray-400 hover:text-blue-500"
            >
              <span className="text-black text-2xl">+</span>
              {showLabelInside && <span className="text-sm text-[#21272A]">{label}</span>}
            </label>

            <input id={inputId} type="file" accept={ACCEPT_FORMATS} onChange={handleFileChange} className="hidden" />
          </>
        ) : (
          <>
            <div className="relative w-full h-full flex justify-center items-center">
              {fileType?.startsWith('image') && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-full max-w-full object-contain rounded-lg cursor-pointer"
                />
              )}
            </div>

            {!disabled && (
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-1 right-1 bg-white bg-opacity-70 hover:bg-opacity-100 text-red-600 rounded-full p-1"
              >
                X
              </button>
            )}
          </>
        )}
      </div>

      {(error || errors) && <p className="text-red-500 text-xs w-full mt-1">{error || errors}</p>}
    </div>
  );
};

export default FileInput;
