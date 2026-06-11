import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function POST() {
  try {
    const db = await getDb();
    const universities = await db.collection('universities').find({}).toArray();
    
    let updated = 0;
    
    for (const uni of universities) {
      // Generate slug if it doesn't exist
      if (!uni.slug) {
        const slug = uni.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        
        await db.collection('universities').updateOne(
          { _id: uni._id },
          { 
            $set: { 
              slug,
              location: uni.location || 'India',
              description: uni.description || `${uni.name} offers quality online education with UGC-approved programs.`,
              facilities: uni.facilities || ['Online Learning Platform', 'Digital Library', 'Student Support'],
              ranking: uni.ranking || uni.naac || uni.accreditation
            } 
          }
        );
        updated++;
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Updated ${updated} universities with slugs and missing fields` 
    });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json({ success: false, error: 'Migration failed' }, { status: 500 });
  }
}
