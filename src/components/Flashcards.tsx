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

export default function Flashcards() {
  const [filter, setFilter] = useState<string>('all');
  const [deck, setDeck] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<number[]>([]);
  const [reviewing, setReviewing] = useState(false);

  const filteredPool = useMemo(() => {
    return filter === 'all' ? questions : questions.filter(q => q.category === filter);
  }, [filter]);

  function startDeck() {
    setDeck(shuffle(filteredPool));
    setCurrentIdx(0);
    setFlipped(false);
    setKnown([]);
    setReviewing(true);
  }

  function markKnown() {
    setKnown(k => [...k, deck[currentIdx].id]);
    next();
  }

  function markUnknown() {
    next();
  }

  function next() {
    setFlipped(false);
    setTimeout(() => {
      if (currentIdx + 1 >= deck.length) {
        setCurrentIdx(deck.length);
      } else {
        setCurrentIdx(i => i + 1);
      }
    }, 150);
  }

  // Setup
  if (!reviewing) {
    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="text-center">
          <h2 className="text-2xl font-bold dark:text-white text-slate-900 mb-2">Flashcards</h2>
          <p className="dark:text-slate-400 text-slate-500 text-sm">Choose a category and flip through the cards. Mark what you know!</p>
        </div>
        <div className="dark:bg-slate-800/50 bg-white rounded-xl dark:border-slate-700/50 border-slate-200 border p-6 space-y-5">
          <div>
            <label className="block text-xs font-semibold dark:text-slate-300 text-slate-600 mb-3 uppercase tracking-wider">Category</label>
            <div className="flex flex-wrap gap-2">
              {['all', ...CATEGORIES].map(cat => (
                <button key={cat} onClick={() => setFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    filter === cat
                      ? 'bg-purple-500 text-white border-purple-500 shadow-lg shadow-purple-500/25'
                      : 'dark:border-slate-600 border-slate-300 dark:text-slate-400 text-slate-500 dark:hover:border-slate-500 hover:border-slate-400'
                  }`}>
                  {cat === 'all' ? 'All Categories' : cat}
                </button>
              ))}
            </div>
          </div>
          <div className="text-xs dark:text-slate-500 text-slate-400 dark:bg-slate-700/50 bg-slate-50 rounded-lg p-3">
            <strong className="dark:text-slate-300 text-slate-600">{filteredPool.length}</strong> cards in this deck.
          </div>
          <button onClick={startDeck}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-500/25 hover:shadow-xl">
            Start Flashcards
          </button>
        </div>
      </div>
    );
  }

  // Complete
  if (currentIdx >= deck.length) {
    const unknownDeck = deck.filter(q => !known.includes(q.id));
    return (
      <div className="max-w-2xl mx-auto space-y-6 text-center">
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl p-8 md:p-12 shadow-2xl shadow-purple-500/20">
          <h2 className="text-2xl font-bold mb-2">Deck Complete!</h2>
          <p className="text-purple-100 text-lg">
            You marked <strong className="text-white">{known.length}</strong> of <strong className="text-white">{deck.length}</strong> cards as known.
          </p>
        </div>
        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={startDeck} className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-colors text-sm">
            Reshuffle All
          </button>
          {unknownDeck.length > 0 && (
            <button onClick={() => { setDeck(shuffle(unknownDeck)); setCurrentIdx(0); setFlipped(false); setKnown([]); }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-colors text-sm">
              Review {unknownDeck.length} Missed
            </button>
          )}
          <button onClick={() => setReviewing(false)} className="dark:bg-slate-700 bg-slate-200 dark:text-slate-200 text-slate-700 px-6 py-2.5 rounded-xl font-semibold dark:hover:bg-slate-600 hover:bg-slate-300 transition-colors text-sm">
            Back
          </button>
        </div>
      </div>
    );
  }

  const q = deck[currentIdx];
  const progressPct = (currentIdx / deck.length) * 100;

  return (
    <div className="max-w-xl mx-auto space-y-5">
      {/* Progress */}
      <div className="flex justify-between text-xs dark:text-slate-500 text-slate-400">
        <span>Card {currentIdx + 1} of {deck.length}</span>
        <span className="text-emerald-500">{known.length} known</span>
      </div>
      <div className="w-full dark:bg-slate-700 bg-slate-200 rounded-full h-1.5">
        <div className="bg-purple-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
      </div>

      <div className="text-center">
        <span className="dark:bg-purple-500/15 bg-purple-50 dark:text-purple-400 text-purple-600 text-xs font-semibold px-3 py-1 rounded-lg">
          {q.category}
        </span>
      </div>

      {/* Card */}
      <div
        onClick={() => setFlipped(f => !f)}
        className="cursor-pointer select-none"
      >
        <div className={`rounded-2xl border-2 p-8 min-h-56 flex flex-col items-center justify-center text-center transition-all duration-300 ${
          flipped
            ? 'dark:bg-emerald-500/10 bg-emerald-50 dark:border-emerald-500/30 border-emerald-300'
            : 'dark:bg-slate-800/50 bg-white dark:border-slate-700/50 border-slate-200 dark:hover:border-purple-500/50 hover:border-purple-300'
        }`}>
          {!flipped ? (
            <>
              <div className="text-[10px] font-semibold dark:text-slate-500 text-slate-400 uppercase tracking-widest mb-5">Question — Tap to flip</div>
              <p className="text-lg font-semibold dark:text-white text-slate-900 leading-snug">{q.question}</p>
            </>
          ) : (
            <>
              <div className="text-[10px] font-semibold text-emerald-500 uppercase tracking-widest mb-5">Answer</div>
              <p className="text-2xl font-bold dark:text-emerald-300 text-emerald-700 mb-3">{q.answer}</p>
              <p className="text-sm dark:text-slate-400 text-slate-500 leading-relaxed">{q.explanation}</p>
            </>
          )}
        </div>
      </div>

      {!flipped ? (
        <button onClick={() => setFlipped(true)}
          className="w-full py-3 rounded-xl border-2 dark:border-purple-500/30 border-purple-300 dark:text-purple-400 text-purple-600 font-semibold dark:hover:bg-purple-500/10 hover:bg-purple-50 transition-all">
          Flip Card
        </button>
      ) : (
        <div className="flex gap-3">
          <button onClick={markUnknown}
            className="flex-1 py-3 rounded-xl dark:bg-red-500/10 bg-red-50 dark:text-red-400 text-red-600 font-semibold dark:hover:bg-red-500/20 hover:bg-red-100 transition-all border-2 dark:border-red-500/20 border-red-200">
            Still Learning
          </button>
          <button onClick={markKnown}
            className="flex-1 py-3 rounded-xl dark:bg-emerald-500/10 bg-emerald-50 dark:text-emerald-400 text-emerald-600 font-semibold dark:hover:bg-emerald-500/20 hover:bg-emerald-100 transition-all border-2 dark:border-emerald-500/20 border-emerald-200">
            Got It!
          </button>
        </div>
      )}

      <button onClick={() => setReviewing(false)}
        className="w-full text-center text-xs dark:text-slate-600 text-slate-400 dark:hover:text-slate-400 hover:text-slate-600 transition-colors py-2">
        Back to Setup
      </button>
    </div>
  );
}
