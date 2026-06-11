import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

const CATEGORY_INFO: Record<string, {
  title: string;
  description: string;
  icon: string;
  color: string;
  keywords: string[];
  fallbackCourses: { name: string; description: string }[];
}> = {
  TECH: {
    title: 'Technology & Computing',
    description: 'You have a strong aptitude for technology and logical thinking. You thrive on solving complex problems, building systems, and working with data. Careers in software engineering, data science, AI, and cybersecurity are excellent fits for you.',
    icon: '💻',
    color: '#3b82f6',
    keywords: ['computer', 'software', 'data', 'technology', 'IT', 'engineering', 'cyber', 'programming', 'BCA', 'B.Tech', 'MCA', 'information', 'science'],
    fallbackCourses: [
      { name: 'B.Tech Computer Science', description: 'Core programming, algorithms, AI, and software engineering' },
      { name: 'BCA – Bachelor of Computer Applications', description: 'Application development, databases, and web technologies' },
      { name: 'M.Sc Data Science', description: 'Machine learning, big data analytics, and statistics' },
      { name: 'Cyber Security & Ethical Hacking', description: 'Network security, penetration testing, and digital forensics' },
    ],
  },
  BIZ: {
    title: 'Business & Management',
    description: 'You are a natural leader with a sharp business instinct. You excel at planning, organising, and driving results. A career in management, entrepreneurship, finance, or marketing is the perfect path for you.',
    icon: '📊',
    color: '#10b981',
    keywords: ['business', 'management', 'commerce', 'finance', 'MBA', 'BBA', 'marketing', 'accounting', 'economics', 'entrepreneurship', 'HR'],
    fallbackCourses: [
      { name: 'BBA – Bachelor of Business Administration', description: 'Management fundamentals, marketing, and organisational behaviour' },
      { name: 'MBA – Master of Business Administration', description: 'Advanced leadership, strategy, and business operations' },
      { name: 'B.Com – Bachelor of Commerce', description: 'Accounting, finance, taxation, and economics' },
      { name: 'Digital Marketing & E-Commerce', description: 'SEO, social media, content strategy, and online business' },
    ],
  },
  HEALTH: {
    title: 'Healthcare & Medicine',
    description: 'You are compassionate, detail-oriented, and driven by the desire to help others. A career in medicine, nursing, pharmacy, or healthcare management will allow you to make a real difference in people\'s lives.',
    icon: '🏥',
    color: '#ef4444',
    keywords: ['medical', 'nursing', 'health', 'pharmacy', 'MBBS', 'physiotherapy', 'dental', 'medicine', 'biology', 'paramedic', 'nutrition'],
    fallbackCourses: [
      { name: 'MBBS – Bachelor of Medicine', description: 'Clinical medicine, surgery, and patient care' },
      { name: 'B.Sc Nursing', description: 'Patient care, clinical skills, and healthcare management' },
      { name: 'B.Pharm – Bachelor of Pharmacy', description: 'Pharmacology, drug development, and clinical research' },
      { name: 'Physiotherapy & Rehabilitation', description: 'Physical therapy, sports medicine, and rehabilitation science' },
    ],
  },
  ARTS: {
    title: 'Arts, Design & Media',
    description: 'You are a creative visionary who expresses ideas through art, design, and storytelling. Careers in graphic design, architecture, mass communication, fashion, or film are perfectly suited to your talents.',
    icon: '🎨',
    color: '#f59e0b',
    keywords: ['design', 'arts', 'media', 'film', 'music', 'architecture', 'fashion', 'creative', 'mass communication', 'animation', 'photography', 'BFA'],
    fallbackCourses: [
      { name: 'BFA – Bachelor of Fine Arts', description: 'Visual arts, painting, sculpture, and digital art' },
      { name: 'Mass Communication & Journalism', description: 'Broadcasting, content creation, and media production' },
      { name: 'B.Arch – Bachelor of Architecture', description: 'Architectural design, urban planning, and construction' },
      { name: 'Fashion Design & Merchandising', description: 'Garment design, textile science, and fashion retail' },
    ],
  },
  SCI: {
    title: 'Science & Research',
    description: 'You are analytical, curious, and love exploring how the world works. A career in pure science, research, or applied sciences like biotechnology or environmental science suits your inquisitive mind.',
    icon: '🔬',
    color: '#8b5cf6',
    keywords: ['science', 'physics', 'chemistry', 'biology', 'research', 'botany', 'zoology', 'biotechnology', 'B.Sc', 'M.Sc', 'mathematics'],
    fallbackCourses: [
      { name: 'B.Sc Physics / Chemistry / Biology', description: 'Core sciences with laboratory and research focus' },
      { name: 'Biotechnology & Genetic Engineering', description: 'Molecular biology, gene editing, and biomedical research' },
      { name: 'Environmental Science', description: 'Ecology, climate science, and sustainability studies' },
      { name: 'M.Sc Mathematics & Statistics', description: 'Advanced mathematics, modelling, and data analysis' },
    ],
  },
  EDU: {
    title: 'Education & Training',
    description: 'You are patient, communicative, and passionate about sharing knowledge. A career in teaching, training, or educational leadership will let you inspire the next generation.',
    icon: '📖',
    color: '#06b6d4',
    keywords: ['education', 'teaching', 'B.Ed', 'M.Ed', 'training', 'pedagogy', 'school', 'curriculum'],
    fallbackCourses: [
      { name: 'B.Ed – Bachelor of Education', description: 'Teaching methods, child psychology, and curriculum development' },
      { name: 'M.Ed – Master of Education', description: 'Educational leadership, research, and policy' },
      { name: 'Early Childhood Education', description: 'Child development, play-based learning, and school readiness' },
      { name: 'Educational Technology & E-Learning', description: 'Digital tools, LMS platforms, and online course design' },
    ],
  },
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { answers, sessionId } = body as {
      answers: { questionId: number; optionIndex: number; categories: string[] }[];
      sessionId: string;
    };

    if (!answers || answers.length === 0) {
      return NextResponse.json({ error: 'No answers provided' }, { status: 400 });
    }

    // Tally category scores
    const scores: Record<string, number> = { TECH: 0, BIZ: 0, HEALTH: 0, ARTS: 0, SCI: 0, EDU: 0 };
    for (const answer of answers) {
      for (const cat of answer.categories) {
        if (scores[cat] !== undefined) scores[cat]++;
        else scores[cat] = 1;
      }
    }

    // Sort categories by score
    const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const topCategory = ranked[0][0];
    const categoryInfo = CATEGORY_INFO[topCategory] || CATEGORY_INFO.TECH;

    // Query DB for matching programs and skills
    let recommendedPrograms: { _id: string; name: string; description?: string; slug?: string }[] = [];
    let recommendedSkills: { _id: string; name: string; description?: string }[] = [];

    try {
      const db = await getDb();
      const keywords = categoryInfo.keywords;
      const regex = new RegExp(keywords.join('|'), 'i');

      const programs = await db.collection('programs')
        .find({ $or: [{ name: regex }, { description: regex }, { field: regex }] })
        .limit(4)
        .toArray();

      const skills = await db.collection('skills')
        .find({ $or: [{ name: regex }, { description: regex }, { category: regex }] })
        .limit(3)
        .toArray();

      recommendedPrograms = programs.map(p => ({
        _id: p._id.toString(),
        name: p.name,
        description: p.description,
        slug: p.slug,
      }));

      recommendedSkills = skills.map(s => ({
        _id: s._id.toString(),
        name: s.name,
        description: s.description,
      }));
    } catch (_dbErr) {
      // DB unavailable — fall through to fallback courses below
    }

    // Use fallback courses if DB returned nothing
    const coursesToShow = recommendedPrograms.length > 0 || recommendedSkills.length > 0
      ? { programs: recommendedPrograms, skills: recommendedSkills }
      : { programs: categoryInfo.fallbackCourses as typeof recommendedPrograms, skills: [] };

    // Persist result
    try {
      const db = await getDb();
      await db.collection('aptitude_results').insertOne({
        sessionId: sessionId || null,
        answers,
        scores,
        topCategory,
        createdAt: new Date(),
      });
    } catch (_saveErr) {
      // Non-fatal — still return the result
    }

    return NextResponse.json({
      scores,
      ranked: ranked.map(([cat, score]) => ({
        category: cat,
        score,
        info: CATEGORY_INFO[cat] || null,
      })),
      topCategory,
      categoryInfo,
      recommendedPrograms: coursesToShow.programs,
      recommendedSkills: coursesToShow.skills,
    });
  } catch (error) {
    console.error('Aptitude result error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await getDb();
    const results = await db.collection('aptitude_results')
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json({
      results: results.map(r => ({ ...r, _id: r._id.toString() })),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch results' }, { status: 500 });
  }
}
