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

  if (showResults) {
    const score = results.filter(r => r.correct).length;
    const pct = Math.round((score / results.length) * 100);
    const passed = pct >= 70;
    const wrong = results.filter(r => !r.correct);

    return (
      <div className="space-y-6">
        <div className={`rounded-2xl p-8 text-center text-white ${passed ? 'bg-green-600' : 'bg-red-600'}`}>
          <div className="text-5xl mb-3">{passed ? '🎉' : '📚'}</div>
          <h2 className="text-3xl font-bold mb-2">{passed ? 'Great job!' : 'Keep studying!'}</h2>
          <div className="text-6xl font-black my-4">{pct}%</div>
          <p className="text-lg opacity-90">{score} of {results.length} correct</p>
          {passed ? (
            <p className="mt-2 opacity-80">You're on track for the real exam. Keep reviewing!</p>
          ) : (
            <p className="mt-2 opacity-80">Review the explanations below and try again.</p>
          )}
        </div>

        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={startQuiz} className="bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-800 transition-colors">
            🔄 Retake Quiz
          </button>
          <button onClick={() => { setQuizStarted(false); }} className="bg-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-semibold hover:bg-gray-300 transition-colors">
            ← Back to Setup
          </button>
        </div>

        {wrong.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow p-6">
            <h3 className="text-lg font-bold text-red-700 mb-4">❌ Questions You Missed ({wrong.length})</h3>
            <div className="space-y-5">
              {wrong.map(({ q, chosen }) => (
                <div key={q.id} className="border-l-4 border-red-400 pl-4">
                  <p className="font-medium text-gray-800 mb-1">{q.question}</p>
                  <p className="text-sm text-red-600 mb-0.5">Your answer: {chosen}</p>
                  <p className="text-sm text-green-700 mb-1">Correct answer: <strong>{q.answer}</strong></p>
                  <p className="text-sm text-gray-500 italic">{q.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">✏️ Practice Quiz</h2>
          <p className="text-gray-500">Configure your quiz, then hit Start. The real exam is 50 questions.</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Category</label>
            <div className="flex flex-wrap gap-2">
              {['all', ...CATEGORIES].map(cat => (
                <button key={cat} onClick={() => setFilter(cat)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${filter === cat ? 'bg-blue-700 text-white border-blue-700' : 'border-gray-300 text-gray-600 hover:border-blue-400'}`}>
                  {cat === 'all' ? '🗂️ All Categories' : cat}
                </button>
              ))}
            </div>
          </div>
          <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
            <strong>{filteredPool.length}</strong> questions available. Quiz will use up to <strong>50</strong>.
          </div>
          <button onClick={startQuiz} disabled={filteredPool.length === 0}
            className="w-full bg-blue-700 text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-800 transition-colors disabled:opacity-50">
            Start Quiz →
          </button>
        </div>
      </div>
    );
  }

  const q = quizQuestions[currentIdx];
  const opts = q.options || ['True', 'False'];
  const progress = ((currentIdx) / quizQuestions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Progress */}
      <div>
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>Question {currentIdx + 1} of {quizQuestions.length}</span>
          <span>{results.filter(r => r.correct).length} correct so far</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Category badge */}
      <div>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
          {q.category}
        </span>
        <span className="ml-2 bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
          {q.type === 'true-false' ? 'True / False' : 'Multiple Choice'}
        </span>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl border border-gray-200 shadow p-6">
        <p className="text-lg font-semibold text-gray-800 mb-5 leading-snug">{q.question}</p>

        <div className="space-y-2.5">
          {opts.map(opt => {
            let cls = 'w-full text-left px-4 py-3 rounded-xl border-2 transition-all font-medium text-sm ';
            if (!revealed) {
              cls += selected === opt
                ? 'border-blue-500 bg-blue-50 text-blue-800'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700';
            } else {
              if (opt === q.answer) cls += 'border-green-500 bg-green-50 text-green-800';
              else if (opt === selected) cls += 'border-red-400 bg-red-50 text-red-700';
              else cls += 'border-gray-200 text-gray-400';
            }
            return (
              <button key={opt} onClick={() => handleSelect(opt)} className={cls}>
                {revealed && opt === q.answer && '✅ '}
                {revealed && opt === selected && opt !== q.answer && '❌ '}
                {opt}
              </button>
            );
          })}
        </div>

        {revealed && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
            <strong>Explanation:</strong> {q.explanation}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        {!revealed ? (
          <button onClick={handleReveal} disabled={!selected}
            className="flex-1 bg-blue-700 text-white py-3 rounded-xl font-bold hover:bg-blue-800 transition-colors disabled:opacity-40">
            Check Answer
          </button>
        ) : (
          <button onClick={handleNext}
            className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors">
            {currentIdx + 1 >= quizQuestions.length ? 'See Results 🏁' : 'Next Question →'}
          </button>
        )}
        <button onClick={() => setQuizStarted(false)}
          className="px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-600 hover:border-gray-400 transition-colors text-sm font-medium">
          Quit
        </button>
      </div>
    </div>
  );
}
