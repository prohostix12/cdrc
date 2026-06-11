import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDb();
    const questions = await db.collection('suggestUniversityQuestions').find({}).sort({ order: 1 }).toArray();
    return NextResponse.json(questions.map(q => ({ ...q, _id: q._id.toString() })));
  } catch {
    return NextResponse.json({ message: 'Failed to fetch questions' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = await getDb();
    const result = await db.collection('suggestUniversityQuestions').insertOne({ ...body, createdAt: new Date() });
    return NextResponse.json({ ...body, _id: result.insertedId.toString() }, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Failed to create question' }, { status: 500 });
  }
}
