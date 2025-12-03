import { BASE_IMAGE_URL } from '@/lib/getEnvs';
import React, { useEffect, useRef, useState } from 'react';

interface MultiImageUploadProps {
  id?: any;
  label?: string;
  onChange: (files: File[]) => void;
  max?: number;
  maxSizeMB?: number;
  errorMessage?: string;
  defaultValue?: { id?: number; image: string; caption?: string; order?: number }[];
}

interface ImageItem {
  id?: number;
  file: File | null;
  preview: string | null;
  isExisting?: boolean;
}

const MultiImageUploadV2: React.FC<MultiImageUploadProps> = ({
  id,
  label = 'Upload Image',
  onChange,
  max = 5,
  maxSizeMB = 24,
  errorMessage,
  defaultValue = [],
}) => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const initialized = useRef(false); // ✅ track if initial load done

  // ✅ Initialize once (not every render)
  useEffect(() => {
    if (!initialized.current && defaultValue && defaultValue.length > 0) {
      const mapped = defaultValue.map((img) => ({
        id: img.id,
        file: null,
        preview: `${BASE_IMAGE_URL}${img.image}`,
        isExisting: true,
      }));
      setImages(mapped);
      initialized.current = true;
    } else if (!initialized.current) {
      setImages([{ file: null, preview: null }]);
      initialized.current = true;
    }
  }, [defaultValue]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    const maxSizeInBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      alert(`File size exceeds ${maxSizeMB}MB`);
      return;
    }

    const preview = URL.createObjectURL(file);
    const updatedImages = [...images];
    updatedImages[index] = { file, preview, isExisting: false };
    setImages(updatedImages);

    const newFiles = updatedImages.filter((img) => img.file !== null).map((img) => img.file!);
    onChange(newFiles);
  };

  const handleAddImage = () => {
    if (images.length >= max) return;
    setImages([...images, { file: null, preview: null }]);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    const newFiles = updatedImages.filter((img) => img.file !== null).map((img) => img.file!);
    onChange(newFiles);
  };

  return (
    <div>
      <label htmlFor={id || label} className="block text-sm font-medium leading-6 text-gray-900 capitalize mb-2">
        {label}
      </label>

      <div className="flex flex-wrap gap-3">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative w-32 h-32 border border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-gray-50"
          >
            {img.preview ? (
              <>
                <img src={img.preview} alt={`Preview ${index}`} className="w-full h-full object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-white bg-opacity-70 hover:bg-opacity-100 text-red-600 rounded-full p-1"
                >
                  X
                </button>
              </>
            ) : (
              <label className="cursor-pointer flex flex-col items-center justify-center text-gray-400 hover:text-blue-500 w-full h-full">
                <span className="text-black text-2xl">+</span>
                <span className="text-sm text-[#21272A]">Images</span>
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, index)} className="hidden" />
              </label>
            )}
          </div>
        ))}

        {images.length < max && (
          <div
            onClick={handleAddImage}
            className="w-32 h-32 border border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 bg-gray-50"
          >
            <span className="text-black text-2xl">+</span>
          </div>
        )}
      </div>

      {errorMessage && <p className="absolute -bottom-4 text-red-500 text-xs mt-1">{errorMessage}</p>}
    </div>
  );
};

export default MultiImageUploadV2;
