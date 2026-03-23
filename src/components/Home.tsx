import type { View } from '../App';
import { questions, CATEGORIES } from '../data/questions';

interface Props { setView: (v: View) => void; }

export default function Home({ setView }: Props) {
  const tfCount = questions.filter(q => q.type === 'true-false').length;
  const mcCount = questions.filter(q => q.type === 'multiple-choice').length;

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="bg-blue-900 text-white rounded-2xl p-8 text-center shadow-xl">
        <div className="text-5xl mb-4">🎯</div>
        <h1 className="text-3xl font-bold mb-2">RI Blue Card Exam Prep</h1>
        <p className="text-blue-200 text-lg mb-6 max-w-2xl mx-auto">
          Prepare for your Rhode Island RIDEM Pistol/Revolver Safety Certificate exam with our free interactive study tools.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button onClick={() => setView('quiz')}
            className="bg-white text-blue-900 px-6 py-3 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow">
            ✏️ Start Practice Quiz
          </button>
          <button onClick={() => setView('study')}
            className="border-2 border-white text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-blue-800 transition-colors">
            📖 Study Guide
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Questions', value: questions.length, emoji: '❓' },
          { label: 'Multiple Choice', value: mcCount, emoji: '📋' },
          { label: 'True / False', value: tfCount, emoji: '☑️' },
          { label: 'Topic Areas', value: CATEGORIES.length, emoji: '📂' },
        ].map(({ label, value, emoji }) => (
          <div key={label} className="bg-white rounded-xl p-4 text-center shadow border border-gray-100">
            <div className="text-3xl mb-1">{emoji}</div>
            <div className="text-2xl font-bold text-blue-900">{value}</div>
            <div className="text-gray-500 text-sm">{label}</div>
          </div>
        ))}
      </div>

      {/* Study Modes */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            view: 'study' as View,
            emoji: '📖',
            title: 'Study Guide',
            desc: 'Review key concepts organized by topic — RI law, safety rules, handgun parts, ammunition, and more.',
            color: 'bg-green-50 border-green-200',
            btn: 'bg-green-600 hover:bg-green-700',
          },
          {
            view: 'flashcards' as View,
            emoji: '🃏',
            title: 'Flashcards',
            desc: 'Flip through cards on every topic. Great for memorizing key facts, rules, and definitions.',
            color: 'bg-purple-50 border-purple-200',
            btn: 'bg-purple-600 hover:bg-purple-700',
          },
          {
            view: 'quiz' as View,
            emoji: '✏️',
            title: 'Practice Quiz',
            desc: 'Test yourself with 50 randomized questions — just like the real exam. Get instant feedback.',
            color: 'bg-orange-50 border-orange-200',
            btn: 'bg-orange-600 hover:bg-orange-700',
          },
        ].map(({ view, emoji, title, desc, color, btn }) => (
          <div key={title} className={`rounded-xl p-6 border-2 ${color} flex flex-col`}>
            <div className="text-4xl mb-3">{emoji}</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm mb-4 flex-1">{desc}</p>
            <button onClick={() => setView(view)} className={`${btn} text-white py-2 px-4 rounded-lg font-medium text-sm transition-colors`}>
              Open {title} →
            </button>
          </div>
        ))}
      </div>

      {/* About the exam */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow">
        <h2 className="text-xl font-bold text-gray-800 mb-4">ℹ️ About the Blue Card Exam</h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
          <div className="space-y-2">
            <p><strong className="text-gray-800">What is the Blue Card?</strong> The Rhode Island RIDEM Pistol/Revolver Safety Certificate is required to purchase a handgun in RI. You must be 21+ and a US citizen or lawful resident.</p>
            <p><strong className="text-gray-800">The Exam:</strong> 50 questions (multiple choice and true/false) based on <em>Today's Handgun Safety Basics</em> and RI Firearms Law.</p>
            <p><strong className="text-gray-800">Where to Test:</strong> RIDEM-approved firearms dealers, sporting clubs, or in person at DEM Headquarters in Providence.</p>
          </div>
          <div className="space-y-2">
            <p><strong className="text-gray-800">Registration:</strong> In-person exams require registration at <span className="text-blue-600">dem.ri.gov/blue-card-exam-reservation</span></p>
            <p><strong className="text-gray-800">Is it a Carry Permit?</strong> No — the Blue Card is not a Concealed Carry Permit. Carry permits are issued through town halls and the RI Attorney General's Office.</p>
            <p><strong className="text-gray-800">RI Law Reference:</strong> Rhode Island General Laws, Title 11, Chapter 11-47.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
