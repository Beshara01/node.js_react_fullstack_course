import React, { useState } from 'react';
import Roadmap from './components/Roadmap';
import Course from './components/Course';
import README from './components/README';
import Setup from './components/Setup';
import NodeJS from './components/NodeJS';
import Backend from './components/Backend';
import ReactLessons from './components/ReactLessons';
import Regex from './components/Regex';
import Tools from './components/Tools';

type Section = 'roadmap' | 'course' | 'readme' | 'setup' | 'nodejs' | 'backend' | 'react' | 'regex' | 'tools';

const navItems: { id: Section; label: string; icon: string }[] = [
  { id: 'roadmap', label: 'Roadmap', icon: '🗺️' },
  { id: 'course', label: 'Learn Step-by-Step', icon: '📚' },
  { id: 'readme', label: 'Project Files', icon: '📄' },
  { id: 'setup', label: 'Setup', icon: '🛠️' },
  { id: 'nodejs', label: 'Node.js', icon: '🟢' },
  { id: 'backend', label: 'Backend', icon: '🗄️' },
  { id: 'react', label: 'React', icon: '⚛️' },
  { id: 'regex', label: 'Regex', icon: '🔤' },
  { id: 'tools', label: 'Tools', icon: '🧰' },
];

function App() {
  const [activeSection, setActiveSection] = useState<Section>('roadmap');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case 'roadmap': return <Roadmap />;
      case 'course': return <Course />;
      case 'readme': return <README />;
      case 'setup': return <Setup />;
      case 'nodejs': return <NodeJS />;
      case 'backend': return <Backend />;
      case 'react': return <ReactLessons />;
      case 'regex': return <Regex />;
      case 'tools': return <Tools />;
      default: return <Roadmap />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 border border-gray-700 rounded-lg p-2 text-white hover:bg-gray-700 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {sidebarOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-72 bg-gray-900 border-r border-gray-800
        transform transition-transform duration-300 ease-in-out z-40
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col overflow-y-auto
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Fullstack Dev
          </h1>
          <p className="text-gray-500 text-xs mt-1">Node.js & React - Zero to Hero</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all
                    ${activeSection === item.id
                      ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-blue-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }
                  `}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                  {activeSection === item.id && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-blue-400"></span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700">
            <p className="text-xs text-gray-400 mb-2">📚 Learning Progress</p>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${(navItems.findIndex(n => n.id === activeSection) + 1) / navItems.length * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Section {navItems.findIndex(n => n.id === activeSection) + 1} of {navItems.length}
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-gray-950/80 backdrop-blur-sm border-b border-gray-800 px-6 py-4">
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            <div className="flex items-center gap-3 ml-12 lg:ml-0">
              <span className="text-2xl">
                {navItems.find(n => n.id === activeSection)?.icon}
              </span>
              <h2 className="text-lg font-bold text-white">
                {navItems.find(n => n.id === activeSection)?.label}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 hidden sm:block">
                Node.js + React Fullstack Course
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {renderSection()}
        </div>

        {/* Bottom navigation */}
        <div className="border-t border-gray-800 px-6 py-4">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <button
              onClick={() => {
                const currentIndex = navItems.findIndex(n => n.id === activeSection);
                if (currentIndex > 0) {
                  setActiveSection(navItems[currentIndex - 1].id);
                  window.scrollTo(0, 0);
                }
              }}
              disabled={navItems.findIndex(n => n.id === activeSection) === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm hidden sm:inline">Previous</span>
            </button>

            <span className="text-xs text-gray-500">
              {navItems.findIndex(n => n.id === activeSection) + 1} / {navItems.length}
            </span>

            <button
              onClick={() => {
                const currentIndex = navItems.findIndex(n => n.id === activeSection);
                if (currentIndex < navItems.length - 1) {
                  setActiveSection(navItems[currentIndex + 1].id);
                  window.scrollTo(0, 0);
                }
              }}
              disabled={navItems.findIndex(n => n.id === activeSection) === navItems.length - 1}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <span className="text-sm hidden sm:inline">Next</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
