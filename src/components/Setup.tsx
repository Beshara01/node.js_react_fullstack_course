import React from 'react';
import CodeBlock from './CodeBlock';

const Setup: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-4">🛠️ Phase 1: Environment Setup</h1>
      <p className="text-gray-400 text-lg mb-8">
        Before writing any code, you need the right tools. This section covers everything from installing your IDE to configuring your development machine.
      </p>

      {/* VS Code */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-blue-400">1.</span> Install VS Code (Your IDE)
        </h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-4">
            <strong className="text-white">What is VS Code?</strong> Visual Studio Code is a free, open-source code editor by Microsoft. It's lightweight yet powerful, with thousands of extensions available.
          </p>
          <p className="text-gray-300 mb-4">
            <strong className="text-white">How to install:</strong>
          </p>
          <ol className="list-decimal list-inside text-gray-300 space-y-2 ml-4">
            <li>Go to <code className="bg-gray-700 px-2 py-0.5 rounded text-blue-300">https://code.visualstudio.com</code></li>
            <li>Download the version for your OS (Windows/macOS/Linux)</li>
            <li>Run the installer and follow the prompts</li>
            <li>Launch VS Code after installation</li>
          </ol>
        </div>

        <h3 className="text-xl font-semibold text-white mt-6 mb-3">Essential VS Code Extensions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { name: 'ESLint', desc: 'JavaScript/TypeScript linting' },
            { name: 'Prettier', desc: 'Code formatting' },
            { name: 'ES7+ React Snippets', desc: 'React code snippets' },
            { name: 'Auto Rename Tag', desc: 'Auto rename paired HTML/JSX tags' },
            { name: 'GitLens', desc: 'Git supercharged' },
            { name: 'Thunder Client', desc: 'REST API testing (like Postman)' },
            { name: 'Live Server', desc: 'Local dev server with live reload' },
            { name: 'Tailwind CSS IntelliSense', desc: 'Tailwind autocomplete' },
          ].map((ext, i) => (
            <div key={i} className="flex items-start gap-3 bg-gray-800/30 border border-gray-700 rounded-lg p-3">
              <span className="text-green-400 text-lg">📦</span>
              <div>
                <p className="text-white font-medium text-sm">{ext.name}</p>
                <p className="text-gray-400 text-xs">{ext.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Node.js */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-green-400">2.</span> Install Node.js & npm
        </h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-4">
            <strong className="text-white">What is Node.js?</strong> Node.js is a JavaScript runtime built on Chrome's V8 engine. It lets you run JavaScript outside the browser (on your computer/server).
          </p>
          <p className="text-gray-300 mb-4">
            <strong className="text-white">What is npm?</strong> npm (Node Package Manager) comes bundled with Node.js. It's used to install and manage JavaScript packages/libraries.
          </p>
          <p className="text-gray-300 mb-4">
            <strong className="text-white">Installation:</strong>
          </p>
          <ol className="list-decimal list-inside text-gray-300 space-y-2 ml-4">
            <li>Go to <code className="bg-gray-700 px-2 py-0.5 rounded text-green-300">https://nodejs.org</code></li>
            <li>Download the <strong>LTS (Long Term Support)</strong> version</li>
            <li>Run the installer</li>
            <li>Verify installation in terminal:</li>
          </ol>
        </div>

        <CodeBlock
          language="bash"
          title="Terminal"
          code={`# Check Node.js version
node --version
# Output: v20.x.x

# Check npm version
npm --version
# Output: 10.x.x

# Alternative: Use nvm (Node Version Manager) for managing multiple Node versions
# macOS/Linux:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install --lts
nvm use --lts

# Windows: Use nvm-windows
# Download from: https://github.com/coreybutler/nvm-windows/releases`}
        />
      </section>

      {/* Git */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-orange-400">3.</span> Install Git & GitHub Setup
        </h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-4">
            <strong className="text-white">What is Git?</strong> Git is a version control system that tracks changes in your code. It lets you collaborate, undo mistakes, and maintain code history.
          </p>
          <p className="text-gray-300 mb-4">
            <strong className="text-white">What is GitHub?</strong> GitHub is a cloud platform for hosting Git repositories. It enables collaboration and code sharing.
          </p>
        </div>

        <CodeBlock
          language="bash"
          title="Terminal - Git Setup"
          code={`# Install Git
# macOS: brew install git (or download from git-scm.com)
# Windows: Download from https://git-scm.com/download/win
# Linux: sudo apt install git

# Verify installation
git --version

# Configure Git with your identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Check your config
git config --list

# Initialize a new Git repository
mkdir my-project
cd my-project
git init

# Create first commit
echo "# My Project" > README.md
git add README.md
git commit -m "Initial commit"

# Connect to GitHub remote
git remote add origin https://github.com/username/my-project.git
git push -u origin main`}
        />
      </section>

      {/* Terminal Basics */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-purple-400">4.</span> Terminal / Command Line Basics
        </h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-4">
            The terminal (also called command line, CLI, or shell) is where you'll run commands. On macOS/Linux it's called Terminal, on Windows it's Command Prompt or PowerShell.
          </p>
        </div>

        <CodeBlock
          language="bash"
          title="Terminal - Essential Commands"
          code={`# Navigation
pwd                    # Print working directory (where am I?)
ls                     # List files (macOS/Linux)
dir                    # List files (Windows)
cd folder-name         # Change directory
cd ..                  # Go up one level
cd ~                   # Go to home directory
cd /                   # Go to root directory

# File Operations
mkdir my-folder        # Create a directory
mkdir -p a/b/c         # Create nested directories
touch file.txt         # Create an empty file
cp file.txt copy.txt   # Copy a file
mv file.txt new.txt    # Rename/move a file
rm file.txt            # Delete a file
rm -rf folder          # Delete a folder and contents (BE CAREFUL!)

# Viewing Files
cat file.txt           # Display file contents
head file.txt          # First 10 lines
tail file.txt          # Last 10 lines

# Other Useful Commands
clear                  # Clear terminal screen
echo "Hello World"     # Print text
history                # Show command history
ctrl + c               # Stop a running process
ctrl + l               # Clear screen (alternative)

# Package Management (after Node.js install)
npm init               # Initialize a new Node.js project
npm install express    # Install a package
npm install -g nodemon # Install globally
npm start              # Run start script
npm run dev            # Run dev script`}
        />
      </section>

      {/* Project Structure */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-cyan-400">5.</span> Creating Your First Project
        </h2>

        <CodeBlock
          language="bash"
          title="Terminal - Create React App"
          code={`# Create a new React project with Vite (modern approach)
npm create vite@latest my-first-app
# Select: React → JavaScript or TypeScript

cd my-first-app
npm install
npm run dev
# Opens at http://localhost:5173

# Create a new Node.js project from scratch
mkdir my-node-app
cd my-node-app
npm init -y
# This creates package.json

# Install Express
npm install express

# Create server.js and start coding!`}
        />

        <h3 className="text-xl font-semibold text-white mt-6 mb-3">Typical Project Structure</h3>
        <CodeBlock
          language="text"
          title="Project Structure"
          code={`my-fullstack-app/
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Helper functions
│   │   ├── services/       # API calls
│   │   ├── context/        # React Context providers
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── config/         # Configuration files
│   │   ├── utils/          # Helper functions
│   │   └── app.js          # Express app setup
│   ├── package.json
│   └── .env                # Environment variables
│
├── .gitignore
├── README.md
└── package.json            # Root package.json (optional)`}
        />
      </section>

      {/* DevTools */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-pink-400">6.</span> Browser DevTools Mastery
        </h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <p className="text-gray-300 mb-4">
            Browser DevTools are essential for debugging. Press <kbd className="bg-gray-700 px-2 py-0.5 rounded text-xs">F12</kbd> or <kbd className="bg-gray-700 px-2 py-0.5 rounded text-xs">Ctrl+Shift+I</kbd> to open.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {[
              { tab: 'Elements', desc: 'Inspect and edit HTML/CSS in real-time' },
              { tab: 'Console', desc: 'Run JavaScript, view logs and errors' },
              { tab: 'Network', desc: 'Monitor API calls, load times, request/response' },
              { tab: 'Sources', desc: 'Debug JavaScript with breakpoints' },
              { tab: 'Application', desc: 'View localStorage, cookies, service workers' },
              { tab: 'Performance', desc: 'Analyze rendering performance' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                <p className="text-white font-medium text-sm">{item.tab}</p>
                <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Setup;
