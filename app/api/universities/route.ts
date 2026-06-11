import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDb();
    const universities = await db.collection('universities').find({}).toArray();
    
    // Convert MongoDB _id to string for proper serialization
    const serializedUniversities = universities.map(uni => ({
      ...uni,
      _id: uni._id.toString()
    }));
    
    return NextResponse.json({ success: true, data: serializedUniversities });
  } catch (error) {
    console.error('Error fetching universities:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch universities' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const db = await getDb();
    const result = await db.collection('universities').insertOne({
      ...body,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, data: { _id: result.insertedId, ...body } });
  } catch (error) {
    console.error('Error creating university:', error);
    return NextResponse.json({ success: false, error: 'Failed to create university' }, { status: 500 });
  }
}
