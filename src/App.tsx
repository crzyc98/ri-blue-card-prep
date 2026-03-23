import { useState, useEffect } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';
import StudyGuide from './components/StudyGuide';
import Flashcards from './components/Flashcards';

export type View = 'home' | 'quiz' | 'study' | 'flashcards';

function ThemeToggle({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg transition-colors dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 hover:bg-slate-200"
      aria-label="Toggle theme"
    >
      {dark ? (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}

const navItems: { id: View; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'study', label: 'Study', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { id: 'flashcards', label: 'Cards', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { id: 'quiz', label: 'Quiz', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
];

export default function App() {
  const [view, setView] = useState<View>('home');
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    return stored ? stored === 'dark' : true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <div className="min-h-screen bg-(--color-surface-0) transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl dark:bg-slate-900/80 bg-white/80 border-b dark:border-slate-800 border-slate-200">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => setView('home')} className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-blue-500/25">
              RI
            </div>
            <div className="text-left hidden sm:block">
              <div className="font-bold dark:text-white text-slate-900 text-sm leading-tight group-hover:text-blue-400 transition-colors">Blue Card Study</div>
              <div className="dark:text-slate-500 text-slate-400 text-xs">Exam Prep</div>
            </div>
          </button>

          <nav className="flex items-center gap-1">
            {navItems.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => setView(id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  view === id
                    ? 'dark:bg-slate-800 bg-slate-100 dark:text-white text-slate-900'
                    : 'dark:text-slate-400 text-slate-500 dark:hover:text-white hover:text-slate-900 dark:hover:bg-slate-800/50 hover:bg-slate-100'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                </svg>
                <span className="hidden md:inline">{label}</span>
              </button>
            ))}
            <div className="w-px h-6 dark:bg-slate-700 bg-slate-200 mx-1" />
            <ThemeToggle dark={dark} toggle={() => setDark(d => !d)} />
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {view === 'home' && <Home setView={setView} />}
        {view === 'quiz' && <Quiz />}
        {view === 'study' && <StudyGuide />}
        {view === 'flashcards' && <Flashcards />}
      </main>

      {/* Footer */}
      <footer className="dark:text-slate-600 text-slate-400 text-xs text-center py-8 border-t dark:border-slate-800 border-slate-200 mt-8 px-4">
        Unofficial study aid for the RI RIDEM Pistol/Revolver Safety Certificate (Blue Card) Exam.<br />
        Based on <em>Today's Handgun Safety Basics</em> & <em>RI Firearms Law</em>. Always verify current laws with RIDEM.
      </footer>
    </div>
  );
}
