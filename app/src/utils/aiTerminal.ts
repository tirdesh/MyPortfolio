import { buildResumeContext } from '../content/profile.mjs';
// AI Terminal utility - Real LLM integration using Groq API (fast & free)
// Just add your API key to .env and it works!

// Shared with api/chat.ts -- one description of me in the codebase.
const RESUME_CONTEXT = buildResumeContext();

// Use backend API route (secure) - falls back to smart responses if backend unavailable
export const generateAIResponse = async (userMessage: string): Promise<string> => {
  try {
    // Security: Validate input length to prevent abuse
    if (userMessage.length > 500) {
      return generateSmartFallback(userMessage);
    }

    // Try backend API first (for production/deployment)
    const apiUrl = import.meta.env.VITE_API_URL || '/api/chat';
    
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (response.ok) {
        const data = await response.json();
        return data.response || generateSmartFallback(userMessage);
      }
    } catch (apiError) {
      // Backend not available, fall through to fallback
    }

    // Fallback: Try direct API call (for local development with API key)
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    
    if (apiKey) {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Groq decommissioned llama-3.1-8b-instant. The server route at
          // api/chat.ts resolves a model at runtime; this browser fallback
          // just names the current best directly.
          model: "openai/gpt-oss-20b",
          messages: [
            { role: "system", content: RESUME_CONTEXT },
            { role: "user", content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 600,
        }),
        signal: AbortSignal.timeout(10000),
      });

      if (response.ok) {
        const data = await response.json();
        return data.choices[0]?.message?.content?.trim() || generateSmartFallback(userMessage);
      }
    }

    // Final fallback: Smart pattern matching
    return generateSmartFallback(userMessage);
  } catch (error) {
    return generateSmartFallback(userMessage);
  }
};

// Smart fallback with intelligent pattern matching
export const generateSmartFallback = (userMessage: string): string => {
  const message = userMessage.toLowerCase();

  // Skills detection
  if (message.includes("skill")) {
    if (message.includes("python") || message.includes("programming")) {
      return "I love Python! 🐍 It's my go-to language for automation, data science, and backend development. I've used it extensively in my Selenium automation framework.";
    }
    if (message.includes("react") || message.includes("frontend")) {
      return "React is my favorite frontend framework! ⚛️ I've built multiple projects including this portfolio. I love its component-based architecture and ecosystem.";
    }
    if (message.includes("experience") || message.includes("year")) {
      return "I have 4+ years of professional experience! 💼 Started as an intern at Commvault and worked my way up to Software Development Engineer.";
    }
    return "I work with Python, Java, JavaScript, TypeScript, React, Node.js, MongoDB, and more. Which technology interests you?";
  }

  // Projects detection
  if (message.includes("project")) {
    if (message.includes("ai") || message.includes("machine learning")) {
      return "Yes! I've worked on several AI projects including IntelliDiary (sentiment analysis) and Indoor Navigating Bot (A* pathfinding). AI fascinates me! 🤖";
    }
    if (message.includes("favorite") || message.includes("best") || message.includes("proud")) {
      return "My favorite is IntelliDiary! 🌟 It's an AI-powered journal app I'm currently developing. It combines my passion for AI with helping people reflect.";
    }
    return "I've built projects like IntelliDiary (AI journal), MagicLetter (cover letters), EatWise (nutrition), and FindARoomie (housing). Want details on any specific one?";
  }

  // Education detection
  if (message.includes("education") || message.includes("university") || message.includes("degree")) {
    return "I hold an MS in Information Systems from Northeastern (graduated December 2025, GPA: 3.7/4)! 🎓 Before that, a BTech in CS from Bennett University.";
  }

  // Work experience detection
  if (message.includes("work") || message.includes("job") || message.includes("commvault")) {
    return "I worked at Commvault Systems for 3+ years! From intern to Software Development Engineer, I worked on React, Python, and big data technologies.";
  }

  // Contact detection
  if (message.includes("contact") || message.includes("email") || message.includes("phone")) {
    return "Feel free to reach out! 📧 pettugani.t@northeastern.edu | 📱 +1 (857) 316-7532 | 💼 linkedin.com/in/tirdesh | 🔗 github.com/tirdesh";
  }

  // Location detection
  if (message.includes("location") || message.includes("live") || message.includes("where")) {
    return "I'm currently in Boston, Massachusetts! 🏙️ Studying at Northeastern University and open to opportunities in the area or remotely.";
  }

  // Greetings
  if (message.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/)) {
    const greetings = [
      "Hey there! 👋 How can I help you today?",
      "Hello! 👋 Welcome to my portfolio!",
      "Hi! 👋 What would you like to know about me?",
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // "What" questions
  if (message.startsWith("what")) {
    if (message.includes("do you do") || message.includes("work on")) {
      return "I'm a Full Stack Developer passionate about creating innovative web solutions! 💻 I work with React, Node.js, Python, and love building impactful applications.";
    }
    if (message.includes("tech") || message.includes("technology")) {
      return "I love exploring new technologies! 🚀 I work with modern web frameworks, databases, cloud technologies, and I'm always learning something new.";
    }
  }

  // "How" questions
  if (message.startsWith("how")) {
    if (message.includes("started") || message.includes("begin")) {
      return "My journey started as an intern at Commvault in 2020! 🌱 I was eager to learn and gradually took on more responsibilities, eventually leading projects.";
    }
  }

  // "Tell me" or "about"
  if (message.includes("tell me") || message.includes("about you") || message.includes("about yourself")) {
    return "I'm Tirdesh, a Full Stack Developer passionate about innovative solutions! 🚀 With 4+ years of experience, I've worked on projects from AI applications to web platforms.";
  }

  // Help
  if (message.includes("help") || message.includes("what can you")) {
    return "I can tell you about my education, experience, projects, skills, or contact info! 🎯 Try 'Tell me about your projects' or 'What are your skills?'";
  }

  // Generic response
  const suggestions = [
    "Interesting! 🤔 Could you rephrase? I can help with my education, experience, projects, skills, or contact details.",
    "Not quite sure how to answer that! 💭 Try asking about my projects, skills, or work experience.",
  ];
  return suggestions[Math.floor(Math.random() * suggestions.length)];
};

// Quick responses for known commands
export const getQuickResponse = (userMessage: string): string | null => {
  const quickResponses: Record<string, string> = {
    help: "Ask me about education, experience, projects, skills, or contact info! 🎯",
    about: "I'm Tirdesh, a Full Stack Developer passionate about innovative web solutions! Currently a Microsoft 365 Copilot Engineer at Wave Life Sciences.",
    skills: "Python, Java, JavaScript, TypeScript, React, Node.js, MongoDB, and more! 💻",
    projects: "IntelliDiary (AI journal), MagicLetter (cover letters), EatWise (nutrition), FindARoomie (housing). Which interests you?",
    education: "MS in Information Systems from Northeastern (December 2025, GPA: 3.7/4) and BTech in CS from Bennett University! 🎓",
    experience: "4+ years at Commvault - from intern to Software Development Engineer, working with React, Python, and big data!",
    contact: "Email: pettugani.t@northeastern.edu | Phone: +1 (857) 316-7532 | LinkedIn: linkedin.com/in/tirdesh 📞"
  };

  const normalized = userMessage.toLowerCase().trim();
  return quickResponses[normalized] || null;
};
