import { useState, useMemo } from 'react';
import { questions, CATEGORIES } from '../data/questions';
import type { Question } from '../data/questions';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Filter = 'all' | string;

export default function Quiz() {
  const [filter, setFilter] = useState<Filter>('all');
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [results, setResults] = useState<{ q: Question; chosen: string; correct: boolean }[]>([]);
  const [showResults, setShowResults] = useState(false);

  const filteredPool = useMemo(() => {
    return filter === 'all' ? questions : questions.filter(q => q.category === filter);
  }, [filter]);

  function startQuiz() {
    const pool = shuffle(filteredPool).slice(0, Math.min(50, filteredPool.length));
    setQuizQuestions(pool);
    setCurrentIdx(0);
    setSelected(null);
    setRevealed(false);
    setResults([]);
    setShowResults(false);
    setQuizStarted(true);
  }

  function handleSelect(opt: string) {
    if (revealed) return;
    setSelected(opt);
  }

  function handleReveal() {
    if (!selected) return;
    setRevealed(true);
  }

  function handleNext() {
    if (!selected) return;
    const q = quizQuestions[currentIdx];
    const correct = selected === q.answer;
    const newResults = [...results, { q, chosen: selected, correct }];
    setResults(newResults);

    if (currentIdx + 1 >= quizQuestions.length) {
      setShowResults(true);
    } else {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
      setRevealed(false);
    }
  }

  // Results screen
  if (showResults) {
    const score = results.filter(r => r.correct).length;
    const pct = Math.round((score / results.length) * 100);
    const passed = pct >= 70;
    const wrong = results.filter(r => !r.correct);

    return (
      <div className="space-y-6">
        <div className={`rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl ${passed ? 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/20' : 'bg-gradient-to-br from-red-500 to-rose-600 shadow-red-500/20'}`}>
          <h2 className="text-2xl font-bold mb-2">{passed ? 'Great job!' : 'Keep studying!'}</h2>
          <div className="text-7xl font-black my-4">{pct}%</div>
          <p className="text-lg opacity-90">{score} of {results.length} correct</p>
          <p className="mt-2 opacity-70 text-sm">
            {passed ? "You're on track for the real exam." : 'Review the explanations below and try again.'}
          </p>
        </div>

        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={startQuiz} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-colors text-sm">
            Retake Quiz
          </button>
          <button onClick={() => setQuizStarted(false)} className="dark:bg-slate-700 bg-slate-200 dark:text-slate-200 text-slate-700 px-6 py-2.5 rounded-xl font-semibold dark:hover:bg-slate-600 hover:bg-slate-300 transition-colors text-sm">
            Back to Setup
          </button>
        </div>

        {wrong.length > 0 && (
          <div className="dark:bg-slate-800/50 bg-white rounded-xl dark:border-slate-700/50 border-slate-200 border p-6">
            <h3 className="font-bold text-red-400 mb-4 text-sm">Missed Questions ({wrong.length})</h3>
            <div className="space-y-5">
              {wrong.map(({ q, chosen }) => (
                <div key={q.id} className="border-l-2 border-red-500/50 pl-4">
                  <p className="font-medium dark:text-slate-200 text-slate-800 mb-1 text-sm">{q.question}</p>
                  <p className="text-xs text-red-400 mb-0.5">Your answer: {chosen}</p>
                  <p className="text-xs text-emerald-400 mb-1">Correct: <strong>{q.answer}</strong></p>
                  <p className="text-xs dark:text-slate-500 text-slate-400 italic">{q.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Setup screen
  if (!quizStarted) {
    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="text-center">
          <h2 className="text-2xl font-bold dark:text-white text-slate-900 mb-2">Practice Quiz</h2>
          <p className="dark:text-slate-400 text-slate-500 text-sm">Configure your quiz, then hit Start. The real exam is 50 questions.</p>
        </div>

        <div className="dark:bg-slate-800/50 bg-white rounded-xl dark:border-slate-700/50 border-slate-200 border p-6 space-y-5">
          <div>
            <label className="block text-xs font-semibold dark:text-slate-300 text-slate-600 mb-3 uppercase tracking-wider">Category</label>
            <div className="flex flex-wrap gap-2">
              {['all', ...CATEGORIES].map(cat => (
                <button key={cat} onClick={() => setFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    filter === cat
                      ? 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/25'
                      : 'dark:border-slate-600 border-slate-300 dark:text-slate-400 text-slate-500 dark:hover:border-slate-500 hover:border-slate-400'
                  }`}>
                  {cat === 'all' ? 'All Categories' : cat}
                </button>
              ))}
            </div>
          </div>
          <div className="text-xs dark:text-slate-500 text-slate-400 dark:bg-slate-700/50 bg-slate-50 rounded-lg p-3">
            <strong className="dark:text-slate-300 text-slate-600">{filteredPool.length}</strong> questions available. Quiz will use up to <strong className="dark:text-slate-300 text-slate-600">50</strong>.
          </div>
          <button onClick={startQuiz} disabled={filteredPool.length === 0}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition-all disabled:opacity-40 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30">
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // Quiz in progress
  const q = quizQuestions[currentIdx];
  const opts = q.options || ['True', 'False'];
  const progress = ((currentIdx) / quizQuestions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs dark:text-slate-500 text-slate-400 mb-2">
          <span>Question {currentIdx + 1} of {quizQuestions.length}</span>
          <span className="text-emerald-500">{results.filter(r => r.correct).length} correct</span>
        </div>
        <div className="w-full dark:bg-slate-700 bg-slate-200 rounded-full h-1.5">
          <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Badges */}
      <div className="flex gap-2">
        <span className="dark:bg-blue-500/15 bg-blue-50 dark:text-blue-400 text-blue-600 text-xs font-semibold px-3 py-1 rounded-lg">
          {q.category}
        </span>
        <span className="dark:bg-slate-700 bg-slate-100 dark:text-slate-400 text-slate-500 text-xs font-medium px-3 py-1 rounded-lg">
          {q.type === 'true-false' ? 'True / False' : 'Multiple Choice'}
        </span>
      </div>

      {/* Question Card */}
      <div className="dark:bg-slate-800/50 bg-white rounded-xl dark:border-slate-700/50 border-slate-200 border p-6">
        <p className="text-lg font-semibold dark:text-white text-slate-900 mb-6 leading-snug">{q.question}</p>

        <div className="space-y-2.5">
          {opts.map(opt => {
            let cls = 'w-full text-left px-4 py-3 rounded-xl border-2 transition-all font-medium text-sm cursor-pointer ';
            if (!revealed) {
              cls += selected === opt
                ? 'border-blue-500 dark:bg-blue-500/10 bg-blue-50 dark:text-blue-300 text-blue-700 shadow-lg shadow-blue-500/10'
                : 'dark:border-slate-600 border-slate-200 dark:hover:border-slate-500 hover:border-blue-300 dark:hover:bg-slate-700/50 hover:bg-blue-50 dark:text-slate-300 text-slate-600';
            } else {
              if (opt === q.answer) cls += 'border-emerald-500 dark:bg-emerald-500/10 bg-emerald-50 dark:text-emerald-300 text-emerald-700';
              else if (opt === selected) cls += 'border-red-500 dark:bg-red-500/10 bg-red-50 dark:text-red-300 text-red-700';
              else cls += 'dark:border-slate-700 border-slate-200 dark:text-slate-600 text-slate-300';
            }
            return (
              <button key={opt} onClick={() => handleSelect(opt)} className={cls}>
                <span className="flex items-center gap-2">
                  {revealed && opt === q.answer && (
                    <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  )}
                  {revealed && opt === selected && opt !== q.answer && (
                    <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  )}
                  {opt}
                </span>
              </button>
            );
          })}
        </div>

        {revealed && (
          <div className="mt-5 p-4 dark:bg-blue-500/10 bg-blue-50 dark:border-blue-500/20 border-blue-200 border rounded-xl text-sm dark:text-blue-300 text-blue-700">
            <strong>Explanation:</strong> {q.explanation}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {!revealed ? (
          <button onClick={handleReveal} disabled={!selected}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition-all disabled:opacity-30 shadow-lg shadow-blue-500/25">
            Check Answer
          </button>
        ) : (
          <button onClick={handleNext}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/25">
            {currentIdx + 1 >= quizQuestions.length ? 'See Results' : 'Next Question'}
          </button>
        )}
        <button onClick={() => setQuizStarted(false)}
          className="px-4 py-3 rounded-xl border-2 dark:border-slate-600 border-slate-300 dark:text-slate-400 text-slate-500 dark:hover:border-slate-500 hover:border-slate-400 transition-colors text-sm font-medium">
          Quit
        </button>
      </div>
    </div>
  );
}
