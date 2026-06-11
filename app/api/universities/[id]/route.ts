import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const db = await getDb();
    const university = await db.collection('universities').findOne({ _id: new ObjectId(params.id) });
    
    if (!university) {
      return NextResponse.json({ success: false, error: 'University not found' }, { status: 404 });
    }

    // Convert MongoDB _id to string for proper serialization
    const serializedUniversity = {
      ...university,
      _id: university._id.toString()
    };

    return NextResponse.json({ success: true, data: serializedUniversity });
  } catch (error) {
    console.error('Error fetching university:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch university' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const body = await req.json();

    const db = await getDb();
    const result = await db.collection('universities').updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          ...body,
          updatedAt: new Date(),
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: 'University not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: { _id: params.id, ...body } });
  } catch (error) {
    console.error('Error updating university:', error);
    return NextResponse.json({ success: false, error: 'Failed to update university' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const db = await getDb();
    const result = await db.collection('universities').deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: 'University not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: { deleted: true } });
  } catch (error) {
    console.error('Error deleting university:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete university' }, { status: 500 });
  }
}
