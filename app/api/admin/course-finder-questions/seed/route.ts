import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

const DEFAULT_QUESTIONS = [
  {
    question: 'What is your highest education qualification?',
    field: 'education',
    order: 1,
    isActive: true,
    options: [
      { value: 'below_12', label: 'Below 12th', icon: 'fa-school' },
      { value: '12th', label: '12th Pass', icon: 'fa-graduation-cap' },
      { value: 'graduate', label: 'Graduate (Bachelor\'s)', icon: 'fa-user-graduate' },
      { value: 'postgraduate', label: 'Post Graduate', icon: 'fa-award' },
    ],
  },
  {
    question: 'What is your preferred field of study?',
    field: 'field',
    order: 2,
    isActive: true,
    options: [
      { value: 'management', label: 'Management', icon: 'fa-briefcase', categories: ['MBA', 'BBA', 'PGDM'] },
      { value: 'technology', label: 'Technology', icon: 'fa-laptop-code', categories: ['MCA', 'BCA', 'B.Tech'] },
      { value: 'commerce', label: 'Commerce', icon: 'fa-chart-line', categories: ['M.Com', 'B.Com'] },
      { value: 'arts', label: 'Arts & Humanities', icon: 'fa-palette', categories: ['MA', 'BA'] },
      { value: 'science', label: 'Science', icon: 'fa-flask', categories: ['M.Sc', 'B.Sc'] },
    ],
  },
  {
    question: 'What is your primary career goal?',
    field: 'goal',
    order: 3,
    isActive: true,
    options: [
      { value: 'job', label: 'Get a Better Job', icon: 'fa-building' },
      { value: 'promotion', label: 'Career Promotion', icon: 'fa-arrow-trend-up' },
      { value: 'business', label: 'Start a Business', icon: 'fa-store' },
      { value: 'higher_studies', label: 'Higher Studies', icon: 'fa-book-open' },
    ],
  },
];

export async function POST() {
  try {
    const db = await getDb();
    const existing = await db.collection('courseFinderQuestions').countDocuments();
    if (existing > 0) {
      return NextResponse.json({ message: `Already have ${existing} questions. Delete them first to re-seed.` });
    }
    await db.collection('courseFinderQuestions').insertMany(
      DEFAULT_QUESTIONS.map(q => ({ ...q, createdAt: new Date() }))
    );
    return NextResponse.json({ message: `Seeded ${DEFAULT_QUESTIONS.length} default questions successfully!` });
  } catch {
    return NextResponse.json({ message: 'Seed failed' }, { status: 500 });
  }
}
