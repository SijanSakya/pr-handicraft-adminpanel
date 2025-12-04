import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';

interface ApiResponse<T> {
  data: T;
}

interface UseApiQueryOptions {
  endpoint: string;
  queryKey: unknown[];
  staleTime?: number;
  enabled?: boolean;
  cacheTime?: number;
  refetchInterval?: number | false | ((query: any) => number | false);
  configs?: any;
  axiosOptions?: AxiosRequestConfig;
  queryParams?: Record<string, any>;
}

// Helper to convert queryParams to URL string
const buildQueryString = (params: Record<string, any>) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value.forEach((v) => query.append(key, String(v)));
    } else if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string') {
      query.append(key, String(value));
    } else {
      query.append(key, JSON.stringify(value));
    }
  });

  const queryString = query.toString();
  return queryString ? `?${queryString}` : '';
};

export const useFetchQuery = ({
  endpoint,
  queryKey,
  staleTime = 10000,
  enabled = true,
  cacheTime = 300000,
  refetchInterval,
  configs = {},
  axiosOptions = {},
  queryParams = {},
}: UseApiQueryOptions) => {
  return useQuery<any[]>({
    queryKey,
    queryFn: async ({ signal }) => {
      if (!endpoint) return [];

      const queryString = buildQueryString(queryParams);
      const url = `${endpoint}${queryString}`;

      try {
        const response = await axios.get(url, { ...axiosOptions, signal });
        return response.data?.data || []; // always return array
      } catch (error: any) {
        if (error?.response?.status === 404 || error?.response?.status === 400) {
          return [];
        }
        throw error;
      }
    },
    enabled,
    staleTime,
    cacheTime,
    refetchInterval,
    keepPreviousData: false,
    ...configs,
  });
};
