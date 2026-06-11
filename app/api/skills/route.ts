import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDb();
    const skills = await db.collection('skills').find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ success: true, data: skills.map(s => ({ ...s, _id: s._id.toString() })) });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch skills' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, category, duration, level, price, image, courses } = body;
    if (!name || !description) {
      return NextResponse.json({ success: false, error: 'Name and description are required' }, { status: 400 });
    }
    const db = await getDb();
    const result = await db.collection('skills').insertOne({
      name, description, category: category || 'General',
      duration: duration || '', level: level || 'Beginner',
      price: price || '', image: image || '',
      courses: courses || [],
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      createdAt: new Date(),
    });
    return NextResponse.json({ success: true, data: { _id: result.insertedId.toString(), name } });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to create skill' }, { status: 500 });
  }
}
