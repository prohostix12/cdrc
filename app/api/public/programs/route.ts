import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDb();
    const programs = await db.collection('programs').find({}).toArray();
    return NextResponse.json(programs.map(p => ({ ...p, _id: p._id.toString() })));
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
