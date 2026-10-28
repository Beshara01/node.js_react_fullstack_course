import React from 'react';
import CodeBlock from './CodeBlock';

const Regex: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-4">🔤 Regular Expressions (Regex)</h1>
      <p className="text-gray-400 text-lg mb-8">
        Regular expressions are patterns used to match character combinations in strings. They're incredibly powerful for validation, searching, and text manipulation.
      </p>

      {/* Basics */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-purple-400">1.</span> Regex Basics
        </h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-4">
            A regex pattern is written between forward slashes: <code className="bg-gray-700 px-2 py-0.5 rounded text-purple-300">/pattern/flags</code>
          </p>
          <p className="text-gray-300">
            In JavaScript, you can create regex in two ways:
          </p>
        </div>

        <CodeBlock
          language="javascript"
          title="regex-basics.js"
          code={`// ========== CREATING REGEX ==========

// 1. Literal notation (most common)
const pattern1 = /hello/;

// 2. Constructor function (useful for dynamic patterns)
const searchTerm = 'hello';
const pattern2 = new RegExp(searchTerm, 'i');

// ========== FLAGS ==========
// g - global (find all matches, not just first)
// i - case insensitive
// m - multiline (^ and $ match line boundaries)
// s - dotall (. matches newlines too)
// u - unicode support

const regex = /hello/gi; // global + case insensitive

// ========== TESTING & MATCHING ==========

const text = "Hello World! hello everyone. HELLO there!";

// test() - returns true/false
console.log(/hello/i.test(text)); // true

// exec() - returns match details
const match = /hello/i.exec(text);
console.log(match);
// ['Hello', index: 0, input: 'Hello World!...', groups: undefined]

// match() - returns all matches (with 'g' flag)
console.log(text.match(/hello/gi));
// ['Hello', 'hello', 'HELLO']

// replace() - replace matches
console.log(text.replace(/hello/gi, 'Hi'));
// 'Hi World! Hi everyone. Hi there!'

// search() - returns index of first match
console.log(text.search(/world/i)); // 6

// split() - split string by pattern
const csvLine = "apple, banana;cherry|date";
console.log(csvLine.split(/[,;|]\\s*/));
// ['apple', 'banana', 'cherry', 'date']`}
        />
      </section>

      {/* Character Classes */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-purple-400">2.</span> Character Classes & Special Characters
        </h2>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-yellow-300 font-bold mb-2">Character Classes</p>
              <div className="space-y-1 text-sm text-gray-300">
                <p><code className="text-purple-300">.</code> — Any character (except newline)</p>
                <p><code className="text-purple-300">\\d</code> — Digit [0-9]</p>
                <p><code className="text-purple-300">\\D</code> — Non-digit [^0-9]</p>
                <p><code className="text-purple-300">\\w</code> — Word char [a-zA-Z0-9_]</p>
                <p><code className="text-purple-300">\\W</code> — Non-word char</p>
                <p><code className="text-purple-300">\\s</code> — Whitespace (space, tab, newline)</p>
                <p><code className="text-purple-300">\\S</code> — Non-whitespace</p>
              </div>
            </div>
            <div>
              <p className="text-yellow-300 font-bold mb-2">Anchors & Boundaries</p>
              <div className="space-y-1 text-sm text-gray-300">
                <p><code className="text-purple-300">^</code> — Start of string/line</p>
                <p><code className="text-purple-300">$</code> — End of string/line</p>
                <p><code className="text-purple-300">\\b</code> — Word boundary</p>
                <p><code className="text-purple-300">\\B</code> — Non-word boundary</p>
              </div>
              <p className="text-yellow-300 font-bold mt-4 mb-2">Quantifiers</p>
              <div className="space-y-1 text-sm text-gray-300">
                <p><code className="text-purple-300">*</code> — 0 or more</p>
                <p><code className="text-purple-300">+</code> — 1 or more</p>
                <p><code className="text-purple-300">?</code> — 0 or 1</p>
                <p><code className="text-purple-300">{'{n}'}</code> — Exactly n</p>
                <p><code className="text-purple-300">{'{n,m}'}</code> — Between n and m</p>
                <p><code className="text-purple-300">{'{n,}'}</code> — n or more</p>
              </div>
            </div>
          </div>
        </div>

        <CodeBlock
          language="javascript"
          title="character-classes.js"
          code={`// ========== CHARACTER CLASSES ==========

// [abc] - Match a, b, or c
console.log(/[abc]/.test('apple')); // true (has 'a')
console.log(/[abc]/.test('dog'));   // false

// [a-z] - Range: any lowercase letter
console.log(/[a-z]/.test('Hello')); // true (has 'e','l','l','o')

// [^abc] - Negation: NOT a, b, or c
console.log(/[^abc]/.test('apple')); // true (has 'p','l','e')
console.log(/[^abc]/.test('abc'));   // false (only a,b,c)

// Combined ranges
const isAlphanumeric = /^[a-zA-Z0-9]+$/;
console.log(isAlphanumeric.test('Hello123')); // true
console.log(isAlphanumeric.test('Hello 123')); // false (space)

// ========== SPECIAL CHARACTERS ==========

// \\d - digits
console.log(/\\d/.test('abc123')); // true
console.log(/\\d+/.test('abc123')); // true (one or more digits)

// \\w - word characters (letters, digits, underscore)
console.log(/\\w+/.test('hello_world')); // true

// \\s - whitespace
console.log(/\\s/.test('hello world')); // true
console.log(/\\s+/.test('hello   world')); // true (multiple spaces)

// ========== ANCHORS ==========

// ^ - Start of string
console.log(/^Hello/.test('Hello World')); // true
console.log(/^World/.test('Hello World')); // false

// $ - End of string
console.log(/World$/.test('Hello World')); // true
console.log(/Hello$/.test('Hello World')); // false

// ^ and $ together - exact match
console.log(/^\\d{3}$/.test('123'));   // true (exactly 3 digits)
console.log(/^\\d{3}$/.test('1234'));  // false (4 digits)

// \\b - Word boundary
console.log(/\\bcat\\b/.test('the cat sat')); // true
console.log(/\\bcat\\b/.test('the catalog')); // false ('cat' not a full word)

// ========== QUANTIFIERS ==========

const text = "aaabbbcccddd";

// * - 0 or more
console.log(/ab*c/.test('ac'));    // true (0 b's)
console.log(/ab*c/.test('abc'));   // true (1 b)
console.log(/ab*c/.test('abbc'));  // true (2 b's)

// + - 1 or more
console.log(/ab+c/.test('ac'));    // false (needs at least 1 b)
console.log(/ab+c/.test('abc'));   // true

// ? - 0 or 1
console.log(/colou?r/.test('color'));  // true
console.log(/colou?r/.test('colour')); // true

// {n} - exactly n times
console.log(/^\\d{5}$/.test('12345')); // true (5 digits - zip code)

// {n,m} - between n and m times
console.log(/^\\d{2,4}$/.test('12'));    // true
console.log(/^\\d{2,4}$/.test('1234'));  // true
console.log(/^\\d{2,4}$/.test('1'));     // false (too few)

// {n,} - n or more
console.log(/^\\d{3,}$/.test('12345')); // true (3+ digits)

// ========== GREEDY vs LAZY ==========

const html = '<b>Hello</b> and <i>World</i>';

// Greedy (default) - matches as much as possible
console.log(html.match(/<.*>/));
// '<b>Hello</b> and <i>World</i>' (entire string!)

// Lazy (add ?) - matches as little as possible
console.log(html.match(/<.*?>/g));
// ['<b>', '</b>', '<i>', '</i>']`}
        />
      </section>

      {/* Groups & Capturing */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-purple-400">3.</span> Groups & Capturing
        </h2>

        <CodeBlock
          language="javascript"
          title="groups.js"
          code={`// ========== CAPTURING GROUPS ==========

// () - Capturing group
const datePattern = /(\\d{4})-(\\d{2})-(\\d{2})/;
const match = '2024-01-15'.match(datePattern);

console.log(match[0]); // '2024-01-15' (full match)
console.log(match[1]); // '2024' (group 1)
console.log(match[2]); // '01' (group 2)
console.log(match[3]); // '15' (group 3)

// Named capturing groups (?<name>pattern)
const namedPattern = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;
const namedMatch = '2024-01-15'.match(namedPattern);

console.log(namedMatch.groups.year);  // '2024'
console.log(namedMatch.groups.month); // '01'
console.log(namedMatch.groups.day);   // '15'

// ========== NON-CAPTURING GROUPS ==========

// (?:) - Group without capturing
const phonePattern = /(?:\\+1)?\\s?(\\d{3})-(\\d{3})-(\\d{4})/;
const phone = '+1 555-123-4567'.match(phonePattern);
console.log(phone[1]); // '555' (area code, first capturing group)

// ========== ALTERNATION (OR) ==========

// | - OR operator
const greeting = /hello|hi|hey/i;
console.log(greeting.test('Hello!')); // true
console.log(greeting.test('Hey there')); // true
console.log(greeting.test('Goodbye')); // false

// Combined with groups
const filePattern = /\\.(jpg|jpeg|png|gif|webp)$/i;
console.log(filePattern.test('photo.jpg'));  // true
console.log(filePattern.test('photo.pdf'));  // false

// ========== BACKREFERENCES ==========

// \\1, \\2... - Reference to captured group
// Find repeated words
const repeatedWords = /\\b(\\w+)\\s+\\1\\b/gi;
const text = 'the the quick brown fox fox';
console.log(text.match(repeatedWords));
// ['the the', 'fox fox']

// ========== LOOKAHEAD & LOOKBEHIND ==========

// (?=...) - Positive lookahead (followed by)
const prices = '$100 $200 $300';
console.log(prices.match(/\\d+(?=\\s|$)/g));
// ['100', '200', '300']

// Password: must have uppercase, lowercase, digit, 8+ chars
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$/;
console.log(passwordRegex.test('Password1')); // true
console.log(passwordRegex.test('password'));  // false (no uppercase/digit)

// (?!) - Negative lookahead (NOT followed by)
console.log('123abc'.match(/\\d+(?!abc)/)); // null (digits ARE followed by abc)

// (?<=...) - Positive lookbehind (preceded by)
console.log('$100 $200'.match(/(?<=\\$)\\d+/g));
// ['100', '200'] (digits preceded by $)

// (?<!...) - Negative lookbehind (NOT preceded by)
console.log('a1 b2 c3'.match(/(?<![ab])\\d/g));
// ['3'] (digit not preceded by a or b)`}
        />
      </section>

      {/* Practical Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-purple-400">4.</span> Practical Regex Patterns
        </h2>

        <CodeBlock
          language="javascript"
          title="practical-patterns.js"
          code={`// ========== VALIDATION PATTERNS ==========

// Email validation
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
console.log(emailRegex.test('user@example.com'));     // true
console.log(emailRegex.test('user.name+tag@domain.co')); // true
console.log(emailRegex.test('invalid@'));             // false

// Phone number (US format)
const phoneRegex = /^(\\+?1)?[\\s.-]?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$/;
console.log(phoneRegex.test('555-123-4567'));  // true
console.log(phoneRegex.test('(555) 123-4567')); // true
console.log(phoneRegex.test('5551234567'));    // true

// URL validation
const urlRegex = /^https?:\\/\\/[\\w.-]+(?:\\.[a-z]{2,})(?:\\/[\\w.-]*)*\\/?$/i;
console.log(urlRegex.test('https://www.google.com')); // true
console.log(urlRegex.test('http://example.com/path')); // true

// Password strength
const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;
console.log(strongPassword.test('MyP@ssw0rd')); // true

// IP Address (IPv4)
const ipv4Regex = /^((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$/;
console.log(ipv4Regex.test('192.168.1.1'));   // true
console.log(ipv4Regex.test('256.1.1.1'));     // false

// ========== TEXT MANIPULATION ==========

// Extract all hashtags from text
const tweet = "Hello #world! #coding is #fun with #javascript";
const hashtags = tweet.match(/#[a-zA-Z]\\w*/g);
console.log(hashtags); // ['#world', '#coding', '#fun', '#javascript']

// Extract all emails from text
const text = "Contact us at info@example.com or support@test.org";
const emails = text.match(/[\\w.-]+@[\\w.-]+\\.\\w{2,}/g);
console.log(emails); // ['info@example.com', 'support@test.org']

// Remove HTML tags
const html = '<p>Hello <strong>World</strong></p>';
const cleanText = html.replace(/<[^>]+>/g, '');
console.log(cleanText); // 'Hello World'

// Convert camelCase to snake_case
const camelToSnake = (str) =>
  str.replace(/[A-Z]/g, letter => \`_\${letter.toLowerCase()}\`);
console.log(camelToSnake('helloWorld')); // 'hello_world'
console.log(camelToSnake('backgroundColor')); // 'background_color'

// Convert snake_case to camelCase
const snakeToCamel = (str) =>
  str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
console.log(snakeToCamel('hello_world')); // 'helloWorld'

// Format credit card number
const formatCC = (num) =>
  num.replace(/\\d{4}/g, '$& ').trim();
console.log(formatCC('1234567890123456'));
// '1234 5678 9012 3456'

// Extract domain from URL
const getDomain = (url) => {
  const match = url.match(/(?:https?:\\/\\/)?(?:www\\.)?([^\\/]+)/);
  return match ? match[1] : null;
};
console.log(getDomain('https://www.google.com/search')); // 'google.com'

// ========== SLUG GENERATION ==========
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\\w\\s-]/g, '')    // Remove special chars
    .replace(/\\s+/g, '-')          // Replace spaces with hyphens
    .replace(/-+/g, '-')            // Replace multiple hyphens
    .trim();
};
console.log(generateSlug('Hello World! This is a Test #1'));
// 'hello-world-this-is-a-test-1'

// ========== TRUNCATE TEXT ==========
const truncate = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\\s+\\S*$/, '') + '...';
};
console.log(truncate('This is a very long sentence that needs truncation', 30));
// 'This is a very long sentence...'`}
        />
      </section>

      {/* Regex Tools */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-purple-400">5.</span> Regex Tools & Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Regex101', url: 'https://regex101.com', desc: 'Interactive regex tester with explanations' },
            { name: 'RegExr', url: 'https://regexr.com', desc: 'Learn, build, and test regex patterns' },
            { name: 'Regexr by gskinner', url: 'https://gskinner.com/regexr/', desc: 'Real-time regex testing' },
            { name: 'Debuggex', url: 'https://www.debuggex.com', desc: 'Visual regex debugger' },
            { name: 'iHateRegex', url: 'https://ihateregex.io', desc: 'Common regex patterns collection' },
            { name: 'Regex Generator', url: 'https://regex-generator.olafneumann.org', desc: 'Generate regex from examples' },
          ].map((tool, i) => (
            <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-purple-500 transition-colors">
              <p className="text-white font-bold">{tool.name}</p>
              <p className="text-purple-300 text-xs mb-1">{tool.url}</p>
              <p className="text-gray-400 text-sm">{tool.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-3">📚 Regex Cheat Sheet</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-2 text-purple-300">Pattern</th>
                  <th className="text-left py-2 text-purple-300">Description</th>
                  <th className="text-left py-2 text-purple-300">Example</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-700">
                  <td className="py-2 font-mono">\\d</td>
                  <td>Any digit</td>
                  <td className="font-mono text-xs">\\d+ → "123"</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 font-mono">\\w</td>
                  <td>Word character</td>
                  <td className="font-mono text-xs">\\w+ → "hello_123"</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 font-mono">\\s</td>
                  <td>Whitespace</td>
                  <td className="font-mono text-xs">\\s+ → " " or "\\t"</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 font-mono">.</td>
                  <td>Any character</td>
                  <td className="font-mono text-xs">a.b → "acb", "a3b"</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 font-mono">[abc]</td>
                  <td>Character set</td>
                  <td className="font-mono text-xs">[aeiou] → vowels</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 font-mono">[^abc]</td>
                  <td>Negated set</td>
                  <td className="font-mono text-xs">[^0-9] → non-digits</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 font-mono">a|b</td>
                  <td>Alternation</td>
                  <td className="font-mono text-xs">cat|dog</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 font-mono">^</td>
                  <td>Start anchor</td>
                  <td className="font-mono text-xs">^Hello → starts with Hello</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 font-mono">$</td>
                  <td>End anchor</td>
                  <td className="font-mono text-xs">end$ → ends with end</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 font-mono">{'{n,m}'}</td>
                  <td>Range quantifier</td>
                  <td className="font-mono text-xs">\\d{'{2,4}'} → 2-4 digits</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 font-mono">(?=...)</td>
                  <td>Positive lookahead</td>
                  <td className="font-mono text-xs">\\d(?=px) → digit before px</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono">(?&lt;=...)</td>
                  <td>Positive lookbehind</td>
                  <td className="font-mono text-xs">(?&lt;=$)\\d+ → digits after $</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Regex;
