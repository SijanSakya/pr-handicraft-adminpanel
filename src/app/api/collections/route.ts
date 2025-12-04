import { getServerSupabaseClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { table: string } }) {
  try {
    const table = 'Collections';
    if (!table) return NextResponse.json({ error: 'Table name is required' }, { status: 400 });

    const supabase = getServerSupabaseClient();
    const url = new URL(req.url);

    const categoryId = url.searchParams.get('category_id');
    const isLoved = url.searchParams.get('is_loved');
    const isLatest = url.searchParams.get('is_latest');

    // Pagination params
    const page = parseInt(url.searchParams.get('page') || '1', 10); // default page 1
    const limit = parseInt(url.searchParams.get('limit') || '10', 10); // default 10 items per page
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase.from(table).select('*');

    // Filters
    if (categoryId) {
      query = query.eq('category_id', parseInt(categoryId, 10));
    }
    if (isLoved !== null) {
      query = query.eq('is_loved', isLoved.toLowerCase() === 'true');
    }
    if (isLatest !== null) {
      query = query.eq('is_latest', isLatest.toLowerCase() === 'true');
    }

    // Sort latest first by `created_at` descending
    query = query.order('created_at', { ascending: false });

    // Apply pagination
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        count: count ?? data.length,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
