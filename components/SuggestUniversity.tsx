'use client';
import { useState, useEffect, useRef } from 'react'; // v2.1.3
import Link from 'next/link';

const ACCENT = '#ffffff'; // White
const MODAL_BG = '#1e3a8a'; // Navy Blue
const TEXT_PRIMARY = '#ffffff'; // White
const TEXT_SECONDARY = 'rgba(255,255,255,0.6)';
const INPUT_BG = 'rgba(255,255,255,0.05)';

const SPECIALIZATIONS = [
  "Artificial Intelligence", "Cloud Computing", "Cyber Security", "Data Science", 
  "E-Commerce", "Finance", "Full Stack Development", "Human resource", "Marketing", "Taxation"
];

const getBudgetOptions = (val: string) => {
  const v = (val || '').toLowerCase();
  if (v.includes('min')) {
    return [
      { label: '50,000 - 80,000', value: '50k-80k' },
      { label: '80,000 - 1,00,000', value: '80k-1L' },
      { label: '1,00,000 - 1,20,000', value: '1L-1.2L' },
    ];
  }
  if (v.includes('max')) {
    return [
      { label: '1,20,000 - 2,00,000', value: '1.2L-2L' },
      { label: '2,00,000 - 3,00,000', value: '2L-3L' },
      { label: '3,00,000+', value: '3L+' },
    ];
  }
  return [
    { label: '30,000 - 50,000', value: '30k-50k' },
    { label: '50,000 - 80,000', value: '50k-80k' },
    { label: '80,000 - 1,00,000', value: '80k-1L' },
  ];
};

export default function SuggestUniversity({ onClose }: { onClose: () => void }) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loadingQ, setLoadingQ] = useState(true);
  const [step, setStep] = useState(0); // 0=loading, 1..n=Quiz, n+1=Results, n+2=Lead Form, n+3=Success
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedSpec, setSelectedSpec] = useState('');
  const [specOpen, setSpecOpen] = useState(false);
  const [specSearch, setSpecSearch] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSimilar, setIsSimilar] = useState(false);
  const [searching, setSearching] = useState(false);
  const [animate, setAnimate] = useState(true);

  // Lead form state
  const [lead, setLead] = useState({ name: '', email: '', phone: '', helpText: '' });
  const [submitting, setSubmitting] = useState(false);

  const specRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/public/suggest-university-questions')
      .then(r => r.json())
      .then(data => {
        const qs = Array.isArray(data) && data.length > 0 ? data : [];
        setQuestions(qs);
        // If 0 questions, skip directly to the lead form
        if (qs.length === 0) {
           setStep(1); // leadStep will be 1
        }
        else setStep(1); 
      })
      .catch(() => setStep(1))
      .finally(() => setLoadingQ(false));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (specRef.current && !specRef.current.contains(event.target as Node)) {
        setSpecOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalSteps = questions.length || 0;
  const leadStep = totalSteps > 0 ? totalSteps + 1 : 1;
  const resultsStep = leadStep + 1;
  const successStep = resultsStep + 1; // Unused or merged with results

  const currentQ = questions[step - 1];

  const isBudgetTriggerQ = currentQ && currentQ.options && currentQ.options.some((o: any) => {
    const lbl = (o.label || '').toLowerCase();
    return lbl.includes('minimum') || lbl.includes('maximum');
  });

  const [errors, setErrors] = useState({ phone: '', email: '' });

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = { phone: '', email: '' };

    if (!lead.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
      newErrors.email = 'Please enter a valid email address';
      hasError = true;
    }

    if (!lead.phone) {
      newErrors.phone = 'Phone number is required';
      hasError = true;
    } else if (!/^\d{10}$/.test(lead.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    if (!lead.name || !lead.email) return;
    setSubmitting(true);
    
    let prefSummary = '';
    let matchedU: any[] = [];
    let selectedCourseLabel = answers.course || '';
    
    try {
      prefSummary = Object.entries(answers).map(([k, v]) => `${k}: ${v}`).join(' | ');
      
      
      // Get the readable label for the course
      const courseQ = questions.find(q => q.field === 'course');
      if (courseQ) {
        selectedCourseLabel = courseQ.options.find((o: any) => o.value === answers.course)?.label || answers.course;
      }
      
      const matchData = await getMatches(answers);
      setResults(matchData.results);
      setIsSimilar(matchData.isSimilar);
    } catch (e) { console.error('Matching failed', e); }

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          phone: lead.phone || 'N/A',
          course: `Course: ${selectedCourseLabel} | University: ${matchedU.map(u => u.name).join(', ') || 'None'} | Assistance: ${lead.helpText || 'None'}`,
          source: 'Suggest University',
        }),
      });
    } catch (err) { console.error('Lead submission failed', err); }
    
    setSubmitting(false);
    setAnimate(false);
    setTimeout(() => { 
      setStep(resultsStep);
      setAnimate(true);
    }, 220);
  };

  const isWithinBudget = (feeStr: any, budgetVal: string) => {
    if (!budgetVal) return true;
    if (!feeStr) return false;
    const feeNum = parseInt(String(feeStr).replace(/[^0-9]/g, ''));
    if (isNaN(feeNum) || feeNum === 0) return true;

    const extractNum = (nStr: string, unit: string) => {
      let n = parseInt(nStr);
      if (unit && (unit.includes('k') || unit === 'l' || unit.includes('lakh'))) {
        if (unit.includes('k')) n *= 1000;
        if (unit.includes('l') || unit.includes('lakh')) n *= 100000;
      }
      return n;
    };
    
    const rangeMatch = budgetVal.toLowerCase().replace(/_/g, '-').match(/(\d+)(k|lakh|l)?\s*-\s*(\d+)(k|lakh|l)?/);
    if (rangeMatch) {
       const min = extractNum(rangeMatch[1], rangeMatch[2]);
       const max = extractNum(rangeMatch[3], rangeMatch[4]);
       return feeNum >= min && feeNum <= max;
    }
    if (budgetVal.toLowerCase().includes('below') || budgetVal.toLowerCase().includes('under')) {
       const numMatch = budgetVal.toLowerCase().match(/(\d+)(k|lakh|l)?/);
       if (numMatch) return feeNum <= extractNum(numMatch[1], numMatch[2]);
    }
    if (budgetVal.toLowerCase().includes('above') || budgetVal.toLowerCase().includes('over')) {
       const numMatch = budgetVal.toLowerCase().match(/(\d+)(k|lakh|l)?/);
       if (numMatch) return feeNum >= extractNum(numMatch[1], numMatch[2]);
    }
    return true;
  };

  const getMatches = async (ans: Record<string, string>) => {
    try {
      const [uniRes, progRes] = await Promise.all([
        fetch('/api/universities'),
        fetch('/api/public/programs'),
      ]);
      const uniData = await uniRes.json();
      const progData = await progRes.json();
      const universities: any[] = uniData?.data || uniData || [];
      const programs: any[] = Array.isArray(progData) ? progData : progData?.data || [];

      // ── DEBUG: Remove after fixing ──
      console.log('🔍 ANSWERS:', JSON.stringify(ans));
      console.log('🏛️ UNIVERSITIES (first 5):', universities.slice(0, 5).map(u => ({ name: u.name, type: u.type, location: u.location })));
      // ── END DEBUG ──

      const courseLabel = questions
        .find(q => q.field === 'course')
        ?.options.find((o: any) => o.value === ans.course)?.label || ans.course || '';
      
      const synonyms: Record<string, string[]> = {
        arts: ['ba', 'ma'],
        commerce: ['bcom', 'mcom'],
        management: ['mba', 'bba'],
        tech: ['btech', 'mtech', 'bca', 'mca', 'bsc cs', 'msc cs', 'bsccs', 'msccs'],
        science: ['msc', 'bsc']
      };

      const getExpandedKeywords = (label: string) => {
        const normalized = label.toLowerCase();
        let keywords = [normalized.replace(/[\s.\-]/g, '')];
        for (const [key, syns] of Object.entries(synonyms)) {
          if (normalized.includes(key)) keywords = [...keywords, ...syns];
        }
        return keywords;
      };

      const courseKeywords = courseLabel ? getExpandedKeywords(courseLabel) : [];
      const specKeywords = ans.specialization ? getExpandedKeywords(ans.specialization) : [];

      // ── Smart Type Detection ──
      // Scan ALL answer values to find one that looks like a university type
      // This makes filtering work regardless of what the admin named the question field
      const KNOWN_UNI_TYPES = ['private', 'govt', 'government', 'public', 'central', 'state', 'deemed', 'autonomous'];
      const allAnswerValues = Object.values(ans);

      // Check explicit field names first, then fall back to scanning all values
      let requestedType = ans.type || ans.university_type || ans.uni_type || ans.college_type || '';
      if (!requestedType) {
        requestedType = allAnswerValues.find(v =>
          KNOWN_UNI_TYPES.includes((v || '').toLowerCase().trim())
        ) || '';
      }

      // ── Smart Place Detection ──
      let requestedPlace = ans.place || ans.city || ans.location || ans.state || '';
      // If not found via field name, look for answer values that appear in university locations
      if (!requestedPlace) {
        const locationWords = universities.flatMap(u => [u.location, u.city, u.state].filter(Boolean).map((s: string) => s.toLowerCase()));
        requestedPlace = allAnswerValues.find(v => {
          const vl = (v || '').toLowerCase();
          return vl.length > 2 && !KNOWN_UNI_TYPES.includes(vl) && locationWords.some(loc => loc.includes(vl) || vl.includes(loc));
        }) || '';
      }

      console.log(`🎯 Detected type filter: "${requestedType}", place filter: "${requestedPlace}"`);

      // Stage 1: Find all universities offering the requested course/specialization
      let currentMatches = universities.map((u: any) => {
        const uId = u._id;
        const uNameNS = (u.name || '').toLowerCase().replace(/[\s.\-]/g, '');
        const uProgs = programs.filter((p: any) => {
          if (p.universityId && uId && p.universityId === uId) return true;
          const pUni = (p.university || '').toLowerCase().replace(/[\s.\-]/g, '');
          return pUni && (pUni === uNameNS || pUni.includes(uNameNS) || uNameNS.includes(pUni));
        }).filter((p: any) => {
          let matchesCriteria = true;
          if (courseKeywords.length > 0 || specKeywords.length > 0) {
            // Pad with spaces and normalize punctuation to spaces for accurate whole-word/acronym matching
            const pn = ` ${(p.name || '').toLowerCase().replace(/[.\-\/]/g, ' ')} `;
            
            const isMatch = (keywords: string[]) => keywords.some(k => {
              if (k.length <= 3) {
                // For short acronyms like 'ba', 'ma', 'msc', ensure they match as standalone words
                // otherwise 'ba' matches 'bachelor' and 'ma' matches 'master' or 'management'
                return pn.includes(` ${k} `) || pn.includes(` ${k}s `);
              }
              // For longer keywords, substring match is fine, but we use the spaced 'pn'
              return pn.includes(k);
            });

            const courseMatch = courseKeywords.length > 0 ? isMatch(courseKeywords) : false;
            const specMatch = specKeywords.length > 0 ? isMatch(specKeywords) : false;
            
            matchesCriteria = courseMatch || specMatch;
          }
          return matchesCriteria;
        });
        return { ...u, _programs: uProgs };
      }).filter(u => u._programs.length > 0);

      const allCourseMatches = [...currentMatches];

      // Stage 2: Filter by Strict Type (Type is a MUST-HAVE, do not fall back to different types)
      if (requestedType && requestedType !== 'any') {
        const rType = requestedType.toLowerCase().trim();
        currentMatches = currentMatches.filter((u: any) => {
          const uType = (u.type || '').toLowerCase().trim();
          
          if (rType === 'govt' || rType === 'government') {
            return ['govt', 'government', 'public', 'central', 'state'].some(t => uType.includes(t));
          } else if (rType === 'private') {
            return !(['govt', 'government', 'public', 'central', 'state'].some(t => uType.includes(t)));
          } else if (rType === 'deemed') {
            return uType.includes('deemed');
          } else {
            return uType.includes(rType) || rType.includes(uType);
          }
        });
      }
      
      const typeMatches = [...currentMatches];

      // Stage 3: Filter by Strict Place
      if (requestedPlace && requestedPlace !== 'any') {
        const rPlace = requestedPlace.toLowerCase();
        currentMatches = currentMatches.filter((u: any) => {
          const uLoc = (u.location || u.city || u.state || '').toLowerCase();
          return uLoc.includes(rPlace);
        });
      }
      
      const typePlaceMatches = [...currentMatches];

      // Stage 4: Filter by Budget
      const fullStrictMatches = typePlaceMatches.map(u => {
         const budgetProgs = u._programs.filter((p: any) => {
            if (ans.budget) return isWithinBudget(p.fee, ans.budget);
            return true;
         });
         return { ...u, _programs: budgetProgs };
      }).filter(u => u._programs.length > 0);

      console.log(`📊 Course: ${allCourseMatches.length}, Type: ${typeMatches.length}, Place: ${typePlaceMatches.length}, Budget(Strict): ${fullStrictMatches.length}`);

      // Return Logic (Fallback chain)
      if (fullStrictMatches.length > 0) return { results: fullStrictMatches.slice(0, 4), isSimilar: false };

      if (typePlaceMatches.length > 0) return { results: typePlaceMatches.slice(0, 4), isSimilar: true };

      if (typeMatches.length > 0) return { results: typeMatches.slice(0, 4), isSimilar: true };

      // Finally, if no type matches were found at all, but course match exists (VERY relaxed fallback, but only if type matching yielded 0 results initially to prevent showing wrong types when correct ones exist but failed later filters)
      if (typeMatches.length === 0 && allCourseMatches.length > 0) return { results: allCourseMatches.slice(0, 4), isSimilar: true };

      return { results: [], isSimilar: false };
    } catch (err) {
      console.error('getMatches error:', err);
      return { results: [], isSimilar: false };
    }
  };

  const handleOption = (field: string, value: string) => {
    const newAnswers = { ...answers, [field]: value };
    if (field === 'course' && selectedSpec) {
      newAnswers['specialization'] = selectedSpec;
    }
    setAnswers(newAnswers);

    if (isBudgetTriggerQ) return;

    if (step === totalSteps) {
      setAnimate(false);
      setTimeout(() => { 
        setStep(leadStep);
        setAnimate(true);
      }, 220);
      return;
    } else {
      setAnimate(false);
      setTimeout(() => { setStep(s => s + 1); setAnimate(true); }, 220);
    }
  };



  const findUniversities = async (ans: Record<string, string>) => {
    setSearching(true);
    setStep(resultsStep);
    const matchData = await getMatches(ans);
    setResults(matchData.results);
    setIsSimilar(matchData.isSimilar);
    setSearching(false);
  };

  const filteredSpecs = SPECIALIZATIONS.filter(s => 
    s.toLowerCase().includes(specSearch.toLowerCase())
  );

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(8px)', zIndex: 3000 }} />

      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 3001, width: '92%', maxWidth: 540, background: MODAL_BG, borderRadius: 32, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.1)', maxHeight: '96vh', display: 'flex', flexDirection: 'column', color: TEXT_PRIMARY, fontFamily: 'Inter, system-ui, sans-serif' }}>
        
        <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, width: 32, height: 32, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <div style={{ padding: '3.5rem 2.5rem 3rem', overflowY: 'auto', flex: 1 }}>
          
          {/* QUIZ STEPS */}
          {step > 0 && step <= totalSteps && currentQ && (
            <div key={step} style={{ animation: animate ? 'suFadeIn 0.4s ease' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                {Array.from({ length: totalSteps }).map((_, i) => {
                  const s = i + 1;
                  const active = s === step;
                  const done = s < step;
                  return (
                    <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ 
                        width: 24, height: 24, borderRadius: '50%', 
                        background: active ? ACCENT : (done ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.1)'),
                        color: active || done ? '#000' : '#fff',
                        fontSize: '0.7rem', fontWeight: 800,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.3s'
                      }}>{s}</div>
                      {s < totalSteps && <div style={{ width: 8, height: 2, background: 'rgba(255,255,255,0.1)', margin: '0 2px' }} />}
                    </div>
                  );
                })}
              </div>

              <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: TEXT_PRIMARY, marginBottom: '2.5rem', textAlign: 'center', lineHeight: 1.3 }}>{currentQ.question}</h3>
              
              {step === 1 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '0.65rem' }}>
                    {currentQ.options.map((opt: any) => {
                      const selected = answers[currentQ.field] === opt.value;
                      return (
                        <button key={opt.value} onClick={() => handleOption(currentQ.field, opt.value)}
                          style={{ padding: '12px 6px', borderRadius: 10, border: '1.5px solid', borderColor: selected ? ACCENT : 'rgba(255,255,255,0.1)', background: selected ? ACCENT : 'rgba(255,255,255,0.05)', color: selected ? '#000' : '#fff', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s' }}>
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                  <div ref={specRef} style={{ position: 'relative' }}>
                    <div onClick={() => setSpecOpen(!specOpen)} style={{ background: INPUT_BG, borderRadius: 14, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', border: '1.5px solid rgba(255,255,255,0.1)' }}>
                      <span style={{ fontSize: '1rem', color: selectedSpec ? TEXT_PRIMARY : TEXT_SECONDARY }}>
                        {selectedSpec || 'Select Specialization (Optional)'}
                      </span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={TEXT_SECONDARY} strokeWidth="3" style={{ transform: specOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}><path d="M6 9l6 6 6-6"/></svg>
                    </div>
                    {specOpen && (
                      <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, background: '#fff', borderRadius: 16, boxShadow: '0 20px 50px rgba(0,0,0,0.3)', zIndex: 20, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                        <div style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 10 }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                          <input autoFocus placeholder="Search specializations..." value={specSearch} onChange={e => setSpecSearch(e.target.value)} style={{ border: 'none', outline: 'none', fontSize: '0.95rem', width: '100%', color: '#000' }} />
                        </div>
                        <div style={{ maxHeight: 200, overflowY: 'auto' }}>
                          {filteredSpecs.map(s => (
                            <div key={s} onClick={() => { setSelectedSpec(s); setSpecOpen(false); }} style={{ padding: '12px 18px', fontSize: '0.9rem', color: '#000', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.05)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                              {s.toUpperCase()}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : isBudgetTriggerQ ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                    {currentQ.options.map((opt: any) => {
                      const selected = answers[currentQ.field] === opt.value;
                      return (
                        <button key={opt.value} onClick={() => handleOption(currentQ.field, opt.value)}
                          style={{ padding: '14px', borderRadius: 12, border: '1.5px solid', borderColor: selected ? ACCENT : 'rgba(255,255,255,0.1)', background: selected ? ACCENT : 'rgba(255,255,255,0.05)', color: selected ? '#000' : '#fff', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center', transition: 'all .2s' }}>
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                  {answers[currentQ.field] && (
                    <div style={{ marginTop: '1.5rem', animation: 'suFadeIn 0.3s ease' }}>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: TEXT_PRIMARY, marginBottom: '1.5rem', textAlign: 'left' }}>Select your budget for university *</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
                          {getBudgetOptions(answers[currentQ.field]).map(opt => {
                             const selected = answers.budget === opt.value;
                             return (
                               <button key={opt.value} onClick={() => setAnswers(prev => ({...prev, budget: opt.value}))} 
                                 style={{ padding: '14px', borderRadius: 12, border: '1.5px solid', borderColor: selected ? ACCENT : 'rgba(255,255,255,0.1)', background: selected ? ACCENT : 'rgba(255,255,255,0.05)', color: selected ? '#000' : '#fff', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center' }}>
                                 {opt.label}
                               </button>
                             );
                          })}
                      </div>
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                     <button onClick={() => setStep(s => s - 1)} style={{ flex: 1, padding: '14px', borderRadius: 12, background: 'transparent', color: ACCENT, border: `1.5px solid rgba(255,255,255,0.2)`, fontWeight: 700, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="15 18 9 12 15 6"/></svg> Previous
                     </button>
                     <button onClick={() => { 
                       if(answers.budget){ 
                         setAnimate(false); 
                         setTimeout(() => { 
                           if (step === totalSteps) setStep(leadStep);
                           else setStep(s => s + 1);
                           setAnimate(true);
                         }, 220); 
                       } 
                     }} disabled={!answers.budget} style={{ flex: 1, padding: '14px', borderRadius: 12, background: answers.budget ? ACCENT : 'rgba(255,255,255,0.1)', color: answers.budget ? '#000' : 'rgba(255,255,255,0.4)', border: 'none', fontWeight: 700, fontSize: '1rem', cursor: answers.budget ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'all 0.2s' }}>
                        Next <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"/></svg>
                     </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
                  {currentQ.options.map((opt: any) => {
                    const selected = answers[currentQ.field] === opt.value;
                    return (
                      <button key={opt.value} onClick={() => handleOption(currentQ.field, opt.value)}
                        style={{ padding: '18px 24px', borderRadius: 16, border: '1.5px solid', borderColor: selected ? ACCENT : 'rgba(255,255,255,0.1)', background: selected ? ACCENT : 'rgba(255,255,255,0.05)', color: selected ? '#000' : '#fff', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all .2s' }}>
                        {opt.label}
                      </button>
                    );
                  })}
                  {step > 1 && (
                    <button onClick={() => setStep(s => s - 1)} style={{ marginTop: '2.5rem', background: 'none', border: 'none', color: TEXT_SECONDARY, padding: '10px 0', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg> Back
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* RESULTS */}
          {step === resultsStep && (
            <div style={{ textAlign: 'center', padding: '1rem 0', animation: animate ? 'suFadeIn 0.4s ease' : 'none' }}>
               {searching ? (
                 <div style={{ padding: '4rem' }}><div style={{ width: 44, height: 44, border: '4px solid rgba(255,255,255,0.1)', borderTopColor: ACCENT, borderRadius: '50%', animation: 'suSpin 1s linear infinite', margin: '0 auto 2rem' }} /><p style={{ color: TEXT_SECONDARY, fontWeight: 600 }}>Crafting your academic roadmap...</p></div>
               ) : (
                 <>
                    <h2 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: isSimilar ? '0.5rem' : '2.5rem', color: TEXT_PRIMARY }}>
                      {isSimilar ? 'Similar Recommendations' : 'Recommended for You'}
                    </h2>
                    {isSimilar && results.length > 0 && (
                      <p style={{ color: TEXT_SECONDARY, fontSize: '0.9rem', marginBottom: '2.5rem' }}>
                        We couldn&apos;t find an exact match for all your preferences, but these universities offer your selected course:
                      </p>
                    )}
                   {results.length === 0 ? (
                      <div style={{ padding: '3rem 1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: 20, border: '1px dashed rgba(255,255,255,0.15)', marginBottom: '3rem' }}>
                         <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                         <h3 style={{ fontSize: '1.25rem', color: TEXT_PRIMARY, marginBottom: '0.5rem' }}>No Perfect Matches Found</h3>
                         <p style={{ color: TEXT_SECONDARY, fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>We couldn't find a program matching your exact criteria based on your current constraints.</p>
                      </div>
                   ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
                        {results.map((u, i) => (
                          <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '1.25rem', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <div style={{ width: 56, height: 56, background: '#fff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                              {u.logo ? <img src={u.logo} style={{ width: '70%', height: '70%', objectFit: 'contain' }} /> : '🏛️'}
                            </div>
                            <div style={{ flex: 1, textAlign: 'left' }}>
                               <div style={{ fontWeight: 700, fontSize: '1.05rem', color: TEXT_PRIMARY }}>{u.name}</div>
                               <div style={{ fontSize: '0.85rem', color: TEXT_SECONDARY }}>{u.location}</div>
                            </div>
                            <Link href={`/universities/${u.slug}`} onClick={onClose} style={{ background: ACCENT, color: '#000', padding: '10px 18px', borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem', boxShadow: '0 4px 12px rgba(255,255,255,0.1)' }}>View Details</Link>
                          </div>
                        ))}
                      </div>
                   )}
                   <button onClick={onClose} style={{ width: '100%', padding: '18px', background: ACCENT, color: '#000', border: 'none', borderRadius: 16, fontWeight: 700, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>Finish & Close</button>
                 </>
               )}
            </div>
          )}

          {/* LEAD CAPTURE FORM */}
          {step === leadStep && (
            <div style={{ animation: animate ? 'suFadeIn 0.4s ease' : 'none' }}>
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: TEXT_PRIMARY, marginBottom: '0.75rem' }}>Enter Your Details</h3>
                <p style={{ color: TEXT_SECONDARY, fontSize: '0.95rem', lineHeight: 1.6, maxWidth: 380, margin: '0 auto' }}>Enter your details to generate your curated academic report.</p>
              </div>
              <form onSubmit={handleLeadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ position: 'relative' }}>
                  <svg style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: TEXT_SECONDARY }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input required placeholder="Your Full Name" value={lead.name} onChange={e => setLead({...lead, name: e.target.value})} style={{ width: '100%', padding: '16px 16px 16px 48px', background: INPUT_BG, border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: 14, color: TEXT_PRIMARY, outline: 'none', fontSize: '1rem', fontFamily: 'inherit', transition: 'border-color 0.2s' }} onFocus={e => e.target.style.borderColor=ACCENT} onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.1)'} />
                </div>
                <div style={{ position: 'relative' }}>
                  <svg style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: TEXT_SECONDARY }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <input required type="email" placeholder="Email Address" value={lead.email} onChange={e => { setLead({...lead, email: e.target.value}); setErrors({...errors, email: ''}); }} style={{ width: '100%', padding: '16px 16px 16px 48px', background: INPUT_BG, border: '1.5px solid', borderColor: errors.email ? '#ef4444' : 'rgba(255,255,255,0.1)', borderRadius: 14, color: TEXT_PRIMARY, outline: 'none', fontSize: '1rem', fontFamily: 'inherit', transition: 'border-color 0.2s' }} onFocus={e => e.target.style.borderColor=errors.email ? '#ef4444' : ACCENT} onBlur={e => e.target.style.borderColor=errors.email ? '#ef4444' : 'rgba(255,255,255,0.1)'} />
                  {errors.email && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '6px', textAlign: 'left' }}>{errors.email}</p>}
                </div>
                <div style={{ position: 'relative' }}>
                  <svg style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: TEXT_SECONDARY }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <input required type="tel" placeholder="10-Digit Phone Number" value={lead.phone} onChange={e => { setLead({...lead, phone: e.target.value.replace(/\D/g, '')}); setErrors({...errors, phone: ''}); }} style={{ width: '100%', padding: '16px 16px 16px 48px', background: INPUT_BG, border: '1.5px solid', borderColor: errors.phone ? '#ef4444' : 'rgba(255,255,255,0.1)', borderRadius: 14, color: TEXT_PRIMARY, outline: 'none', fontSize: '1rem', fontFamily: 'inherit', transition: 'border-color 0.2s' }} onFocus={e => e.target.style.borderColor=errors.phone ? '#ef4444' : ACCENT} onBlur={e => e.target.style.borderColor=errors.phone ? '#ef4444' : 'rgba(255,255,255,0.1)'} />
                  {errors.phone && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '6px', textAlign: 'left' }}>{errors.phone}</p>}
                </div>
                <div style={{ position: 'relative' }}>
                  <textarea 
                    placeholder="How can we help you join this selected option?" 
                    value={lead.helpText} 
                    onChange={e => setLead({...lead, helpText: e.target.value})} 
                    style={{ width: '100%', padding: '16px', background: INPUT_BG, border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: 14, color: TEXT_PRIMARY, outline: 'none', fontSize: '1rem', fontFamily: 'inherit', transition: 'border-color 0.2s', minHeight: '100px', resize: 'vertical' }} 
                    onFocus={e => e.target.style.borderColor=ACCENT} 
                    onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.1)'} 
                  />
                </div>
                
                <button type="submit" disabled={submitting} style={{ width: '100%', padding: '18px', marginTop: 12, background: ACCENT, color: '#000', border: 'none', borderRadius: 14, fontWeight: 800, fontSize: '1.05rem', cursor: submitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 10px 25px rgba(0,0,0,0.3)', transition: 'transform 0.2s' }}>
                  {submitting ? 'Retrieving Report...' : 'Submit'} <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </form>
            </div>
          )}

          {step === successStep && (
            <div style={{ textAlign: 'center', padding: '3rem 0', animation: animate ? 'suFadeIn 0.4s ease' : 'none' }}>
              <div style={{ width: 80, height: 80, background: 'rgba(34,197,94,0.1)', color: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: TEXT_PRIMARY }}>All Done!</h2>
              <p style={{ color: TEXT_SECONDARY, lineHeight: 1.6, marginBottom: '3rem', fontSize: '1.1rem' }}>Thank you {lead.name}! We've received your assessment. A counsellor will connect with you shortly with your personalised report.</p>
              <button onClick={onClose} style={{ padding: '16px 48px', background: ACCENT, color: '#000', border: 'none', borderRadius: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>Close Assessment</button>
            </div>
          )}
        </div>

        <style>{`
          @keyframes suFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes suSpin { to { transform: rotate(360deg); } }
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
          ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); borderRadius: 10px; }
        `}</style>
      </div>
    </>
  );
}
