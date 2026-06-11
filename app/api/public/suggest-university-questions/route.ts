import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDb();
    const questions = await db.collection('suggestUniversityQuestions')
      .find({ isActive: true })
      .sort({ order: 1 })
      .toArray();
    return NextResponse.json(questions.map(q => ({ ...q, _id: q._id.toString() })));
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
