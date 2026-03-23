import { useState } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';
import StudyGuide from './components/StudyGuide';
import Flashcards from './components/Flashcards';

export type View = 'home' | 'quiz' | 'study' | 'flashcards';

export default function App() {
  const [view, setView] = useState<View>('home');

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-blue-900 text-white shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between flex-wrap gap-3">
          <button onClick={() => setView('home')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-2xl">🏛️</span>
            <div className="text-left">
              <div className="font-bold text-lg leading-tight">RI Blue Card Study</div>
              <div className="text-blue-300 text-xs">RIDEM Pistol/Revolver Safety Certificate Prep</div>
            </div>
          </button>
          <nav className="flex gap-2 flex-wrap">
            {([
              { id: 'home', label: '🏠 Home' },
              { id: 'study', label: '📖 Study Guide' },
              { id: 'flashcards', label: '🃏 Flashcards' },
              { id: 'quiz', label: '✏️ Practice Quiz' },
            ] as { id: View; label: string }[]).map(({ id, label }) => (
              <button key={id} onClick={() => setView(id)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${view === id ? 'bg-white text-blue-900' : 'text-blue-200 hover:text-white hover:bg-blue-800'}`}>
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8">
        {view === 'home' && <Home setView={setView} />}
        {view === 'quiz' && <Quiz />}
        {view === 'study' && <StudyGuide />}
        {view === 'flashcards' && <Flashcards />}
      </main>
      <footer className="text-center text-gray-400 text-xs py-6 border-t border-gray-200 mt-8">
        Unofficial study aid for the Rhode Island RIDEM Pistol/Revolver Safety Certificate (Blue Card) Exam.<br />
        Based on <em>Today's Handgun Safety Basics</em> and <em>Rhode Island Firearms Law</em>. Always verify current laws with RIDEM.
      </footer>
    </div>
  );
}
