import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { allUniversities, openSchoolData } from '@/lib/data';

export async function POST() {
  try {
    const db = await getDb();

    const uniCount = await db.collection('universities').countDocuments();
    if (uniCount === 0) {
      const universitiesWithSlugs = allUniversities.map(uni => ({
        ...uni,
        slug: uni.slug || uni.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        location: uni.location || 'India',
        naac: uni.ranking || uni.accreditation,
        description: uni.description || `${uni.name} is a UGC-approved university offering quality online degree programs with flexible learning options.`,
        facilities: uni.facilities?.length ? uni.facilities : ['Online Learning Platform', 'Digital Library', 'Student Support', 'Live Classes', 'Career Guidance'],
        ranking: uni.ranking || uni.accreditation,
      }));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await db.collection('universities').insertMany(universitiesWithSlugs as any[]);
    } else {
      // Upsert extended fields for existing universities (idempotent update)
      for (const uni of allUniversities) {
        const slug = uni.slug || uni.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        await db.collection('universities').updateOne(
          { $or: [{ slug }, { name: uni.name }] },
          {
            $set: {
              slug,
              location: uni.location || 'India',
              naac: uni.ranking || uni.accreditation,
              description: uni.description || `${uni.name} is a UGC-approved university offering quality online degree programs.`,
              facilities: uni.facilities?.length ? uni.facilities : ['Online Learning Platform', 'Digital Library', 'Student Support'],
              ranking: uni.ranking || uni.accreditation,
            },
          }
        );
      }
    }

    const boardCount = await db.collection('openSchool').countDocuments();
    if (boardCount === 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await db.collection('openSchool').insertMany(openSchoolData as any[]);
    }

    return NextResponse.json({
      success: true,
      message: `Seeded: ${uniCount === 0 ? allUniversities.length : 0} universities, ${boardCount === 0 ? openSchoolData.length : 0} boards`,
    });
  } catch (err) {
    console.error('Seed error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
