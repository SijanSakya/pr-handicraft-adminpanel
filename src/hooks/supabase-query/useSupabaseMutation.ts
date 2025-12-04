import { getSupabaseClient } from '@/lib/supabase/supabaseClient';
import { mutationType } from '@/utils/enums';
import { useMutation } from '@tanstack/react-query';

interface SupabaseMutationOptions {
  table: string;
  type: mutationType.INSERT | mutationType.UPDATE | mutationType.DELETE;
  match?: Record<string, any>;
}

interface MutationPayload {
  data?: any; // data to insert/update
  isEditing?: boolean; // optional flag for UI logic
  onSuccessCallback?: () => void;
  onErrorCallback?: (error: any) => void;
}

export function useSupabaseMutation({ table, type = mutationType.INSERT, match = {} }: SupabaseMutationOptions) {
  const supabase = getSupabaseClient();

  return useMutation<any, any, MutationPayload>({
    mutationFn: async (payload) => {
      const { data } = payload;

      let query = supabase.from(table);

      try {
        let result;

        switch (type) {
          case mutationType.INSERT:
            result = await query.insert(data).select();
            break;

          case mutationType.UPDATE:
            result = await query.update(data).match(match).select();
            break;

          case mutationType.DELETE:
            result = await query.delete().match(match);
            break;

          default:
            throw new Error('Invalid mutation type');
        }

        if (result.error) throw result.error;
        return result.data;
      } catch (err) {
        throw err;
      }
    },

    onSuccess: (data, payload) => {
      payload?.onSuccessCallback?.();
    },

    onError: (err, payload) => {
      payload?.onErrorCallback?.(err);
    },
  });
}
