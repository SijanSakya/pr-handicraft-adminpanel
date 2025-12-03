'use client';

import { createBrowserClient } from '@supabase/ssr';
import { SUPABASE_KEY, SUPABASE_URL } from '../getEnvs';

let supabaseClient: any;

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createBrowserClient(SUPABASE_URL!, SUPABASE_KEY!);
  }
  return supabaseClient;
};

export default getSupabaseClient();
