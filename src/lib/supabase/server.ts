import { createServerClient } from '@supabase/ssr';
import { SUPABASE_KEY, SUPABASE_URL } from '../getEnvs';

const cookieOptions = {
  getAll: () => [], // return empty array
  setAll: () => {}, // do nothing
  // Optional for new API
  get: (name: string) => null,
  set: (name: string, value: string, options?: any) => {},
  remove: (name: string) => {},
};

export const getServerSupabaseClient = () => {
  const supabase = createServerClient(SUPABASE_URL, SUPABASE_KEY, { cookies: cookieOptions });

  return supabase; // ✅ no cookies
};
