'use client';

import supabase from '@/lib/supabase/supabaseClient';
import { useQuery } from '@tanstack/react-query';

interface SupabaseQueryProps {
  table: string;
  queryKey: string[] | any[];
  select?: string;
  filters?: (query: any) => any; // optional chainable filters
  enabled?: boolean;
  staleTime?: number;
  refetchInterval?: number | false;
  configs?: {};
}

export const useSupabaseQuery = ({
  table,
  queryKey,
  select = '*',
  filters,
  enabled = true,
  staleTime = 10,
  refetchInterval,
  configs = {},
}: SupabaseQueryProps) => {
  return useQuery({
    queryKey,
    enabled,
    staleTime,
    refetchInterval,
    queryFn: async () => {
      if (!table) return null;

      let query = supabase.from(table).select(select);

      // Apply custom filters like .eq(), .gt(), .order()
      if (filters) query = filters(query);

      const { data, error } = await query;

      if (error) {
        console.error(error);
        throw new Error(error.message);
      }

      return data;
    },
    ...configs,
  });
};
