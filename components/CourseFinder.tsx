'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Simple inline SVG icons
const IconCompass = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </svg>
);
const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconPhone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconLock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconStar = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconBuilding = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconClock = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconMonitor = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);
const IconRefresh = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/>
  </svg>
);
const IconChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const IconFrown = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
  </svg>
);
const IconWand = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 11.8 19 13"/><path d="M15 9h0"/><path d="M17.8 6.2 19 5"/><path d="m3 21 9-9"/><path d="M12.2 6.2 11 5"/>
  </svg>
);

function EnquiryGate({ onSuccess }: { onSuccess: (data: { name: string, email: string, phone: string }) => void }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone.replace(/\D/g, ''), source: 'Course Finder' }),
      });
      onSuccess({ ...form, phone: form.phone.replace(/\D/g, '') });
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cf-gate">
      <div className="cf-gate-icon"><IconCompass /></div>
      <h2 className="cf-gate-title">Find Your Perfect Course</h2>
      <p className="cf-gate-sub">Enter your details to get personalised course recommendations</p>
      {error && <div className="cf-error">{error}</div>}
      <form onSubmit={handleSubmit} className="cf-gate-form">
        <div className="cf-field">
          <span className="cf-field-icon"><IconUser /></span>
          <input className="cf-input" type="text" placeholder="Your Full Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="cf-field">
          <span className="cf-field-icon"><IconMail /></span>
          <input className="cf-input" type="email" placeholder="Email Address" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="cf-field">
          <span className="cf-field-icon"><IconPhone /></span>
          <input className="cf-input" type="tel" placeholder="10-Digit Phone Number" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value.replace(/\D/g, '') })} />
        </div>
        <button type="submit" className="cf-submit-btn" disabled={loading}>
          {loading ? 'Submitting...' : <><IconArrow /> Continue to Quiz</>}
        </button>
      </form>
      <p className="cf-privacy"><IconLock /> Your info is secure with us</p>
    </div>
  );
}

// Built-in questions — used as fallback if DB has none configured
const FALLBACK_QUESTIONS = [
  {
    _id: 'fq1', field: 'education', order: 1, isActive: true,
    question: 'What is your highest qualification?',
    options: [
      { value: 'below_12', label: 'Below 12th' },
      { value: '12th',     label: '12th Pass'  },
      { value: 'graduate', label: 'Graduate (Bachelors)' },
      { value: 'postgraduate', label: 'Post Graduate' },
    ],
  },
  {
    _id: 'fq2', field: 'field', order: 2, isActive: true,
    question: 'Which field of study interests you?',
    options: [
      { value: 'commerce',   label: 'Commerce',   categories: ['B.Com', 'M.Com', 'Com'] },
      { value: 'arts',       label: 'Arts',       categories: ['BA', 'MA'] },
      { value: 'science',    label: 'Science',    categories: ['B.Sc', 'M.Sc', 'BSc', 'MSc', 'Sc'] },
      { value: 'technology', label: 'Technology', categories: ['BCA', 'MCA', 'B.Tech', 'M.Tech'] },
      { value: 'management', label: 'Management', categories: ['MBA', 'BBA', 'PGDM'] },
    ],
  },
  {
    _id: 'fq3', field: 'budget', order: 3, isActive: true,
    question: 'What is your preferred fee range?',
    options: [
      { value: 'low',   label: 'Under ₹50,000',      max: 50000 },
      { value: 'mid1',  label: '₹50K – ₹1 Lakh',    min: 50000,  max: 100000 },
      { value: 'mid2',  label: '₹1L – ₹2 Lakh',     min: 100000, max: 200000 },
      { value: 'any',   label: 'No Preference' },
    ],
  },
];

export default function CourseFinder() {
  const [isOpen, setIsOpen] = useState(false);
  const [gateCleared, setGateCleared] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '', phone: '' });
  const [questions, setQuestions] = useState<any[]>([]);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<any[]>([]);
  const [fallbackResults, setFallbackResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [animate, setAnimate] = useState(true);
  const [questionsLoading, setQuestionsLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) closeModal(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [isOpen]);

  useEffect(() => {
    if (!gateCleared || questions.length) return;
    setQuestionsLoading(true);
    fetch('/api/public/course-finder-questions')
      .then(r => r.json())
      .then(data => {
        // Use DB questions if configured, else fall back to built-in set
        const loaded = Array.isArray(data) && data.length > 0 ? data : FALLBACK_QUESTIONS;
        setQuestions(loaded);
      })
      .catch(() => setQuestions(FALLBACK_QUESTIONS))
      .finally(() => setQuestionsLoading(false));
  }, [gateCleared]);

  const closeModal = () => { setIsOpen(false); reset(); };
  const reset = () => {
    setGateCleared(false); setUserData({ name: '', email: '', phone: '' }); setStep(1);
    setAnswers({}); setResults([]); setShowResults(false); setAnimate(true);
    setQuestions([]); // clear so they re-fetch fresh next open
  };

  const handleOption = (field: string, value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
    if (step < questions.length) {
      setAnimate(false);
      setTimeout(() => { setStep(s => s + 1); setAnimate(true); }, 250);
    }
  };

  const handleBack = () => {
    setAnimate(false);
    setTimeout(() => { setStep(s => s - 1); setAnimate(true); }, 150);
  };

  const findCourses = async () => {
    setLoading(true);
    try {
      const normalize = (s: string) => (s || '').toLowerCase().replace(/[\s.\-&]/g, '');

      // 1. Identify Field Terms & Type (Skill/OpenSchool)
      const fieldQuestion = questions.find(q => q.field === 'field');
      let selectedFieldValue = fieldQuestion ? answers[fieldQuestion.field] : null;      

      // Check if ANY answer points directly to skill or openschool 
      Object.values(answers).forEach((val: any) => {
         const vstr = String(val).toLowerCase().replace(/[^a-z0-9]/g, '');
         // Use substring matching instead of exact array includes
         if (vstr.includes('skill') || vstr.includes('vocational')) {
             selectedFieldValue = 'skill';
         }
         else if ((vstr.includes('openschool') || vstr === 'open' || vstr === 'nios' || vstr === 'school') && selectedFieldValue !== 'skill') {
             selectedFieldValue = 'openschool';
         }
      });

      let endpoint = '/api/public/programs';
      if (selectedFieldValue === 'skill') endpoint = '/api/skills';
      else if (selectedFieldValue === 'openschool') endpoint = '/api/open-school';

      const res = await fetch(endpoint);
      const data = await res.json();
      let allPrograms: any[] = [];
      
      if (selectedFieldValue === 'skill') {
        const skillsArray = Array.isArray(data) ? data : (data.data || []);
        allPrograms = skillsArray.map((s: any) => ({
          ...s,
          name: s.name,
          university: s.university || 'CRDC Skill Center',
          category: s.category || 'Skill',
          level: 'Skill',
          mode: s.mode || 'Online',
          duration: s.duration || 'Flexible',
          fee: s.fee || s.price || 0,
        }));
      } else if (selectedFieldValue === 'openschool') {
        const osArray = Array.isArray(data) ? data : (data.data || []);
        osArray.forEach((board: any) => {
          (board.programs || []).forEach((p: any) => {
             allPrograms.push({
               ...p,
               _id: p._id || Math.random().toString(),
               name: p.name,
               university: board.name,
               category: 'Open School',
               level: p.level || 'School',
               mode: p.mode || 'Online',
               duration: p.duration || '1-2 Years',
               fee: p.fee || 0,
             });
          });
        });
      } else {
        allPrograms = Array.isArray(data) ? data : (data.data || []);
      }

      // Semantic keyword map: label keyword → related program terms
      const KEYWORD_MAP: Record<string, string[]> = {
        commerce: ['bcom', 'mcom', 'commerce', 'accounting', 'finance', 'ca'],
        finance: ['bcom', 'mcom', 'finance', 'commerce', 'accounting', 'mba'],
        technology: ['btech', 'mtech', 'bca', 'mca', 'computer', 'it', 'software', 'tech', 'engineering'],
        tech: ['btech', 'mtech', 'bca', 'mca', 'computer', 'it', 'software', 'tech', 'engineering'],
        science: ['bsc', 'msc', 'science', 'physics', 'chemistry', 'biology', 'mathematics'],
        arts: ['ba', 'ma', 'arts', 'english', 'history', 'sociology', 'political'],
        management: ['bba', 'mba', 'management', 'business', 'administration'],
        business: ['bba', 'mba', 'management', 'business', 'administration'],
        medical: ['mbbs', 'bams', 'medical', 'nursing', 'pharmacy', 'health'],
        law: ['llb', 'llm', 'law', 'legal', 'judiciary'],
        education: ['bed', 'med', 'education', 'teaching'],
        design: ['design', 'bdes', 'mdes', 'fashion', 'interior', 'graphic'],
        // Qualification → Level mapping
        '12thpass': ['undergraduate', 'ug', 'diploma', 'certificate'],
        '12th': ['undergraduate', 'ug', 'diploma', 'certificate'],
        'highersecondary': ['undergraduate', 'ug', 'diploma', 'certificate'],
        'below12': ['diploma', 'certificate'],
        'graduate': ['postgraduate', 'pg', 'undergraduate', 'ug'],
        'bachelors': ['postgraduate', 'pg'],
        'bachelorsdegree': ['postgraduate', 'pg'],
        'postgraduate': ['doctorate', 'phd', 'postgraduate', 'pg'],
        'masters': ['doctorate', 'phd'],
        // Mode
        'online': ['online'],
        'offline': ['offline'],
        'distance': ['distance'],
        'hybrid': ['hybrid'],
        // Level
        'undergraduate': ['undergraduate', 'ug'],
        'ug': ['undergraduate', 'ug'],
        'pg': ['postgraduate', 'pg'],
        'skill': ['skill', 'certificate', 'diploma', 'vocational'],
        'openschool': ['open', 'school', 'nios', '10th', '12th', 'open school'],
      };

      let fieldTerms: string[] = [];
      if (selectedFieldValue) {
        let fieldOpt = fieldQuestion.options.find((o: any) => o.value === selectedFieldValue);
        if (selectedFieldValue === 'skill') fieldOpt = { label: 'Skill Program', value: 'skill' };
        if (selectedFieldValue === 'openschool') fieldOpt = { label: 'Open School', value: 'openschool' };

        if (fieldOpt) {
          fieldTerms.push(normalize(fieldOpt.label));
          const words = fieldOpt.label.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
          words.forEach((word: string) => {
            const mapped = KEYWORD_MAP[word] || KEYWORD_MAP[normalize(word)];
            if (mapped) fieldTerms.push(...mapped);
          });
        }
      }

      // 2. Identify Level/Other Terms (Bonus/Ranking)
      const otherTerms: string[] = [];
      questions.filter(q => q.field !== 'field').forEach(q => {
        const val = answers[q.field];
        const opt = q.options.find((o: any) => o.value === val);
        if (opt) {
          otherTerms.push(normalize(opt.label));
          const words = opt.label.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
          words.forEach((word: string) => {
            const mapped = KEYWORD_MAP[word] || KEYWORD_MAP[normalize(word)];
            if (mapped) otherTerms.push(...mapped);
          });
        }
      });

      const uniqueFieldTerms = [...new Set(fieldTerms)];
      const uniqueOtherTerms = [...new Set(otherTerms)];

      // Find budget constraints
      const budgetQuestion = questions.find(q => q.field === 'budget' || (q.question || '').toLowerCase().includes('fee') || (q.question || '').toLowerCase().includes('budget'));
      let minBudget = 0;
      let maxBudget = Infinity;
      if (budgetQuestion && answers[budgetQuestion.field]) {
         const opt = budgetQuestion.options.find((o: any) => o.value === answers[budgetQuestion.field]);
         if (opt && opt.value !== 'any') {
            minBudget = opt.min ?? 0;
            maxBudget = opt.max ?? Infinity;
            // Best effort parse if missing
            if (minBudget === 0 && maxBudget === Infinity) {
               const str = (opt.label || opt.value || '').toLowerCase().replace(/,/g, '').replace(/_/g, '-');
               
               const extractNum = (nStr: string, unit: string) => {
                 let n = parseInt(nStr);
                 if (unit && (unit.includes('k') || unit === 'l' || unit.includes('lakh'))) {
                   if (unit.includes('k')) n *= 1000;
                   if (unit.includes('l') || unit.includes('lakh')) n *= 100000;
                 }
                 return n;
               };

               const rangeMatch = str.match(/(\d+)(k|lakh|l)?\s*-\s*(\d+)(k|lakh|l)?/);
               if (rangeMatch) {
                  minBudget = extractNum(rangeMatch[1], rangeMatch[2]);
                  maxBudget = extractNum(rangeMatch[3], rangeMatch[4]);
               } else if (str.includes('under') || str.includes('below') || str.includes('<')) {
                  const num = str.match(/(\d+)(k|lakh|l)?/);
                  if (num) maxBudget = extractNum(num[1], num[2]);
               } else if (str.includes('above') || str.includes('over') || str.includes('>')) {
                  const num = str.match(/(\d+)(k|lakh|l)?/);
                  if (num) minBudget = extractNum(num[1], num[2]);
               }
            }
         }
      }

      // 3. Score and Filter
      const scored = allPrograms.map(p => {
        const pName = normalize(p.name);
        const pCat = normalize(p.category);
        const pLevel = normalize(p.level);
        const pMode = normalize(p.mode);
        const pSpecs = (p.specializations || []).map(normalize);
        const pAll = [pName, pCat, pLevel, pMode, ...pSpecs];

        const pNameTokens = String(p.name || '').toLowerCase().replace(/[\.\-]/g, '').replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
        const pCatTokens = String(p.category || '').toLowerCase().replace(/[\.\-]/g, '').replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
        const pTokens = [...pNameTokens, ...pCatTokens];

        // Field match: strict comparison to avoid false positives
        let fieldMatch = false;
        if (selectedFieldValue && uniqueFieldTerms.length > 0) {
          fieldMatch = uniqueFieldTerms.some(term => {
            const t = term.toLowerCase();
            
            // Check tokenized pure words for exact matches (catches 'ba', 'ma', 'bcom' etc)
            if (pTokens.some(w => w === t)) return true;

            // Then check the joined strings (pAll) for larger substring matches
            return pAll.some(field => {
              // Exact match or significant prefix/suffix match (e.g. "business" and "businessmanagement")
              const f = field.toLowerCase();
              if (f === t) return true;
              if (t.length >= 4 && (f.startsWith(t) || f.endsWith(t) || f.includes(t))) return true;
              return false;
            });
          });
        }
        
        let score = 0;
        if (fieldMatch) {
          score += 10;
        }

        // Other terms (level, mode, etc.) - standard scoring
        uniqueOtherTerms.forEach(term => {
          if (pAll.some(f => f === term || (term.length > 3 && f.includes(term)))) score += 1;
        });

        // Strict Budget Check
        let budgetMatch = true;
        if (maxBudget !== Infinity || minBudget > 0) {
           const pFee = parseInt(String(p.fee).replace(/,/g, '').replace(/[^0-9]/g, ''));
           if (!isNaN(pFee) && pFee > 0) {
              if (pFee < minBudget || pFee > maxBudget) budgetMatch = false;
           } else {
              // If fee is 0 or non-existent (e.g. open school), optionally we can pass it, or block it. 
              // Usually we pass it if it's free/contact for info.
              budgetMatch = true;
           }
        }
        
        return { ...p, _score: score, _budgetMatch: budgetMatch, _fieldMatch: fieldMatch };
      });

      // Sort by score
      scored.sort((a, b) => b._score - a._score || (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

      // Min score required to be considered an exact match (if field selected, we require 10 pts)
      const minExactScore = selectedFieldValue ? 10 : 1;
      
      const exact = scored.filter(p => p._score >= minExactScore && p._budgetMatch);
      // Fallback: It didn't make the exact list, but it still has some relevance 
      // (e.g. matching field but over budget, or matching level/mode but not field)
      const fallback = scored.filter(p => p._score > 0 && !(p._score >= minExactScore && p._budgetMatch));

      setResults(exact.slice(0, 6));
      setFallbackResults(fallback.slice(0, 4));

      setShowResults(true);

      // Save lead
      const formattedAnswers = questions.map(q => {
        const opt = q.options.find((o: any) => o.value === answers[q.field]);
        return opt ? opt.label : '';
      }).filter(Boolean).join(' | ');
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          phone: userData.phone || 'N/A',
          source: 'Course Finder Quiz',
          course: `Preferences: ${formattedAnswers}`,
        }),
      }).catch(() => {});

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const currentQ = questions[step - 1];
  
  let currentOptions = currentQ?.options || [];
  if (step === 2 && questions[0]) {
    const firstQAns = answers[questions[0].field];
    if (firstQAns === 'below_12' || String(firstQAns).toLowerCase().includes('below 12')) {
      currentOptions = [
        { value: 'skill', label: 'Skill Program' },
        { value: 'openschool', label: 'Open School' }
      ];
    }
  }

  const allAnswered = currentQ && answers[currentQ.field];

  const trackCourseClick = async (program: any) => {
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          phone: userData.phone || 'N/A',
          source: 'Course Finder Click',
          course: `${program.name} at ${program.university || program.universityId?.name || 'Unknown'}`,
        }),
      });
    } catch (e) {
      // Fire and forget
    }
  };

  const isOpenSchool = Object.values(answers).some(v => v === 'openschool' || String(v).toLowerCase().includes('open school'));


  return (
    <>
      <style>{CF_STYLES}</style>
      <button className="cf-floating-btn" onClick={() => setIsOpen(true)} aria-label="Find my course" style={{ display: 'none' }}>
        <span>Find My Course</span>
      </button>

      {isOpen && (
        <div className="cf-overlay" onClick={closeModal} role="dialog" aria-modal="true">
          <div className="cf-modal" onClick={e => e.stopPropagation()}>
            <button className="cf-close-btn" onClick={closeModal} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            {!gateCleared && <EnquiryGate onSuccess={(data) => { setUserData(data); setGateCleared(true); }} />}

            {gateCleared && questionsLoading && (
              <div className="cf-loading-screen"><p>Loading questions...</p></div>
            )}

            {gateCleared && !questionsLoading && !showResults && questions.length > 0 && currentQ && (
              <>
                <div className="cf-header">
                  <div className="cf-header-icon"><IconCompass /></div>
                  <h2 className="cf-title">Hi {userData.name}! Let&apos;s find your course</h2>
                  <p className="cf-subtitle">Answer a few questions for personalised recommendations</p>
                </div>
                <div className="cf-progress-container">
                  <div className="cf-progress-bar">
                    <div className="cf-progress-fill" style={{ width: `${(step / questions.length) * 100}%` }}></div>
                  </div>
                  <span className="cf-progress-text">Step {step} of {questions.length}</span>
                </div>
                <div className={`cf-question-container ${animate ? 'animate' : ''}`}>
                  <h3 className="cf-question">{currentQ.question}</h3>
                  <div className="cf-options-grid">
                    {currentOptions.map((opt: any) => (
                      <button
                        key={opt.value}
                        className={`cf-option-btn ${answers[currentQ.field] === opt.value ? 'selected' : ''}`}
                        onClick={() => handleOption(currentQ.field, opt.value)}
                      >
                        <span className="cf-option-icon"><IconStar /></span>
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="cf-navigation">
                  {step > 1 && (
                    <button className="cf-back-btn" onClick={handleBack}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                      Back
                    </button>
                  )}
                  {step === questions.length && allAnswered && (
                    <button className="cf-find-btn" onClick={findCourses} disabled={loading}>
                      {loading ? 'Finding...' : <><IconSearch /> Find Courses</>}
                    </button>
                  )}
                </div>
              </>
            )}

            {gateCleared && !questionsLoading && !showResults && questions.length === 0 && (
              <div className="cf-loading-screen">
                <p>No questions configured yet. Please ask an admin to set up the course finder.</p>
              </div>
            )}

            {gateCleared && showResults && (
              <>
                <div className="cf-results-header">
                  <div className="cf-results-icon"><IconStar /></div>
                  <h2 className="cf-results-title">
                    {results.length > 0 
                      ? 'Recommended Courses For You!' 
                      : (fallbackResults.length > 0 ? 'Similar Courses you may like' : 'No Matches Found')}
                  </h2>
                  <p className="cf-results-subtitle">
                    {results.length > 0
                      ? `We found ${results.length} courses matching your preferences`
                      : fallbackResults.length > 0
                      ? 'No exact match — here are similar courses based on your choices'
                      : 'Try adjusting your preferences'}
                  </p>
                </div>
                <div className="cf-results-list">
                  {(results.length > 0 ? results : fallbackResults).length > 0 ? (results.length > 0 ? results : fallbackResults).map(program => (
                    <Link key={program._id} href="/programs" className="cf-result-card" onClick={() => { trackCourseClick(program); setIsOpen(false); }}>
                      <div className="cf-result-info">
                        <h4 className="cf-result-name">{program.name}</h4>
                        <p className="cf-result-university"><IconBuilding /> {program.university || program.universityId?.name || 'University'}</p>
                        <div className="cf-result-meta">
                          <span className="cf-result-badge"><IconClock /> {program.duration}</span>
                          <span className="cf-result-badge"><IconMonitor /> {program.mode}</span>
                        </div>
                      </div>
                      {!isOpenSchool && (
                        <div className="cf-result-price">
                          <span className="cf-price-label">Fee</span>
                          <span className="cf-price-value">Rs.{Number(program.fee).toLocaleString('en-IN')}</span>
                        </div>
                      )}
                    </Link>
                  )) : (
                    <div className="cf-no-results">
                      <span className="cf-no-results-icon"><IconFrown /></span>
                      <p>No programs match your criteria.</p>
                      <Link href="/programs" className="cf-browse-all-btn" onClick={() => setIsOpen(false)}>Browse All Programs</Link>
                    </div>
                  )}
                </div>
                <div className="cf-results-actions">
                  <button className="cf-restart-btn" onClick={reset}><IconRefresh /> Start Over</button>
                  <Link href="/programs" className="cf-view-all-btn" onClick={() => setIsOpen(false)}>View All Programs <IconChevronRight /></Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const CF_STYLES = `
.cf-floating-btn {
  position: fixed; bottom: 1.5rem; right: 5.5rem;
  background: linear-gradient(135deg, #0051ba 0%, #1a7fe8 100%);
  color: #fff; border: none; border-radius: 50px;
  padding: 16px 26px; font-size: 1rem; font-weight: 600;
  font-family: inherit; cursor: pointer;
  display: flex; align-items: center; gap: 10px;
  box-shadow: 0 8px 30px rgba(0,81,186,0.4); z-index: 1000;
  animation: cf-float-pulse 3s ease-in-out infinite;
  transition: transform 0.2s, box-shadow 0.2s;
}
.cf-floating-btn:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 12px 40px rgba(0,81,186,0.5); animation: none; }
@keyframes cf-float-pulse { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
.cf-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.55);
  display: flex; align-items: center; justify-content: center;
  z-index: 10000; padding: 20px; backdrop-filter: blur(4px);
  animation: cf-fade-in 0.2s ease;
}
@keyframes cf-fade-in { from{opacity:0} to{opacity:1} }
.cf-modal {
  background: #fff; border-radius: 24px;
  max-width: 600px; width: 100%; max-height: 90vh; overflow: auto;
  position: relative; box-shadow: 0 25px 60px rgba(0,0,0,0.2);
  animation: cf-slide-up 0.3s ease;
  margin: auto;
}
@keyframes cf-slide-up { from{opacity:0;transform:translateY(30px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
.cf-close-btn {
  position: absolute; top: 16px; right: 16px;
  background: #F1F5F9; border: none;
  width: 36px; height: 36px; border-radius: 50%;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  color: #64748B; z-index: 10; transition: all 0.2s;
}
.cf-close-btn:hover { background: #E2E8F0; transform: rotate(90deg); }
.cf-gate {
  padding: 40px 35px 35px;
  background: #fff;
  border-radius: 24px; text-align: center;
}
.cf-gate-icon {
  width: 72px; height: 72px; border-radius: 50%;
  background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 20px; color: #0051ba;
  box-shadow: 0 8px 24px rgba(0,81,186,0.15);
}
.cf-gate-title { color: #0f172a; font-size: 1.8rem; font-weight: 500; margin: 0 0 10px; }
.cf-gate-sub { color: #64748B; font-size: 1rem; margin: 0 0 30px; }
.cf-gate-form { display: flex; flex-direction: column; gap: 14px; text-align: left; }
.cf-field { position: relative; }
.cf-field-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); pointer-events: none; display: flex; align-items: center; }
.cf-input {
  width: 100%; padding: 13px 16px 13px 42px;
  border-radius: 10px; border: 2px solid #E2E8F0;
  background: #F8FAFC; color: #0f172a; font-size: 1rem; font-family: inherit;
  box-sizing: border-box; transition: border-color 0.2s, background 0.2s;
}
.cf-input::placeholder { color: #94A3B8; }
.cf-input:focus { outline: none; border-color: #0051ba; background: #fff; box-shadow: 0 0 0 3px rgba(0,81,186,0.1); }
.cf-submit-btn {
  width: 100%; padding: 14px; margin-top: 6px;
  background: linear-gradient(135deg, #0051ba 0%, #1a7fe8 100%);
  color: #fff; border: none; border-radius: 10px;
  font-size: 1rem; font-weight: 600; font-family: inherit;
  cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;
  box-shadow: 0 4px 15px rgba(0,81,186,0.3); transition: all 0.2s;
}
.cf-submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,81,186,0.4); }
.cf-submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
.cf-error { background: #FEF2F2; color: #DC2626; padding: 12px 15px; border-radius: 10px; font-size: 0.9rem; margin-bottom: 15px; border-left: 4px solid #DC2626; }
.cf-privacy { color: #94A3B8; font-size: 0.8rem; margin: 15px 0 0; display: flex; align-items: center; justify-content: center; gap: 6px; }
.cf-loading-screen { padding: 60px 30px; text-align: center; color: #64748B; display: flex; flex-direction: column; align-items: center; gap: 15px; font-size: 1rem; }
.cf-header {
  text-align: center; padding: 36px 30px 28px;
  background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
  border-radius: 24px 24px 0 0; border-bottom: 1px solid #E2E8F0;
}
.cf-header-icon {
  width: 64px; height: 64px; border-radius: 50%;
  background: linear-gradient(135deg, #0051ba 0%, #1a7fe8 100%);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px; color: #fff;
  box-shadow: 0 8px 20px rgba(0,81,186,0.3);
}
.cf-title { color: #0f172a; font-size: 1.5rem; font-weight: 500; margin: 0 0 8px; }
.cf-subtitle { color: #64748B; font-size: 0.95rem; margin: 0; }
.cf-progress-container { padding: 18px 30px; border-bottom: 1px solid #E2E8F0; background: #fff; }
.cf-progress-bar { height: 6px; background: #E2E8F0; border-radius: 4px; overflow: hidden; margin-bottom: 8px; }
.cf-progress-fill { height: 100%; background: linear-gradient(135deg, #0051ba, #1a7fe8); border-radius: 4px; transition: width 0.4s ease; }
.cf-progress-text { color: #64748B; font-size: 0.82rem; font-weight: 600; }
.cf-question-container { padding: 28px 30px; background: #fff; }
.cf-question-container.animate { animation: cf-q-in 0.3s ease; }
@keyframes cf-q-in { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
.cf-question { color: #0f172a; font-size: 1.2rem; font-weight: 500; margin-bottom: 22px; text-align: center; line-height: 1.4; }
.cf-options-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; }
.cf-option-btn {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  padding: 18px 12px; background: #F8FAFC; border: 2px solid #E2E8F0;
  border-radius: 12px; cursor: pointer; text-align: center;
  font-size: 0.9rem; color: #334155; font-weight: 500; font-family: inherit;
  transition: all 0.2s;
}
.cf-option-btn:hover { border-color: #0051ba; background: #EFF6FF; transform: translateY(-2px); box-shadow: 0 4px 15px rgba(0,81,186,0.12); }
.cf-option-btn.selected { background: #EFF6FF; border-color: #0051ba; color: #0051ba; }
.cf-option-icon { color: #0051ba; display: flex; align-items: center; }
.cf-navigation { display: flex; justify-content: space-between; padding: 0 30px 28px; gap: 15px; background: #fff; }
.cf-back-btn { padding: 11px 22px; background: #F1F5F9; color: #64748B; border: none; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 0.9rem; font-family: inherit; transition: all 0.2s; display: flex; align-items: center; gap: 6px; }
.cf-back-btn:hover { background: #E2E8F0; color: #334155; }
.cf-find-btn {
  padding: 12px 28px; background: linear-gradient(135deg, #0051ba 0%, #1a7fe8 100%);
  color: #fff; border: none; border-radius: 10px; cursor: pointer;
  font-weight: 600; font-size: 0.95rem; font-family: inherit; margin-left: auto;
  box-shadow: 0 4px 15px rgba(0,81,186,0.3); transition: all 0.2s;
  display: flex; align-items: center; gap: 8px;
}
.cf-find-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,81,186,0.4); }
.cf-find-btn:disabled { opacity: 0.7; cursor: not-allowed; }
.cf-results-header {
  text-align: center; padding: 36px 30px 24px;
  background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
  border-radius: 24px 24px 0 0; border-bottom: 1px solid #E2E8F0;
}
.cf-results-icon {
  width: 64px; height: 64px; border-radius: 50%;
  background: linear-gradient(135deg, #0051ba 0%, #38b2f5 100%);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px; color: #fff;
  box-shadow: 0 8px 20px rgba(0,81,186,0.3);
}
.cf-results-title { color: #0f172a; font-size: 1.4rem; font-weight: 500; margin: 0 0 8px; }
.cf-results-subtitle { color: #64748B; font-size: 0.9rem; margin: 0; }
.cf-results-list { padding: 20px; max-height: 350px; overflow: auto; background: #fff; }
.cf-result-card { display: flex; justify-content: space-between; align-items: center; padding: 16px; background: #F8FAFC; border-radius: 12px; margin-bottom: 10px; text-decoration: none; transition: all 0.2s; border: 2px solid transparent; }
.cf-result-card:hover { border-color: #0051ba; background: #fff; transform: translateX(4px); box-shadow: 0 4px 15px rgba(0,0,0,0.07); }
.cf-result-info { flex: 1; min-width: 0; }
.cf-result-name { color: #0f172a; font-size: 1rem; font-weight: 600; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cf-result-university { color: #64748B; font-size: 0.82rem; margin-bottom: 8px; display: flex; align-items: center; gap: 5px; }
.cf-result-meta { display: flex; gap: 8px; flex-wrap: wrap; }
.cf-result-badge { background: #E2E8F0; color: #64748B; padding: 3px 10px; border-radius: 6px; font-size: 0.75rem; display: flex; align-items: center; gap: 4px; }
.cf-result-price { text-align: right; flex-shrink: 0; margin-left: 15px; }
.cf-price-label { display: block; color: #94A3B8; font-size: 0.75rem; margin-bottom: 3px; }
.cf-price-value { color: #059669; font-size: 1.05rem; font-weight: 500; }
.cf-no-results { text-align: center; padding: 40px 20px; color: #64748B; }
.cf-no-results-icon { margin-bottom: 12px; display: flex; justify-content: center; }
.cf-browse-all-btn { display: inline-block; margin-top: 15px; padding: 11px 22px; background: linear-gradient(135deg, #0051ba, #1a7fe8); color: #fff; border-radius: 10px; text-decoration: none; font-weight: 600; transition: all 0.2s; }
.cf-browse-all-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,81,186,0.3); }
.cf-results-actions { display: flex; justify-content: space-between; padding: 18px 28px 24px; border-top: 1px solid #E2E8F0; gap: 12px; background: #fff; border-radius: 0 0 24px 24px; }
.cf-restart-btn { padding: 11px 18px; background: #F1F5F9; color: #64748B; border: none; border-radius: 10px; cursor: pointer; font-weight: 600; font-family: inherit; transition: all 0.2s; display: flex; align-items: center; gap: 6px; }
.cf-restart-btn:hover { background: #E2E8F0; color: #334155; }
.cf-view-all-btn { padding: 11px 22px; background: linear-gradient(135deg, #0051ba 0%, #1a7fe8 100%); color: #fff; border-radius: 10px; text-decoration: none; font-weight: 600; transition: all 0.2s; display: flex; align-items: center; gap: 6px; }
.cf-view-all-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,81,186,0.3); }
@media (max-width: 768px) {
  .cf-floating-btn span { display: none; }
  .cf-floating-btn { padding: 16px; border-radius: 50%; width: 56px; height: 56px; justify-content: center; bottom: 1.5rem; right: 5rem; }
  .cf-overlay { align-items: center; padding: 16px; }
  .cf-modal { border-radius: 20px; max-height: 92vh; width: 100%; }
  .cf-options-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
  .cf-option-btn { padding: 12px 8px; font-size: 0.82rem; }
  .cf-gate { padding: 24px 16px 20px; }
  .cf-gate-title { font-size: 1.4rem; }
  .cf-gate-sub { font-size: 0.9rem; }
  .cf-header { padding: 24px 16px 18px; }
  .cf-title { font-size: 1.2rem; }
  .cf-progress-container { padding: 14px 16px; }
  .cf-question-container { padding: 20px 16px; }
  .cf-question { font-size: 1rem; margin-bottom: 16px; }
  .cf-navigation { padding: 0 16px 20px; gap: 10px; }
  .cf-results-header { padding: 24px 16px 18px; }
  .cf-results-title { font-size: 1.2rem; }
  .cf-results-list { padding: 12px; max-height: 45vh; }
  .cf-result-card { padding: 12px; }
  .cf-result-name { font-size: 0.9rem; }
  .cf-result-price { margin-left: 8px; }
  .cf-results-actions { flex-direction: column; padding: 14px 16px 20px; }
  .cf-restart-btn, .cf-view-all-btn { justify-content: center; width: 100%; text-align: center; }
  .cf-loading-screen { padding: 40px 20px; }
}
@media (max-width: 400px) {
  .cf-options-grid { grid-template-columns: 1fr; }
  .cf-gate-title { font-size: 1.2rem; }
  .cf-modal { max-height: 95vh; }
}
@media (min-width: 769px) and (max-width: 1024px) {
  .cf-modal { max-width: 520px; }
}
`;
