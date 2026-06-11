import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDb();
    const boards = await db.collection('openSchool').find({}).toArray();
    return NextResponse.json(boards);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch open school data' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, icon, description, programs } = body;

    if (!name || !icon || !description) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection('openSchool').insertOne({
      name,
      icon,
      description,
      programs: programs || [],
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, data: { _id: result.insertedId, name, icon, description, programs } });
  } catch (error) {
    console.error('Error creating board:', error);
    return NextResponse.json({ success: false, error: 'Failed to create board' }, { status: 500 });
  }
}
