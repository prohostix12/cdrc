import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const APTITUDE_QUESTIONS = [
  {
    id: 0,
    emoji: '💻',
    question: 'Which activity excites you the most?',
    options: [
      { text: 'Building apps, websites, or working with computers', categories: ['TECH'] },
      { text: 'Starting a business or managing a team', categories: ['BIZ'] },
      { text: 'Helping patients or working in healthcare', categories: ['HEALTH'] },
      { text: 'Creating art, music, designs, or writing stories', categories: ['ARTS'] },
    ],
  },
  {
    id: 1,
    emoji: '📚',
    question: 'Which school subject fascinated you the most?',
    options: [
      { text: 'Mathematics or Computer Science', categories: ['TECH'] },
      { text: 'Economics or Business Studies', categories: ['BIZ'] },
      { text: 'Biology or Chemistry', categories: ['HEALTH', 'SCI'] },
      { text: 'Arts, Literature, or Languages', categories: ['ARTS'] },
    ],
  },
  {
    id: 2,
    emoji: '🔍',
    question: 'How do you prefer to solve a difficult problem?',
    options: [
      { text: 'Analyze data and find a logical solution', categories: ['TECH', 'SCI'] },
      { text: 'Create a plan and delegate tasks to others', categories: ['BIZ'] },
      { text: 'Talk to people and find a human-centred approach', categories: ['HEALTH', 'EDU'] },
      { text: 'Think outside the box with creative ideas', categories: ['ARTS'] },
    ],
  },
  {
    id: 3,
    emoji: '🏢',
    question: 'Which work environment appeals to you the most?',
    options: [
      { text: 'A tech company, startup, or research lab', categories: ['TECH', 'SCI'] },
      { text: 'A corporate office or your own business', categories: ['BIZ'] },
      { text: 'A hospital, clinic, or wellness centre', categories: ['HEALTH'] },
      { text: 'A design studio, film set, or media house', categories: ['ARTS'] },
    ],
  },
  {
    id: 4,
    emoji: '🏆',
    question: 'Which achievement would make you most proud?',
    options: [
      { text: 'Launching an app or product used by millions', categories: ['TECH'] },
      { text: 'Building a successful company from scratch', categories: ['BIZ'] },
      { text: 'Saving lives or improving someone\'s health', categories: ['HEALTH'] },
      { text: 'Creating something beautiful that inspires others', categories: ['ARTS'] },
    ],
  },
  {
    id: 5,
    emoji: '💡',
    question: 'What motivates you to work hard every day?',
    options: [
      { text: 'Solving complex technical or scientific challenges', categories: ['TECH', 'SCI'] },
      { text: 'Financial success and building wealth', categories: ['BIZ'] },
      { text: 'Making a positive impact on people\'s lives', categories: ['HEALTH', 'EDU'] },
      { text: 'Self-expression and creative fulfilment', categories: ['ARTS'] },
    ],
  },
  {
    id: 6,
    emoji: '🛠️',
    question: 'Which skill would you most like to master?',
    options: [
      { text: 'Programming, AI, robotics, or data analysis', categories: ['TECH'] },
      { text: 'Leadership, marketing, or financial planning', categories: ['BIZ'] },
      { text: 'Patient care, diagnosis, or counselling', categories: ['HEALTH'] },
      { text: 'Design, photography, filmmaking, or writing', categories: ['ARTS'] },
    ],
  },
  {
    id: 7,
    emoji: '🤝',
    question: 'How do you enjoy working with other people?',
    options: [
      { text: 'Collaborating on technical or scientific projects', categories: ['TECH', 'SCI'] },
      { text: 'Leading, mentoring, or managing a team', categories: ['BIZ', 'EDU'] },
      { text: 'Providing direct care or support to individuals', categories: ['HEALTH'] },
      { text: 'Co-creating art, content, or media with others', categories: ['ARTS'] },
    ],
  },
  {
    id: 8,
    emoji: '🚀',
    question: 'Which emerging field excites you the most?',
    options: [
      { text: 'Artificial Intelligence, cybersecurity, or cloud computing', categories: ['TECH'] },
      { text: 'FinTech, e-commerce, or entrepreneurship', categories: ['BIZ'] },
      { text: 'Medical research, biotechnology, or mental health', categories: ['HEALTH', 'SCI'] },
      { text: 'Digital media, animation, AR/VR, or gaming', categories: ['ARTS'] },
    ],
  },
  {
    id: 9,
    emoji: '🌟',
    question: 'Where do you see yourself in 10 years?',
    options: [
      { text: 'Building innovative tech products or leading R&D', categories: ['TECH'] },
      { text: 'Running my own business or leading a company', categories: ['BIZ'] },
      { text: 'Working as a doctor, nurse, or health professional', categories: ['HEALTH'] },
      { text: 'Working in films, design, fashion, or the creative industry', categories: ['ARTS'] },
    ],
  },
];

export async function GET() {
  return NextResponse.json({ questions: APTITUDE_QUESTIONS });
}
