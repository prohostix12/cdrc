import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const db = await getDb();
    const program = await db.collection('programs').findOne({ _id: new ObjectId(params.id) });
    
    if (!program) {
      return NextResponse.json({ success: false, error: 'Program not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: program });
  } catch (error) {
    console.error('Error fetching program:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch program' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const body = await req.json();
    const {
      name, duration, university, universityId, description,
      category, level, mode, fee, feePeriod,
      eligibility, image, brochureUrl, youtubeUrl,
      syllabus, highlights, careerOptions, specializations,
      metaTitle, metaDescription, keywords, canonicalUrl, robotsMeta,
      ogTitle, ogImage, ogDescription,
      featured, active,
    } = body;

    if (!name || !duration) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection('programs').updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          name, duration,
          university: university || '',
          universityId: universityId || '',
          description: description || '',
          category: category || '',
          level: level || '',
          mode: mode || 'Online',
          fee: fee || null,
          feePeriod: feePeriod || 'Total',
          eligibility: eligibility || '',
          image: image || '',
          brochureUrl: brochureUrl || '',
          youtubeUrl: youtubeUrl || '',
          syllabus: syllabus || [],
          highlights: highlights || [],
          careerOptions: careerOptions || [],
          specializations: specializations || [],
          metaTitle: metaTitle || '',
          metaDescription: metaDescription || '',
          keywords: keywords || '',
          canonicalUrl: canonicalUrl || '',
          robotsMeta: robotsMeta || 'Index, Follow',
          ogTitle: ogTitle || '',
          ogImage: ogImage || '',
          ogDescription: ogDescription || '',
          featured: featured || false,
          active: active !== undefined ? active : true,
          updatedAt: new Date(),
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: 'Program not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: { _id: params.id, ...body } });
  } catch (error) {
    console.error('Error updating program:', error);
    return NextResponse.json({ success: false, error: 'Failed to update program' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const db = await getDb();
    const result = await db.collection('programs').deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: 'Program not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: { deleted: true } });
  } catch (error) {
    console.error('Error deleting program:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete program' }, { status: 500 });
  }
}
