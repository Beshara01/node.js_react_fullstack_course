import React from 'react';
import CodeBlock from './CodeBlock';

const Tools: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-4">🧰 Phase 7: Tools & Advanced Topics</h1>
      <p className="text-gray-400 text-lg mb-8">
        Master the tools and advanced concepts that separate junior developers from senior engineers.
      </p>

      {/* TypeScript */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-blue-400">1.</span> TypeScript Integration
        </h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300">
            <strong className="text-white">TypeScript</strong> adds static typing to JavaScript. It catches errors at compile time and provides better IDE support.
          </p>
        </div>

        <CodeBlock
          language="typescript"
          title="types.ts - TypeScript Basics"
          code={`// ========== BASIC TYPES ==========
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;
let items: string[] = ["apple", "banana"];
let coordinates: [number, number] = [10, 20]; // Tuple

// ========== INTERFACES ==========
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator'; // Union type
  age?: number; // Optional property
  readonly createdAt: Date; // Cannot be modified
}

interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
  pagination?: {
    page: number;
    total: number;
    pages: number;
  };
}

// ========== TYPE ALIASES ==========
type ID = string | number;
type Callback = (data: any) => void;
type UserInput = Pick<User, 'name' | 'email'>; // Only name and email
type UserUpdate = Partial<User>; // All properties optional
type UserWithoutPassword = Omit<User, 'password'>;

// ========== FUNCTIONS ==========
function greet(name: string, greeting: string = "Hello"): string {
  return \`\${greeting}, \${name}!\`;
}

const add = (a: number, b: number): number => a + b;

// Generic function
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstNum = getFirst([1, 2, 3]); // number | undefined
const firstStr = getFirst(["a", "b"]); // string | undefined

// ========== CLASSES ==========
class UserService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getUser(id: number): Promise<User> {
    const response = await fetch(\`\${this.baseUrl}/users/\${id}\`);
    return response.json();
  }

  async getUsers(page: number = 1): Promise<ApiResponse<User[]>> {
    const response = await fetch(
      \`\${this.baseUrl}/users?page=\${page}\`
    );
    return response.json();
  }
}

// ========== REACT + TYPESCRIPT ==========
// Props interface
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  children?: React.ReactNode;
}

// Component with typed props
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={\`btn btn-\${variant}\`}
    >
      {children || label}
    </button>
  );
};

// useState with TypeScript
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
const [users, setUsers] = useState<User[]>([]);

// useRef with TypeScript
const inputRef = useRef<HTMLInputElement>(null);

// Event handlers
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};`}
        />
      </section>

      {/* Testing */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-green-400">2.</span> Testing (Jest & React Testing Library)
        </h2>

        <CodeBlock
          language="javascript"
          title="__tests__/math.test.js - Jest Basics"
          code={`// ========== JEST BASICS ==========

// Import function to test
const { add, subtract, multiply, divide } = require('../math');

describe('Math Operations', () => {
  // Runs before all tests in this describe block
  beforeAll(() => {
    console.log('Starting math tests...');
  });

  // Runs before each test
  beforeEach(() => {
    // Reset any state if needed
  });

  describe('add', () => {
    test('adds two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    test('adds negative numbers', () => {
      expect(add(-1, -2)).toBe(-3);
    });

    test('adds zero', () => {
      expect(add(5, 0)).toBe(5);
    });
  });

  describe('divide', () => {
    test('divides two numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });

    test('throws error when dividing by zero', () => {
      expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
    });
  });
});

// ========== ASYNC TESTING ==========
describe('API Functions', () => {
  test('fetches user data', async () => {
    const user = await fetchUser(1);
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user.id).toBe(1);
  });

  test('handles API errors', async () => {
    await expect(fetchUser(999)).rejects.toThrow('User not found');
  });
});

// ========== MOCKING ==========
describe('User Service', () => {
  test('calls API with correct parameters', async () => {
    // Mock fetch
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ id: 1, name: 'John' }),
    });

    const user = await getUser(1);

    expect(fetch).toHaveBeenCalledWith('/api/users/1');
    expect(user.name).toBe('John');

    // Restore original fetch
    jest.restoreAllMocks();
  });
});

// ========== COMMON MATCHERS ==========
expect(value).toBe(4);           // Exact equality
expect(value).toEqual({ a: 1 }); // Deep equality
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toContain('item');
expect(value).toHaveLength(3);
expect(value).toMatch(/regex/);
expect(value).toBeInstanceOf(Array);
expect(value).toHaveProperty('name');
expect(array).toContainEqual({ id: 1 });
expect(number).toBeGreaterThan(3);
expect(number).toBeLessThan(5);
expect(fn).toHaveBeenCalled();
expect(fn).toHaveBeenCalledTimes(2);
expect(fn).toHaveBeenCalledWith('arg');`}
        />

        <CodeBlock
          language="javascript"
          title="components/__tests__/Button.test.jsx - React Testing"
          code={`import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

describe('Button Component', () => {
  test('renders with correct text', () => {
    render(<Button label="Click me" onClick={() => {}} />);

    // Find by text
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button label="Click" onClick={handleClick} />);

    // Click the button
    fireEvent.click(screen.getByText('Click'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button label="Disabled" onClick={() => {}} disabled />);

    const button = screen.getByText('Disabled');
    expect(button).toBeDisabled();
  });

  test('handles user input in form', async () => {
    const user = userEvent.setup();

    render(<LoginForm />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitBtn = screen.getByRole('button', { name: /submit/i });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/success/i)).toBeInTheDocument();
    });
  });
});`}
        />
      </section>

      {/* Docker */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-blue-400">3.</span> Docker & Containerization
        </h2>

        <CodeBlock
          language="dockerfile"
          title="Dockerfile - Node.js Application"
          code={`# ========== MULTI-STAGE BUILD ==========

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build if needed (for TypeScript)
# RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production

WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \\
    adduser -S nodejs -u 1001

# Copy built files from builder stage
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/src ./src
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./

USER nodejs

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "src/server.js"]`}
        />

        <CodeBlock
          language="yaml"
          title="docker-compose.yml"
          code={`version: '3.8'

services:
  # Backend API
  api:
    build:
      context: ./server
      dockerfile: Dockerfile
    ports:
      - "5000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/myapp
      - JWT_SECRET=your-secret-key
    depends_on:
      - mongo
    restart: unless-stopped
    networks:
      - app-network

  # Frontend
  client:
    build:
      context: ./client
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      - api
    restart: unless-stopped
    networks:
      - app-network

  # MongoDB Database
  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    environment:
      - MONGO_INITDB_DATABASE=myapp
    restart: unless-stopped
    networks:
      - app-network

  # Redis (for caching/sessions)
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    restart: unless-stopped
    networks:
      - app-network

volumes:
  mongo-data:
  redis-data:

networks:
  app-network:
    driver: bridge`}
        />
      </section>

      {/* Deployment */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-green-400">4.</span> Deployment
        </h2>

        <CodeBlock
          language="bash"
          title="Terminal - Deployment Commands"
          code={`# ========== VERCEL (Frontend) ==========
npm install -g vercel
vercel login
vercel --prod

# ========== RAILWAY (Backend + Database) ==========
npm install -g @railway/cli
railway login
railway init
railway up

# ========== RENDER (Full Stack) ==========
# Connect GitHub repo → Auto-deploys on push

# ========== AWS (Advanced) ==========
# Using AWS Elastic Beanstalk
npm install -g aws-cdk
cdk init app --language typescript
cdk deploy

# ========== DOCKER DEPLOYMENT ==========
# Build and push to Docker Hub
docker build -t username/myapp:latest .
docker push username/myapp:latest

# Pull and run on server
docker pull username/myapp:latest
docker run -d -p 3000:3000 --env-file .env username/myapp:latest

# ========== NGINX Configuration ==========
# /etc/nginx/sites-available/myapp
server {
    listen 80;
    server_name example.com;

    # Frontend (React)
    location / {
        root /var/www/client/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API (proxy)
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}`}
        />
      </section>

      {/* Security */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-red-400">5.</span> Security Best Practices
        </h2>

        <CodeBlock
          language="javascript"
          title="security.js - Security Middleware"
          code={`const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

// ========== SECURITY MIDDLEWARE ==========

// Set security HTTP headers
app.use(helmet());

// Rate limiting - prevent brute force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Stricter rate limit for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Only 5 login attempts per 15 minutes
  message: 'Too many login attempts',
});
app.use('/api/auth/login', authLimiter);

// Prevent NoSQL injection
app.use(mongoSanitize());

// Prevent XSS attacks
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ========== INPUT VALIDATION ==========
const { body, validationResult } = require('express-validator');

const validateRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be 2-50 characters')
    .escape(), // Prevent XSS
  body('email')
    .isEmail()
    .withMessage('Invalid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/)
    .withMessage('Password must include uppercase, lowercase, and number'),
];

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// ========== ENVIRONMENT VARIABLES ==========
// NEVER commit .env files
// NEVER hardcode secrets
// Use different secrets for development/production

// ========== ADDITIONAL SECURITY TIPS ==========
// 1. Always validate and sanitize user input
// 2. Use HTTPS in production
// 3. Hash passwords with bcrypt (min 12 rounds)
// 4. Use parameterized queries (prevent SQL injection)
// 5. Implement CSRF protection for form submissions
// 6. Keep dependencies updated (npm audit)
// 7. Use environment variables for secrets
// 8. Implement proper error handling (don't leak stack traces)
// 9. Set secure cookie options
// 10. Regular security audits`}
        />
      </section>

      {/* Essential Tools */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-yellow-400">6.</span> Essential Developer Tools
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { category: '🔧 Code Quality', tools: ['ESLint - Linting', 'Prettier - Formatting', 'Husky - Git hooks', 'lint-staged - Pre-commit checks'] },
            { category: '📦 Package Managers', tools: ['npm - Default Node.js', 'yarn - Facebook alternative', 'pnpm - Fast, disk-efficient'] },
            { category: '🧪 Testing', tools: ['Jest - Unit testing', 'React Testing Library', 'Cypress - E2E testing', 'Playwright - Modern E2E'] },
            { category: '📡 API Tools', tools: ['Postman - API testing', 'Thunder Client - VS Code', 'Swagger - API docs', 'Insomnia - REST client'] },
            { category: '🗃️ Database Tools', tools: ['MongoDB Compass - GUI', 'pgAdmin - PostgreSQL', 'Redis Commander - Redis GUI', 'DBeaver - Universal DB'] },
            { category: '🚀 Deployment', tools: ['Vercel - Frontend', 'Railway - Backend', 'Docker - Containers', 'GitHub Actions - CI/CD'] },
          ].map((section, i) => (
            <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <h3 className="text-white font-bold mb-2">{section.category}</h3>
              <ul className="space-y-1">
                {section.tools.map((tool, j) => (
                  <li key={j} className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="text-green-400">•</span> {tool}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Tools;
