import React, { useState } from 'react';
import CodeBlock from './CodeBlock';

interface FileData {
  name: string;
  path: string;
  language: string;
  description: string;
  content: string;
}

const projectFiles: FileData[] = [
  {
    name: 'package.json',
    path: 'server/package.json',
    language: 'json',
    description: 'Server dependencies & scripts',
    content: `{
  "name": "todo-server",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "node --watch server.js",
    "start": "node server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "mongoose": "^8.0.0"
  }
}`
  },
  {
    name: '.env',
    path: 'server/.env',
    language: 'bash',
    description: 'Environment variables (NEVER commit this!)',
    content: `PORT=5000
MONGODB_URI=mongodb://localhost:27017/todoapp
NODE_ENV=development`
  },
  {
    name: 'database.js',
    path: 'server/config/database.js',
    language: 'javascript',
    description: 'MongoDB connection setup',
    content: `import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(\`✅ MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error(\`❌ MongoDB Error: \${error.message}\`);
    process.exit(1);
  }
};

export default connectDB;`
  },
  {
    name: 'Todo.js',
    path: 'server/models/Todo.js',
    language: 'javascript',
    description: 'Todo data model (schema)',
    content: `import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Text is required'],
    trim: true,
    maxlength: [200, 'Max 200 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// What this gives us:
// Todo.find()              → Get all todos
// Todo.findById(id)        → Get one todo
// Todo.create({text: "…"}) → Create todo
// Todo.findByIdAndUpdate() → Update todo
// Todo.findByIdAndDelete() → Delete todo

export default mongoose.model('Todo', todoSchema);`
  },
  {
    name: 'server.js',
    path: 'server/server.js',
    language: 'javascript',
    description: 'Main server file - Express app + API routes',
    content: `import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import Todo from './models/Todo.js';

dotenv.config();

const app = express();

// ========== MIDDLEWARE ==========
app.use(cors());              // Allow frontend requests
app.use(express.json());      // Parse JSON bodies

// ========== API ROUTES ==========

// GET all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create todo
app.post('/api/todos', async (req, res) => {
  try {
    const todo = await Todo.create({ text: req.body.text });
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update todo
app.put('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!todo) return res.status(404).json({ error: 'Not found' });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== START SERVER ==========
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(\`🚀 Server running at http://localhost:\${PORT}\`);
  });
});`
  },
  {
    name: 'api.js',
    path: 'client/src/services/api.js',
    language: 'javascript',
    description: 'Frontend API service - talks to backend',
    content: `const API_URL = 'http://localhost:5000/api';

// Generic fetch wrapper
async function apiRequest(endpoint, options = {}) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  };

  const response = await fetch(\`\${API_URL}\${endpoint}\`, config);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
}

// Todo API functions
export const todoAPI = {
  // Get all todos
  getAll: () => apiRequest('/todos'),

  // Create a new todo
  create: (text) => apiRequest('/todos', {
    method: 'POST',
    body: JSON.stringify({ text }),
  }),

  // Update a todo
  update: (id, updates) => apiRequest(\`/todos/\${id}\`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  }),

  // Delete a todo
  delete: (id) => apiRequest(\`/todos/\${id}\`, {
    method: 'DELETE',
  }),
};`
  },
  {
    name: 'TodoForm.jsx',
    path: 'client/src/components/TodoForm.jsx',
    language: 'jsx',
    description: 'Form component to add new todos',
    content: `import { useState } from 'react';

function TodoForm({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (text.trim()) {
      onAdd(text.trim()); // Call parent function
      setText('');         // Clear input
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        autoFocus
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TodoForm;`
  },
  {
    name: 'TodoItem.jsx',
    path: 'client/src/components/TodoItem.jsx',
    language: 'jsx',
    description: 'Single todo item component',
    content: `function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={\`todo-item \${todo.completed ? 'completed' : ''}\`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo._id, todo.completed)}
      />
      <span className="todo-text">{todo.text}</span>
      <button
        className="delete-btn"
        onClick={() => onDelete(todo._id)}
      >
        ✕
      </button>
    </li>
  );
}

export default TodoItem;`
  },
  {
    name: 'App.jsx',
    path: 'client/src/App.jsx',
    language: 'jsx',
    description: 'Main React component - puts everything together',
    content: `import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { todoAPI } from './services/api';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load todos when app starts
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await todoAPI.getAll();
      setTodos(data);
    } catch (error) {
      console.error('Failed to load:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (text) => {
    const newTodo = await todoAPI.create(text);
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = async (id, completed) => {
    const updated = await todoAPI.update(id, { completed: !completed });
    setTodos(todos.map(t => t._id === id ? updated : t));
  };

  const deleteTodo = async (id) => {
    await todoAPI.delete(id);
    setTodos(todos.filter(t => t._id !== id));
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="app">
      <h1>📝 Todo App</h1>
      <TodoForm onAdd={addTodo} />
      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
      {todos.length === 0 && <p className="empty">No todos yet!</p>}
      <div className="stats">
        <span>{todos.filter(t => !t.completed).length} remaining</span>
        <span>{todos.filter(t => t.completed).length} completed</span>
      </div>
    </div>
  );
}

export default App;`
  },
  {
    name: 'App.css',
    path: 'client/src/App.css',
    language: 'css',
    description: 'Styles for the todo app',
    content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.todo-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.todo-form input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
}

.todo-form input:focus {
  outline: none;
  border-color: #667eea;
}

.todo-form button {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.todo-form button:hover {
  background: #5568d3;
}

.todo-list {
  list-style: none;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-bottom: 1px solid #f0f0f0;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #999;
}

.todo-text {
  flex: 1;
}

.delete-btn {
  background: none;
  border: none;
  color: #ff4444;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
}

.todo-item:hover .delete-btn {
  opacity: 1;
}

.stats {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
  color: #666;
  font-size: 0.9rem;
}`
  },
];

const README: React.FC = () => {
  const [previewFile, setPreviewFile] = useState<FileData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFiles = projectFiles.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">📄 Project README</h1>
        <p className="text-gray-400 text-lg">
          Complete Fullstack Todo App — Click <span className="text-blue-400 font-bold">Preview</span> to see any file instantly!
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Total Files', value: projectFiles.length, icon: '📁' },
          { label: 'Backend Files', value: 5, icon: '🟢' },
          { label: 'Frontend Files', value: 4, icon: '⚛️' },
          { label: 'Lines of Code', value: '400+', icon: '💻' },
        ].map((stat, i) => (
          <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 Search files..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* File Tree */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden mb-8">
        {/* Project Header */}
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-b border-gray-800 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📦</span>
            <div>
              <h2 className="text-lg font-bold text-white">todo-fullstack-app</h2>
              <p className="text-xs text-gray-400">A complete fullstack todo application</p>
            </div>
          </div>
        </div>

        {/* Server Files */}
        <div className="border-b border-gray-800">
          <div className="px-6 py-3 bg-gray-800/30 flex items-center gap-2">
            <span className="text-green-400">🟢</span>
            <span className="text-white font-bold text-sm">server/</span>
            <span className="text-xs text-gray-500 ml-auto">Backend (Express + MongoDB)</span>
          </div>
          <div className="divide-y divide-gray-800/50">
            {filteredFiles
              .filter(f => f.path.startsWith('server/'))
              .map((file) => (
                <FileRow key={file.path} file={file} onPreview={setPreviewFile} />
              ))}
          </div>
        </div>

        {/* Client Files */}
        <div>
          <div className="px-6 py-3 bg-gray-800/30 flex items-center gap-2">
            <span className="text-blue-400">⚛️</span>
            <span className="text-white font-bold text-sm">client/</span>
            <span className="text-xs text-gray-500 ml-auto">Frontend (React + Vite)</span>
          </div>
          <div className="divide-y divide-gray-800/50">
            {filteredFiles
              .filter(f => f.path.startsWith('client/'))
              .map((file) => (
                <FileRow key={file.path} file={file} onPreview={setPreviewFile} />
              ))}
          </div>
        </div>
      </div>

      {/* Setup Instructions */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span>🚀</span> Quick Start
        </h2>
        <div className="space-y-3">
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <p className="text-yellow-300 font-bold text-sm mb-2">Step 1: Clone & Install Backend</p>
            <CodeBlock
              title="Terminal"
              code={`cd server
npm install`}
            />
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <p className="text-yellow-300 font-bold text-sm mb-2">Step 2: Start Backend</p>
            <CodeBlock
              title="Terminal"
              code={`npm run dev
# ✅ Server running at http://localhost:5000`}
            />
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <p className="text-yellow-300 font-bold text-sm mb-2">Step 3: Install & Start Frontend (new terminal)</p>
            <CodeBlock
              title="Terminal"
              code={`cd client
npm install
npm run dev
# ✅ App running at http://localhost:5173`}
            />
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span>🛠️</span> Tech Stack
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { name: 'Node.js', color: 'bg-green-500/20 text-green-300 border-green-500/30' },
            { name: 'Express', color: 'bg-gray-500/20 text-gray-300 border-gray-500/30' },
            { name: 'MongoDB', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
            { name: 'Mongoose', color: 'bg-red-500/20 text-red-300 border-red-500/30' },
            { name: 'React', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
            { name: 'Vite', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
            { name: 'CSS3', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
            { name: 'REST API', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
          ].map((tech, i) => (
            <div key={i} className={`border rounded-lg px-3 py-2 text-center text-sm font-medium ${tech.color}`}>
              {tech.name}
            </div>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {previewFile && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewFile(null)}
        >
          <div
            className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xl">
                  {previewFile.path.startsWith('server/') ? '🟢' : '⚛️'}
                </span>
                <div className="min-w-0">
                  <h3 className="text-white font-bold truncate">{previewFile.name}</h3>
                  <p className="text-xs text-gray-400 font-mono truncate">{previewFile.path}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded hidden sm:block">
                  {previewFile.description}
                </span>
                <button
                  onClick={() => setPreviewFile(null)}
                  className="text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-lg w-8 h-8 flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto flex-1 p-4">
              <CodeBlock
                code={previewFile.content}
                language={previewFile.language}
                title={previewFile.path}
              />
            </div>

            {/* Modal Footer - Quick Nav */}
            <div className="flex items-center justify-between px-6 py-3 bg-gray-800 border-t border-gray-700">
              <button
                onClick={() => {
                  const idx = projectFiles.findIndex(f => f.path === previewFile.path);
                  if (idx > 0) setPreviewFile(projectFiles[idx - 1]);
                }}
                disabled={projectFiles.findIndex(f => f.path === previewFile.path) === 0}
                className="px-3 py-1.5 rounded bg-gray-700 text-gray-300 hover:text-white text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                ← Previous
              </button>
              <span className="text-xs text-gray-500">
                {projectFiles.findIndex(f => f.path === previewFile.path) + 1} / {projectFiles.length}
              </span>
              <button
                onClick={() => {
                  const idx = projectFiles.findIndex(f => f.path === previewFile.path);
                  if (idx < projectFiles.length - 1) setPreviewFile(projectFiles[idx + 1]);
                }}
                disabled={projectFiles.findIndex(f => f.path === previewFile.path) === projectFiles.length - 1}
                className="px-3 py-1.5 rounded bg-gray-700 text-gray-300 hover:text-white text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// File Row Component
function FileRow({ file, onPreview }: { file: FileData; onPreview: (f: FileData) => void }) {
  return (
    <div className="flex items-center gap-3 px-6 py-3 hover:bg-gray-800/30 transition-colors group">
      <FileIcon name={file.name} />
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium truncate">{file.name}</p>
        <p className="text-xs text-gray-500 truncate">{file.description}</p>
      </div>
      <button
        onClick={() => onPreview(file)}
        className="px-3 py-1.5 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-medium hover:bg-blue-600/40 hover:text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
      >
        👁️ Preview
      </button>
    </div>
  );
}

// File Icon based on extension
function FileIcon({ name }: { name: string }) {
  const ext = name.split('.').pop()?.toLowerCase();
  const icons: Record<string, { icon: string; color: string }> = {
    js: { icon: '📜', color: 'text-yellow-400' },
    jsx: { icon: '⚛️', color: 'text-blue-400' },
    json: { icon: '📋', color: 'text-green-400' },
    css: { icon: '🎨', color: 'text-purple-400' },
    env: { icon: '🔐', color: 'text-red-400' },
    md: { icon: '📝', color: 'text-gray-400' },
  };

  const { icon } = icons[ext || ''] || { icon: '📄', color: 'text-gray-400' };

  return <span className="text-lg">{icon}</span>;
}

export default README;
