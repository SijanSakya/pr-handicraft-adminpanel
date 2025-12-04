interface Option {
  label: string;
  value: string | number;
}
import { useMemo } from 'react';
import { useFetchQuery } from './useFetchQuery';

export const useProductCategoryOptions = () => {
  const { data, isLoading, error, refetch } = useFetchQuery({
    endpoint: '/api/categories',
    queryKey: ['categories'],
  });

  const options: Option[] = useMemo(() => {
    if (!error && Array.isArray(data)) {
      return data
        .filter((cat: any) => cat?.category_title && cat?.id)
        .map((cat: any) => ({
          label: String(cat.category_title),
          value: String(cat.id),
        }));
    }
    return [];
  }, [data, error]);

  return { options, isLoading, error };
};
