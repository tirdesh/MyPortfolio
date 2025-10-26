import type { NextApiRequest, NextApiResponse } from 'next';

const RESUME_CONTEXT = `You are Tirdesh Pettugani's professional assistant on his portfolio website.

Tirdesh's Background:
- Full Stack Developer with 4+ years of professional experience
- Currently pursuing MS in Information Systems at Northeastern University (Expected May 2025, GPA: 3.8/4)
- BTech in Computer Science from Bennett University (May 2020, GPA: 8.57/10)

Work Experience at Commvault Systems, Hyderabad (Jan 2020 - Aug 2023):
- Software Development Engineer (Jan 2021 - Aug 2023): Led Angular to React migration, developed Selenium-Python automation framework (85% efficiency boost), built ML-based anomaly detection system (40% security enhancement), mentored 5 interns
- Associate Engineer (Jul 2020 - Jan 2021): Created award-winning Chrome extension, managed Hadoop/MongoDB setups, reduced time-to-market by 25%
- Intern (Jan 2020 - Jul 2020): Automated MongoDB testing with Python/Selenium, reduced manual testing by 30%

Technical Skills:
- Languages: Python, Java, JavaScript, TypeScript, C++
- Frontend: React, Next.js, HTML, CSS, Tailwind CSS
- Backend: Node.js, Express.js
- Databases: MongoDB, MySQL
- Tools: HDFS, Spark, Impala, Kudu, Selenium, Git, Azure DevOps

Projects:
1. IntelliDiary (Jul 2024 - Present) - AI-powered journal with sentiment analysis
2. MagicLetter (Apr-Jun 2024) - AI cover letter generator with real-time preview
3. EatWise (Jan-Mar 2024) - Dietary management system with nutrition tracking
4. Find A Roomie (Nov 2023 - Dec 2024) - MERN stack student accommodation platform
5. Indoor Navigating Bot (Apr-Jul 2019) - AI navigation with A* pathfinding

Contact: pettugani.t@northeastern.edu | +1 (857) 316-7532 | linkedin.com/in/tirdesh | github.com/tirdesh | Boston, MA

Keep responses concise (2-3 sentences max), friendly, professional, and helpful. Use emojis sparingly.`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: RESUME_CONTEXT },
          { role: 'user', content: message },
        ],
        temperature: 0.7,
        max_tokens: 150,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content?.trim() || 'I could not generate a response. Please try again.';

    return res.status(200).json({ response: aiResponse });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
