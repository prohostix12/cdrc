import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, messages } = body;

    if (!sessionId || !messages) {
      return NextResponse.json({ error: 'Missing sessionId or messages' }, { status: 400 });
    }

    const db = await getDb();
    await db.collection('chatSessions').insertOne({
      sessionId,
      messages,
      startedAt: body.startedAt || new Date(),
      endedAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save chat session' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await getDb();
    const sessions = await db.collection('chatSessions').find({}).sort({ startedAt: -1 }).toArray();
    return NextResponse.json(sessions);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch chat sessions' }, { status: 500 });
  }
}
