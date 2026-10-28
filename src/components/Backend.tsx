import React from 'react';
import CodeBlock from './CodeBlock';

const Backend: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-4">🗄️ Phase 4: Backend Development</h1>
      <p className="text-gray-400 text-lg mb-8">
        Build robust APIs with Express.js, connect databases, handle authentication, and create production-ready backend services.
      </p>

      {/* Database */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-emerald-400">1.</span> Database Integration (MongoDB)
        </h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-2">
            <strong className="text-white">MongoDB</strong> is a NoSQL database that stores data in flexible JSON-like documents. Perfect for JavaScript developers.
          </p>
          <p className="text-gray-300">
            <strong className="text-emerald-300">Mongoose</strong> is an ODM (Object Data Modeling) library that provides a schema-based solution for MongoDB.
          </p>
        </div>

        <CodeBlock
          language="javascript"
          title="models/User.js - Mongoose Model"
          code={`const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define schema (structure of your data)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/, 'Invalid email format'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false, // Don't return password by default
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user',
  },
  avatar: {
    type: String,
    default: 'default-avatar.png',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

// ========== MIDDLEWARE (Hooks) ==========

// Pre-save: Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash if password was modified
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method: Compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method: Generate JWT
userSchema.methods.generateToken = function() {
  const jwt = require('jsonwebtoken');
  return jwt.sign(
    { id: this._id, email: this.email, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// Static method: Find by credentials
userSchema.statics.findByCredentials = async function(email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error('Invalid credentials');

  return user;
};

// Virtual: Full name (not stored in DB)
userSchema.virtual('fullName').get(function() {
  return \`\${this.name}\`;
});

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

const User = mongoose.model('User', userSchema);
module.exports = User;`}
        />

        <CodeBlock
          language="javascript"
          title="controllers/userController.js"
          code={`const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const users = await User.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await User.countDocuments();

  res.json({
    users,
    page,
    pages: Math.ceil(total / limit),
    total,
  });
});

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json(user);
});

// @desc    Create user (Register)
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create user (password hashed in pre-save hook)
  const user = await User.create({ name, email, password });

  res.status(201).json({
    user,
    token: user.generateToken(),
  });
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findByCredentials(email, password);

  res.json({
    user,
    token: user.generateToken(),
  });
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const { name, email, avatar } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Check authorization
  if (user._id.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized');
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.avatar = avatar || user.avatar;

  const updatedUser = await user.save();
  res.json(updatedUser);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  await user.deleteOne();
  res.json({ message: 'User deleted successfully' });
});

module.exports = {
  getUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};`}
        />
      </section>

      {/* Authentication */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-emerald-400">2.</span> Authentication & Authorization
        </h2>

        <CodeBlock
          language="javascript"
          title="middleware/auth.js"
          code={`const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ========== AUTH MIDDLEWARE ==========
const protect = async (req, res, next) => {
  let token;

  // Get token from header
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      error: 'Not authorized, no token provided',
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request (exclude password)
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ error: 'User no longer exists' });
    }

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// ========== ROLE-BASED AUTHORIZATION ==========
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: \`Role \${req.user.role} is not authorized to access this route\`,
      });
    }
    next();
  };
};

module.exports = { protect, authorize };`}
        />

        <CodeBlock
          language="javascript"
          title="routes/userRoutes.js"
          code={`const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes (need authentication)
router.get('/', protect, getUsers);
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);

// Admin-only routes
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;`}
        />
      </section>

      {/* Fullstack Connection */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-emerald-400">3.</span> Connecting React to Express
        </h2>

        <CodeBlock
          language="javascript"
          title="server.js - Complete Express Server"
          code={`const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// ========== MIDDLEWARE ==========
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true, // Allow cookies
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
  next();
});

// ========== ROUTES ==========
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// ========== ERROR HANDLING ==========
// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ error: errors.join(', ') });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({ error: \`\${field} already exists\` });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// ========== DATABASE CONNECTION ==========
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// ========== START SERVER ==========
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(\`🚀 Server running on port \${PORT}\`);
  });
});

module.exports = app;`}
        />

        <CodeBlock
          language="bash"
          title=".env - Environment Variables"
          code={`# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/myapp
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/myapp

# JWT
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRES_IN=7d

# Client URL (for CORS)
CLIENT_URL=http://localhost:5173

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads`}
        />
      </section>

      {/* React Frontend Integration */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-emerald-400">4.</span> React API Service Layer
        </h2>

        <CodeBlock
          language="javascript"
          title="services/api.js - Centralized API Service"
          code={`// Create a centralized API service for React frontend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ========== BASE API FUNCTION ==========
async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: \`Bearer \${token}\` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(\`\${API_BASE_URL}\${endpoint}\`, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || \`HTTP \${response.status}\`);
  }

  return response.json();
}

// ========== USER API ==========
export const userAPI = {
  // Register
  register: (data) =>
    apiRequest('/users/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Login
  login: (data) =>
    apiRequest('/users/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Get all users
  getUsers: (page = 1) =>
    apiRequest(\`/users?page=\${page}\`),

  // Get user by ID
  getUser: (id) =>
    apiRequest(\`/users/\${id}\`),

  // Update user
  updateUser: (id, data) =>
    apiRequest(\`/users/\${id}\`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Delete user
  deleteUser: (id) =>
    apiRequest(\`/users/\${id}\`, {
      method: 'DELETE',
    }),
};

// ========== AUTH CONTEXT ==========
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app load
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token is still valid
      userAPI.getUser('me')
        .then(userData => setUser(userData))
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const { user: userData, token } = await userAPI.login({ email, password });
    localStorage.setItem('token', token);
    setUser(userData);
    return userData;
  };

  const register = async (name, email, password) => {
    const { user: userData, token } = await userAPI.register({ name, email, password });
    localStorage.setItem('token', token);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// ========== USING IN COMPONENTS ==========
/*
import { useAuth } from './contexts/AuthContext';

function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Redirect handled by AuthContext
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
      <button type="submit">Login</button>
    </form>
  );
}
*/`}
        />
      </section>
    </div>
  );
};

export default Backend;
