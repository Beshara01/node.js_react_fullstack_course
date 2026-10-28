import React, { useState } from 'react';
import CodeBlock from './CodeBlock';

type Lesson = 'intro' | 'js-basics' | 'node-basics' | 'express' | 'database' | 'react-basics' | 'react-hooks' | 'react-routing' | 'fullstack-connect' | 'final-project';

const lessons: { id: Lesson; title: string; icon: string }[] = [
  { id: 'intro', title: 'Course Overview', icon: '📖' },
  { id: 'js-basics', title: 'JavaScript Essentials', icon: '📝' },
  { id: 'node-basics', title: 'Node.js Fundamentals', icon: '🟢' },
  { id: 'express', title: 'Express.js APIs', icon: '🚀' },
  { id: 'database', title: 'Database & Models', icon: '🗄️' },
  { id: 'react-basics', title: 'React Components', icon: '⚛️' },
  { id: 'react-hooks', title: 'React Hooks Deep Dive', icon: '🪝' },
  { id: 'react-routing', title: 'Routing & Navigation', icon: '🧭' },
  { id: 'fullstack-connect', title: 'Connecting Frontend + Backend', icon: '🔗' },
  { id: 'final-project', title: '🏆 Final Project: Fullstack Todo App', icon: '🎯' },
];

const Course: React.FC = () => {
  const [activeLesson, setActiveLesson] = useState<Lesson>('intro');

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">📚 Complete Course: Zero to Hero</h1>
        <p className="text-gray-400 text-lg">
          Learn everything step by step with examples. Build a full project at the end!
        </p>
      </div>

      {/* Lesson Navigation */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {lessons.map((lesson, index) => (
          <button
            key={lesson.id}
            onClick={() => setActiveLesson(lesson.id)}
            className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1 ${
              activeLesson === lesson.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <span>{lesson.icon}</span>
            <span className="hidden sm:inline">{index + 1}. {lesson.title}</span>
            <span className="sm:hidden">{index + 1}</span>
          </button>
        ))}
      </div>

      {/* Lesson Content */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 sm:p-8">
        {activeLesson === 'intro' && <IntroLesson />}
        {activeLesson === 'js-basics' && <JSBasicsLesson />}
        {activeLesson === 'node-basics' && <NodeBasicsLesson />}
        {activeLesson === 'express' && <ExpressLesson />}
        {activeLesson === 'database' && <DatabaseLesson />}
        {activeLesson === 'react-basics' && <ReactBasicsLesson />}
        {activeLesson === 'react-hooks' && <ReactHooksLesson />}
        {activeLesson === 'react-routing' && <ReactRoutingLesson />}
        {activeLesson === 'fullstack-connect' && <FullstackConnectLesson />}
        {activeLesson === 'final-project' && <FinalProjectLesson />}
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => {
            const idx = lessons.findIndex(l => l.id === activeLesson);
            if (idx > 0) {
              setActiveLesson(lessons[idx - 1].id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          disabled={lessons.findIndex(l => l.id === activeLesson) === 0}
          className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm"
        >
          ← Previous Lesson
        </button>
        <button
          onClick={() => {
            const idx = lessons.findIndex(l => l.id === activeLesson);
            if (idx < lessons.length - 1) {
              setActiveLesson(lessons[idx + 1].id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          disabled={lessons.findIndex(l => l.id === activeLesson) === lessons.length - 1}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm"
        >
          Next Lesson →
        </button>
      </div>
    </div>
  );
};

// ==================== LESSONS ====================

function IntroLesson() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">📖 Course Overview</h2>
      
      <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-6">
        <p className="text-blue-200">
          <strong>Welcome!</strong> This course takes you from absolute zero to building a complete fullstack web application. 
          Each lesson builds on the previous one. By the end, you'll build a real project!
        </p>
      </div>

      <h3 className="text-xl font-bold text-white mb-3">What You'll Learn:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {[
          'JavaScript fundamentals you need',
          'How Node.js works under the hood',
          'Building REST APIs with Express',
          'Database operations with MongoDB',
          'React components, state, and hooks',
          'Connecting frontend to backend',
          'Building a complete fullstack app',
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-gray-300 text-sm bg-gray-800/50 rounded-lg p-3">
            <span className="text-green-400">✓</span> {item}
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold text-white mb-3">How This Course Works:</h3>
      <div className="space-y-3">
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <p className="text-yellow-300 font-bold mb-1">🔹 Step 1: Concept</p>
          <p className="text-gray-300 text-sm">We explain what something is and why it matters.</p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <p className="text-yellow-300 font-bold mb-1">🔹 Step 2: Example</p>
          <p className="text-gray-300 text-sm">We show you code with line-by-line explanations.</p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <p className="text-yellow-300 font-bold mb-1">🔹 Step 3: Practice</p>
          <p className="text-gray-300 text-sm">You try it yourself (we give you the code to copy!).</p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <p className="text-yellow-300 font-bold mb-1">🔹 Step 4: Build</p>
          <p className="text-gray-300 text-sm">At the end, you build a complete project using everything!</p>
        </div>
      </div>

      <div className="mt-6 bg-green-900/20 border border-green-700/50 rounded-lg p-4">
        <p className="text-green-200 text-sm">
          <strong>💡 Tip:</strong> Don't rush! Take your time with each lesson. 
          Copy the code, run it, modify it, break it, fix it. That's how you learn!
        </p>
      </div>
    </div>
  );
}

function JSBasicsLesson() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">📝 JavaScript Essentials</h2>
      <p className="text-gray-400 mb-6">
        Before we build anything, you need to know JavaScript. Let's cover ONLY what you need for fullstack development.
      </p>

      {/* Part 1: Variables */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-yellow-300 mb-3">Part 1: Variables (Storing Data)</h3>
        <p className="text-gray-300 mb-3">
          Variables are like boxes that hold data. In modern JavaScript, we use <code className="bg-gray-700 px-2 py-0.5 rounded text-green-300">let</code> and <code className="bg-gray-700 px-2 py-0.5 rounded text-green-300">const</code>.
        </p>
        
        <CodeBlock
          title="variables.js"
          code={`// const = cannot be reassigned (use this by default)
const name = "John";
const age = 25;
const isStudent = true;

// let = can be reassigned (use when value changes)
let score = 0;
score = 10; // ✅ This works

// const name = "Jane"; // ❌ Error! Can't reassign const

// Why use const? It prevents accidental changes!
// Rule: Use const everywhere. Only use let if you need to change the value.

console.log(name);     // "John"
console.log(age);      // 25
console.log(isStudent); // true`}
        />

        <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-3 mt-3">
          <p className="text-blue-200 text-sm">
            <strong>💡 Key Point:</strong> Always use <code>const</code> unless you specifically need to change the value later.
          </p>
        </div>
      </div>

      {/* Part 2: Data Types */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-yellow-300 mb-3">Part 2: Data Types</h3>
        
        <CodeBlock
          title="data-types.js"
          code={`// String - text
const greeting = "Hello World";
const template = \`Hello, \${name}!\`; // Template literal (backticks)

// Number - integers and decimals
const price = 19.99;
const quantity = 5;

// Boolean - true or false
const isActive = true;
const isLoggedIn = false;

// Array - list of items
const fruits = ["apple", "banana", "cherry"];
console.log(fruits[0]); // "apple" (first item, index 0)
console.log(fruits.length); // 3

// Object - key-value pairs
const user = {
  name: "John",
  age: 25,
  email: "john@example.com",
  hobbies: ["coding", "gaming"]
};
console.log(user.name);    // "John"
console.log(user["email"]); // "john@example.com"

// null - intentionally empty
const data = null;

// undefined - not assigned yet
let result;
console.log(result); // undefined`}
        />
      </div>

      {/* Part 3: Functions */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-yellow-300 mb-3">Part 3: Functions (Reusable Code)</h3>
        <p className="text-gray-300 mb-3">
          Functions are blocks of code you can reuse. Think of them as recipes.
        </p>

        <CodeBlock
          title="functions.js"
          code={`// ========== FUNCTION DECLARATION ==========
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("Alice")); // "Hello, Alice!"
console.log(greet("Bob"));   // "Hello, Bob!"

// ========== ARROW FUNCTION (Modern - Use This!) ==========
const greetArrow = (name) => {
  return \`Hello, \${name}!\`;
};

// Short version (one line, implicit return)
const add = (a, b) => a + b;
const square = (x) => x * x;

console.log(add(5, 3));    // 8
console.log(square(4));    // 16

// ========== FUNCTIONS WITH OBJECTS ==========
const createUser = (name, email, age) => {
  return {
    name: name,
    email: email,
    age: age,
    createdAt: new Date(),
  };
};

const user = createUser("John", "john@test.com", 25);
console.log(user);
// { name: 'John', email: 'john@test.com', age: 25, createdAt: Date }

// ========== CALLBACK FUNCTIONS ==========
// A function passed as an argument to another function
const numbers = [1, 2, 3, 4, 5];

// .map() - transform each item
const doubled = numbers.map((num) => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// .filter() - keep items that pass a test
const evens = numbers.filter((num) => num % 2 === 0);
console.log(evens); // [2, 4]

// .find() - find first item that passes a test
const found = numbers.find((num) => num > 3);
console.log(found); // 4

// .forEach() - do something with each item
numbers.forEach((num) => {
  console.log(\`Number: \${num}\`);
});

// .reduce() - combine all items into one value
const sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum); // 15`}
        />

        <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-3 mt-3">
          <p className="text-green-200 text-sm">
            <strong>🎯 Remember:</strong> You'll use <code>map</code>, <code>filter</code>, and arrow functions ALL THE TIME in React!
          </p>
        </div>
      </div>

      {/* Part 4: Async */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-yellow-300 mb-3">Part 4: Async/Await (Handling Delays)</h3>
        <p className="text-gray-300 mb-3">
          When you fetch data from an API, it takes time. Async/await helps you handle this.
        </p>

        <CodeBlock
          title="async.js"
          code={`// ========== PROMISES (The Concept) ==========
// A promise is like a receipt for something that will arrive later

function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    // Simulate API call (takes 1 second)
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: "John" }); // Success!
      } else {
        reject(new Error("Invalid user ID")); // Failed!
      }
    }, 1000);
  });
}

// ========== ASYNC/AWAIT (The Easy Way) ==========
// async = this function does something that takes time
// await = wait for the result before continuing

async function getUser() {
  console.log("Fetching user...");
  
  try {
    // Wait for the data (pauses here until it arrives)
    const user = await fetchUserData(1);
    console.log("Got user:", user); // { id: 1, name: "John" }
    
    // You can use the data now!
    console.log("User name is:", user.name);
    
  } catch (error) {
    // If something goes wrong
    console.error("Error:", error.message);
  }
}

getUser();

// ========== REAL EXAMPLE: Fetching from API ==========
async function getPosts() {
  try {
    // fetch() returns a promise
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    
    // response.json() also returns a promise
    const posts = await response.json();
    
    console.log("Got", posts.length, "posts");
    console.log("First post:", posts[0]);
    
    return posts;
    
  } catch (error) {
    console.error("Failed to fetch:", error);
  }
}

// ========== MULTIPLE REQUESTS ==========
async function getAllData() {
  // ❌ SLOW: One after another (3 seconds total)
  const user = await fetchUserData(1);
  const posts = await getPosts();
  
  // ✅ FAST: All at once (1 second total)
  const [userData, postsData] = await Promise.all([
    fetchUserData(1),
    getPosts(),
  ]);
  
  console.log("Both done!", userData, postsData);
}`}
        />
      </div>

      {/* Part 5: Destructuring */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-yellow-300 mb-3">Part 5: Destructuring & Spread (Modern Syntax)</h3>

        <CodeBlock
          title="modern-js.js"
          code={`// ========== DESTRUCTURING (Extracting values) ==========

// From objects
const user = { name: "John", age: 25, email: "john@test.com" };
const { name, age, email } = user;
console.log(name);  // "John"
console.log(age);   // 25

// With renaming
const { name: userName, age: userAge } = user;
console.log(userName); // "John"

// With defaults
const { name: n, role = "user" } = user;
console.log(role); // "user" (not in object, uses default)

// From arrays
const colors = ["red", "green", "blue"];
const [first, second, third] = colors;
console.log(first);  // "red"
console.log(second); // "green"

// ========== SPREAD OPERATOR (Copying & merging) ==========

// Copy an array
const original = [1, 2, 3];
const copy = [...original];
console.log(copy); // [1, 2, 3]

// Add items to array
const withMore = [...original, 4, 5];
console.log(withMore); // [1, 2, 3, 4, 5]

// Copy an object
const person = { name: "John", age: 25 };
const personCopy = { ...person };

// Add/change properties
const updated = { ...person, age: 26, city: "NYC" };
console.log(updated); // { name: "John", age: 26, city: "NYC" }

// Merge objects
const defaults = { theme: "light", lang: "en" };
const userPrefs = { theme: "dark" };
const settings = { ...defaults, ...userPrefs };
console.log(settings); // { theme: "dark", lang: "en" }

// ========== IN REACT (You'll see this everywhere!) ==========
// Props destructuring
function UserCard({ name, age, role = "user" }) {
  return <div>{name} is {age} years old ({role})</div>;
}

// State update with spread
const [items, setItems] = useState([1, 2, 3]);

// Add item
setItems([...items, 4]);

// Remove item
setItems(items.filter(item => item !== 2));

// Update object in state
const [user, setUser] = useState({ name: "John", age: 25 });
setUser({ ...user, age: 26 }); // Only change age`}
        />
      </div>

      <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4 mt-6">
        <p className="text-purple-200">
          <strong>✅ You now know enough JavaScript!</strong> These concepts are used in EVERY part of fullstack development. 
          Move to the next lesson to see them in action with Node.js!
        </p>
      </div>
    </div>
  );
}

function NodeBasicsLesson() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">🟢 Node.js Fundamentals</h2>
      <p className="text-gray-400 mb-6">
        Node.js lets you run JavaScript on your computer (not just in the browser). This is how you build servers!
      </p>

      {/* Part 1: What is Node */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-yellow-300 mb-3">Part 1: What Can Node.js Do?</h3>
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 mb-4">
          <p className="text-gray-300 mb-2">In the browser, JavaScript can:</p>
          <ul className="text-gray-400 text-sm ml-4 space-y-1">
            <li>• Change HTML/CSS</li>
            <li>• Respond to clicks</li>
            <li>• Fetch data from APIs</li>
          </ul>
          <p className="text-gray-300 mt-3 mb-2">In Node.js, JavaScript can ALSO:</p>
          <ul className="text-gray-400 text-sm ml-4 space-y-1">
            <li>• Read/write files on your computer</li>
            <li>• Create a web server</li>
            <li>• Connect to databases</li>
            <li>• Access environment variables</li>
          </ul>
        </div>

        <CodeBlock
          title="first-node.js - Run with: node first-node.js"
          code={`// This runs on YOUR computer, not in a browser!

// Access system information
console.log("Node version:", process.version);
console.log("Your OS:", process.platform);
console.log("Current folder:", process.cwd());

// Environment variables (secret config)
// Set with: export MY_VAR="hello" (Mac/Linux)
//           set MY_VAR=hello (Windows)
console.log("Home folder:", process.env.HOME || process.env.USERPROFILE);

// Timer functions
console.log("Start");

setTimeout(() => {
  console.log("This runs after 2 seconds");
}, 2000);

setInterval(() => {
  console.log("This runs every 3 seconds");
}, 3000);

console.log("End (but timers keep running!)");`}
        />
      </div>

      {/* Part 2: Modules */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-yellow-300 mb-3">Part 2: Modules (Organizing Code)</h3>
        <p className="text-gray-300 mb-3">
          Modules let you split code into separate files. Each file is a module.
        </p>

        <CodeBlock
          title="utils.js - Creating a module"
          code={`// You can export functions, variables, anything!

// Export individual items
export function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export const API_URL = "https://api.example.com";

// Or export a default (one per file)
export default function logger(message) {
  console.log(\`[\${new Date().toISOString()}] \${message}\`);
}`}
        />

        <CodeBlock
          title="app.js - Using a module"
          code={`// Import from other files
import logger, { formatDate, generateId, API_URL } from './utils.js';

// Use the imported items
logger("App started!");
// [2024-01-15T10:30:00.000Z] App started!

const today = formatDate(new Date());
console.log("Today:", today); // "Today: 1/15/2024"

const id = generateId();
console.log("New ID:", id); // "New ID: x7k2m9p"

console.log("API:", API_URL);`}
        />

        <CodeBlock
          title="package.json - Project configuration"
          code={`{
  "name": "my-first-node-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node app.js",
    "dev": "node --watch app.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}

// "type": "module" enables ES module syntax (import/export)
// Run: npm install (installs dependencies)
// Run: npm start (runs the app)`}
        />
      </div>

      {/* Part 3: File System */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-yellow-300 mb-3">Part 3: Reading & Writing Files</h3>

        <CodeBlock
          title="file-operations.js"
          code={`import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';

// ========== READING FILES ==========

// Synchronous (simple but blocks)
const content = readFileSync('data.txt', 'utf-8');
console.log(content);

// Async (better for servers)
const asyncContent = await readFile('data.txt', 'utf-8');
console.log(asyncContent);

// ========== WRITING FILES ==========

// Create or overwrite a file
writeFileSync('output.txt', 'Hello, World!');

// Append to a file (add to the end)
writeFileSync('log.txt', 'New log entry\\n', { flag: 'a' });

// ========== WORKING WITH JSON ==========

// Save data to a JSON file
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

writeFileSync('users.json', JSON.stringify(users, null, 2));
// null, 2 = pretty print with 2 spaces

// Read data from a JSON file
const fileContent = readFileSync('users.json', 'utf-8');
const parsedUsers = JSON.parse(fileContent);
console.log(parsedUsers[0].name); // "Alice"

// ========== DIRECTORIES ==========

// Create a folder (if it doesn't exist)
if (!existsSync('uploads')) {
  mkdirSync('uploads');
  console.log('Created uploads folder');
}

// Create nested folders
mkdirSync('data/images/thumbnails', { recursive: true });`}
        />
      </div>

      {/* Part 4: Creating a simple server */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-yellow-300 mb-3">Part 4: Your First Server (No Framework)</h3>

        <CodeBlock
          title="simple-server.js"
          code={`import http from 'http';

const PORT = 3000;

// Create the server
const server = http.createServer((request, response) => {
  // This function runs EVERY time someone visits your server
  
  console.log(\`\${request.method} \${request.url}\`);
  
  // What URL did they visit?
  if (request.url === '/') {
    // Home page
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end('<h1>Welcome to my server!</h1>');
  }
  else if (request.url === '/api/data') {
    // API endpoint - return JSON
    const data = { message: 'Hello from API!', time: new Date() };
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(data));
  }
  else {
    // 404 - Not found
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Page not found');
  }
});

// Start listening for requests
server.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}\`);
});

// Run: node simple-server.js
// Open: http://localhost:3000 in your browser`}
        />

        <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-3 mt-3">
          <p className="text-green-200 text-sm">
            <strong>🎉 Congratulations!</strong> You just built a web server! But this is raw Node.js. 
            In the next lesson, we'll use Express.js which makes this MUCH easier.
          </p>
        </div>
      </div>
    </div>
  );
}

function ExpressLesson() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">🚀 Express.js - Building APIs</h2>
      <p className="text-gray-400 mb-6">
        Express is a framework that makes building servers easy. It handles routing, middleware, and request/response.
      </p>

      {/* Part 1: Setup */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-yellow-300 mb-3">Part 1: Setting Up Express</h3>

        <CodeBlock
          title="Terminal Commands"
          code={`# Create project folder
mkdir my-api
cd my-api

# Initialize Node.js project
npm init -y

# Install Express
npm install express

# Install nodemon (auto-restart on changes)
npm install -D nodemon

# Add to package.json scripts:
# "dev": "nodemon server.js"

# Start development server
npm run dev`}
        />

        <CodeBlock
          title="server.js - Basic Express App"
          code={`import express from 'express';

const app = express();
const PORT = 3000;

// Middleware - runs before every request
app.use(express.json()); // Parse JSON request bodies

// ========== ROUTES ==========

// GET - Read data
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my API!' });
});

// GET with parameter
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ id: userId, name: 'John Doe' });
});

// GET with query parameters
// Visit: /search?q=hello&page=2
app.get('/search', (req, res) => {
  const { q, page } = req.query;
  res.json({ query: q, page: page });
});

// POST - Create data
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  
  // In real app, save to database here
  const newUser = {
    id: Date.now(),
    name,
    email,
    createdAt: new Date()
  };
  
  res.status(201).json(newUser);
});

// PUT - Update data
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  res.json({ id, ...updates, updated: true });
});

// DELETE - Remove data
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  
  res.json({ id, deleted: true });
});

// ========== START SERVER ==========
app.listen(PORT, () => {
  console.log(\`🚀 Server running at http://localhost:\${PORT}\`);
});`}
        />
      </div>

      {/* Part 2: Complete CRUD API */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-yellow-300 mb-3">Part 2: Complete CRUD API (In-Memory Database)</h3>
        <p className="text-gray-300 mb-3">
          Let's build a complete API with all operations. We'll use an array as a "database" for now.
        </p>

        <CodeBlock
          title="todo-api.js - Complete Todo API"
          code={`import express from 'express';

const app = express();
app.use(express.json());

// "Database" (array in memory - resets on restart)
let todos = [
  { id: 1, text: 'Learn Node.js', completed: false },
  { id: 2, text: 'Build an API', completed: true },
];

// ========== GET ALL TODOS ==========
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// ========== GET SINGLE TODO ==========
app.get('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  res.json(todo);
});

// ========== CREATE TODO ==========
app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  
  // Validation
  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Text is required' });
  }
  
  const newTodo = {
    id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
    text: text.trim(),
    completed: false,
  };
  
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// ========== UPDATE TODO ==========
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { text, completed } = req.body;
  
  const index = todos.findIndex(t => t.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  // Update only provided fields
  if (text !== undefined) todos[index].text = text;
  if (completed !== undefined) todos[index].completed = completed;
  
  res.json(todos[index]);
});

// ========== DELETE TODO ==========
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  const deleted = todos.splice(index, 1)[0];
  res.json({ message: 'Todo deleted', todo: deleted });
});

// ========== ERROR HANDLING ==========
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`✅ Todo API running at http://localhost:\${PORT}\`);
  console.log(\`📝 Try: http://localhost:\${PORT}/api/todos\`);
});`}
        />

        <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-3 mt-3">
          <p className="text-blue-200 text-sm">
            <strong>🧪 Test it:</strong> Use Thunder Client (VS Code extension) or curl to test:
          </p>
          <div className="mt-2 bg-gray-900 rounded p-2 font-mono text-xs text-gray-300">
            <p>GET http://localhost:3000/api/todos</p>
            <p>POST http://localhost:3000/api/todos (body: {`{"text": "New todo"}`})</p>
            <p>PUT http://localhost:3000/api/todos/1 (body: {`{"completed": true}`})</p>
            <p>DELETE http://localhost:3000/api/todos/1</p>
          </div>
        </div>
      </div>

      {/* Part 3: Middleware */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-yellow-300 mb-3">Part 3: Middleware (Request Pipeline)</h3>
        <p className="text-gray-300 mb-3">
          Middleware functions run between receiving a request and sending a response. They can modify, block, or log requests.
        </p>

        <CodeBlock
          title="middleware.js"
          code={`import express from 'express';
const app = express();

// ========== MIDDLEWARE EXAMPLES ==========

// 1. Logger - logs every request
app.use((req, res, next) => {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
  next(); // IMPORTANT: Call next() to continue!
});

// 2. CORS - allow frontend to access API
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// 3. Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  // In real app: verify token with JWT
  // const decoded = jwt.verify(token, SECRET);
  // req.user = decoded;
  
  req.user = { id: 1, name: 'John' }; // Fake for demo
  next();
};

// Use auth middleware on specific routes
app.get('/api/profile', authenticate, (req, res) => {
  res.json({ user: req.user });
});

// 4. Error handling middleware (must have 4 parameters!)
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

app.listen(3000, () => console.log('Server running'));`}
        />
      </div>

      <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4 mt-6">
        <p className="text-purple-200">
          <strong>✅ You can now build APIs!</strong> Next: Let's add a real database so data persists!
        </p>
      </div>
    </div>
  );
}

function DatabaseLesson() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">🗄️ Database & Models</h2>
      <p className="text-gray-400 mb-6">
        Right now our data disappears when the server restarts. Let's fix that with MongoDB!
      </p>

      {/* Part 1: MongoDB Setup */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-yellow-300 mb-3">Part 1: Setting Up MongoDB</h3>

        <CodeBlock
          title="Terminal - MongoDB Setup"
          code={`# Option 1: MongoDB Atlas (Cloud - Recommended for beginners)
# 1. Go to https://www.mongodb.com/atlas
# 2. Create free account
# 3. Create a cluster (free tier)
# 4. Get connection string (looks like:)
# mongodb+srv://username:password@cluster.mongodb.net/mydb

# Option 2: Local MongoDB
# Download from: https://www.mongodb.com/try/download/community
# Install and start MongoDB service

# Install Mongoose (MongoDB ODM for Node.js)
npm install mongoose
npm install dotenv  # For environment variables`}
        />

        <CodeBlock
          title=".env - Environment Variables"
          code={`# NEVER commit this file to Git!
# Add .env to your .gitignore

PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp
NODE_ENV=development`}
        />
      </div>

      {/* Part 2: Mongoose Model */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-yellow-300 mb-3">Part 2: Creating a Model (Schema)</h3>
        <p className="text-gray-300 mb-3">
          A model defines the structure of your data. Think of it as a blueprint.
        </p>

        <CodeBlock
          title="models/Todo.js"
          code={`import mongoose from 'mongoose';

// Define the schema (structure)
const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Todo text is required'], // Validation
    trim: true,                                 // Remove whitespace
    maxlength: [200, 'Text cannot exceed 200 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model (for later)
  },
}, {
  timestamps: true, // Automatically adds createdAt & updatedAt
});

// Create the model
const Todo = mongoose.model('Todo', todoSchema);

export default Todo;

// ========== WHAT THIS GIVES YOU ==========
// Todo.find()              - Get all todos
// Todo.findById(id)        - Get one todo by ID
// Todo.create({text: "..."}) - Create a new todo
// Todo.findByIdAndUpdate(id, updates) - Update a todo
// Todo.findByIdAndDelete(id) - Delete a todo
// Todo.countDocuments()    - Count all todos`}
        />
      </div>

      {/* Part 3: Database Connection */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-yellow-300 mb-3">Part 3: Connecting to Database</h3>

        <CodeBlock
          title="config/database.js"
          code={`import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(\`✅ MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error(\`❌ Error: \${error.message}\`);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;`}
        />

        <CodeBlock
          title="server.js - Complete Server with Database"
          code={`import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import Todo from './models/Todo.js';

dotenv.config(); // Load .env variables

const app = express();
app.use(express.json());

// ========== ROUTES ==========

// GET all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single todo
app.get('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create todo
app.post('/api/todos', async (req, res) => {
  try {
    const todo = await Todo.create({
      text: req.body.text,
      completed: false,
    });
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
      { new: true, runValidators: true } // Return updated doc, run validation
    );
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json({ message: 'Todo deleted', todo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== START ==========
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(\`🚀 Server running on port \${PORT}\`);
  });
});`}
        />
      </div>

      {/* Part 4: User Model */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-yellow-300 mb-3">Part 4: User Model (for Authentication)</h3>

        <CodeBlock
          title="models/User.js"
          code={`import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/, 'Invalid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false, // Don't return password in queries
  },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;`}
        />
      </div>

      <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4 mt-6">
        <p className="text-green-200">
          <strong>✅ Backend is ready!</strong> We have Express + MongoDB + Models. 
          Next: Let's build the React frontend to connect to this API!
        </p>
      </div>
    </div>
  );
}

function ReactBasicsLesson() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">⚛️ React Components</h2>
      <p className="text-gray-400 mb-6">
        React lets you build UIs with components - reusable pieces of HTML + JavaScript.
      </p>

      {/* Part 1: Your First Component */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-yellow-300 mb-3">Part 1: Your First Component</h3>

        <CodeBlock
          title="Terminal - Create React App"
          code={`# Create a new React project with Vite
npm create vite@latest my-todo-app
# Select: React → JavaScript

cd my-todo-app
npm install
npm run dev
# Opens at http://localhost:5173`}
        />

        <CodeBlock
          title="App.jsx - Basic Component"
          code={`// A component is just a function that returns JSX
// JSX looks like HTML but it's JavaScript!

function App() {
  return (
    <div>
      <h1>My Todo App</h1>
      <p>Welcome to React!</p>
    </div>
  );
}

export default App;

// ========== RULES OF JSX ==========
// 1. Must return ONE parent element (use <div> or <></>)
// 2. Use className instead of class
// 3. Use {} for JavaScript expressions
// 4. All tags must close (including <img />, <br />, <input />)

function Example() {
  const name = "John";
  const items = ['Apple', 'Banana', 'Cherry'];
  
  return (
    <div>
      {/* JavaScript inside curly braces */}
      <h1>Hello, {name}!</h1>
      <p>2 + 2 = {2 + 2}</p>
      
      {/* className instead of class */}
      <div className="container">
        
        {/* Loop with .map() - MUST have key prop */}
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        
        {/* Conditional rendering */}
        {items.length > 0 ? (
          <p>You have {items.length} items</p>
        ) : (
          <p>No items</p>
        )}
        
        {/* Short-circuit (show only if true) */}
        {items.length > 0 && <p>Has items!</p>}
      </div>
    </div>
  );
}`}
        />
      </div>

      {/* Part 2: Props */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-yellow-300 mb-3">Part 2: Props (Passing Data to Components)</h3>

        <CodeBlock
          title="Props.jsx"
          code={`// Props = data passed FROM parent TO child
// Like function arguments!

// Child component receives props
function TodoItem({ text, completed, onDelete }) {
  return (
    <div className={completed ? 'completed' : ''}>
      <span>{text}</span>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

// Parent component passes props
function App() {
  const handleDelete = (id) => {
    console.log('Delete todo:', id);
  };

  return (
    <div>
      <h1>My Todos</h1>
      
      {/* Passing props to child */}
      <TodoItem 
        text="Learn React" 
        completed={false}
        onDelete={() => handleDelete(1)}
      />
      
      <TodoItem 
        text="Build a project" 
        completed={true}
        onDelete={() => handleDelete(2)}
      />
    </div>
  );
}

// ========== DEFAULT PROPS ==========
function Button({ text = "Click me", color = "blue" }) {
  return <button style={{ color }}>{text}</button>;
}

// Usage
<Button />                          // Uses defaults
<Button text="Submit" color="red" /> // Overrides defaults`}
        />
      </div>

      {/* Part 3: State */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-yellow-300 mb-3">Part 3: State (Data That Changes)</h3>
        <p className="text-gray-300 mb-3">
          State is data that can change over time. When state changes, the component re-renders.
        </p>

        <CodeBlock
          title="State.jsx"
          code={`import { useState } from 'react';

function Counter() {
  // useState returns [currentValue, functionToUpdateIt]
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// ========== TODO LIST WITH STATE ==========
function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: true },
  ]);
  const [input, setInput] = useState('');

  // Add a new todo
  const addTodo = () => {
    if (input.trim() === '') return;
    
    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    
    // IMPORTANT: Create new array (don't mutate!)
    setTodos([...todos, newTodo]);
    setInput(''); // Clear input
  };

  // Toggle completed
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo App</h1>
      
      {/* Input */}
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      
      {/* Todo List */}
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ 
            textDecoration: todo.completed ? 'line-through' : 'none' 
          }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>×</button>
          </li>
        ))}
      </ul>
      
      {/* Stats */}
      <p>
        {todos.filter(t => !t.completed).length} remaining
      </p>
    </div>
  );
}`}
        />
      </div>

      {/* Part 4: Handling Events */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-yellow-300 mb-3">Part 4: Handling Events</h3>

        <CodeBlock
          title="Events.jsx"
          code={`function EventExamples() {
  const [text, setText] = useState('');
  const [selected, setSelected] = useState('');

  // Click event
  const handleClick = () => {
    alert('Button clicked!');
  };

  // Change event (input)
  const handleChange = (event) => {
    setText(event.target.value);
  };

  // Submit event (form)
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload!
    console.log('Form submitted:', text);
  };

  // Pass arguments to handlers
  const handleDelete = (id) => {
    console.log('Delete item:', id);
  };

  return (
    <div>
      {/* onClick */}
      <button onClick={handleClick}>Click Me</button>
      
      {/* Inline handler */}
      <button onClick={() => alert('Hello!')}>Inline</button>
      
      {/* onChange (input) */}
      <input 
        value={text} 
        onChange={handleChange}
        placeholder="Type something..."
      />
      <p>You typed: {text}</p>
      
      {/* onSubmit (form) */}
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
      
      {/* Passing arguments */}
      <button onClick={() => handleDelete(123)}>
        Delete Item 123
      </button>
      
      {/* Select dropdown */}
      <select 
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="">Choose...</option>
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="angular">Angular</option>
      </select>
    </div>
  );
}`}
        />
      </div>

      <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4 mt-6">
        <p className="text-green-200">
          <strong>✅ You know React basics!</strong> Components, Props, State, Events. 
          Next: Let's learn Hooks for more advanced features!
        </p>
      </div>
    </div>
  );
}

function ReactHooksLesson() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">🪝 React Hooks Deep Dive</h2>
      <p className="text-gray-400 mb-6">
        Hooks let you "hook into" React features. You already know useState. Let's learn the rest!
      </p>

      {/* useEffect */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-yellow-300 mb-3">Part 1: useEffect (Side Effects)</h3>
        <p className="text-gray-300 mb-3">
          useEffect runs code AFTER the component renders. Use it for API calls, subscriptions, timers.
        </p>

        <CodeBlock
          title="useEffect.jsx"
          code={`import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect syntax: useEffect(function, dependencyArray)
  useEffect(() => {
    // This runs AFTER the component renders
    console.log('Component rendered!');
    
    // Fetch data from API
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const json = await response.json();
        setData(json.slice(0, 10)); // Get first 10
      } catch (error) {
        console.error('Failed to fetch:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
    
    // Cleanup function (optional) - runs when component unmounts
    return () => {
      console.log('Component unmounting - cleanup!');
    };
  }, []); // Empty array = run ONCE on mount

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}

// ========== DEPENDENCY ARRAY ==========
function Example({ userId }) {
  const [user, setUser] = useState(null);

  // Runs when userId changes
  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(\`/api/users/\${userId}\`);
      const data = await response.json();
      setUser(data);
    }
    
    fetchUser();
  }, [userId]); // Re-runs when userId changes!

  // ⚠️ NO dependency array = runs on EVERY render (usually bad!)
  useEffect(() => {
    console.log('This runs after EVERY render');
  });

  return user ? <p>{user.name}</p> : <p>Loading...</p>;
}

// ========== TIMER EXAMPLE ==========
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Set up interval
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Cleanup: clear interval when component unmounts
    return () => clearInterval(interval);
  }, []); // Empty = run once

  return <p>Seconds: {seconds}</p>;
}`}
        />
      </div>

      {/* useContext */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-yellow-300 mb-3">Part 2: useContext (Global State)</h3>
        <p className="text-gray-300 mb-3">
          Context lets you share data across many components without passing props manually.
        </p>

        <CodeBlock
          title="Context.jsx"
          code={`import { createContext, useContext, useState } from 'react';

// Step 1: Create context
const ThemeContext = createContext();

// Step 2: Create a provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Step 3: Use context in any child component
function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <header style={{ 
      background: theme === 'light' ? '#fff' : '#333',
      color: theme === 'light' ? '#000' : '#fff'
    }}>
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        Toggle Theme (Current: {theme})
      </button>
    </header>
  );
}

function Content() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div style={{ 
      background: theme === 'light' ? '#f0f0f0' : '#222',
      color: theme === 'light' ? '#000' : '#fff'
    }}>
      <p>Content with {theme} theme</p>
    </div>
  );
}

// Step 4: Wrap your app with the provider
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Content />
    </ThemeProvider>
  );
}`}
        />
      </div>

      {/* Custom Hooks */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-yellow-300 mb-3">Part 3: Custom Hooks (Reusable Logic)</h3>

        <CodeBlock
          title="hooks/useLocalStorage.js"
          code={`import { useState, useEffect } from 'react';

// Custom hook - must start with "use"
function useLocalStorage(key, initialValue) {
  // Get initial value from localStorage or use default
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  // Update localStorage when value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;

// ========== USAGE ==========
function App() {
  const [name, setName] = useLocalStorage('userName', 'Guest');
  const [todos, setTodos] = useLocalStorage('todos', []);
  
  // Now these persist even after page refresh!
  
  return (
    <div>
      <input 
        value={name} 
        onChange={e => setName(e.target.value)}
      />
      <p>Hello, {name}!</p>
    </div>
  );
}`}
        />

        <CodeBlock
          title="hooks/useFetch.js - Reusable API Hook"
          code={`import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url, {
          signal: controller.signal,
        });
        
        if (!response.ok) {
          throw new Error(\`HTTP \${response.status}\`);
        }
        
        const json = await response.json();
        setData(json);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;

// ========== USAGE ==========
function UserList() {
  const { data: users, loading, error } = useFetch('/api/users');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`}
        />
      </div>

      <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4 mt-6">
        <p className="text-green-200">
          <strong>✅ Hooks mastered!</strong> You now know useState, useEffect, useContext, and custom hooks. 
          Next: Let's add routing to navigate between pages!
        </p>
      </div>
    </div>
  );
}

function ReactRoutingLesson() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">🧭 Routing & Navigation</h2>
      <p className="text-gray-400 mb-6">
        React Router lets you create multiple "pages" in your single-page app.
      </p>

      <CodeBlock
          title="Terminal - Install React Router"
          code={`npm install react-router-dom`}
        />

      <CodeBlock
        title="App.jsx - Setting Up Routes"
        code={`import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import TodoList from './pages/TodoList';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* Navigation */}
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <NavLink 
            to="/todos"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Todos
          </NavLink>
        </nav>

        {/* Routes - which component for which URL */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/todos" element={<TodoList />} />
          <Route path="/todos/:id" element={<TodoDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}`}
      />

      <CodeBlock
        title="pages/TodoList.jsx - Using Router"
        code={`import { useNavigate, useParams, useLocation } from 'react-router-dom';

function TodoList() {
  const navigate = useNavigate();
  const location = useLocation();
  
  console.log('Current path:', location.pathname);

  const goToDetail = (id) => {
    navigate(\`/todos/\${id}\`); // Navigate to detail page
  };

  const goBack = () => {
    navigate(-1); // Go back
  };

  return (
    <div>
      <h1>Todos</h1>
      <button onClick={() => navigate('/')}>Go Home</button>
      <button onClick={goBack}>Go Back</button>
      
      <ul>
        <li onClick={() => goToDetail(1)}>Todo 1</li>
        <li onClick={() => goToDetail(2)}>Todo 2</li>
      </ul>
    </div>
  );
}

function TodoDetail() {
  const { id } = useParams(); // Get URL parameter
  
  return <h1>Todo #{id}</h1>;
}`}
      />

      <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4 mt-6">
        <p className="text-green-200">
          <strong>✅ Routing done!</strong> Now let's connect frontend to backend!
        </p>
      </div>
    </div>
  );
}

function FullstackConnectLesson() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">🔗 Connecting Frontend + Backend</h2>
      <p className="text-gray-400 mb-6">
        Let's make React talk to our Express API!
      </p>

      <CodeBlock
        title="services/api.js - API Service"
        code={`const API_URL = 'http://localhost:3000/api';

// Generic fetch function
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
  getAll: () => apiRequest('/todos'),
  
  getById: (id) => apiRequest(\`/todos/\${id}\`),
  
  create: (text) => apiRequest('/todos', {
    method: 'POST',
    body: JSON.stringify({ text }),
  }),
  
  update: (id, updates) => apiRequest(\`/todos/\${id}\`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  }),
  
  delete: (id) => apiRequest(\`/todos/\${id}\`, {
    method: 'DELETE',
  }),
};`}
      />

      <CodeBlock
        title="components/TodoApp.jsx - Full Integration"
        code={`import { useState, useEffect } from 'react';
import { todoAPI } from '../services/api';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos on mount
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await todoAPI.getAll();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (!input.trim()) return;
    
    try {
      const newTodo = await todoAPI.create(input);
      setTodos([newTodo, ...todos]);
      setInput('');
    } catch (err) {
      alert('Failed to add todo: ' + err.message);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const updated = await todoAPI.update(id, { completed: !completed });
      setTodos(todos.map(t => t.id === id ? updated : t));
    } catch (err) {
      alert('Failed to update: ' + err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todoAPI.delete(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>My Todos</h1>
      
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="What needs to be done?"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id, todo.completed)}
            />
            <span style={{
              textDecoration: todo.completed ? 'line-through' : 'none'
            }}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <p>{todos.filter(t => !t.completed).length} todos remaining</p>
    </div>
  );
}`}
      />

      <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4 mt-6">
        <p className="text-green-200">
          <strong>✅ Fullstack connected!</strong> React ↔ Express ↔ MongoDB. 
          Now let's build the FINAL PROJECT!
        </p>
      </div>
    </div>
  );
}

function FinalProjectLesson() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">🎯 Final Project: Fullstack Todo App</h2>
      <p className="text-gray-400 mb-6">
        Let's build a complete Todo application from scratch! We'll create both backend and frontend.
      </p>

      <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 mb-6">
        <p className="text-yellow-200">
          <strong>🎯 Project Goal:</strong> Build a Todo app where users can create, read, update, and delete todos. 
          Data persists in MongoDB. Clean UI with React.
        </p>
      </div>

      {/* Step 1: Project Structure */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-yellow-300 mb-3">Step 1: Project Structure</h3>
        
        <CodeBlock
          title="Project Structure"
          code={`todo-app/
├── server/
│   ├── models/
│   │   └── Todo.js
│   ├── config/
│   │   └── database.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoForm.jsx
│   │   │   ├── TodoItem.jsx
│   │   │   └── TodoList.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
└── README.md`}
        />
      </div>

      {/* Step 2: Backend */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-yellow-300 mb-3">Step 2: Backend (Express + MongoDB)</h3>

        <CodeBlock
          title="server/package.json"
          code={`{
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
}`}
        />

        <CodeBlock
          title="server/.env"
          code={`PORT=5000
MONGODB_URI=mongodb://localhost:27017/todoapp`}
        />

        <CodeBlock
          title="server/config/database.js"
          code={`import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB error:', error.message);
    process.exit(1);
  }
};

export default connectDB;`}
        />

        <CodeBlock
          title="server/models/Todo.js"
          code={`import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Text is required'],
    trim: true,
    maxlength: 200,
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model('Todo', todoSchema);`}
        />

        <CodeBlock
          title="server/server.js"
          code={`import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import Todo from './models/Todo.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ========== ROUTES ==========

// Get all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create todo
app.post('/api/todos', async (req, res) => {
  try {
    const todo = await Todo.create({ text: req.body.text });
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update todo
app.put('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!todo) return res.status(404).json({ error: 'Not found' });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(\`🚀 Server running on http://localhost:\${PORT}\`);
  });
});`}
        />
      </div>

      {/* Step 3: Frontend */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-yellow-300 mb-3">Step 3: Frontend (React)</h3>

        <CodeBlock
          title="client/src/services/api.js"
          code={`const API_URL = 'http://localhost:5000/api';

export const todoAPI = {
  getAll: async () => {
    const res = await fetch(\`\${API_URL}/todos\`);
    return res.json();
  },

  create: async (text) => {
    const res = await fetch(\`\${API_URL}/todos\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    return res.json();
  },

  update: async (id, updates) => {
    const res = await fetch(\`\${API_URL}/todos/\${id}\`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(\`\${API_URL}/todos/\${id}\`, {
      method: 'DELETE',
    });
    return res.json();
  },
};`}
        />

        <CodeBlock
          title="client/src/components/TodoForm.jsx"
          code={`import { useState } from 'react';

function TodoForm({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
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

export default TodoForm;`}
        />

        <CodeBlock
          title="client/src/components/TodoItem.jsx"
          code={`function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={\`todo-item \${todo.completed ? 'completed' : ''}\`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo._id, todo.completed)}
      />
      <span className="todo-text">{todo.text}</span>
      <button className="delete-btn" onClick={() => onDelete(todo._id)}>
        ✕
      </button>
    </li>
  );
}

export default TodoItem;`}
        />

        <CodeBlock
          title="client/src/App.jsx"
          code={`import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { todoAPI } from './services/api';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load todos on mount
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
    try {
      const newTodo = await todoAPI.create(text);
      setTodos([newTodo, ...todos]);
    } catch (error) {
      console.error('Failed to add:', error);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const updated = await todoAPI.update(id, { completed: !completed });
      setTodos(todos.map(t => t._id === id ? updated : t));
    } catch (error) {
      console.error('Failed to update:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todoAPI.delete(id);
      setTodos(todos.filter(t => t._id !== id));
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

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

      {todos.length === 0 && (
        <p className="empty">No todos yet. Add one above!</p>
      )}

      <div className="stats">
        <span>{todos.filter(t => !t.completed).length} remaining</span>
        <span>{todos.filter(t => t.completed).length} completed</span>
      </div>
    </div>
  );
}

export default App;`}
        />

        <CodeBlock
          title="client/src/App.css"
          code={`* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
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
  transition: border-color 0.2s;
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
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
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
  transition: background 0.2s;
}

.todo-item:hover {
  background: #f9f9f9;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #999;
}

.todo-text {
  flex: 1;
  color: #333;
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

.empty {
  text-align: center;
  color: #999;
  padding: 2rem;
}

.stats {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
  color: #666;
  font-size: 0.9rem;
}

.loading {
  text-align: center;
  color: white;
  font-size: 1.5rem;
}`}
        />
      </div>

      {/* Step 4: Run */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-yellow-300 mb-3">Step 4: Run the App!</h3>

        <CodeBlock
          title="Terminal - Start Both Servers"
          code={`# Terminal 1: Start Backend
cd server
npm install
npm run dev
# Server running at http://localhost:5000

# Terminal 2: Start Frontend
cd client
npm install
npm run dev
# App running at http://localhost:5173

# Open http://localhost:5173 in your browser
# 🎉 Your fullstack app is live!`}
        />
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-700/50 rounded-lg p-6 mt-8">
        <h3 className="text-2xl font-bold text-white mb-4">🎉 Congratulations!</h3>
        <p className="text-gray-300 mb-4">
          You've built a complete fullstack application! Here's what you learned:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            '✅ JavaScript fundamentals',
            '✅ Node.js & Express server',
            '✅ MongoDB database',
            '✅ REST API design',
            '✅ React components & state',
            '✅ React hooks (useState, useEffect)',
            '✅ Connecting frontend to backend',
            '✅ Full CRUD operations',
          ].map((item, i) => (
            <div key={i} className="text-green-300 text-sm">{item}</div>
          ))}
        </div>
        <p className="text-gray-400 mt-4 text-sm">
          <strong>Next Steps:</strong> Add user authentication, deploy to the cloud, add more features!
        </p>
      </div>
    </div>
  );
}

export default Course;
