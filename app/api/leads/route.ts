import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDb();
    const leads = await db.collection('leads').find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ success: true, data: leads });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Incoming Lead:', body);
    const { name, phone, email, course, programName, source } = body;

    if (!name || !phone || !email) {
      return NextResponse.json({ success: false, error: 'Name, phone and email are required' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection('leads').insertOne({
      name, phone, email,
      course: course || programName || '',
      source: source || 'Brochure Download',
      status: 'New',
      createdAt: new Date(),
      ...body, // Capture extra fields like 'message' or 'prefs'
    });

    return NextResponse.json({ success: true, data: { _id: result.insertedId } });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to save lead' }, { status: 500 });
  }
}
