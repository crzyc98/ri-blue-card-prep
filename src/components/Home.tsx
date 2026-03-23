import type { View } from '../App';
import { questions, CATEGORIES } from '../data/questions';

interface Props { setView: (v: View) => void; }

export default function Home({ setView }: Props) {
  const tfCount = questions.filter(q => q.type === 'true-false').length;
  const mcCount = questions.filter(q => q.type === 'multiple-choice').length;

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl dark:bg-gradient-to-br dark:from-blue-600 dark:to-blue-800 bg-gradient-to-br from-blue-500 to-blue-700 p-8 md:p-12 text-center shadow-2xl shadow-blue-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            162 verified questions
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
            RI Blue Card Exam Prep
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Free interactive study tools for the Rhode Island RIDEM Pistol/Revolver Safety Certificate exam.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <button onClick={() => setView('quiz')}
              className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Start Practice Quiz
            </button>
            <button onClick={() => setView('study')}
              className="border-2 border-white/30 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/10 transition-all backdrop-blur-sm">
              Study Guide
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Questions', value: questions.length, color: 'blue' },
          { label: 'Multiple Choice', value: mcCount, color: 'purple' },
          { label: 'True / False', value: tfCount, color: 'emerald' },
          { label: 'Topic Areas', value: CATEGORIES.length, color: 'amber' },
        ].map(({ label, value, color }) => (
          <div key={label} className="dark:bg-slate-800/50 bg-white rounded-xl p-4 text-center dark:border-slate-700/50 border-slate-200 border transition-colors">
            <div className={`text-3xl font-black text-${color}-500 mb-0.5`}>{value}</div>
            <div className="dark:text-slate-400 text-slate-500 text-xs font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Study Modes */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            view: 'study' as View,
            title: 'Study Guide',
            desc: 'Review key concepts organized by topic — RI law, safety rules, handgun parts, ammunition, and more.',
            gradient: 'from-emerald-500 to-teal-600',
            shadow: 'shadow-emerald-500/20',
          },
          {
            view: 'flashcards' as View,
            title: 'Flashcards',
            desc: 'Flip through cards on every topic. Great for memorizing key facts, rules, and definitions.',
            gradient: 'from-purple-500 to-indigo-600',
            shadow: 'shadow-purple-500/20',
          },
          {
            view: 'quiz' as View,
            title: 'Practice Quiz',
            desc: 'Test yourself with up to 50 randomized questions — just like the real exam. Get instant feedback.',
            gradient: 'from-orange-500 to-red-500',
            shadow: 'shadow-orange-500/20',
          },
        ].map(({ view, title, desc, gradient, shadow }) => (
          <button
            key={title}
            onClick={() => setView(view)}
            className={`group text-left rounded-xl p-6 dark:bg-slate-800/50 bg-white dark:border-slate-700/50 border-slate-200 border dark:hover:border-slate-600 hover:border-slate-300 transition-all hover:-translate-y-0.5 hover:shadow-lg ${shadow}`}
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg ${shadow}`}>
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {view === 'study' && <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />}
                {view === 'flashcards' && <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />}
                {view === 'quiz' && <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />}
              </svg>
            </div>
            <h3 className="font-bold dark:text-white text-slate-900 mb-1.5 group-hover:text-blue-400 transition-colors">{title}</h3>
            <p className="dark:text-slate-400 text-slate-500 text-sm leading-relaxed">{desc}</p>
          </button>
        ))}
      </div>

      {/* About */}
      <div className="dark:bg-slate-800/50 bg-white rounded-xl p-6 dark:border-slate-700/50 border-slate-200 border">
        <h2 className="font-bold dark:text-white text-slate-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          About the Blue Card Exam
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm dark:text-slate-300 text-slate-600">
          <div className="space-y-3">
            <p><strong className="dark:text-slate-100 text-slate-800">What is the Blue Card?</strong> The RI RIDEM Pistol/Revolver Safety Certificate, required to purchase a handgun or ammunition in RI. You must be 21+ and a US citizen or lawful resident.</p>
            <p><strong className="dark:text-slate-100 text-slate-800">The Exam:</strong> 50 questions (multiple choice and true/false) based on <em>Today's Handgun Safety Basics</em> and RI Firearms Law.</p>
            <p><strong className="dark:text-slate-100 text-slate-800">Where to Test:</strong> RIDEM-approved firearms dealers, sporting clubs, or in person at DEM Headquarters in Providence.</p>
          </div>
          <div className="space-y-3">
            <p><strong className="dark:text-slate-100 text-slate-800">Registration:</strong> In-person exams require reservation at dem.ri.gov</p>
            <p><strong className="dark:text-slate-100 text-slate-800">Is it a Carry Permit?</strong> No. Carry permits are issued through town halls and the RI Attorney General's Office.</p>
            <p><strong className="dark:text-slate-100 text-slate-800">RI Law Reference:</strong> Rhode Island General Laws, Title 11, Chapter 11-47.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
