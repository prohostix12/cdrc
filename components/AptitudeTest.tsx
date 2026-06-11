'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

type Phase = 'idle' | 'intro' | 'testing' | 'submitting' | 'results';

interface Option {
  text: string;
  categories: string[];
}

interface Question {
  id: number;
  emoji: string;
  question: string;
  options: Option[];
}

interface Answer {
  questionId: number;
  optionIndex: number;
  categories: string[];
}

interface CategoryInfo {
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface RankedCategory {
  category: string;
  score: number;
  info: CategoryInfo | null;
}

interface RecommendedItem {
  _id?: string;
  name: string;
  description?: string;
  slug?: string;
}

interface Result {
  scores: Record<string, number>;
  ranked: RankedCategory[];
  topCategory: string;
  categoryInfo: CategoryInfo;
  recommendedPrograms: RecommendedItem[];
  recommendedSkills: RecommendedItem[];
}

const CATEGORY_LABELS: Record<string, string> = {
  TECH: 'Technology',
  BIZ: 'Business',
  HEALTH: 'Healthcare',
  ARTS: 'Arts & Design',
  SCI: 'Science',
  EDU: 'Education',
};

function generateSessionId() {
  return `apt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export default function AptitudeTest() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [sessionId] = useState(generateSessionId);

  const loadQuestions = useCallback(async () => {
    if (questions.length > 0) return;
    try {
      const res = await fetch('/api/aptitude-test/questions');
      const data = await res.json();
      setQuestions(data.questions || []);
    } catch {
      // silently fail — questions already embedded
    }
  }, [questions.length]);

  const openTest = useCallback(async () => {
    await loadQuestions();
    setPhase('intro');
  }, [loadQuestions]);

  // Allow navbar to open the test via a custom DOM event
  const openTestRef = useRef(openTest);
  openTestRef.current = openTest;
  useEffect(() => {
    const handler = () => openTestRef.current();
    window.addEventListener('openAptitudeTest', handler);
    return () => window.removeEventListener('openAptitudeTest', handler);
  }, []);

  const startTest = () => {
    setCurrentQ(0);
    setAnswers([]);
    setSelectedOption(null);
    setResult(null);
    setPhase('testing');
  };

  const handleOptionClick = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = async () => {
    if (selectedOption === null) return;
    const q = questions[currentQ];
    const newAnswers = [
      ...answers,
      { questionId: q.id, optionIndex: selectedOption, categories: q.options[selectedOption].categories },
    ];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQ + 1 < questions.length) {
      setCurrentQ(c => c + 1);
    } else {
      setPhase('submitting');
      try {
        const res = await fetch('/api/aptitude-test/result', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: newAnswers, sessionId }),
        });
        const data = await res.json();
        setResult(data);
        setPhase('results');
      } catch {
        setPhase('results');
      }
    }
  };

  const closeTest = () => {
    setPhase('idle');
    setCurrentQ(0);
    setAnswers([]);
    setSelectedOption(null);
    setResult(null);
  };

  const progress = questions.length > 0 ? ((currentQ) / questions.length) * 100 : 0;

  return (
    <>
      <style>{`
        @keyframes apt-float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-14px) scale(1.04); }
        }
        @keyframes apt-pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes apt-fade-in {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes apt-slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes apt-spin {
          to { transform: rotate(360deg); }
        }
        .apt-btn:hover { transform: scale(1.06) !important; animation: none !important; }
        .apt-option:hover { border-color: #7c3aed !important; background: rgba(124,58,237,0.07) !important; transform: translateX(4px); }
        .apt-option.selected { border-color: #7c3aed !important; background: rgba(124,58,237,0.12) !important; }
      `}</style>

      {/* Floating button — bottom-left, opposite to CourseFinder */}
      {phase === 'idle' && (
        <div style={{ position: 'fixed', bottom: '1.5rem', left: '1.5rem', zIndex: 9990 }}>
          {/* Pulse ring */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50px',
            background: 'rgba(124,58,237,0.45)',
            animation: 'apt-pulse-ring 2s ease-out infinite',
            pointerEvents: 'none',
          }} />
          <button
            className="apt-btn"
            onClick={openTest}
            style={{
              position: 'relative',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.7rem 1.1rem',
              background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontSize: '0.88rem',
              fontWeight: 700,
              boxShadow: '0 8px 24px rgba(124,58,237,0.45)',
              animation: 'apt-float 3s ease-in-out infinite',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              whiteSpace: 'nowrap',
              fontFamily: 'inherit',
            }}
            aria-label="Take Career Aptitude Test"
          >
            <span style={{ fontSize: '1.3rem' }}>🎓</span>
            Career Test
          </button>
        </div>
      )}

      {/* Modal overlay */}
      {phase !== 'idle' && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) closeTest(); }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9995,
            background: 'rgba(15,23,42,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '1.5rem',
              width: '100%',
              maxWidth: '560px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 32px 80px rgba(0,0,0,0.25)',
              animation: 'apt-fade-in 0.35s ease',
              position: 'relative',
            }}
          >
            {/* Close button */}
            <button
              onClick={closeTest}
              style={{
                position: 'absolute', top: '1rem', right: '1rem',
                background: '#f1f5f9', border: 'none',
                borderRadius: '50%', width: '36px', height: '36px',
                cursor: 'pointer', fontSize: '1.1rem', color: '#64748b',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 10, transition: 'background 0.2s',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#e2e8f0')}
              onMouseLeave={e => (e.currentTarget.style.background = '#f1f5f9')}
            >
              ✕
            </button>

            {/* INTRO */}
            {phase === 'intro' && (
              <div style={{ padding: '2.5rem 2rem', textAlign: 'center', animation: 'apt-slide-up 0.4s ease' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎓</div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.75rem' }}>
                  Career Aptitude Test
                </h2>
                <p style={{ color: '#475569', fontSize: '0.97rem', lineHeight: 1.7, margin: '0 0 1.5rem' }}>
                  Answer <strong>10 quick questions</strong> about your interests and personality.<br />
                  We'll recommend the perfect courses and career paths just for you!
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
                  {['⏱ 3 mins', '10 Questions', '🎯 Personalised Results'].map(tag => (
                    <span key={tag} style={{
                      background: '#f8fafc', border: '1px solid #e2e8f0',
                      borderRadius: '999px', padding: '0.3rem 0.85rem',
                      fontSize: '0.82rem', color: '#475569', fontWeight: 600,
                    }}>{tag}</span>
                  ))}
                </div>
                <button
                  onClick={startTest}
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
                    color: '#fff', border: 'none', borderRadius: '50px',
                    padding: '0.9rem 2.5rem', fontSize: '1rem', fontWeight: 700,
                    cursor: 'pointer', boxShadow: '0 8px 20px rgba(124,58,237,0.35)',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  Start Test →
                </button>
              </div>
            )}

            {/* TESTING */}
            {phase === 'testing' && questions[currentQ] && (
              <div style={{ padding: '2rem', animation: 'apt-slide-up 0.3s ease' }}>
                {/* Progress bar */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>
                      Question {currentQ + 1} of {questions.length}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#7c3aed', fontWeight: 700 }}>
                      {Math.round(progress)}% done
                    </span>
                  </div>
                  <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: '999px',
                      background: 'linear-gradient(90deg, #7c3aed, #4f46e5)',
                      width: `${progress}%`,
                      transition: 'width 0.4s ease',
                    }} />
                  </div>
                </div>

                {/* Question */}
                <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
                    {questions[currentQ].emoji}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.4, margin: 0 }}>
                    {questions[currentQ].question}
                  </h3>
                </div>

                {/* Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.75rem' }}>
                  {questions[currentQ].options.map((opt, i) => (
                    <button
                      key={i}
                      className={`apt-option${selectedOption === i ? ' selected' : ''}`}
                      onClick={() => handleOptionClick(i)}
                      style={{
                        textAlign: 'left', padding: '0.85rem 1rem',
                        background: selectedOption === i ? 'rgba(124,58,237,0.12)' : '#f8fafc',
                        border: `2px solid ${selectedOption === i ? '#7c3aed' : '#e2e8f0'}`,
                        borderRadius: '0.875rem', cursor: 'pointer',
                        fontSize: '0.92rem', color: '#1e293b', lineHeight: 1.4,
                        transition: 'all 0.2s ease', fontFamily: 'inherit',
                        fontWeight: selectedOption === i ? 600 : 400,
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                      }}
                    >
                      <span style={{
                        width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                        border: `2px solid ${selectedOption === i ? '#7c3aed' : '#cbd5e1'}`,
                        background: selectedOption === i ? '#7c3aed' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.7rem', color: '#fff',
                      }}>
                        {selectedOption === i ? '✓' : ''}
                      </span>
                      {opt.text}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  disabled={selectedOption === null}
                  style={{
                    width: '100%', padding: '0.9rem',
                    background: selectedOption !== null
                      ? 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)'
                      : '#e2e8f0',
                    color: selectedOption !== null ? '#fff' : '#94a3b8',
                    border: 'none', borderRadius: '0.875rem',
                    fontSize: '1rem', fontWeight: 700, cursor: selectedOption !== null ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s', fontFamily: 'inherit',
                    boxShadow: selectedOption !== null ? '0 6px 16px rgba(124,58,237,0.3)' : 'none',
                  }}
                >
                  {currentQ + 1 === questions.length ? 'See My Results 🎯' : 'Next Question →'}
                </button>
              </div>
            )}

            {/* SUBMITTING */}
            {phase === 'submitting' && (
              <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                <div style={{
                  width: '56px', height: '56px', margin: '0 auto 1.5rem',
                  border: '4px solid #ede9fe',
                  borderTop: '4px solid #7c3aed',
                  borderRadius: '50%',
                  animation: 'apt-spin 0.9s linear infinite',
                }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.5rem' }}>
                  Analysing your responses…
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>
                  Finding the best career paths for you
                </p>
              </div>
            )}

            {/* RESULTS */}
            {phase === 'results' && result && (
              <div style={{ animation: 'apt-slide-up 0.4s ease' }}>
                {/* Header */}
                <div style={{
                  background: `linear-gradient(135deg, ${result.categoryInfo.color}22 0%, ${result.categoryInfo.color}08 100%)`,
                  padding: '2rem 2rem 1.5rem',
                  borderRadius: '1.5rem 1.5rem 0 0',
                  textAlign: 'center',
                  borderBottom: '1px solid #f1f5f9',
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{result.categoryInfo.icon}</div>
                  <p style={{ color: '#7c3aed', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase', margin: '0 0 0.25rem' }}>
                    Your Career Profile
                  </p>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.75rem' }}>
                    {result.categoryInfo.title}
                  </h2>
                  <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                    {result.categoryInfo.description}
                  </p>
                </div>

                <div style={{ padding: '1.5rem 2rem' }}>
                  {/* Score bars */}
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.75rem' }}>
                    Your Interest Breakdown
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {result.ranked.filter(r => r.score > 0).map(({ category, score, info }) => {
                      const maxScore = result.ranked[0].score || 1;
                      const pct = Math.round((score / maxScore) * 100);
                      return (
                        <div key={category}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                            <span style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 600 }}>
                              {info?.icon} {CATEGORY_LABELS[category] || category}
                            </span>
                            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{score} pts</span>
                          </div>
                          <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                            <div style={{
                              height: '100%', borderRadius: '999px',
                              background: info?.color || '#7c3aed',
                              width: `${pct}%`, transition: 'width 0.8s ease',
                            }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Recommended programs */}
                  {result.recommendedPrograms.length > 0 && (
                    <>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.75rem' }}>
                        Recommended Courses for You
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
                        {result.recommendedPrograms.map((prog, i) => (
                          <div key={prog._id || i} style={{
                            padding: '0.85rem 1rem',
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '0.875rem',
                            borderLeft: `4px solid ${result.categoryInfo.color}`,
                          }}>
                            <p style={{ margin: '0 0 0.2rem', fontWeight: 700, fontSize: '0.92rem', color: '#1e293b' }}>
                              {prog.name}
                            </p>
                            {prog.description && (
                              <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5 }}>
                                {prog.description}
                              </p>
                            )}
                            {prog.slug && (
                              <a href={`/programs/${prog.slug}`} style={{
                                display: 'inline-block', marginTop: '0.4rem',
                                fontSize: '0.8rem', color: result.categoryInfo.color, fontWeight: 600, textDecoration: 'none',
                              }}>
                                View Program →
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Recommended skills */}
                  {result.recommendedSkills.length > 0 && (
                    <>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.75rem' }}>
                        Skills to Explore
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                        {result.recommendedSkills.map((skill, i) => (
                          <span key={skill._id || i} style={{
                            padding: '0.35rem 0.85rem',
                            background: `${result.categoryInfo.color}18`,
                            color: result.categoryInfo.color,
                            borderRadius: '999px', fontSize: '0.82rem', fontWeight: 600,
                            border: `1px solid ${result.categoryInfo.color}30`,
                          }}>
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                    <button
                      onClick={startTest}
                      style={{
                        flex: 1, padding: '0.8rem',
                        background: '#f8fafc', color: '#475569',
                        border: '1px solid #e2e8f0', borderRadius: '0.875rem',
                        fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
                        fontFamily: 'inherit', transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#f1f5f9')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#f8fafc')}
                    >
                      Retake Test
                    </button>
                    <a
                      href="/universities"
                      style={{
                        flex: 1, padding: '0.8rem',
                        background: `linear-gradient(135deg, ${result.categoryInfo.color} 0%, #4f46e5 100%)`,
                        color: '#fff',
                        border: 'none', borderRadius: '0.875rem',
                        fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer',
                        fontFamily: 'inherit', textAlign: 'center',
                        textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: `0 6px 16px ${result.categoryInfo.color}40`,
                      }}
                    >
                      Explore Universities
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Fallback if results error */}
            {phase === 'results' && !result && (
              <div style={{ padding: '2.5rem', textAlign: 'center' }}>
                <p style={{ color: '#64748b' }}>Something went wrong. Please try again.</p>
                <button onClick={startTest} style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '0.75rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Retry
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
