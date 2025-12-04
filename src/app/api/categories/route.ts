import { getServerSupabaseClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { table: string } }) {
  try {
    const table = 'Categories';
    if (!table) return NextResponse.json({ error: 'Table name is required' }, { status: 400 });

    const supabase = getServerSupabaseClient();

    // Optional query params for filtering
    const url = new URL(req.url);
    const filters = url.searchParams;

    let query = supabase.from(table).select('*');

    filters.forEach((value, key) => {
      query = query.eq(key, value);
    });

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
