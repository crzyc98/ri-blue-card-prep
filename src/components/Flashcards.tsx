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
        setCurrentIdx(deck.length); // done
      } else {
        setCurrentIdx(i => i + 1);
      }
    }, 150);
  }

  if (!reviewing) {
    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">🃏 Flashcards</h2>
          <p className="text-gray-500">Choose a category and flip through the cards. Mark what you know!</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Category</label>
            <div className="flex flex-wrap gap-2">
              {['all', ...CATEGORIES].map(cat => (
                <button key={cat} onClick={() => setFilter(cat)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${filter === cat ? 'bg-purple-600 text-white border-purple-600' : 'border-gray-300 text-gray-600 hover:border-purple-400'}`}>
                  {cat === 'all' ? '🗂️ All Categories' : cat}
                </button>
              ))}
            </div>
          </div>
          <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
            <strong>{filteredPool.length}</strong> cards in this deck.
          </div>
          <button onClick={startDeck} className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-purple-700 transition-colors">
            Start Flashcards →
          </button>
        </div>
      </div>
    );
  }

  if (currentIdx >= deck.length) {
    const unknownDeck = deck.filter(q => !known.includes(q.id));
    return (
      <div className="max-w-2xl mx-auto space-y-6 text-center">
        <div className="bg-purple-700 text-white rounded-2xl p-8">
          <div className="text-5xl mb-3">🎴</div>
          <h2 className="text-2xl font-bold mb-2">Deck Complete!</h2>
          <p className="text-purple-200 text-lg">You marked <strong className="text-white">{known.length}</strong> of <strong className="text-white">{deck.length}</strong> cards as known.</p>
        </div>
        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={startDeck} className="bg-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-purple-700 transition-colors">
            🔀 Reshuffle All
          </button>
          {unknownDeck.length > 0 && (
            <button onClick={() => { setDeck(shuffle(unknownDeck)); setCurrentIdx(0); setFlipped(false); setKnown([]); }}
              className="bg-orange-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition-colors">
              📚 Review {unknownDeck.length} Missed
            </button>
          )}
          <button onClick={() => setReviewing(false)} className="bg-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-semibold hover:bg-gray-300 transition-colors">
            ← Back
          </button>
        </div>
      </div>
    );
  }

  const q = deck[currentIdx];

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <div className="flex justify-between text-sm text-gray-500">
        <span>Card {currentIdx + 1} of {deck.length}</span>
        <span className="text-green-600">✅ {known.length} known</span>
      </div>

      <div className="bg-gray-100 rounded-full h-2 w-full">
        <div className="bg-purple-500 h-2 rounded-full transition-all" style={{ width: `${(currentIdx / deck.length) * 100}%` }} />
      </div>

      <div className="text-center">
        <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
          {q.category} · {q.type === 'true-false' ? 'T/F' : 'MC'}
        </span>
      </div>

      {/* Card */}
      <div
        onClick={() => setFlipped(f => !f)}
        className="cursor-pointer select-none"
      >
        <div className={`rounded-2xl shadow-lg border-2 p-8 min-h-48 flex flex-col items-center justify-center text-center transition-all duration-200 ${
          flipped ? 'bg-green-50 border-green-300' : 'bg-white border-gray-200 hover:border-purple-300'
        }`}>
          {!flipped ? (
            <>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Question — Tap to flip</div>
              <p className="text-lg font-semibold text-gray-800 leading-snug">{q.question}</p>
            </>
          ) : (
            <>
              <div className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-4">Answer</div>
              <p className="text-2xl font-bold text-green-800 mb-3">{q.answer}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{q.explanation}</p>
            </>
          )}
        </div>
      </div>

      {!flipped ? (
        <button onClick={() => setFlipped(true)} className="w-full py-3 rounded-xl border-2 border-purple-300 text-purple-700 font-semibold hover:bg-purple-50 transition-colors">
          Flip Card 👆
        </button>
      ) : (
        <div className="flex gap-3">
          <button onClick={markUnknown} className="flex-1 py-3 rounded-xl bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition-colors border-2 border-red-200">
            ❌ Still Learning
          </button>
          <button onClick={markKnown} className="flex-1 py-3 rounded-xl bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition-colors border-2 border-green-200">
            ✅ Got It!
          </button>
        </div>
      )}

      <button onClick={() => setReviewing(false)} className="w-full text-center text-sm text-gray-400 hover:text-gray-600 transition-colors">
        ← Back to Setup
      </button>
    </div>
  );
}
