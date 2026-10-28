import React from 'react';
import CodeBlock from './CodeBlock';

const ReactLessons: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-4">⚛️ Phase 5: React Frontend</h1>
      <p className="text-gray-400 text-lg mb-8">
        React is a JavaScript library for building user interfaces. Learn to create dynamic, component-based UIs.
      </p>

      {/* What is React */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-blue-400">1.</span> What is React?
        </h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-4">
            <strong className="text-white">React</strong> is a JavaScript library created by Facebook (Meta) for building user interfaces. Key concepts:
          </p>
          <ul className="text-gray-300 space-y-2 ml-4">
            <li>• <strong className="text-blue-300">Component-Based</strong> — Build encapsulated components that manage their own state</li>
            <li>• <strong className="text-blue-300">Declarative</strong> — Describe what the UI should look like, React handles updates</li>
            <li>• <strong className="text-blue-300">Virtual DOM</strong> — Efficiently updates only what changed in the real DOM</li>
            <li>• <strong className="text-blue-300">Unidirectional Data Flow</strong> — Data flows down from parent to child via props</li>
            <li>• <strong className="text-blue-300">JSX</strong> — Write HTML-like syntax in JavaScript</li>
          </ul>
        </div>

        <CodeBlock
          language="jsx"
          title="App.jsx - Your First React Component"
          code={`// Every React app starts with components
// A component is a function that returns JSX (HTML-like syntax)

import React from 'react';

// Functional Component (modern approach)
function Welcome({ name }) {
  // JSX - looks like HTML but it's JavaScript
  return (
    <div className="welcome">
      <h1>Hello, {name}!</h1>
      <p>Welcome to React.</p>
    </div>
  );
}

// Arrow function component (also common)
const Greeting = ({ message, emoji = "👋" }) => {
  return (
    <div>
      <span>{emoji}</span>
      <p>{message}</p>
    </div>
  );
};

// Main App component
function App() {
  return (
    <div>
      <Welcome name="Developer" />
      <Greeting message="Let's learn React!" emoji="🚀" />
      <Greeting message="Components are reusable!" />
    </div>
  );
}

export default App;`}
        />
      </section>

      {/* JSX */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-blue-400">2.</span> JSX Deep Dive
        </h2>

        <CodeBlock
          language="jsx"
          title="JSX-Rules.jsx"
          code={`function JSXRules() {
  const name = "React Developer";
  const isLoggedIn = true;
  const items = ['Apple', 'Banana', 'Cherry'];
  const styles = {
    color: 'blue',
    fontSize: '18px',
    backgroundColor: '#f0f0f0',
    padding: '10px',
    borderRadius: '8px'
  };

  return (
    <div>
      {/* JSX Comments use curly braces + curly braces */}

      {/* 1. Expressions in curly braces */}
      <p>Hello, {name}!</p>
      <p>2 + 2 = {2 + 2}</p>
      <p>Today is {new Date().toLocaleDateString()}</p>

      {/* 2. className instead of class (class is reserved in JS) */}
      <div className="container active">Content</div>

      {/* 3. Inline styles use objects (camelCase properties) */}
      <div style={styles}>Styled div</div>
      <div style={{ color: 'red', fontWeight: 'bold' }}>Red text</div>

      {/* 4. htmlFor instead of for */}
      <label htmlFor="name">Name:</label>
      <input id="name" type="text" />

      {/* 5. Self-closing tags must close */}
      <img src="photo.jpg" alt="A photo" />
      <br />
      <input type="text" />

      {/* 6. Conditional rendering */}
      {isLoggedIn ? (
        <p>Welcome back!</p>
      ) : (
        <p>Please log in.</p>
      )}

      {/* Short-circuit evaluation */}
      {isLoggedIn && <p>You are logged in!</p>}

      {/* 7. Lists with .map() - always use unique keys */}
      <ul>
        {items.map((item, index) => (
          <li key={item}>{item}</li>
          {/* key helps React identify which items changed */}
        ))}
      </ul>

      {/* 8. Fragments - group without extra DOM node */}
      <>
        <h3>Title</h3>
        <p>Subtitle</p>
      </>
      {/* Or: <React.Fragment>...</React.Fragment> */}

      {/* 9. Boolean attributes */}
      <input disabled={true} />
      <input disabled /> {/* Same as above */}
      <input disabled={false} /> {/* Attribute removed */}

      {/* 10. dangerouslySetInnerHTML (use sparingly!) */}
      <div dangerouslySetInnerHTML={{ __html: '<b>Bold</b>' }} />
    </div>
  );
}`}
        />
      </section>

      {/* State & Props */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-blue-400">3.</span> State & Props
        </h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-2">
            <strong className="text-blue-300">Props</strong> = Data passed FROM parent TO child (read-only)
          </p>
          <p className="text-gray-300">
            <strong className="text-blue-300">State</strong> = Data managed WITHIN a component (can change)
          </p>
        </div>

        <CodeBlock
          language="jsx"
          title="StateAndProps.jsx"
          code={`import React, { useState } from 'react';

// ========== PROPS ==========
// Props are read-only data passed from parent to child
function UserCard({ name, age, role = 'User', avatar }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>Role: {role}</p> {/* Default value if not provided */}
    </div>
  );
}

// ========== STATE ==========
// State is mutable data managed within a component
function Counter() {
  // useState returns [currentValue, setterFunction]
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [items, setItems] = useState([]);

  // Update state
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  // Update state based on previous state (important for accuracy)
  const incrementBy2 = () => setCount(prev => prev + 2);

  // Update objects in state
  const [user, setUser] = useState({ name: '', email: '', age: 0 });

  const updateName = (newName) => {
    // Must spread existing state, then override
    setUser(prev => ({ ...prev, name: newName }));
  };

  const updateMultiple = () => {
    setUser(prev => ({
      ...prev,
      name: 'John',
      email: 'john@example.com'
    }));
  };

  // Update arrays in state
  const addItem = (item) => {
    setItems(prev => [...prev, item]); // Add to end
  };

  const removeItem = (index) => {
    setItems(prev => prev.filter((_, i) => i !== index)); // Remove by index
  };

  const updateItem = (index, newItem) => {
    setItems(prev => prev.map((item, i) =>
      i === index ? newItem : item
    ));
  };

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
      <button onClick={incrementBy2}>+2</button>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <p>Hello, {name}!</p>
    </div>
  );
}

// ========== COMBINING PROPS & STATE ==========
function App() {
  const [theme, setTheme] = useState('light');

  return (
    <div className={theme}>
      <button onClick={() => setTheme(
        theme === 'light' ? 'dark' : 'light'
      )}>
        Toggle Theme
      </button>

      <UserCard
        name="Alice"
        age={28}
        role="Admin"
        avatar="/alice.jpg"
      />

      <UserCard
        name="Bob"
        age={32}
        avatar="/bob.jpg"
      /> {/* role defaults to 'User' */}

      <Counter />
    </div>
  );
}`}
        />
      </section>

      {/* Hooks */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-blue-400">4.</span> React Hooks
        </h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300">
            Hooks let you use state and other React features in function components. They start with <code className="bg-gray-700 px-2 py-0.5 rounded text-blue-300">use</code>.
          </p>
        </div>

        <CodeBlock
          language="jsx"
          title="Hooks.jsx - All Essential Hooks"
          code={`import React, {
  useState,      // Manage local state
  useEffect,     // Side effects (API calls, subscriptions)
  useContext,    // Access context values
  useRef,        // Reference DOM elements / persist values
  useMemo,       // Memoize expensive calculations
  useCallback,   // Memoize functions
  useReducer,    // Complex state logic
} from 'react';

// ========== useState ==========
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// ========== useEffect ==========
function DataFetcher({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Runs after every render
  useEffect(() => {
    console.log('Component rendered!');
  });

  // Runs only once (on mount)
  useEffect(() => {
    console.log('Component mounted!');

    // Cleanup function (runs on unmount)
    return () => {
      console.log('Component will unmount!');
    };
  }, []); // Empty array = run once

  // Runs when userId changes
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error('Failed to fetch:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Cleanup: cancel request if component unmounts
    return () => {
      // AbortController logic here
    };
  }, [userId]); // Re-run when userId changes

  if (loading) return <p>Loading...</p>;
  return <div>{JSON.stringify(data)}</div>;
}

// ========== useContext ==========
// 1. Create context
const ThemeContext = React.createContext('light');

// 2. Provide context value
function App() {
  const [theme, setTheme] = useState('dark');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// 3. Consume context
function Toolbar() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className={theme}>
      <button onClick={() => setTheme(
        theme === 'light' ? 'dark' : 'light'
      )}>
        Toggle Theme (Current: {theme})
      </button>
    </div>
  );
}

// ========== useRef ==========
function TextInput() {
  const inputRef = useRef(null);
  const renderCount = useRef(0);

  // Access DOM element
  const focusInput = () => {
    inputRef.current.focus();
  };

  // Persist value across renders (doesn't trigger re-render)
  renderCount.current += 1;

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
      <p>Rendered {renderCount.current} times</p>
    </div>
  );
}

// ========== useMemo ==========
function ExpensiveList({ items, filter }) {
  // Only recalculates when items or filter changes
  const filteredItems = useMemo(() => {
    console.log('Filtering items...'); // Only logs when deps change
    return items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);

  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// ========== useCallback ==========
function Parent() {
  const [count, setCount] = useState(0);

  // Memoized function - only recreated when deps change
  const handleClick = useCallback(() => {
    console.log('Count is:', count);
  }, [count]);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <Child onClick={handleClick} />
    </div>
  );
}

// ========== useReducer ==========
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    case 'set':
      return { count: action.payload };
    default:
      throw new Error('Unknown action');
  }
}

function CounterReducer() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'set', payload: 100 })}>
        Set to 100
      </button>
    </div>
  );
}`}
        />
      </section>

      {/* React Router */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-blue-400">5.</span> React Router
        </h2>

        <CodeBlock
          language="jsx"
          title="Router.jsx - Client-Side Routing"
          code={`import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useParams,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from 'react-router-dom';

// ========== PAGES ==========
function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}

function UserProfile() {
  const { userId } = useParams(); // Get URL parameter
  return <h1>User Profile: {userId}</h1>;
}

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Redirect after logout
    navigate('/login');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Current path: {location.pathname}</p>
      <button onClick={handleLogout}>Logout</button>
      <Outlet /> {/* Nested routes render here */}
    </div>
  );
}

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // After successful login, redirect
    navigate('/dashboard');
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}

// ========== PROTECTED ROUTE ==========
function ProtectedRoute({ children }) {
  const isAuthenticated = false; // Check auth status

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// ========== LAYOUT ==========
function Layout() {
  return (
    <div>
      <nav>
        {/* NavLink adds 'active' class when route matches */}
        <NavLink to="/" className={({ isActive }) =>
          isActive ? 'active-link' : 'link'
        }>
          Home
        </NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </nav>
      <main>
        <Outlet /> {/* Child routes render here */}
      </main>
    </div>
  );
}

// ========== APP WITH ROUTES ==========
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="users/:userId" element={<UserProfile />} />

          {/* Protected route */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;`}
        />
      </section>

      {/* API Integration */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-blue-400">6.</span> API Integration
        </h2>

        <CodeBlock
          language="jsx"
          title="ApiIntegration.jsx - Fetching Data"
          code={`import React, { useState, useEffect } from 'react';

// ========== USING FETCH ==========
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await fetch('https://api.example.com/users');

        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) return <div className="spinner">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// ========== USING AXIOS (popular alternative) ==========
// npm install axios
import axios from 'axios';

// Create axios instance with base config
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});

// ========== CUSTOM HOOK FOR DATA FETCHING ==========
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url, {
          signal: controller.signal,
        });
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => controller.abort(); // Cleanup
  }, [url]);

  return { data, loading, error };
}

// Using the custom hook
function Products() {
  const { data: products, loading, error } = useFetch('/api/products');

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {products?.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>\${product.price}</p>
        </div>
      ))}
    </div>
  );
}

// ========== POST/PUT/DELETE ==========
function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) throw new Error('Failed to create user');

      const newUser = await response.json();
      console.log('Created:', newUser);
      setName('');
      setEmail('');
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        required
      />
      <button type="submit" disabled={submitting}>
        {submitting ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
}`}
        />
      </section>

      {/* Forms */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-blue-400">7.</span> Forms & Validation
        </h2>

        <CodeBlock
          language="jsx"
          title="Forms.jsx"
          code={`import React, { useState } from 'react';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(formData.password)) {
      newErrors.password = 'Must include uppercase letter and number';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agree) {
      newErrors.agree = 'You must agree to terms';
    }

    return newErrors;
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Form is valid - submit data
    console.log('Form data:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return <div className="success">Registration successful! 🎉</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div>
        <label>Name:</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-msg">{errors.name}</span>}
      </div>

      <div>
        <label>Email:</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error-msg">{errors.email}</span>}
      </div>

      <div>
        <label>Password:</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error-msg">{errors.password}</span>}
      </div>

      <div>
        <label>Confirm Password:</label>
        <input
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <span className="error-msg">{errors.confirmPassword}</span>
        )}
      </div>

      <div>
        <label>
          <input
            name="agree"
            type="checkbox"
            checked={formData.agree}
            onChange={handleChange}
          />
          I agree to the terms
        </label>
        {errors.agree && <span className="error-msg">{errors.agree}</span>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
}`}
        />
      </section>
    </div>
  );
};

export default ReactLessons;
