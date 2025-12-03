'use client';
import { BASE_IMAGE_URL } from '@/lib/getEnvs';
import React, { useEffect, useRef, useState } from 'react';

interface MultiImageUploadProps {
  id?: any;
  label?: string;
  onChange: (files: (File | { id?: number; image: string; caption?: string; order?: number })[]) => void;
  max?: number;
  maxSizeMB?: number;
  errorMessage?: string;
  defaultValue?: { id?: number; image: string; caption?: string; order?: number }[];
  isEditing?: boolean;
}

interface ImageItem {
  id?: number;
  file: File | null;
  preview: string | null;
  caption?: string;
  order?: number;
  isExisting?: boolean;
  imagePath?: string;
}

const MultiImageUpload: React.FC<MultiImageUploadProps> = ({
  id,
  label = 'Upload Image',
  onChange,
  max = 5,
  maxSizeMB = 24,
  errorMessage,
  defaultValue = [],
  isEditing = true,
}) => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const initialized = useRef(false);

  const isAbsoluteUrl = (url?: string) => {
    if (!url) return false;
    return /^https?:\/\//i.test(url) || url.startsWith(BASE_IMAGE_URL ?? '');
  };

  const emitChange = (imgs: ImageItem[]) => {
    const validImages = imgs.filter((img) => img.isExisting || img.file !== null);

    const payload = validImages.map((img) => {
      if (img.isExisting) {
        return {
          id: img.id,
          image: img.imagePath!,
          caption: img.caption || '',
          order: img.order ?? 0,
        };
      }
      return img.file!;
    });

    onChange(payload);
  };

  useEffect(() => {
    if (initialized.current) return;

    if (defaultValue?.length > 0) {
      const mapped = defaultValue.map((img) => ({
        id: img.id,
        file: null,
        caption: img.caption,
        order: img.order,
        imagePath: img.image,
        preview: isAbsoluteUrl(img.image) ? img.image : `${BASE_IMAGE_URL}${img.image}`,
        isExisting: true,
      }));
      setImages(mapped);
    }

    initialized.current = true;
  }, [defaultValue]);

  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img.preview?.startsWith('blob:')) URL.revokeObjectURL(img.preview);
      });
    };
  }, [images]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File size exceeds ${maxSizeMB}MB`);
      return;
    }

    const preview = URL.createObjectURL(file);

    setImages((prev) => {
      let updated: ImageItem[];

      if (typeof index === 'number') {
        updated = [...prev];
        updated[index] = {
          file,
          preview,
          isExisting: false,
        };
      } else {
        updated = [...prev, { file, preview, isExisting: false }];
      }

      emitChange(updated);
      return updated;
    });
  };

  const handleAddImage = () => {
    if (images.length >= max) return;

    setImages((prev) => {
      const updated = [...prev, { file: null, preview: null }];
      emitChange(updated);
      return updated;
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      emitChange(updated);
      return updated;
    });
  };

  const ACCEPT_FORMATS = 'image/jpeg,image/jpg,image/png,image/gif';

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
                <img src={img.preview} alt={`Preview ${index}`} className="w-full h-full object-contain rounded-lg" />

                {isEditing && (
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-white bg-opacity-70 hover:bg-opacity-100 text-red-600 rounded-full p-1"
                  >
                    X
                  </button>
                )}
              </>
            ) : (
              <label className="cursor-pointer flex flex-col items-center justify-center text-gray-400 hover:text-blue-500 w-full h-full">
                <span className="text-black text-2xl">+</span>
                <span className="text-sm text-[#21272A]">Images</span>

                <input
                  type="file"
                  accept={ACCEPT_FORMATS}
                  onChange={(e) => handleFileChange(e, index)}
                  className="hidden"
                />
              </label>
            )}
          </div>
        ))}

        {isEditing && images.length < max && (
          <div
            onClick={handleAddImage}
            className="w-32 h-32 border border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 bg-gray-50"
          >
            <span className="text-black text-2xl">+</span>
          </div>
        )}
      </div>

      {errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
    </div>
  );
};

export default MultiImageUpload;
