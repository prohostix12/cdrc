export interface Program {
  name: string;
  duration: string;
}

export interface University {
  name: string;
  accreditation: string;
  logoInitial: string;
  programs: Program[];
  // Extended fields for featured universities
  id?: string;
  slug?: string;
  image?: string;
  location?: string;
  description?: string;
  facilities?: string[];
  ranking?: string;
}

export interface OpenSchoolProgram {
  name: string;
  subjects: string;
}

export interface Board {
  name: string;
  icon: string;
  description: string;
  programs: OpenSchoolProgram[];
}

export const universitiesData: University[] = [
  {
    name: 'AMRITHA VISHWA VIDYAPEETHAM', accreditation: 'UGC Approved | NAAC Accredited', logoInitial: 'A',
    programs: [
      { name: 'B COM', duration: '3 Years' },
      { name: 'BBA (GENERAL)', duration: '3 Years' },
      { name: 'BCA (GENERAL)', duration: '3 Years' },
      { name: 'BCA (ARTIFICIAL INTELLIGENCE & DATA SCIENCE)', duration: '3 Years' },
      { name: 'MBA (MARKETING, FINANCE, OPERATION, HR)', duration: '2 Years' },
      { name: 'MBA (GENERAL MANAGEMENT)', duration: '2 Years' },
      { name: 'MBA (ARTIFICIAL INTELLIGENCE)', duration: '2 Years' },
      { name: 'MCA (ARTIFICIAL INTELLIGENCE)', duration: '2 Years' },
      { name: 'MCA (CYBER SECURITY)', duration: '2 Years' },
      { name: 'MCA (GENERAL)', duration: '2 Years' },
      { name: 'MCOM', duration: '2 Years' },
    ],
  },
  {
    name: 'ANDHRA UNIVERSITY', accreditation: 'UGC Approved | NAAC Accredited', logoInitial: 'A',
    programs: [
      { name: 'BA (HISTORY, ECONOMICS, POLITICS)', duration: '3 Years' },
      { name: 'B COM', duration: '3 Years' },
      { name: 'M COM', duration: '2 Years' },
      { name: 'MA (POLITICAL SCIENCE, ENGLISH, ECONOMICS)', duration: '2 Years' },
      { name: 'MA (HUMAN RESOURCE MANAGEMENT)', duration: '2 Years' },
      { name: 'MA (JOURNALISM & MASS COMMUNICATION)', duration: '2 Years' },
    ],
  },
  {
    name: 'Guru Kashi University', accreditation: 'UGC Approved | NAAC Accredited', logoInitial: 'G',
    programs: [
      { name: 'BA (GENERAL)', duration: '3 Years' },
      { name: 'BBA', duration: '3 Years' },
      { name: 'BCA', duration: '3 Years' },
      { name: 'MA (HISTORY, ECONOMICS, POLITICAL SCIENCE, SOCIOLOGY, HINDI)', duration: '2 Years' },
      { name: 'M COM', duration: '2 Years' },
      { name: 'MLIS', duration: '2 Years' },
      { name: 'MBA', duration: '2 Years' },
      { name: 'MCA', duration: '2 Years' },
    ],
  },
];

export const universitiesDataExtra: University[] = [
  {
    name: 'Jamia Hamdard', accreditation: 'UGC Approved | NAAC Accredited', logoInitial: 'J',
    programs: [
      { name: 'B COM', duration: '3 Years' },
      { name: 'BBA', duration: '3 Years' },
      { name: 'BCA', duration: '3 Years' },
      { name: 'MA (HUMAN RIGHTS)', duration: '2 Years' },
      { name: 'MA (ISLAMIC STUDIES)', duration: '2 Years' },
      { name: 'MBA', duration: '2 Years' },
    ],
  },
  {
    name: 'ALIGARH MUSLIM UNIVERSITY', accreditation: 'UGC Approved | NAAC Accredited', logoInitial: 'A',
    programs: [
      { name: 'BA WITH INTERNSHIP (ENGLISH, ECONOMICS, HINDI, HISTORY, POLITICAL SCIENCE, URDU)', duration: '3 Years' },
      { name: 'B COM WITH INTERNSHIP', duration: '3 Years' },
      { name: 'MA WITH INTERNSHIP (ENGLISH, ECONOMICS, HINDI, HISTORY, POLITICAL SCIENCE, URDU)', duration: '2 Years' },
      { name: 'M COM WITH INTERNSHIP', duration: '2 Years' },
    ],
  },
  {
    name: 'AMITY University', accreditation: 'UGC Approved | NAAC A++', logoInitial: 'A',
    id: 'amity',
    slug: 'amity',
    image: 'from-blue-600 to-blue-900',
    location: 'Noida, Uttar Pradesh',
    description: 'Amity University is one of India\'s premier private universities, renowned for its world-class infrastructure and academic excellence. With NAAC A++ accreditation and WES recognition, Amity offers globally benchmarked online programs designed for working professionals. Its online programs combine cutting-edge curriculum with flexible learning to help students advance their careers.',
    facilities: ['Digital Library', 'Online Labs', 'Career Support', 'Live Mentorship', 'Industry Tie-ups', 'Placement Assistance'],
    ranking: 'NAAC A++',
    programs: [
      { name: 'BACHELOR OF ARTS (BA)', duration: '3 Years' },
      { name: 'BACHELOR OF BUSINESS ADMINISTRATION (BBA)', duration: '3 Years' },
      { name: 'BACHELOR OF COMMERCE (BCOM)', duration: '3 Years' },
      { name: 'BACHELOR OF COMPUTER APPLICATION (BCA)', duration: '3 Years' },
      { name: 'MBA', duration: '2 Years' },
      { name: 'MBA (DUAL SPECIALIZATION)', duration: '2 Years' },
      { name: 'MCA', duration: '2 Years' },
      { name: 'MSC (DATA SCIENCE)', duration: '2 Years' },
    ],
  },
  {
    name: 'MIZORAM UNIVERSITY', accreditation: 'UGC Approved | NAAC Accredited', logoInitial: 'M',
    programs: [
      { name: 'B COM E-COMMERCE', duration: '3 Years' },
      { name: 'BBA E-BUSINESS', duration: '3 Years' },
      { name: 'MCOM', duration: '2 Years' },
      { name: 'MBA (FINANCIAL MANAGEMENT)', duration: '2 Years' },
      { name: 'MBA (MARKETING MANAGEMENT)', duration: '2 Years' },
      { name: 'DIPLOMA IN COMPUTER APPLICATION', duration: '1 Year' },
      { name: 'CERTIFICATE COURSE IN ADVANCED DIGITAL MARKETING', duration: '3 Months' },
    ],
  },
  {
    name: 'GLA University', accreditation: 'UGC Approved | NAAC Accredited', logoInitial: 'G',
    id: 'gla',
    slug: 'gla',
    image: 'from-green-600 to-green-900',
    location: 'Mathura, Uttar Pradesh',
    description: 'GLA University is a leading private university in North India, known for its strong industry connections and placement record. Established in 1991, it offers a wide range of UGC-approved online programs with a focus on practical skills and employability. The university\'s online platform provides a seamless learning experience with dedicated academic support.',
    facilities: ['E-Learning Portal', 'Virtual Classrooms', 'Placement Cell', 'Online Assessments', 'Study Material', 'Doubt Sessions'],
    ranking: 'NAAC A',
    programs: [
      { name: 'B COM', duration: '3 Years' },
      { name: 'BBA (MM, HRM, FM, BANKING & INSURANCE)', duration: '3 Years' },
      { name: 'BCA', duration: '3 Years' },
      { name: 'MBA (MM, HRM, FM, IT, OPERATION MANAGEMENT)', duration: '2 Years' },
      { name: 'MCA', duration: '2 Years' },
    ],
  },
  {
    name: 'MANIPAL University JAIPUR', accreditation: 'UGC Approved | NAAC Accredited', logoInitial: 'M',
    id: 'manipal',
    slug: 'manipal',
    image: 'from-red-600 to-red-900',
    location: 'Jaipur, Rajasthan',
    description: 'Manipal University Jaipur is a prestigious institution under the Manipal Education Group, one of India\'s most trusted education brands. The university offers UGC-DEB approved online programs with 20+ specializations, combining academic rigor with industry relevance. Students benefit from Manipal\'s vast alumni network and strong corporate partnerships.',
    facilities: ['Smart Learning Platform', 'Live Interactive Sessions', 'Industry Mentors', 'Career Services', 'Digital Library', 'Alumni Network'],
    ranking: 'NAAC A+',
    programs: [
      { name: 'BBA (HRM, MARKETING, FINANCE & ACCOUNTING)', duration: '3 Years' },
      { name: 'B COM', duration: '3 Years' },
      { name: 'BCA (DATA SCIENCE & ANALYTICS, CLOUD COMPUTING, CYBER SECURITY)', duration: '3 Years' },
      { name: 'MBA (FINANCE, HRM, DIGITAL MARKETING, MARKETING)', duration: '2 Years' },
      { name: 'MCA (AI & ML, AI & DATA SCIENCE, CLOUD COMPUTING)', duration: '2 Years' },
      { name: 'MA JMC', duration: '2 Years' },
      { name: 'M COM', duration: '2 Years' },
    ],
  },
  {
    name: 'MANGALAYATAN UNIVERSITY', accreditation: 'UGC Approved | NAAC Accredited', logoInitial: 'M',
    programs: [
      { name: 'BBA', duration: '3 Years' },
      { name: 'BCA', duration: '3 Years' },
      { name: 'BA', duration: '3 Years' },
      { name: 'MBA (MARKETING, HR, FINANCE, OPERATION MANAGEMENT)', duration: '2 Years' },
      { name: 'MCOM', duration: '2 Years' },
      { name: 'MCA', duration: '2 Years' },
      { name: 'DIPLOMA IN COMPUTER APPLICATION (DCA)', duration: '1 Year' },
    ],
  },
  {
    name: 'JAIN University', accreditation: 'UGC Approved | NAAC Accredited', logoInitial: 'J',
    id: 'jain',
    slug: 'jain',
    image: 'from-purple-600 to-purple-900',
    location: 'Bangalore, Karnataka',
    description: 'Jain University (Deemed-to-be University) is a NAAC A++ accredited institution based in Bangalore, known for its innovative Work-Learn-Play (WLP) model. The university\'s online programs are designed to be flexible and industry-aligned, allowing students to balance work and studies effectively. Jain\'s strong focus on holistic development sets it apart in the online education space.',
    facilities: ['WLP Learning Model', 'Online Proctored Exams', 'Career Counseling', 'Industry Projects', 'Peer Learning', 'Mobile App Access'],
    ranking: 'NAAC A++',
    programs: [
      { name: 'BBA (WLP)', duration: '3 Years' },
      { name: 'BCOM (WLP)', duration: '3 Years' },
      { name: 'BCA (WLP)', duration: '3 Years' },
      { name: 'MBA (WLP)', duration: '2 Years' },
      { name: 'MCA (WLP)', duration: '2 Years' },
      { name: 'MSC PSYCHOLOGY', duration: '2 Years' },
      { name: 'MCOM (WLP)', duration: '2 Years' },
    ],
  },
  {
    name: 'SIKKIM MANIPAL', accreditation: 'UGC Approved | NAAC Accredited', logoInitial: 'S',
    programs: [
      { name: 'BA (ENGLISH, SOCIOLOGY, POLITICAL SCIENCE)', duration: '3 Years' },
      { name: 'BCOM', duration: '3 Years' },
      { name: 'MBA (MARKETING, FINANCE, HR, SYSTEMS)', duration: '2 Years' },
      { name: 'MCA', duration: '2 Years' },
      { name: 'MCOM', duration: '2 Years' },
    ],
  },
  {
    name: 'Suresh Gyan Vihar University', accreditation: 'UGC Approved | NAAC Accredited', logoInitial: 'S',
    programs: [
      { name: 'BA (TRIPLE MAIN)', duration: '3 Years' },
      { name: 'BCOM', duration: '3 Years' },
      { name: 'BBA', duration: '3 Years' },
      { name: 'BCA', duration: '3 Years' },
      { name: 'MBA GENERAL', duration: '2 Years' },
      { name: 'MCA', duration: '2 Years' },
      { name: 'MCOM', duration: '2 Years' },
    ],
  },
  {
    name: 'Swami Vivekanand Subharti University', accreditation: 'UGC Approved | NAAC Accredited', logoInitial: 'S',
    programs: [
      { name: 'BA (HINDI, ENGLISH, POLITICAL SCIENCE, HISTORY, ECONOMICS)', duration: '3 Years' },
      { name: 'BACHELOR OF BUSINESS ADMINISTRATION', duration: '3 Years' },
      { name: 'BACHELOR OF COMMERCE', duration: '3 Years' },
      { name: 'MBA (IT, HRM, MARKETING MANAGEMENT, FM)', duration: '2 Years' },
      { name: 'MCOM', duration: '2 Years' },
      { name: 'MASTER OF LIBRARY AND INFORMATION SCIENCES', duration: '1 Year' },
    ],
  },
  {
    name: 'Chandigarh University', accreditation: 'UGC Approved | NAAC A+', logoInitial: 'C',
    id: 'chandigarh',
    slug: 'chandigarh',
    image: 'from-orange-500 to-orange-800',
    location: 'Mohali, Punjab',
    description: 'Chandigarh University is a NAAC A+ accredited institution and one of the fastest-growing universities in India. Ranked among the top private universities, it offers UGC-DEB approved online programs with a strong emphasis on technology and innovation. The university\'s online division provides a rich learning experience backed by world-class faculty and industry partnerships.',
    facilities: ['CU Online Portal', 'Live Webinars', 'Placement Support', 'Digital Resources', 'Industry Certifications', 'Peer Community'],
    ranking: 'NAAC A+',
    programs: [
      { name: 'BBA', duration: '3 Years' },
      { name: 'BCOM', duration: '3 Years' },
      { name: 'BCA', duration: '3 Years' },
      { name: 'MBA (MARKETING, FINANCE, HR, IT)', duration: '2 Years' },
      { name: 'MCA', duration: '2 Years' },
      { name: 'MCOM', duration: '2 Years' },
    ],
  },
  {
    name: 'Lovely Professional University', accreditation: 'UGC Approved | NAAC A++', logoInitial: 'L',
    id: 'lpu',
    slug: 'lpu',
    image: 'from-yellow-500 to-yellow-800',
    location: 'Phagwara, Punjab',
    description: 'Lovely Professional University (LPU) is one of India\'s largest private universities with a NAAC A++ accreditation and a vibrant campus of over 30,000 students. LPU\'s online programs are designed with a global perspective, offering flexible schedules and industry-relevant curriculum. The university is known for its exceptional placement record and strong industry connections across sectors.',
    facilities: ['LPU Online App', 'Virtual Labs', 'Career Hub', 'Live Classes', 'International Tie-ups', 'Scholarship Programs'],
    ranking: 'NAAC A++',
    programs: [
      { name: 'BBA', duration: '3 Years' },
      { name: 'BCOM', duration: '3 Years' },
      { name: 'BCA', duration: '3 Years' },
      { name: 'BA (ENGLISH, ECONOMICS, POLITICAL SCIENCE)', duration: '3 Years' },
      { name: 'MBA (MARKETING, FINANCE, HR, OPERATIONS)', duration: '2 Years' },
      { name: 'MCA', duration: '2 Years' },
      { name: 'MCOM', duration: '2 Years' },
    ],
  },
];

export const allUniversities: University[] = [...universitiesData, ...universitiesDataExtra];

// The 6 featured universities with full detail data, keyed by slug
export const featuredUniversities: University[] = allUniversities.filter((u) => u.slug !== undefined);

export function getUniversityBySlug(slug: string): University | undefined {
  return featuredUniversities.find((u) => u.slug === slug);
}

export const openSchoolData: Board[] = [
  {
    name: 'JAMIYA URDU',
    icon: '📖',
    description: 'Secondary & Senior Secondary Education - Jamia Urdu Aligarh',
    programs: [
      { name: 'Secondary (10th)', subjects: 'Urdu, Hindi/RL, English, Science, Mathematics/Home Science, Social Science' },
      { name: 'Sr Secondary Arts (12th)', subjects: 'Urdu, Hindi/RL, English, History, Geography, Political Science' },
      { name: 'Sr Secondary Science (12th)', subjects: 'Urdu, Hindi/RL, English, Physics, Chemistry, Mathematics/Biology' },
      { name: 'Sr Secondary Commerce (12th)', subjects: 'Urdu, Hindi/RL, English, Economics, Commerce (Business Studies), Accountancy' },
    ],
  },
  {
    name: 'BOSSE',
    icon: '🎓',
    description: 'Board of Open School & Skill Education',
    programs: [
      { name: '10th', subjects: 'Malayalam/Hindi, English, Mathematics, Social Science, Science & Technology' },
      { name: '12th Commerce', subjects: 'Malayalam/Hindi, English, Economics, Business Studies, Accountancy' },
      { name: '12th Science PCM', subjects: 'Malayalam/Hindi, English, Physics, Chemistry, Mathematics' },
      { name: '12th Science PCB', subjects: 'Malayalam/Hindi, English, Physics, Chemistry, Biology' },
      { name: '12th Arts (Economics/Sociology)', subjects: 'Malayalam/Hindi, English, History, Political Science, Economics/Sociology' },
    ],
  },
];

export const faqData: Record<string, { response: string; suggestions: string[] }> = {
  'online degrees': {
    response: "Online degree programs in India are fully accredited courses delivered via digital platforms under UGC regulations.\n\n✅ UGC-approved and equivalent to traditional degrees\n✅ Flexible learning - study anytime, anywhere\n✅ 60+ universities offering 500+ programs\n✅ Valid for government jobs, higher studies, and private sector\n✅ Cost-effective: ₹10,000 to ₹3,00,000 depending on program\n\nPopular programs: BBA, BCA, MBA, MCA, BA, BCom, MA, MSc",
    suggestions: ['eligibility', 'top universities', 'fees', 'recognition'],
  },
  'open school': {
    response: "Open Schooling provides flexible education for Class 10 (SSLC) and Class 12 (Plus Two):\n\n📚 Study at your own pace from anywhere\n📚 Ideal for dropouts, working people, rural students\n📚 NIOS & BOSSE boards available\n📚 Certificates valid for higher education and jobs\n📚 Fees: ₹5,000-₹15,000 total\n📚 Flexible exam schedules\n\nCertificates are equivalent to CBSE/ICSE!",
    suggestions: ['nios eligibility', 'bosse programs', 'exam pattern'],
  },
  'fees': {
    response: "Fee Structure for CDRC Programs:\n\n💰 Undergraduate (UG):\n• Public Universities: ₹10,000-₹50,000\n• Private Universities: ₹50,000-₹2,00,000\n\n💰 Postgraduate (PG):\n• Public: ₹20,000-₹80,000\n• Private: ₹1,00,000-₹3,00,000\n\n💰 Open Schooling:\n• Class 10/12: ₹5,000-₹15,000\n\n💳 EMI options available\n🎓 Scholarships for SC/ST/OBC (up to 50% off)\n📞 Contact us for exact fees!",
    suggestions: ['scholarships', 'payment options', 'admission'],
  },
  'admission': {
    response: "Admission Process:\n\n1️⃣ Verify university on UGC-DEB portal\n2️⃣ Create ABC ID (Academic Bank of Credits)\n3️⃣ Choose program and fill application online\n4️⃣ Upload documents (marksheets, Aadhaar, photo)\n5️⃣ Pay application fee (₹500-₹2,000)\n6️⃣ Receive confirmation within 1-2 weeks\n\n📅 Admissions open: January & July\n📱 Contact: +91 9846446055",
    suggestions: ['eligibility', 'documents required', 'contact'],
  },
  'eligibility': {
    response: "Eligibility Criteria:\n\n🎓 Undergraduate (BA, BBA, BCA, BCom):\n• Class 12 pass from recognized board\n• Minimum 50% (45% for reserved)\n\n🎓 Postgraduate (MBA, MCA, MA, MSc):\n• Bachelor's degree in any discipline\n• Minimum 50% (45% for reserved)\n\n🎓 Open School (Class 10):\n• Age 14+, Class 8 pass\n\n🎓 Open School (Class 12):\n• Age 15+, Class 10 pass",
    suggestions: ['admission', 'programs', 'apply now'],
  },
  'recognition': {
    response: "All CDRC programs are fully recognized:\n\n✅ UGC (University Grants Commission) approved\n✅ NAAC A+/A++ accredited universities\n✅ AICTE approved for technical programs\n✅ Valid for government jobs (UPSC, SSC, Banking)\n✅ Accepted for higher studies in India & abroad\n✅ WES evaluation available for international recognition",
    suggestions: ['top universities', 'career prospects', 'apply now'],
  },
  'top universities': {
    response: "Our Top Partner Universities:\n\n🏛️ Amity University - NAAC A++, WES recognized\n🏛️ Manipal University Jaipur - 20+ specializations\n🏛️ GLA University - Top ranked\n🏛️ Jamia Hamdard - Central university\n🏛️ Aligarh Muslim University - Central university\n🏛️ Sikkim Manipal - Established brand\n\nAll UGC-approved with excellent track records!",
    suggestions: ['programs', 'fees', 'admission'],
  },
  'contact': {
    response: "Contact CDRC:\n\n📧 Email:\n• info@cdrc.edu.in\n• admissions@cdrc.edu.in\n\n📞 Phone:\n• Landline: 0467-2211200\n• Mobile: +91 9846446055\n• +91 9562446055\n• +91 7511100080\n\n📍 Address:\nCity Centre Building, 2nd Floor\nNear Bus Stand, Kanhangad\nKasargod, Kerala - 671315\n\n🕐 Office Hours: Mon-Sat, 9 AM - 6 PM",
    suggestions: ['admission', 'whatsapp', 'visit website'],
  },
  'career': {
    response: "Career Prospects with CDRC Degrees:\n\n💼 73% graduates get promotions within 2 years\n💼 15-30% salary hike reported\n💼 Top recruiters: TCS, Wipro, Infosys, Deloitte\n💼 Eligible for government jobs (UPSC, SSC, Banking)\n💼 Valid for higher studies (Masters, PhD)\n\n📈 Mean salary for data analysts: ₹8 LPA\n📈 MBA graduates: ₹6-12 LPA",
    suggestions: ['programs', 'top universities', 'apply now'],
  },
  'nios': {
    response: "NIOS (National Institute of Open Schooling):\n\n📖 Largest open school with 3.5 lakh students\n📖 Flexible exams (April/October or on-demand)\n📖 7,400+ study centers across India\n📖 Equivalent to CBSE/ICSE\n📖 28 subjects for Class 10 & 12\n📖 Fees: ₹1,800-₹2,000 per level\n\n☎️ Helpline: 1800-180-9393",
    suggestions: ['open school', 'bosse', 'eligibility'],
  },
  'bosse': {
    response: "BOSSE (Board of Open Schooling and Skill Education):\n\n🎓 Established in 2020, Sikkim-based\n🎓 Offers Class 10 & 12 programs\n🎓 Skill-focused education\n🎓 AIU recognized and valid for higher studies\n🎓 Affordable fees: ₹2,000-₹3,000\n\nSubjects include Science, Commerce, Arts streams with Malayalam/Hindi options!",
    suggestions: ['open school', 'nios', 'admission'],
  },
  'whatsapp': {
    response: "Connect with us on WhatsApp for instant support!\n\n💬 WhatsApp: +91 9846446055\n\nOur team responds within minutes during office hours!",
    suggestions: ['contact', 'admission'],
  },
  'instagram': {
    response: "Follow us on Instagram for:\n\n📸 Latest updates and announcements\n📸 Student success stories\n📸 Program highlights\n\n👉 @cdrc_india\n🔗 https://www.instagram.com/cdrc_india/",
    suggestions: ['whatsapp', 'contact', 'programs'],
  },
};
