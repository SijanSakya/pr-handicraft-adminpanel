import getSupabaseClient from '@/lib/supabase/client';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';

interface UseApiMutationOptions<TData = any, TVariables = any> {
  endpoint: string;
  method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  axiosOptions?: AxiosRequestConfig;
  queryParams?: Record<string, any>;
  configs?: Record<string, any>;
}

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

  const qs = query.toString();
  return qs ? `?${qs}` : '';
};

export const useApiMutation = <TData = any, TVariables = any>({
  endpoint,
  method = 'POST',
  axiosOptions = {},
  queryParams = {},
  configs = {},
}: UseApiMutationOptions<TData, TVariables>) => {
  const supabase = getSupabaseClient();

  return useMutation<TData, any, TVariables>({
    mutationFn: async (variables) => {
      if (!endpoint) throw new Error('Endpoint is required');

      // 👉 Get Supabase access token
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      const queryString = buildQueryString(queryParams);
      const url = `${endpoint}${queryString}`;

      try {
        const response = await axios({
          url,
          method,
          data: variables,
          headers: {
            ...(axiosOptions.headers || {}),
            Authorization: token ? `Bearer ${token}` : '',
          },
          ...axiosOptions,
        });

        return response.data;
      } catch (error: any) {
        if (error?.response?.status === 400 || error?.response?.status === 404) {
          return error.response?.data || null;
        }
        throw error;
      }
    },
    ...configs,
  });
};
