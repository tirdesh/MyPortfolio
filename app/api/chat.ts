import type { VercelRequest, VercelResponse } from '@vercel/node';

const RESUME_CONTEXT = `You are Tirdesh Pettugani speaking directly to visitors on your portfolio website. Always answer in first person (use "I", "my", "me").

My Background:
- Full Stack Developer with 4+ years of professional experience
- MS in Information Systems, Northeastern University (graduated December 2025, GPA: 3.7/4)
- BTech in Computer Science from Bennett University (2016 - 2020, GPA: 8.57/10)

My Current Role:
- Microsoft 365 Copilot Engineer at Wave Life Sciences, Lexington MA (Apr 2026 - present): I build conversational AI on Microsoft Copilot Studio, including an NDA agent and a Freshservice-integrated IT ticketing bot. I own the AI agent lifecycle and automation strategy, and present architecture proposals to senior leadership.

My Recent Experience:
- Software Developer & AI Engineer, DMSB AI Strategic Hub (DASH), Boston (Aug 2025 - Dec 2025): I built and shipped dashlab.io, enriched 70K+ alumni records with scraping pipelines and API integrations, and launched EssayBot (essay grading on Gemma models) and PresBot (presentation coaching with voice cloning).
- IT Co-op, Wave Life Sciences, Lexington MA (Jan 2025 - Jun 2025): Hybrid cloud automation with Power Automate and Python bridging on-prem research data to AWS and Azure, Microsoft 365 infrastructure and identity lifecycle management, Power BI dashboards over ServiceNow, early Microsoft 365 Copilot adoption, and KnowBe4 security awareness administration.
- AI-Human Interaction Research Assistant, Northeastern University (Aug 2024 - Dec 2024): I researched AI agents with GenAI tooling, LLMs and RAG models, and supported grading and course material development.

My Work Experience at Commvault Systems, Hyderabad (May 2019 - Aug 2023, 4 yrs 4 mos across five roles):
- Software Development Engineer (Jan 2021 - Aug 2023): Led Angular to React migration, developed Selenium-Python automation framework (85% efficiency boost), built ML-based anomaly detection system (40% security enhancement), mentored 5 interns
- Associate Engineer (Jul 2020 - Dec 2020): Created award-winning Chrome extension, managed Hadoop/MongoDB setups, reduced time-to-market by 25%
- Intern (Jan 2020 - Jun 2020): Automated MongoDB testing with Python/Selenium, reduced manual testing by 30%
- Intern (May 2019 - Aug 2019): Automated operation-window functionality on the server core team using Python, verified functionality via backend APIs

My Technical Skills:
- Languages: Python, Java, JavaScript, TypeScript, C++
- Frontend: React, Next.js, HTML, CSS, Tailwind CSS
- Backend: Node.js, Express.js
- Databases: MongoDB, MySQL
- Tools: HDFS, Spark, Impala, Kudu, Selenium, Git, Azure DevOps

My Projects:
1. IntelliDiary (Jul 2024 - Present) - AI-powered journal with sentiment analysis
2. MagicLetter (Apr-Jun 2024) - AI cover letter generator with real-time preview
3. EatWise (Jan-Mar 2024) - Dietary management system with nutrition tracking
4. Find A Roomie (Nov 2023 - Dec 2024) - MERN stack student accommodation platform
5. Indoor Navigating Bot (Apr-Jul 2019) - AI navigation with A* pathfinding

I also write about engineering at tirdesh.me/blog.

My Contact Info: pettugani.t@northeastern.edu | +1 (857) 316-7532 | linkedin.com/in/tirdesh | github.com/tirdesh | Boston, MA

IMPORTANT: 
- Always speak in FIRST PERSON (use "I", "my", "me" - NEVER "he", "his", "him")
- Keep responses SHORT (3-4 sentences maximum) to ensure complete answers
- Be friendly, professional, and helpful
- Use emojis sparingly
- NEVER cut responses mid-sentence`;


// ---------------------------------------------------------------------------
// Model selection.
//
// This endpoint used to hardcode `llama-3.1-8b-instant`. Groq decommissioned
// that model, every request started throwing, and the catch below turned it
// into a silent 500 -- so the assistant was dead for months without a signal.
//
// Instead of naming one model, ask Groq what it currently serves and pick the
// best available. A decommission now degrades to the next choice instead of
// breaking the endpoint.
// ---------------------------------------------------------------------------

// Best first. Verified to return clean, short, first-person prose.
// Deliberately excludes qwen models: they emit <think> reasoning into content.
const PREFERRED_MODELS = [
  'openai/gpt-oss-20b',
  'openai/gpt-oss-120b',
  'groq/compound-mini',
  'groq/compound',
];

// Non-chat endpoints (speech, TTS, classifiers) and reasoning models that leak
// their scratchpad into the response.
const NOT_CHAT = /whisper|orpheus|prompt-guard|safeguard|tts|embed|qwen/i;

let modelCache: { ids: string[]; fetchedAt: number } | null = null;
const MODEL_CACHE_TTL_MS = 6 * 60 * 60 * 1000;

async function getCandidateModels(apiKey: string): Promise<string[]> {
  const fresh = modelCache && Date.now() - modelCache.fetchedAt < MODEL_CACHE_TTL_MS;
  if (!fresh) {
    try {
      const res = await fetch('https://api.groq.com/openai/v1/models', {
        headers: { Authorization: `Bearer ${apiKey}` },
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) {
        const body = (await res.json()) as { data?: Array<{ id?: string }> };
        const ids = (body.data ?? [])
          .map((m) => m.id)
          .filter((id): id is string => typeof id === 'string' && !NOT_CHAT.test(id));
        if (ids.length) modelCache = { ids, fetchedAt: Date.now() };
      }
    } catch {
      // Listing failed; fall through to the preferred list on its own.
    }
  }

  const available = modelCache?.ids ?? [];
  const ranked = PREFERRED_MODELS.filter((m) => available.includes(m));
  const rest = available.filter((m) => !PREFERRED_MODELS.includes(m));

  // If listing failed entirely, still try the preferred names blind.
  return ranked.length || rest.length ? [...ranked, ...rest] : [...PREFERRED_MODELS];
}

// Reasoning models sometimes prepend a <think> block. Strip it defensively so a
// future model swap can't start leaking a scratchpad to visitors.
function cleanReply(text: string): string {
  return text
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/^<think>[\s\S]*$/i, '')
    .trim();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || message.length > 500) {
      return res.status(400).json({ error: 'Invalid message' });
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const candidates = await getCandidateModels(apiKey);
    const failures: string[] = [];

    for (const model of candidates.slice(0, 3)) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: RESUME_CONTEXT },
              { role: 'user', content: message },
            ],
            temperature: 0.7,
            // Generous: the gpt-oss models spend part of the budget reasoning
            // before emitting content, and returned empty at 120.
            max_tokens: 600,
          }),
          signal: AbortSignal.timeout(15000),
        });

        if (!response.ok) {
          // A decommissioned or gated model lands here. Drop the cached list so
          // the next request re-reads what Groq actually serves.
          failures.push(`${model}: HTTP ${response.status}`);
          if (response.status === 400 || response.status === 404) modelCache = null;
          continue;
        }

        const data = (await response.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const reply = cleanReply(data.choices?.[0]?.message?.content ?? '');

        if (!reply) {
          failures.push(`${model}: empty content`);
          continue;
        }

        return res.status(200).json({ response: reply });
      } catch (err) {
        failures.push(`${model}: ${err instanceof Error ? err.message : 'unknown'}`);
      }
    }

    // Surfaced in the Vercel function logs. The previous version swallowed the
    // reason entirely, which is why the outage went unnoticed.
    console.error('[api/chat] all candidate models failed:', failures.join('; '));
    return res.status(502).json({ error: 'Assistant is temporarily unavailable' });
  } catch (error) {
    console.error('[api/chat] unhandled error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
