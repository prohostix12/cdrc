import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

// 13 universities from edufolio.org missing from the existing DB
const EDUFOLIO_UNIVERSITIES = [
  {
    name: 'Aligarh Muslim University',
    slug: 'aligarh-muslim-university',
    logoInitial: 'A',
    accreditation: 'UGC Approved | NAAC A+',
    naac: 'A+', ranking: 'NAAC A+',
    location: 'Aligarh, Uttar Pradesh', city: 'Aligarh', state: 'Uttar Pradesh',
    type: 'Central', established: '1920', ugcApproved: true, aicteApproved: false,
    description: 'Aligarh Muslim University (AMU) is one of India\'s oldest and most prestigious central universities established in 1920. AMU Online offers UGC-approved online degrees with internship opportunities, combining academic heritage with modern distance education.',
    facilities: ['Digital Library', 'Online Labs', 'Career Support', 'Internship Opportunities', 'Student Portal', 'Alumni Network'],
    highlights: ['UGC-DEB Approved', 'NAAC A+ Accredited', 'Central University', 'Internship Included', '100+ Year Legacy'],
    minFee: '16800', maxFee: '52800', website: 'https://www.amu.ac.in', featured: true, active: true,
  },
  {
    name: 'GLA University',
    slug: 'gla-university',
    logoInitial: 'G',
    accreditation: 'UGC Approved | NAAC A+',
    naac: 'A+', ranking: 'NAAC A+',
    location: 'Mathura, Uttar Pradesh', city: 'Mathura', state: 'Uttar Pradesh',
    type: 'Private', established: '2010', ugcApproved: true, aicteApproved: true,
    description: 'GLA University, Mathura offers affordable online programs with strong industry connections and NAAC A+ accreditation. Known for its technology-driven approach and high placement records, GLA is a premier choice for online management and technology programs.',
    facilities: ['Smart LMS', 'Virtual Labs', 'Placement Cell', 'Industry Connect', 'E-Library', 'Live Sessions'],
    highlights: ['NAAC A+ Accredited', 'UGC-DEB Approved', 'High Placement Rate', 'Affordable Programs', 'Industry Partnerships'],
    minFee: '11500', maxFee: '99500', website: 'https://www.gla.ac.in', featured: true, active: true,
  },
  {
    name: 'Manipal University Jaipur',
    slug: 'manipal-university-jaipur',
    logoInitial: 'M',
    accreditation: 'UGC Approved | NAAC A+',
    naac: 'A+', ranking: 'NAAC A+',
    location: 'Jaipur, Rajasthan', city: 'Jaipur', state: 'Rajasthan',
    type: 'Private', established: '2011', ugcApproved: true, aicteApproved: true,
    description: 'Manipal University Jaipur offers a wide range of online programs across management, technology, commerce, and arts. As part of the renowned Manipal Education Group, it delivers quality education with a focus on innovation, affordability, and career readiness.',
    facilities: ['Digital Learning Platform', 'Industry Webinars', 'Career Services', 'Live Classes', 'E-Library', 'Placement Support'],
    highlights: ['NAAC A+ Accredited', 'UGC-DEB Approved', 'Manipal Group', 'Wide Program Range', 'Affordable Fees'],
    minFee: '16500', maxFee: '175000', website: 'https://www.jaipur.manipal.edu', featured: true, active: true,
  },
  {
    name: 'Amrita Vishwa Vidyapeetham',
    slug: 'amrita-vishwa-vidyapeetham',
    logoInitial: 'A',
    accreditation: 'UGC Approved | NAAC A++',
    naac: 'A++', ranking: 'NAAC A++',
    location: 'Ettimadai, Tamil Nadu', city: 'Coimbatore', state: 'Tamil Nadu',
    type: 'Deemed', established: '1994', ugcApproved: true, aicteApproved: true,
    description: 'Amrita Vishwa Vidyapeetham is one of India\'s top deemed universities with NAAC A++ accreditation. Amrita Online offers cutting-edge programs in AI, cybersecurity, and management, blending spiritual values with technological excellence.',
    facilities: ['AI-Powered LMS', 'Virtual Labs', 'Placement Cell', 'Research Support', 'Industry Mentors', 'Digital Library'],
    highlights: ['NAAC A++ Accredited', 'UGC-DEB Approved', 'QS Asia Top 100', 'AI & Tech Focus', 'Value-Based Education'],
    minFee: '22750', maxFee: '180500', website: 'https://www.amrita.edu', featured: true, active: true,
  },
  {
    name: 'Mizoram University',
    slug: 'mizoram-university',
    logoInitial: 'M',
    accreditation: 'UGC Approved | NAAC B++',
    naac: 'B++', ranking: 'NAAC B++',
    location: 'Aizawl, Mizoram', city: 'Aizawl', state: 'Mizoram',
    type: 'Central', established: '2001', ugcApproved: true, aicteApproved: false,
    description: 'Mizoram University is a central university offering affordable online programs in management, commerce, and business. Ideal for students seeking government-university degrees at competitive fees with flexible distance learning.',
    facilities: ['Online Portal', 'Digital Library', 'Student Support', 'Recorded Lectures', 'Study Material'],
    highlights: ['Central University', 'UGC-DEB Approved', 'Affordable Fees', 'Government University', 'Flexible Learning'],
    minFee: '28150', maxFee: '67230', website: 'https://www.mzu.edu.in', featured: false, active: true,
  },
  {
    name: 'Andhra University',
    slug: 'andhra-university',
    logoInitial: 'A',
    accreditation: 'UGC Approved | NAAC A+',
    naac: 'A+', ranking: 'NAAC A+',
    location: 'Visakhapatnam, Andhra Pradesh', city: 'Visakhapatnam', state: 'Andhra Pradesh',
    type: 'State', established: '1926', ugcApproved: true, aicteApproved: false,
    description: 'Andhra University, established in 1926, is one of South India\'s oldest and most respected universities. Its online programs in arts, commerce, and management offer quality education backed by a century-old academic tradition.',
    facilities: ['E-Learning Platform', 'Digital Library', 'Student Support', 'Online Exams', 'Placement Guidance'],
    highlights: ['NAAC A+ Accredited', 'UGC-DEB Approved', 'State University', '100 Year Legacy', 'Affordable Programs'],
    minFee: '15250', maxFee: '67000', website: 'https://www.andhrauniversity.edu.in', featured: false, active: true,
  },
  {
    name: 'Swami Vivekanand Subharti University',
    slug: 'swami-vivekanand-subharti-university',
    logoInitial: 'S',
    accreditation: 'UGC Approved | NAAC A',
    naac: 'A', ranking: 'NAAC A',
    location: 'Meerut, Uttar Pradesh', city: 'Meerut', state: 'Uttar Pradesh',
    type: 'Private', established: '2008', ugcApproved: true, aicteApproved: false,
    description: 'Swami Vivekanand Subharti University offers a comprehensive range of online programs in management, arts, commerce, and science. With NAAC A accreditation and diverse course offerings, it caters to students from all academic backgrounds.',
    facilities: ['Learning Management System', 'Digital Library', 'Student Portal', 'Online Exams', 'Career Support'],
    highlights: ['NAAC A Accredited', 'UGC-DEB Approved', 'Wide Program Range', 'Affordable Fees', 'Flexible Schedule'],
    minFee: '18500', maxFee: '67500', website: 'https://www.subharti.org', featured: false, active: true,
  },
  {
    name: 'Shiv Nadar University',
    slug: 'shiv-nadar-university',
    logoInitial: 'S',
    accreditation: 'UGC Approved | NAAC A',
    naac: 'A', ranking: 'NAAC A',
    location: 'Greater Noida, Uttar Pradesh', city: 'Greater Noida', state: 'Uttar Pradesh',
    type: 'Private', established: '2011', ugcApproved: true, aicteApproved: true,
    description: 'Shiv Nadar University is a research-intensive, student-centric university founded by HCL Technologies\' founder Shiv Nadar. Known for academic rigor, industry partnerships with HCL, and a global perspective in education.',
    facilities: ['Research Labs', 'Industry Connect', 'Career Services', 'Digital Library', 'Innovation Hub'],
    highlights: ['NAAC A Accredited', 'UGC Approved', 'HCL Group', 'Research Focus', 'Industry Partnerships'],
    minFee: '50000', maxFee: '200000', website: 'https://snu.edu.in', featured: false, active: true,
  },
  {
    name: 'SRM Institute of Science and Technology',
    slug: 'srm-institute-of-science-and-technology',
    logoInitial: 'S',
    accreditation: 'UGC Approved | NAAC A++',
    naac: 'A++', ranking: 'NAAC A++',
    location: 'Chengalpattu, Tamil Nadu', city: 'Chengalpattu', state: 'Tamil Nadu',
    type: 'Deemed', established: '1985', ugcApproved: true, aicteApproved: true,
    description: 'SRM Institute of Science and Technology is one of India\'s top-ranked universities with NAAC A++ accreditation. SRM Online offers technology-driven programs with strong placement support and industry-integrated curriculum.',
    facilities: ['Smart Campus', 'Digital Labs', 'Placement Cell', 'Research Center', 'Industry Partnerships', 'Alumni Network'],
    highlights: ['NAAC A++ Accredited', 'UGC-DEB Approved', 'QS World Ranked', 'Top Placements', 'Tech Excellence'],
    minFee: '50000', maxFee: '250000', website: 'https://www.srmist.edu.in', featured: false, active: true,
  },
  {
    name: 'Vellore Institute of Technology',
    slug: 'vellore-institute-of-technology',
    logoInitial: 'V',
    accreditation: 'UGC Approved | NAAC A++',
    naac: 'A++', ranking: 'NAAC A++',
    location: 'Vellore, Tamil Nadu', city: 'Vellore', state: 'Tamil Nadu',
    type: 'Deemed', established: '1984', ugcApproved: true, aicteApproved: true,
    description: 'Vellore Institute of Technology (VIT) is one of India\'s premier technological universities with NAAC A++ accreditation. VIT Online extends its world-class education in technology and management to students across India through flexible online programs.',
    facilities: ['Advanced LMS', 'Virtual Labs', 'Placement Portal', 'Research Facilities', 'Industry MoUs', 'Alumni Connect'],
    highlights: ['NAAC A++ Accredited', 'UGC Approved', 'QS Asia Ranked', 'Innovation Leader', 'Global Partnerships'],
    minFee: '60000', maxFee: '300000', website: 'https://vit.ac.in', featured: false, active: true,
  },
  {
    name: 'Hindustan Institute of Technology and Science',
    slug: 'hindustan-institute-of-technology-and-science',
    logoInitial: 'H',
    accreditation: 'UGC Approved | NAAC A+',
    naac: 'A+', ranking: 'NAAC A+',
    location: 'Kelambakkam, Tamil Nadu', city: 'Chennai', state: 'Tamil Nadu',
    type: 'Deemed', established: '1985', ugcApproved: true, aicteApproved: true,
    description: 'Hindustan Institute of Technology and Science (HITS) is a premier deemed university in Chennai. It offers online programs combining technical expertise with management skills, backed by strong industry connections in South India.',
    facilities: ['E-Learning Portal', 'Digital Library', 'Placement Cell', 'Industry Projects', 'Student Support'],
    highlights: ['NAAC A+ Accredited', 'UGC-DEB Approved', 'Chennai-Based', 'Industry Connect', 'Strong Alumni'],
    minFee: '45000', maxFee: '200000', website: 'https://www.hindustanuniv.ac.in', featured: false, active: true,
  },
  {
    name: 'Symbiosis International University',
    slug: 'symbiosis-international-university',
    logoInitial: 'S',
    accreditation: 'UGC Approved | NAAC A++',
    naac: 'A++', ranking: 'NAAC A++',
    location: 'Pune, Maharashtra', city: 'Pune', state: 'Maharashtra',
    type: 'Deemed', established: '2002', ugcApproved: true, aicteApproved: true,
    description: 'Symbiosis International University (SIU) is a premier deemed university with NAAC A++ accreditation. Known for its multicultural environment and global perspective, SIU Online offers management and technology programs with strong international exposure.',
    facilities: ['Global LMS', 'Virtual Classrooms', 'Industry Mentors', 'Career Services', 'International Exposure', 'Research Support'],
    highlights: ['NAAC A++ Accredited', 'UGC-DEB Approved', 'International Rankings', 'Multicultural Campus', 'Pune\'s Best'],
    minFee: '60000', maxFee: '280000', website: 'https://www.siu.edu.in', featured: false, active: true,
  },
  {
    name: 'Narsee Monjee Institute of Management Studies',
    slug: 'narsee-monjee-institute-of-management-studies',
    logoInitial: 'N',
    accreditation: 'UGC Approved | NAAC A++',
    naac: 'A++', ranking: 'NAAC A++',
    location: 'Mumbai, Maharashtra', city: 'Mumbai', state: 'Maharashtra',
    type: 'Deemed', established: '1981', ugcApproved: true, aicteApproved: true,
    description: 'NMIMS (Narsee Monjee Institute of Management Studies) is one of India\'s top management universities with NAAC A++ accreditation. NMIMS Online offers MBA and management programs with Mumbai\'s corporate ecosystem advantage and a strong alumni network.',
    facilities: ['Premium LMS', 'Industry Experts', 'Career Services', 'Mumbai Network', 'Corporate Connect', 'Research Lab'],
    highlights: ['NAAC A++ Accredited', 'UGC-DEB Approved', 'Mumbai\'s Premier B-School', 'Top MBA Rankings', 'Strong Placement'],
    minFee: '80000', maxFee: '350000', website: 'https://nmims.edu', featured: false, active: true,
  },
];

// All programs from edufolio API with exact fees
const EDUFOLIO_PROGRAMS = [
  // Manipal University Jaipur
  { university: 'Manipal University Jaipur', name: 'BCA in Cloud Computing', category: 'BCA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 135000, courseType: 'Technology' },
  { university: 'Manipal University Jaipur', name: 'BCA Cyber Security', category: 'BCA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 135000, courseType: 'Technology' },
  { university: 'Manipal University Jaipur', name: 'BCA in Data Science & Analytics', category: 'BCA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 135000, courseType: 'Technology' },
  { university: 'Manipal University Jaipur', name: 'BCom in Economics', category: 'B.Com', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 16500, courseType: 'Commerce' },
  { university: 'Manipal University Jaipur', name: 'BCom in Accounting with AI', category: 'B.Com', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 16500, courseType: 'Commerce' },
  { university: 'Manipal University Jaipur', name: 'BCom in Business Accounting & Taxation', category: 'B.Com', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 16500, courseType: 'Commerce' },
  { university: 'Manipal University Jaipur', name: 'BCom in Financial Analytics', category: 'B.Com', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 16500, courseType: 'Commerce' },
  { university: 'Manipal University Jaipur', name: 'BCom in Business Analytics', category: 'B.Com', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 16500, courseType: 'Commerce' },
  { university: 'Manipal University Jaipur', name: 'BCom in Banking & FinTech', category: 'B.Com', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 16500, courseType: 'Commerce' },
  { university: 'Manipal University Jaipur', name: 'BCom in E-Commerce', category: 'B.Com', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 16500, courseType: 'Commerce' },
  { university: 'Manipal University Jaipur', name: 'BCom in Digital Marketing with AI', category: 'B.Com', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 16500, courseType: 'Commerce' },
  { university: 'Manipal University Jaipur', name: 'BBA in Digital Marketing', category: 'BBA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 23250, courseType: 'Management' },
  { university: 'Manipal University Jaipur', name: 'BBA in Retail & E-Commerce', category: 'BBA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 23250, courseType: 'Management' },
  { university: 'Manipal University Jaipur', name: 'BBA in Data Analytics', category: 'BBA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 23250, courseType: 'Management' },
  { university: 'Manipal University Jaipur', name: 'BBA in Entrepreneurship Management & Family Business', category: 'BBA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 23250, courseType: 'Management' },
  { university: 'Manipal University Jaipur', name: 'BBA in Finance and Accounting', category: 'BBA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 23250, courseType: 'Management' },
  { university: 'Manipal University Jaipur', name: 'BBA in Marketing', category: 'BBA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 23250, courseType: 'Management' },
  { university: 'Manipal University Jaipur', name: 'BBA in Human Resource Management', category: 'BBA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 23250, courseType: 'Management' },
  { university: 'Manipal University Jaipur', name: 'MCA in Comprehensive Emerging Technology', category: 'MCA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 39500, courseType: 'Technology' },
  { university: 'Manipal University Jaipur', name: 'MCA in Cyber Security', category: 'MCA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 39500, courseType: 'Technology' },
  { university: 'Manipal University Jaipur', name: 'MCA in Cloud Computing', category: 'MCA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 39500, courseType: 'Technology' },
  { university: 'Manipal University Jaipur', name: 'MCA in Data Science', category: 'MCA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 158000, courseType: 'Technology' },
  { university: 'Manipal University Jaipur', name: 'MCA in Artificial Intelligence & Machine Learning', category: 'MCA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 39500, courseType: 'Technology' },
  { university: 'Manipal University Jaipur', name: 'MBA in Retail Management', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 45000, courseType: 'Management' },
  { university: 'Manipal University Jaipur', name: 'MBA in Supply Chain Management', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 45000, courseType: 'Management' },
  { university: 'Manipal University Jaipur', name: 'MBA in Project Management', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 45000, courseType: 'Management' },
  { university: 'Manipal University Jaipur', name: 'MBA in International Business', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 45000, courseType: 'Management' },
  { university: 'Manipal University Jaipur', name: 'MBA in Operations Management', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 45000, courseType: 'Management' },
  { university: 'Manipal University Jaipur', name: 'MBA in IT & FinTech', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 45000, courseType: 'Management' },
  { university: 'Manipal University Jaipur', name: 'MBA in Analytics & Data Science', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 45000, courseType: 'Management' },
  { university: 'Manipal University Jaipur', name: 'MBA in Marketing', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 175000, courseType: 'Management' },
  { university: 'Manipal University Jaipur', name: 'MBA in Digital Marketing', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 45000, courseType: 'Management' },
  { university: 'Manipal University Jaipur', name: 'MBA in Banking, Financial Services and Insurance', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 45000, courseType: 'Management' },
  { university: 'Manipal University Jaipur', name: 'MBA in Human Resource Management', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 45000, courseType: 'Management' },
  { university: 'Manipal University Jaipur', name: 'MBA in Finance', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 45000, courseType: 'Management' },
  { university: 'Manipal University Jaipur', name: 'MBA in Information System Management', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 45000, courseType: 'Management' },
  { university: 'Manipal University Jaipur', name: 'Master of Commerce', category: 'M.Com', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 27000, courseType: 'Commerce' },
  { university: 'Manipal University Jaipur', name: 'MA in Economics', category: 'MA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 20000, courseType: 'Arts' },
  { university: 'Manipal University Jaipur', name: 'MA in Journalism and Mass Communication', category: 'MA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 140000, courseType: 'Arts' },
  // Amrita Vishwa Vidyapeetham
  { university: 'Amrita Vishwa Vidyapeetham', name: 'MCA General', category: 'MCA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 37750, courseType: 'Technology' },
  { university: 'Amrita Vishwa Vidyapeetham', name: 'MCA in Cyber Security', category: 'MCA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 47750, courseType: 'Technology' },
  { university: 'Amrita Vishwa Vidyapeetham', name: 'MCA in Artificial Intelligence & Machine Learning', category: 'MCA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 47750, courseType: 'Technology' },
  { university: 'Amrita Vishwa Vidyapeetham', name: 'MBA in Environmental, Social & Governance', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 51750, courseType: 'Management' },
  { university: 'Amrita Vishwa Vidyapeetham', name: 'MBA in Business Analytics & Financial Technology', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 58750, courseType: 'Management' },
  { university: 'Amrita Vishwa Vidyapeetham', name: 'MBA in Artificial Intelligence', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 63750, courseType: 'Management' },
  { university: 'Amrita Vishwa Vidyapeetham', name: 'MBA in General Management', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 46750, courseType: 'Management' },
  { university: 'Amrita Vishwa Vidyapeetham', name: 'MBA in Human Resource Management', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 57750, courseType: 'Management' },
  { university: 'Amrita Vishwa Vidyapeetham', name: 'MBA in Operations Management', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 58750, courseType: 'Management' },
  { university: 'Amrita Vishwa Vidyapeetham', name: 'MBA in Finance', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 57750, courseType: 'Management' },
  { university: 'Amrita Vishwa Vidyapeetham', name: 'MBA in Marketing', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 57750, courseType: 'Management' },
  { university: 'Amrita Vishwa Vidyapeetham', name: 'BCA Artificial Intelligence & Data Science', category: 'BCA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 180500, courseType: 'Technology' },
  { university: 'Amrita Vishwa Vidyapeetham', name: 'BCA General', category: 'BCA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 26250, courseType: 'Technology' },
  { university: 'Amrita Vishwa Vidyapeetham', name: 'BBA General', category: 'BBA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 26250, courseType: 'Management' },
  { university: 'Amrita Vishwa Vidyapeetham', name: 'Bachelor of Commerce', category: 'B.Com', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 22750, courseType: 'Commerce' },
  // Aligarh Muslim University
  { university: 'Aligarh Muslim University', name: 'MCom with Internship', category: 'M.Com', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 19800, courseType: 'Commerce' },
  { university: 'Aligarh Muslim University', name: 'MA in Urdu with Internship', category: 'MA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 18800, courseType: 'Arts' },
  { university: 'Aligarh Muslim University', name: 'MA Political Science with Internship', category: 'MA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 18800, courseType: 'Arts' },
  { university: 'Aligarh Muslim University', name: 'MA History with Internship', category: 'MA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 18800, courseType: 'Arts' },
  { university: 'Aligarh Muslim University', name: 'MA Hindi with Internship', category: 'MA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 18800, courseType: 'Arts' },
  { university: 'Aligarh Muslim University', name: 'MA Economics with Internship', category: 'MA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 18800, courseType: 'Arts' },
  { university: 'Aligarh Muslim University', name: 'MA English with Internship', category: 'MA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 18800, courseType: 'Arts' },
  { university: 'Aligarh Muslim University', name: 'Bachelor of Commerce with Internship', category: 'B.Com', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 52800, courseType: 'Commerce' },
  { university: 'Aligarh Muslim University', name: 'BA Urdu with Internship', category: 'BA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 16800, courseType: 'Arts' },
  { university: 'Aligarh Muslim University', name: 'BA Political Science with Internship', category: 'BA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 16800, courseType: 'Arts' },
  { university: 'Aligarh Muslim University', name: 'BA History with Internship', category: 'BA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 16800, courseType: 'Arts' },
  { university: 'Aligarh Muslim University', name: 'BA Hindi with Internship', category: 'BA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 16800, courseType: 'Arts' },
  { university: 'Aligarh Muslim University', name: 'BA Economics with Internship', category: 'BA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 16800, courseType: 'Arts' },
  { university: 'Aligarh Muslim University', name: 'BA English with Internship', category: 'BA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 16800, courseType: 'Arts' },
  // GLA University
  { university: 'GLA University', name: 'Master of Computer Application', category: 'MCA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 23000, courseType: 'Technology' },
  { university: 'GLA University', name: 'MBA in Supply Chain Management', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 25750, courseType: 'Management' },
  { university: 'GLA University', name: 'MBA in Business Analytics', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 25750, courseType: 'Management' },
  { university: 'GLA University', name: 'MBA in Banking & Financial Services', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 25750, courseType: 'Management' },
  { university: 'GLA University', name: 'MBA in Operations Management', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 25750, courseType: 'Management' },
  { university: 'GLA University', name: 'MBA in Information Technology', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 25750, courseType: 'Management' },
  { university: 'GLA University', name: 'MBA Financial Management', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 25750, courseType: 'Management' },
  { university: 'GLA University', name: 'MBA Human Resource Management', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 25750, courseType: 'Management' },
  { university: 'GLA University', name: 'MBA Marketing Management', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 25750, courseType: 'Management' },
  { university: 'GLA University', name: 'Bachelor of Computer Application', category: 'BCA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 99500, courseType: 'Technology' },
  { university: 'GLA University', name: 'BBA Banking and Insurance', category: 'BBA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 16250, courseType: 'Management' },
  { university: 'GLA University', name: 'BBA Financial Management', category: 'BBA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 16250, courseType: 'Management' },
  { university: 'GLA University', name: 'BBA Human Resource Management', category: 'BBA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 16250, courseType: 'Management' },
  { university: 'GLA University', name: 'BBA Marketing Management', category: 'BBA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 16250, courseType: 'Management' },
  { university: 'GLA University', name: 'Bachelor of Commerce', category: 'B.Com', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 11500, courseType: 'Commerce' },
  // Mizoram University
  { university: 'Mizoram University', name: 'MBA Marketing Management', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 37130, courseType: 'Management' },
  { university: 'Mizoram University', name: 'MBA Entrepreneurship', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 37130, courseType: 'Management' },
  { university: 'Mizoram University', name: 'MBA Financial Management', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 37130, courseType: 'Management' },
  { university: 'Mizoram University', name: 'MBA Big Data Analytics', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 41450, courseType: 'Management' },
  { university: 'Mizoram University', name: 'MBA Logistics and Supply Chain Management', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 40450, courseType: 'Management' },
  { university: 'Mizoram University', name: 'Master of Commerce', category: 'M.Com', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 28150, courseType: 'Commerce' },
  { university: 'Mizoram University', name: 'BBA E-Business', category: 'BBA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 28760, courseType: 'Management' },
  { university: 'Mizoram University', name: 'BCom E-Commerce', category: 'B.Com', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 67230, courseType: 'Commerce' },
  // Andhra University
  { university: 'Andhra University', name: 'BCom E-Accounting', category: 'B.Com', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 67000, courseType: 'Commerce' },
  { university: 'Andhra University', name: 'MA Journalism and Mass Communication', category: 'MA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 18400, courseType: 'Arts' },
  { university: 'Andhra University', name: 'MA Human Resource Management', category: 'MA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 24550, courseType: 'Arts' },
  { university: 'Andhra University', name: 'MA Economics', category: 'MA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 17350, courseType: 'Arts' },
  { university: 'Andhra University', name: 'MA English', category: 'MA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 17350, courseType: 'Arts' },
  { university: 'Andhra University', name: 'MA Political Science', category: 'MA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 17350, courseType: 'Arts' },
  { university: 'Andhra University', name: 'Master of Commerce', category: 'M.Com', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 17350, courseType: 'Commerce' },
  { university: 'Andhra University', name: 'Bachelor of Commerce', category: 'B.Com', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 43750, courseType: 'Commerce' },
  { university: 'Andhra University', name: 'BA Politics', category: 'BA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 15250, courseType: 'Arts' },
  { university: 'Andhra University', name: 'BA Economics', category: 'BA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 15250, courseType: 'Arts' },
  { university: 'Andhra University', name: 'BA History', category: 'BA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 15250, courseType: 'Arts' },
  // Swami Vivekanand Subharti University
  { university: 'Swami Vivekanand Subharti University', name: 'MBA in Project Management', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 39500, courseType: 'Management' },
  { university: 'Swami Vivekanand Subharti University', name: 'MBA in Supply Chain Management', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 39500, courseType: 'Management' },
  { university: 'Swami Vivekanand Subharti University', name: 'MBA in Operations Management', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 39500, courseType: 'Management' },
  { university: 'Swami Vivekanand Subharti University', name: 'MBA in Fashion Designing', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 39500, courseType: 'Management' },
  { university: 'Swami Vivekanand Subharti University', name: 'MBA in Financial Management', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 39500, courseType: 'Management' },
  { university: 'Swami Vivekanand Subharti University', name: 'MBA in Marketing Management', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 39500, courseType: 'Management' },
  { university: 'Swami Vivekanand Subharti University', name: 'MBA in Human Resource Management', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 39500, courseType: 'Management' },
  { university: 'Swami Vivekanand Subharti University', name: 'MBA in Information Technology', category: 'MBA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 39500, courseType: 'Management' },
  { university: 'Swami Vivekanand Subharti University', name: 'Master of Commerce', category: 'M.Com', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 24500, courseType: 'Commerce' },
  { university: 'Swami Vivekanand Subharti University', name: 'MA Journalism and Mass Communication', category: 'MA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 29500, courseType: 'Arts' },
  { university: 'Swami Vivekanand Subharti University', name: 'MA English', category: 'MA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 24000, courseType: 'Arts' },
  { university: 'Swami Vivekanand Subharti University', name: 'MA Economics', category: 'MA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 24000, courseType: 'Arts' },
  { university: 'Swami Vivekanand Subharti University', name: 'MA Hindi', category: 'MA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 24000, courseType: 'Arts' },
  { university: 'Swami Vivekanand Subharti University', name: 'MA History', category: 'MA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 24000, courseType: 'Arts' },
  { university: 'Swami Vivekanand Subharti University', name: 'MA Sociology', category: 'MA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 24000, courseType: 'Arts' },
  { university: 'Swami Vivekanand Subharti University', name: 'MA Political Science', category: 'MA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 24000, courseType: 'Arts' },
  { university: 'Swami Vivekanand Subharti University', name: 'MA Public Administration', category: 'MA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 24000, courseType: 'Arts' },
  { university: 'Swami Vivekanand Subharti University', name: 'MA Education', category: 'MA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 28500, courseType: 'Arts' },
  { university: 'Swami Vivekanand Subharti University', name: 'MA Home Science', category: 'MA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 23000, courseType: 'Arts' },
  { university: 'Swami Vivekanand Subharti University', name: 'MA Buddhist Studies', category: 'MA', level: 'Postgraduate', qualification: 'Graduate', duration: '2 Years', mode: 'Online', fee: 23500, courseType: 'Arts' },
  { university: 'Swami Vivekanand Subharti University', name: 'Bachelor of Commerce (Honours)', category: 'B.Com', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 67500, courseType: 'Commerce' },
  { university: 'Swami Vivekanand Subharti University', name: 'Bachelor of Commerce', category: 'B.Com', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 55500, courseType: 'Commerce' },
  { university: 'Swami Vivekanand Subharti University', name: 'Bachelor of Business Administration', category: 'BBA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 28500, courseType: 'Management' },
  { university: 'Swami Vivekanand Subharti University', name: 'BA Journalism and Mass Communication', category: 'BA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 23500, courseType: 'Arts' },
  { university: 'Swami Vivekanand Subharti University', name: 'BA English', category: 'BA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 18500, courseType: 'Arts' },
  { university: 'Swami Vivekanand Subharti University', name: 'BA Hindi', category: 'BA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 18500, courseType: 'Arts' },
  { university: 'Swami Vivekanand Subharti University', name: 'BA Economics', category: 'BA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 18500, courseType: 'Arts' },
  { university: 'Swami Vivekanand Subharti University', name: 'BA History', category: 'BA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 18500, courseType: 'Arts' },
  { university: 'Swami Vivekanand Subharti University', name: 'BA Political Science', category: 'BA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 18500, courseType: 'Arts' },
  { university: 'Swami Vivekanand Subharti University', name: 'BA Sociology', category: 'BA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 18500, courseType: 'Arts' },
  { university: 'Swami Vivekanand Subharti University', name: 'BA Maths', category: 'BA', level: 'Undergraduate', qualification: '12th Pass', duration: '3 Years', mode: 'Online', fee: 18500, courseType: 'Arts' },
];

export async function GET() {
  try {
    const db = await getDb();

    // Get existing university slugs
    const existing = await db.collection('universities').find({}, { projection: { slug: 1 } }).toArray();
    const existingSlugs = new Set(existing.map((u: any) => u.slug));

    // Filter only universities not yet in DB
    const toInsert = EDUFOLIO_UNIVERSITIES.filter(u => !existingSlugs.has(u.slug));

    if (toInsert.length === 0) {
      const total = await db.collection('universities').countDocuments();
      return NextResponse.json({ message: `All edufolio universities already exist. Total in DB: ${total}`, seeded: false });
    }

    // Insert missing universities
    const uniDocs = toInsert.map(u => ({ ...u, createdAt: new Date() }));
    const uniResult = await db.collection('universities').insertMany(uniDocs);
    const insertedIds = Object.values(uniResult.insertedIds) as any[];

    // Build slug → ObjectId map
    const slugToId: Record<string, any> = {};
    toInsert.forEach((u, i) => { slugToId[u.slug] = insertedIds[i]; });

    // Build name → slug map for program linking
    const nameToSlug: Record<string, string> = {};
    toInsert.forEach(u => { nameToSlug[u.name] = u.slug; });

    // Insert programs for newly added universities only
    const programs = EDUFOLIO_PROGRAMS
      .filter(p => nameToSlug[p.university])
      .map(p => ({
        name: p.name,
        university: p.university,
        universityId: slugToId[nameToSlug[p.university]]?.toString() || '',
        category: p.category,
        courseType: p.courseType,
        level: p.level,
        qualification: p.qualification,
        duration: p.duration,
        mode: p.mode,
        fee: p.fee,
        feePeriod: 'Total',
        eligibility: p.level === 'Postgraduate'
          ? "Bachelor's degree with minimum 50% aggregate from a recognised university"
          : '10+2 or equivalent from a recognised board with minimum 50% aggregate',
        active: true,
        featured: false,
        createdAt: new Date(),
      }));

    if (programs.length > 0) {
      await db.collection('programs').insertMany(programs);
    }

    const totalUnis = await db.collection('universities').countDocuments();
    const totalProgs = await db.collection('programs').countDocuments();

    return NextResponse.json({
      seeded: true,
      addedUniversities: toInsert.length,
      addedPrograms: programs.length,
      totalUniversities: totalUnis,
      totalPrograms: totalProgs,
      message: `Added ${toInsert.length} universities and ${programs.length} programs from edufolio.org. Total: ${totalUnis} universities, ${totalProgs} programs.`,
    });
  } catch (error) {
    console.error('Edufolio seed error:', error);
    return NextResponse.json({ error: 'Failed to seed edufolio data' }, { status: 500 });
  }
}
