import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDb();
    const messages = await db.collection('contactMessages')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    const serializedMessages = messages.map(msg => ({
      ...msg,
      _id: msg._id.toString()
    }));
    
    return NextResponse.json({ success: true, data: serializedMessages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email and message are required' }, { status: 400 });
    }

    const db = await getDb();
    await db.collection('contactMessages').insertOne({
      name, email, phone: phone || '', subject: subject || '', message,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
