import React from 'react';

const phases = [
  {
    title: 'Phase 1: Environment Setup',
    duration: '1-2 Days',
    color: 'from-blue-500 to-cyan-500',
    topics: [
      'Install VS Code (IDE)',
      'Install Node.js & npm',
      'Install Git & GitHub setup',
      'Install essential extensions (ESLint, Prettier, etc.)',
      'Terminal/Command line basics',
      'Browser DevTools mastery',
    ],
  },
  {
    title: 'Phase 2: JavaScript Fundamentals',
    duration: '1-2 Weeks',
    color: 'from-yellow-500 to-orange-500',
    topics: [
      'Variables (let, const, var)',
      'Data types & operators',
      'Control flow (if/else, switch, loops)',
      'Functions (declaration, arrow, callbacks)',
      'Arrays & Objects',
      'ES6+ features (destructuring, spread, template literals)',
      'Regular Expressions (Regex)',
    ],
  },
  {
    title: 'Phase 3: Node.js Core',
    duration: '2-3 Weeks',
    color: 'from-green-500 to-emerald-500',
    topics: [
      'Node.js runtime & V8 engine',
      'Modules (CommonJS vs ES Modules)',
      'File system (fs) operations',
      'Event loop & async patterns',
      'Streams & Buffers',
      'HTTP module & creating servers',
      'npm & package management',
    ],
  },
  {
    title: 'Phase 4: Backend Development',
    duration: '3-4 Weeks',
    color: 'from-purple-500 to-pink-500',
    topics: [
      'Express.js framework',
      'REST API design',
      'Middleware patterns',
      'Routing & controllers',
      'Database (MongoDB/PostgreSQL)',
      'Authentication (JWT, OAuth)',
      'Error handling & validation',
    ],
  },
  {
    title: 'Phase 5: React Frontend',
    duration: '3-4 Weeks',
    color: 'from-indigo-500 to-blue-500',
    topics: [
      'JSX & Components',
      'Props & State management',
      'Hooks (useState, useEffect, useContext, etc.)',
      'React Router',
      'Forms & validation',
      'API integration (fetch, axios)',
      'State management (Context API, Redux)',
    ],
  },
  {
    title: 'Phase 6: Fullstack Integration',
    duration: '2-3 Weeks',
    color: 'from-rose-500 to-red-500',
    topics: [
      'Connecting React to Express',
      'CORS configuration',
      'Environment variables',
      'File uploads',
      'Real-time with WebSockets',
      'Deployment (Vercel, Railway, AWS)',
      'Performance optimization',
    ],
  },
  {
    title: 'Phase 7: Advanced & Tools',
    duration: 'Ongoing',
    color: 'from-teal-500 to-cyan-500',
    topics: [
      'TypeScript integration',
      'Testing (Jest, React Testing Library)',
      'Docker & containerization',
      'CI/CD pipelines',
      'Advanced Regex patterns',
      'Security best practices',
      'GraphQL introduction',
    ],
  },
];

const Roadmap: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          🗺️ Fullstack Development Roadmap
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Your complete journey from zero to hero in Node.js & React fullstack web development.
          Follow this roadmap step by step.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-teal-500 hidden md:block"></div>

        <div className="space-y-8">
          {phases.map((phase, index) => (
            <div key={index} className="relative flex gap-6 items-start">
              {/* Circle marker */}
              <div className={`hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${phase.color} text-white font-bold text-lg flex-shrink-0 z-10 shadow-lg`}>
                {index + 1}
              </div>

              {/* Content card */}
              <div className="flex-1 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all hover:shadow-lg hover:shadow-black/20">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <div className={`md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br ${phase.color} text-white font-bold text-sm`}>
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300">
                    ⏱️ {phase.duration}
                  </span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                  {phase.topics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                      <span className="text-green-400 mt-0.5">✓</span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total time estimate */}
      <div className="mt-12 text-center bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-white mb-2">📊 Total Estimated Time</h3>
        <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          12-18 Weeks (3-5 months)
        </p>
        <p className="text-gray-400 mt-2">
          With consistent daily practice of 2-4 hours
        </p>
      </div>
    </div>
  );
};

export default Roadmap;
