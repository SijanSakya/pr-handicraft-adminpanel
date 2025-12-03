import { BASE_IMAGE_URL } from '@/lib/getEnvs';
import Cookies from 'js-cookie';

export function getCookie(name: string) {
  const cookie = Cookies.get(name);
  if (cookie) {
    const parsedCookie = JSON.parse(Cookies.get(name) || '');
    return parsedCookie;
  }
}
export function setCookie(name: string, value: string | Record<string, any> | Array<Record<string, any>>, args?: any) {
  return Cookies.set(name, JSON.stringify(value), args);
}

export function deleteCookie(name: string, args: any = {}) {
  return Cookies.remove(name, args);
}
export const nationalityLabels: { [key: string]: string } = {
  us: 'United States',
  gb: 'United Kingdom',
  np: 'Nepal',
  in: 'India',
  cn: 'China',
  jp: 'Japan',
};

export const genderLabels: { [key: string]: string } = {
  male: 'M',
  female: 'F',
  other: 'Other',
};

export function formatDate(dateString?: string | null): string {
  if (!dateString) return '-'; // handle undefined/null/empty

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '-'; // handle invalid dates

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export const extractErrorMessages = (obj: any): string[] => {
  const messages: string[] = [];

  const traverse = (value: any) => {
    if (Array.isArray(value)) {
      value.forEach((v) => traverse(v));
    } else if (typeof value === 'object' && value !== null) {
      Object.values(value).forEach((v) => traverse(v));
    } else if (typeof value === 'string') {
      messages.push(value);
    }
  };

  traverse(obj);
  return messages;
};

export async function getImageFile(
  imageInput: string | File | null | undefined,
  defaultFilename: string = 'image.jpg'
): Promise<File | null> {
  if (!imageInput) return null;

  if (imageInput instanceof File) return imageInput;

  if (typeof imageInput === 'string') {
    const fullUrl = imageInput.startsWith('http') ? imageInput : `${BASE_IMAGE_URL}${imageInput}`;

    try {
      const response = await fetch(fullUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const blob = await response.blob(); // ✅ instead of arrayBuffer
      const filename = fullUrl.split('/').pop() || defaultFilename;

      return new File([blob], filename, { type: blob.type || 'image/jpeg' }); // ✅ use blob.type
    } catch (error) {
      console.error('Error converting image URL to file:', error);
      return null;
    }
  }

  console.warn('Unsupported image input type:', imageInput);
  return null;
}
export async function getImageFilesArray(
  inputs: (File | { id?: number; image: string } | string | null | undefined)[]
): Promise<File[]> {
  if (!Array.isArray(inputs)) return [];

  // Map each item to a Promise<File | null>
  const filePromises = inputs.map(async (item) => {
    if (!item) return null;

    if (item instanceof File) {
      return item; // ✅ keep as-is
    }

    if (typeof item === 'object' && 'image' in item && item.image) {
      return await getImageFile(item.image);
    }

    if (typeof item === 'string') {
      return await getImageFile(item);
    }

    return null;
  });

  // Wait for all conversions in parallel
  const results = await Promise.all(filePromises);

  // Filter out nulls, return only valid File objects
  return results.filter((f): f is File => f !== null);
}
