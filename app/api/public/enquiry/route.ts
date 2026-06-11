import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, source } = body;
    if (!name || !email || !phone) {
      return NextResponse.json({ message: 'Name, email and phone are required' }, { status: 400 });
    }
    const db = await getDb();
    await db.collection('contacts').insertOne({
      name, email, phone,
      message: `Course Finder enquiry from ${source || 'website'}`,
      source: source || 'Course Finder',
      createdAt: new Date(),
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: 'Failed to submit enquiry' }, { status: 500 });
  }
}
