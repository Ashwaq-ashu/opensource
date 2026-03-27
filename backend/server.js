import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import authMiddleware from './middleware/auth.js';
import { buildEmotionContext, logInsights } from './utils/emotionAnalyzer.js';
import { getGithubInsights, buildGithubContext } from './utils/githubInsights.js';
import User from './models/User.js';
// Using native fetch in Node 18+

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
} else {
  console.warn('MONGO_URI is not defined in .env! Database connection skipped.');
}

const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  process.env.FRONTEND_URL, // Allow Vercel URL later
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Mount Authentication Routes
app.use('/api/auth', authRoutes);
app.use('/', authRoutes);

// 🐙 GitHub Username Update Endpoint
app.post('/api/profile/github', authMiddleware, async (req, res) => {
  try {
    const { githubUsername } = req.body;
    const userId = req.user.userId;

    if (!githubUsername || typeof githubUsername !== 'string') {
      return res.status(400).json({ error: 'GitHub username is required' });
    }

    const trimmed = githubUsername.trim();

    // Verify the username exists on GitHub
    const checkRes = await fetch(`https://api.github.com/users/${trimmed}`, {
      headers: { 'User-Agent': 'LifeOptimizerChat/1.0' }
    });

    if (!checkRes.ok) {
      return res.status(400).json({ error: 'GitHub username not found' });
    }

    await User.findByIdAndUpdate(userId, {
      githubUsername: trimmed,
      'profile.github': trimmed
    });

    console.log(`🐙 GitHub username saved for user ${userId}: ${trimmed}`);
    res.json({ message: 'GitHub username saved', githubUsername: trimmed });
  } catch (error) {
    console.error('GitHub Profile Error:', error);
    res.status(500).json({ error: 'Failed to save GitHub username' });
  }
});

app.post('/chat', authMiddleware, async (req, res) => {
  try {
    const { messages } = req.body;
    const userId = req.user.userId;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    // 🧠 CORE SYSTEM PERSONALITY
    const systemMessage = {
      role: "system",
      content: `
You are a personal growth assistant. You speak like a real, thoughtful human — never like a robot, a teacher, or a wellness app.

UNDERSTAND FIRST:
- Before you say anything, feel what the user is going through
- Don't jump into advice. Sit with their words for a moment.
- Your first instinct should be to connect, not to fix.

RESPONSE STRUCTURE:
1. Acknowledge what they're feeling — in your own words, naturally
2. Bring a little clarity or emotional stability
3. Gently guide with a small suggestion or a thoughtful question
(This structure should feel invisible — never formulaic)

TONE:
- Don't copy their tone exactly — slightly align with it, but stay more clear and steady
- Casual user → be friendly but thoughtful
- Emotional user → be calm, warm, grounding
- Confused user → simplify, don't explain too much, ask one good question
- User sharing a win → genuinely celebrate it, ask what helped
- User beating themselves up → push back kindly, like a real friend would
- Exhausted user → don't suggest more. Just be present.

NEVER DO THIS:
- Don't sound like a teacher giving a lesson
- Don't give commands or orders
- Don't overload with advice or long explanations
- Don't lecture or moralize
- Don't judge — ever
- Don't start with "It sounds like..." or "I understand..." or "I hear you..."
- Don't repeat the same opening style twice in a row

ENCOURAGEMENT:
- Appreciate even the smallest effort
- Focus on progress, not perfection
- Keep suggestions small, realistic, optional
- Give options, not instructions

STYLE:
- Short, natural responses — 2-3 paragraphs max
- No formal or technical language
- No bullet points unless they genuinely help
- Ask follow-up questions when it feels right
- Talk like someone who actually knows them

THE USER SHOULD FEEL:
- Understood
- Not judged
- Supported
- Like they can actually improve
`
    };

    // 🧠 EMOTION DETECTION — Analyze the user's latest message
    const lastMessage = messages[messages.length - 1]?.content || "";
    const emotionContext = buildEmotionContext(lastMessage);

    // 📊 LOG INSIGHTS (for future analytics/storage)
    logInsights(userId, lastMessage);

    // 🐙 GITHUB — Fetch user and check GitHub status
    const user = await User.findById(userId).lean();
    let githubContextMsg = null;
    let hasGithub = !!user?.githubUsername;

    // 🔍 AUTO-DETECT: If user shares a GitHub username in chat, try to save it
    if (!hasGithub) {
      const ghMatch = lastMessage.match(/(?:github\.com\/|my\s+(?:github|gh)\s+(?:is|username\s+is|:)\s*)([a-zA-Z0-9-]+)/i)
        || lastMessage.match(/(?:username\s+is|it'?s|mine\s+is|i'?m)\s+([a-zA-Z0-9-]{2,39})$/i);

      if (ghMatch && ghMatch[1]) {
        const candidate = ghMatch[1].trim();
        try {
          const checkRes = await fetch(`https://api.github.com/users/${candidate}`, {
            headers: { 'User-Agent': 'LifeOptimizerChat/1.0' }
          });
          if (checkRes.ok) {
            await User.findByIdAndUpdate(userId, {
              githubUsername: candidate,
              'profile.github': candidate
            });
            hasGithub = true;
            console.log(`🐙 Auto-detected & saved GitHub username: ${candidate}`);
          }
        } catch (e) {
          // Silently skip if validation fails
        }
      }
    }

    // Fetch GitHub insights if connected
    if (hasGithub) {
      try {
        const ghUsername = user?.githubUsername || (await User.findById(userId).lean())?.githubUsername;
        if (ghUsername) {
          const ghInsights = await getGithubInsights(ghUsername);
          githubContextMsg = buildGithubContext(ghInsights);
        }
      } catch (ghErr) {
        console.warn('GitHub insight fetch skipped:', ghErr.message);
      }
    }

    // 🐙 GITHUB AWARENESS — Tell AI about GitHub status
    const githubAwareness = {
      role: "system",
      content: hasGithub
        ? `The user has connected their GitHub. Their activity data is included separately. You can reference their coding activity naturally when relevant — but don't force it into every reply.`
        : `The user has NOT connected their GitHub yet. At some natural point early in the conversation (not the first message, but within the first few exchanges), casually ask if they have a GitHub account. Something like "By the way, do you code? If you've got a GitHub, I'd love to check out what you've been working on — just drop your username whenever." Don't push it. If they don't respond to it, move on. Only ask ONCE.`
    };

    // Build message array for LLM
    const llmMessages = [
      systemMessage,
      emotionContext,
      githubAwareness,
      ...(githubContextMsg ? [githubContextMsg] : []),
      ...messages
    ];

    // 🔥 CALL GROQ
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: llmMessages,
        temperature: 0.7,
        max_tokens: 1024
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("Full Error:", data);
      throw new Error(data.error?.message || "Groq API error");
    }

    const reply = data.choices?.[0]?.message?.content || "No response";

    res.json({
      message: { role: "assistant", content: reply }
    });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      error: "AI failed",
      details: error.message
    });
  }
});

// Start server
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : '0.0.0.0'; // Stay on all interfaces for now
app.listen(port, HOST, () => {
  console.log(`Server running on port ${port}. Environment: ${process.env.NODE_ENV || 'development'}`);
});