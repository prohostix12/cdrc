import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const db = await getDb();
    const board = await db.collection('openSchool').findOne({ _id: new ObjectId(params.id) });
    
    if (!board) {
      return NextResponse.json({ success: false, error: 'Board not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: board });
  } catch (error) {
    console.error('Error fetching board:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch board' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const body = await req.json();
    const { name, icon, description, programs } = body;

    if (!name || !icon || !description) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection('openSchool').updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          name,
          icon,
          description,
          programs: programs || [],
          updatedAt: new Date(),
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: 'Board not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: { _id: params.id, name, icon, description, programs } });
  } catch (error) {
    console.error('Error updating board:', error);
    return NextResponse.json({ success: false, error: 'Failed to update board' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const db = await getDb();
    const result = await db.collection('openSchool').deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: 'Board not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: { deleted: true } });
  } catch (error) {
    console.error('Error deleting board:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete board' }, { status: 500 });
  }
}
