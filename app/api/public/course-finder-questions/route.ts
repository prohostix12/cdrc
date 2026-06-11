import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDb();
    const questions = await db.collection('courseFinderQuestions')
      .find({ isActive: true })
      .sort({ order: 1 })
      .toArray();
    const res = NextResponse.json(questions.map(q => ({ ...q, _id: q._id.toString() })));
    res.headers.set('Cache-Control', 'no-store');
    return res;
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
