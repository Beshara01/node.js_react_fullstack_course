import React from 'react';
import CodeBlock from './CodeBlock';

const NodeJS: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-4">🟢 Phase 3: Node.js Core</h1>
      <p className="text-gray-400 text-lg mb-8">
        Node.js is the backbone of your backend. Learn how JavaScript runs outside the browser and build powerful server-side applications.
      </p>

      {/* What is Node.js */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-green-400">1.</span> What is Node.js?
        </h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-4">
            <strong className="text-white">Node.js</strong> is an open-source, cross-platform JavaScript runtime environment. It executes JavaScript code outside a web browser.
          </p>
          <ul className="text-gray-300 space-y-2 ml-4">
            <li>• Built on <strong className="text-green-300">Chrome's V8 JavaScript Engine</strong> (same engine that powers Chrome browser)</li>
            <li>• Uses an <strong className="text-green-300">event-driven, non-blocking I/O</strong> model — perfect for data-intensive real-time apps</li>
            <li>• Has the largest ecosystem of open-source libraries (npm)</li>
            <li>• Single-threaded but can handle concurrent operations via the event loop</li>
          </ul>
        </div>

        <CodeBlock
          language="javascript"
          title="hello.js - Your first Node.js program"
          code={`// Run this with: node hello.js

console.log("Hello, Node.js!");
console.log("Node version:", process.version);
console.log("Platform:", process.platform);
console.log("Current directory:", process.cwd());
console.log("Current user:", process.env.USER || process.env.USERNAME);

// Node.js can access system-level things browsers can't
const os = require('os');
console.log("CPU cores:", os.cpus().length);
console.log("Total memory:", (os.totalmem() / 1024 / 1024 / 1024).toFixed(2), "GB");
console.log("Free memory:", (os.freemem() / 1024 / 1024 / 1024).toFixed(2), "GB");
console.log("OS type:", os.type());
console.log("Home directory:", os.homedir());`}
        />
      </section>

      {/* Modules */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-green-400">2.</span> Modules System
        </h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-4">
            Modules let you organize code into separate files. Node.js supports two module systems:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-600">
              <p className="text-yellow-300 font-bold mb-2">CommonJS (Traditional)</p>
              <p className="text-gray-400 text-sm">Uses require() and module.exports</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-600">
              <p className="text-blue-300 font-bold mb-2">ES Modules (Modern)</p>
              <p className="text-gray-400 text-sm">Uses import and export</p>
            </div>
          </div>
        </div>

        <CodeBlock
          language="javascript"
          title="CommonJS - math.js"
          code={`// math.js - Exporting functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

// Export individual functions
module.exports.add = add;
module.exports.subtract = subtract;
module.exports.multiply = multiply;

// OR export all at once
module.exports = { add, subtract, multiply };`}
        />

        <CodeBlock
          language="javascript"
          title="CommonJS - app.js (Importing)"
          code={`// app.js - Importing functions
const math = require('./math');

console.log(math.add(5, 3));       // 8
console.log(math.subtract(10, 4)); // 6
console.log(math.multiply(3, 7));  // 21

// Destructuring import
const { add, multiply } = require('./math');
console.log(add(10, 20));      // 30
console.log(multiply(5, 5));   // 25`}
        />

        <CodeBlock
          language="javascript"
          title="ES Modules - math.mjs"
          code={`// math.mjs - ES Module exports
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// Default export (one per file)
export default function calculator(operation, a, b) {
  switch(operation) {
    case 'add': return a + b;
    case 'subtract': return a - b;
    case 'multiply': return a * b;
    default: throw new Error('Unknown operation');
  }
}`}
        />

        <CodeBlock
          language="javascript"
          title="ES Modules - app.mjs (Importing)"
          code={`// app.mjs - ES Module imports
import calculator, { add, subtract } from './math.mjs';

console.log(add(5, 3));              // 8
console.log(subtract(10, 4));        // 6
console.log(calculator('add', 2, 3)); // 5

// To use ES modules in .js files, add to package.json:
// { "type": "module" }`}
        />
      </section>

      {/* File System */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-green-400">3.</span> File System (fs) Module
        </h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300">
            The <code className="bg-gray-700 px-2 py-0.5 rounded text-green-300">fs</code> module lets you read, write, delete, and manipulate files and directories. It has three modes: callback, synchronous, and promise-based.
          </p>
        </div>

        <CodeBlock
          language="javascript"
          title="fs-operations.js"
          code={`const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

// ========== READING FILES ==========

// Synchronous (blocks execution until done)
const content = fs.readFileSync('file.txt', 'utf-8');
console.log(content);

// Asynchronous with callbacks
fs.readFile('file.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log(data);
});

// Promise-based (recommended - modern approach)
async function readFile() {
  try {
    const data = await fsPromises.readFile('file.txt', 'utf-8');
    console.log(data);
  } catch (err) {
    console.error('Error:', err);
  }
}

// ========== WRITING FILES ==========

// Write to a file (creates if doesn't exist, overwrites if it does)
fs.writeFileSync('output.txt', 'Hello, World!');
fs.writeFileSync('output.txt', 'New content', { flag: 'a' }); // Append mode

// Promise-based write
await fsPromises.writeFile('output.txt', 'Hello from async!');

// ========== FILE INFO ==========

const stats = fs.statSync('file.txt');
console.log('Size:', stats.size, 'bytes');
console.log('Is file:', stats.isFile());
console.log('Is directory:', stats.isDirectory());
console.log('Created:', stats.birthtime);
console.log('Modified:', stats.mtime);

// ========== DIRECTORIES ==========

// Create directory
fs.mkdirSync('new-folder');
fs.mkdirSync('a/b/c', { recursive: true }); // Create nested dirs

// Read directory contents
const files = fs.readdirSync('.');
console.log('Files in current dir:', files);

// Delete directory
fs.rmdirSync('new-folder');
fs.rmSync('folder', { recursive: true }); // Delete folder with contents

// ========== PATH MODULE ==========

const filePath = path.join(__dirname, 'data', 'file.txt');
console.log(filePath); // /Users/name/project/data/file.txt

const ext = path.extname('photo.jpg');  // .jpg
const name = path.basename('photo.jpg'); // photo.jpg
const nameOnly = path.basename('photo.jpg', '.jpg'); // photo`}
        />
      </section>

      {/* Event Loop & Async */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-green-400">4.</span> Event Loop & Async Patterns
        </h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-4">
            Node.js is <strong className="text-white">single-threaded</strong> but handles concurrency through the <strong className="text-green-300">Event Loop</strong>. Understanding this is crucial for writing efficient code.
          </p>
          <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-600">
            <p className="text-yellow-300 font-mono text-sm">
              Call Stack → Node APIs → Callback Queue → Event Loop → Call Stack
            </p>
          </div>
        </div>

        <CodeBlock
          language="javascript"
          title="async-patterns.js"
          code={`// ========== CALLBACKS (Old way) ==========
const fs = require('fs');

fs.readFile('file.txt', 'utf-8', (err, data) => {
  if (err) throw err;
  console.log('Callback:', data);
});

// ========== PROMISES ==========
function fetchData(url) {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      if (url) {
        resolve({ data: 'Success!', url });
      } else {
        reject(new Error('URL is required'));
      }
    }, 1000);
  });
}

// Using .then/.catch
fetchData('https://api.example.com')
  .then(result => console.log('Promise:', result))
  .catch(err => console.error('Error:', err));

// ========== ASYNC/AWAIT (Modern - Recommended) ==========
async function processData() {
  try {
    console.log('Start');

    // Sequential execution (one after another)
    const result1 = await fetchData('url1');
    console.log('Got result 1:', result1);

    const result2 = await fetchData('url2');
    console.log('Got result 2:', result2);

    // Parallel execution (all at once - faster!)
    const [r1, r2, r3] = await Promise.all([
      fetchData('url1'),
      fetchData('url2'),
      fetchData('url3'),
    ]);
    console.log('All done:', r1, r2, r3);

    // Promise.race - first one to resolve wins
    const fastest = await Promise.race([
      fetchData('fast-server'),
      fetchData('slow-server'),
    ]);
    console.log('Fastest:', fastest);

    // Promise.allSettled - wait for all, even if some fail
    const results = await Promise.allSettled([
      fetchData('url1'),
      fetchData(null), // This will reject
      fetchData('url3'),
    ]);
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log('Success:', result.value);
      } else {
        console.log('Failed:', result.reason);
      }
    });

    console.log('End');
  } catch (error) {
    console.error('Error in async function:', error);
  }
}

processData();

// ========== EVENT EMITTER ==========
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}
const emitter = new MyEmitter();

// Listen for events
emitter.on('data', (payload) => {
  console.log('Received:', payload);
});

emitter.on('error', (err) => {
  console.error('Error event:', err.message);
});

// Emit events
emitter.emit('data', { message: 'Hello!' });
emitter.emit('error', new Error('Something went wrong'));

// Once - listen only once
emitter.once('startup', () => {
  console.log('App started!');
});

emitter.emit('startup'); // Fires
emitter.emit('startup'); // Does NOT fire again`}
        />
      </section>

      {/* HTTP Server */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-green-400">5.</span> HTTP Module & Creating Servers
        </h2>

        <CodeBlock
          language="javascript"
          title="basic-server.js - Raw Node.js HTTP Server"
          code={`const http = require('http');

const PORT = process.env.PORT || 3000;

// Create server
const server = http.createServer((req, res) => {
  // Request object contains info about the incoming request
  console.log(\`\${req.method} \${req.url}\`);

  // Set response headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Route handling
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'Welcome to my API!' }));
  }
  else if (req.url === '/users' && req.method === 'GET') {
    const users = [
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: 'bob@example.com' },
    ];
    res.writeHead(200);
    res.end(JSON.stringify(users));
  }
  else if (req.url === '/users' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const newUser = JSON.parse(body);
      console.log('New user:', newUser);
      res.writeHead(201);
      res.end(JSON.stringify({ id: 3, ...newUser }));
    });
  }
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

// Start listening
server.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}\`);
});`}
        />
      </section>

      {/* Express.js */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-green-400">6.</span> Express.js Framework
        </h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300">
            <strong className="text-white">Express.js</strong> is the most popular Node.js web framework. It simplifies routing, middleware, and request/response handling.
          </p>
        </div>

        <CodeBlock
          language="javascript"
          title="server.js - Express.js Application"
          code={`const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// ========== MIDDLEWARE ==========
// Middleware functions run before route handlers
app.use(cors());                          // Enable CORS
app.use(express.json());                  // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse form data

// Custom middleware - logging
app.use((req, res, next) => {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
  next(); // Important: pass control to the next middleware
});

// Custom middleware - authentication
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  // Verify token logic here...
  req.user = { id: 1, name: 'John' }; // Attach user to request
  next();
};

// ========== ROUTES ==========

// Basic routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

// Route with parameters
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  // Fetch user from database...
  res.json({ id: userId, name: 'John Doe' });
});

// Route with query parameters
app.get('/search', (req, res) => {
  const { q, page = 1, limit = 10 } = req.query;
  console.log('Search query:', q, 'Page:', page);
  res.json({ results: [], query: q, page: Number(page) });
});

// POST - Create
app.post('/users', (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }

  // Create user (database operation would go here)
  const newUser = { id: Date.now(), name, email };
  res.status(201).json(newUser);
});

// PUT - Update
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  res.json({ id, ...updates, updated: true });
});

// DELETE - Remove
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id, deleted: true });
});

// Protected route (requires authentication)
app.get('/profile', authenticate, (req, res) => {
  res.json({ user: req.user });
});

// ========== ROUTER (Organize routes) ==========
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.json([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
});

userRouter.post('/', (req, res) => {
  res.status(201).json(req.body);
});

userRouter.get('/:id', (req, res) => {
  res.json({ id: req.params.id });
});

// Mount router
app.use('/api/users', userRouter);

// ========== ERROR HANDLING ==========

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// ========== START SERVER ==========
app.listen(PORT, () => {
  console.log(\`🚀 Server running at http://localhost:\${PORT}\`);
});

module.exports = app;`}
        />
      </section>

      {/* npm */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-green-400">7.</span> npm & Package Management
        </h2>

        <CodeBlock
          language="bash"
          title="Terminal - npm Commands"
          code={`# Initialize a new project
npm init -y
# Creates package.json with default values

# Install packages
npm install express          # Install and save as dependency
npm install -D nodemon       # Install as dev dependency
npm install -g typescript    # Install globally

# package.json scripts
# {
#   "scripts": {
#     "start": "node server.js",
#     "dev": "nodemon server.js",
#     "test": "jest",
#     "build": "tsc"
#   }
# }

npm start                    # Run "start" script
npm run dev                  # Run "dev" script
npm test                     # Run "test" script

# Remove packages
npm uninstall express

# Update packages
npm update                   # Update all packages
npm update express           # Update specific package

# Check for outdated packages
npm outdated

# List installed packages
npm list                     # All packages
npm list --depth=0           # Top-level only
npm list -g --depth=0        # Global packages

# Audit for vulnerabilities
npm audit
npm audit fix                # Auto-fix vulnerabilities`}
        />

        <CodeBlock
          language="json"
          title="package.json - Anatomy"
          code={`{
  "name": "my-api",
  "version": "1.0.0",
  "description": "My REST API",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest --watch"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.7.0"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "keywords": ["api", "express", "node"],
  "author": "Your Name",
  "license": "MIT"
}`}
        />
      </section>
    </div>
  );
};

export default NodeJS;
