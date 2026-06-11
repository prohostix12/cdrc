import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentName, email, phone, university, program } = body;

    if (!studentName || !email || !phone || !university || !program) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = await getDb();
    await db.collection('enrollments').insertOne({
      studentName,
      email,
      phone,
      university,
      program,
      message: body.message || '',
      status: 'pending',
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save enrollment' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await getDb();
    const enrollments = await db.collection('enrollments')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    const serializedEnrollments = enrollments.map(enr => ({
      ...enr,
      _id: enr._id.toString(),
      status: enr.status || 'pending'
    }));
    
    return NextResponse.json({ success: true, data: serializedEnrollments });
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch enrollments' }, { status: 500 });
  }
}
