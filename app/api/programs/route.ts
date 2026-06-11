import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDb();
    const programs = await db.collection('programs').find({}).toArray();
    return NextResponse.json({ success: true, data: programs });
  } catch (error) {
    console.error('Error fetching programs:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch programs' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, duration } = body;

    if (!name || !duration) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const db = await getDb();
    const doc = {
      name, duration,
      university: body.university || '',
      universityId: body.universityId || '',
      description: body.description || '',
      category: body.category || '',
      courseType: body.courseType || '',
      level: body.level || '',
      qualification: body.qualification || '',
      mode: body.mode || 'Online',
      fee: body.fee || null,
      feePeriod: body.feePeriod || 'Total',
      eligibility: body.eligibility || '',
      image: body.image || '',
      brochureUrl: body.brochureUrl || '',
      youtubeUrl: body.youtubeUrl || '',
      syllabus: body.syllabus || [],
      highlights: body.highlights || [],
      careerOptions: body.careerOptions || [],
      specializations: body.specializations || [],
      metaTitle: body.metaTitle || '',
      metaDescription: body.metaDescription || '',
      keywords: body.keywords || '',
      canonicalUrl: body.canonicalUrl || '',
      ogTitle: body.ogTitle || '',
      ogImage: body.ogImage || '',
      ogDescription: body.ogDescription || '',
      featured: body.featured || false,
      active: body.active !== undefined ? body.active : true,
      createdAt: new Date(),
    };

    const result = await db.collection('programs').insertOne(doc);
    return NextResponse.json({ success: true, data: { _id: result.insertedId, ...doc } });
  } catch (error) {
    console.error('Error creating program:', error);
    return NextResponse.json({ success: false, error: 'Failed to create program' }, { status: 500 });
  }
}
