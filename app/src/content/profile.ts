// Single source of truth for who I am.
//
// The chat assistant's prompt used to be hand-written and duplicated across
// api/chat.ts and src/utils/aiTerminal.ts. The two copies drifted: both still
// claimed I was a current student two years after graduating, neither knew
// about my job at Wave, and one invented publications. Deriving the prompt
// from the same data the site renders means the assistant cannot fall out of
// date without the visible pages falling out of date too.
//
// Deliberately framework-free: no JSX, no React, no icon imports, so the
// Vercel serverless function at api/chat.ts can import this without pulling
// the UI dependency tree into its bundle.

export interface TimelineEntry {
  subtitle: string;
  content: string;
  date: string;
  details: string[];
}

export const identity = {
  name: "Tirdesh Pettugani",
  title: "Full Stack Developer",
  location: "Boston, MA",
  email: "pettugani.t@northeastern.edu",
  phone: "+1 (857) 316-7532",
  linkedin: "linkedin.com/in/tirdesh",
  github: "github.com/tirdesh",
  blog: "tirdesh.me/blog",
  yearsExperience: "4+",
};

export const education: TimelineEntry[] = [
  {
    subtitle: "Northeastern University, Boston, MA",
    content: "Master of Science in Information Systems",
    date: "December 2025",
    details: [
      "GPA: 3.7/4",
      "Related Courses: Knowledge Graphs with LLM/Graph DB, Cloud Computing, Adv. Big Data, Web Design and User Experience, WebDev Tools, Program Structures and Algorithms",
    ],
  },
  {
    subtitle: "Bennett University, Greater Noida, India",
    content: "B.Tech, Computer Science",
    date: "2016 – 2020",
    details: ["GPA: 8.57/10"],
  }
];

export const experience: TimelineEntry[] = [
  {
    subtitle: "Wave Life Sciences, Lexington, USA",
    content: "Microsoft 365 Copilot Engineer",
    date: "04/2026 – Current",
    details: [
      "Engineered and deployed conversational AI solutions using Microsoft Copilot Studio, including an NDA agent and a Freshservice-integrated IT ticketing bot, leading end-to-end testing, debugging, and feedback cycles to streamline enterprise service workflows.",
      "Directed the full AI agent lifecycle and automation strategy, from debugging complex deployment pipelines to leading feasibility studies on Copilot-driven workflows, ultimately defining technical prerequisites and presenting scalable architectures to senior leadership.",
    ],
  },
  {
    subtitle: "DMSB AI Strategic Hub (DASH), Boston, USA",
    content: "Software Developer & AI Engineer",
    date: "08/2025 – 12/2025",
    details: [
      "Designed and deployed dashlab.io as DASH Lab's public-facing platform, showcasing research innovations that generated partnership discussions and attracted inquiries from 5+ potential investors and industry stakeholders.",
      "Enriched 70K+ alumni records by engineering automated web scraping pipelines and third-party API integrations, transforming disparate data sources into structured datasets for targeted outreach.",
      "Launched AI-driven educational tools, including EssayBot (streamlined essay grading using Gemma models deployed on A6000 infrastructure) and PresBot (real-time presentation coaching powered by voice cloning ML models), transforming manual processes into scalable, personalized feedback systems.",
    ],
  },
  {
    subtitle: "Wave Life Sciences, Lexington, USA",
    content: "IT Co-op",
    date: "01/2025 – 06/2025",
    details: [
      "Engineered hybrid cloud and automation solutions, leveraging Power Automate and Python to bridge on-premises research data with AWS and Azure environments, while managing Microsoft 365 infrastructure and user identity lifecycles.",
      "Streamlined IT operations within a regulated clinical laboratory by developing Power BI dashboards for ServiceNow analytics to improve device hygiene, and collaborating with Cybersecurity to enforce endpoint hardening and infrastructure reliability.",
      "Supported early Microsoft 365 Copilot adoption, evaluating licensing and readiness requirements and piloting Copilot workflows with business users ahead of a wider rollout.",
      "Administered KnowBe4 security awareness training, running phishing simulation campaigns and reporting completion and risk metrics to stakeholders.",
    ],
  },
  {
    subtitle: "Northeastern University, Boston, USA",
    content: "AI-Human Interaction Research Assistant",
    date: "08/2024 – 12/2024",
    details: [
      "Researched AI agents using GenAI tooling, LLMs and RAG models, collaborating with faculty on study design and findings.",
      "Assisted with grading and contributed to the development of course materials.",
    ],
  },
  {
    subtitle: "Commvault Systems, Hyderabad, India",
    content: "Software Development Engineer",
    date: "01/2021 – 08/2023",
    details: [
      "Managed Hadoop environments across multiple distributions and administered MongoDB, including standalone setups, clusters, shards and replica sets.",
      "Spearheaded a Selenium-Python automation framework for GitHub and Azure DevOps repositories, improving testing efficiency by 85% and reducing response time by 50%.",
      "Led the design of new automation test cases focused on regression coverage, and drove adoption of Agile methodologies in testing, reducing time-to-market for new features by 25%.",
      "Designed automation test frameworks and detailed test plans, setting quality benchmarks and reviewing requirements and technical documents.",
      "Provided technical guidance and product training to mentored team members, ensuring data security and QA integrity through detailed test case review.",
      "Analyzed and resolved 200+ customer escalations through systematic troubleshooting and root cause analysis, and led three projects from design to deployment.",
      "Maintained automation scripts that cut manual testing effort by 30%.",
      "Contributed to 7+ revenue-generating projects, delivering features and enhancements that earned spot bonuses and recognition for UI/UX improvements.",
      "Designed and engineered responsive React components from Figma mockups, collaborating with design and backend teams on UI/UX and data integration via GraphQL and REST APIs.",
    ],
  },
  {
    subtitle: "Commvault Systems, Hyderabad, India",
    content: "Associate Engineer",
    date: "07/2020 – 12/2020",
    details: [
      "Developed a prize-winning Chrome extension using Node.js and webhooks for enhanced web navigation at the Create 2020 Hackathon.",
      "Developed and maintained Python and Selenium automation for web testing, reducing manual testing effort by 30%.",
      "Led automation projects on frameworks including Hadoop, decreasing maintenance downtime by 65%.",
      "Defined automation strategy with cross-functional teams, improving the overall software testing process by 35%.",
      "Enhanced code through regular reviews, achieving a 55% increase in automation efficiency.",
      "Tested backup and recovery of UNIX systems using the 1touch tool.",
      "Supported enterprise backup infrastructure including disaster recovery workflows, automated provisioning, and resource optimization for SQL Server, Postgres and MongoDB.",
    ],
  },
  {
    subtitle: "Commvault Systems, Hyderabad, India",
    content: "Intern",
    date: "01/2020 – 06/2020",
    details: [
      "Automated and validated MongoDB functionality on the big data team using Python and Selenium.",
      "Generated test data and verified backup and restore of replica sets and sharded clusters.",
      "Designed and maintained the test automation framework for the MongoDB backup agent.",
      "Participated in manual and automated testing across user acceptance, regression, system, UI and functionality testing.",
    ],
  },
  {
    subtitle: "Commvault Systems, India",
    content: "Intern",
    date: "05/2019 – 08/2019",
    details: [
      "Automated and validated operation-window functionality on the server core team using Python.",
      "Verified functionality via backend APIs using the requests library and Postman.",
      "Reviewed and refactored existing automation code, and expanded coverage with new scripts.",
    ],
  },
  {
    subtitle: "Bennett University, Greater Noida, India",
    content: "Teaching Assistant",
    date: "08/2018 – 11/2018",
    details: [
      "Ran QA and lab sessions for Introduction to Computational Thinking and Programming using Python, under Prof. Vipul Mishra.",
      "Mentored students on course material and facilitated group discussions.",
      "Gave individual feedback to help students improve their programming.",
    ],
  },
];

// Kept as prose rather than imported from SkillList.tsx, which pulls in icon
// components that have no business inside a serverless function.
export const skillsSummary = [
  "Languages: Python, Java, JavaScript, TypeScript, C++",
  "Frontend: React, Next.js, Angular, HTML, CSS, Tailwind CSS",
  "Backend: Node.js, Express.js, Flask",
  "Databases & Big Data: MongoDB, MySQL, Postgres, SQL Server, Hive, HBase, HDFS",
  "AI/ML: TensorFlow, Keras, Scikit-learn, NumPy, Pandas, OpenCV, NLTK, LangChain, OpenAI",
  "Cloud & DevOps: Docker, Kubernetes, Azure, AWS, GCP, OCI, Linux",
  "Tools: Git, Azure DevOps, Selenium, UiPath, Power Automate, Power BI, Copilot Studio",
];

const renderEntries = (entries: TimelineEntry[]): string =>
  entries
    .map(
      (e) =>
        `- ${e.content}, ${e.subtitle} (${e.date}):\n` +
        e.details.map((d) => `    - ${d}`).join("\n")
    )
    .join("\n");

/**
 * Builds the system prompt for the chat assistant from the data above.
 * Both the serverless route and the in-browser fallback call this, so there is
 * exactly one description of me in the codebase.
 */
export function buildResumeContext(
  projects: Array<{ title: string; description: string; tech: string[] }> = []
): string {
  const projectLines = projects
    .slice(0, 6)
    .map((p) => `- ${p.title} (${p.tech.slice(0, 4).join(", ")}): ${p.description}`)
    .join("\n");

  return `You are ${identity.name} speaking directly to visitors on your portfolio website. Always answer in first person (use "I", "my", "me").

My Background:
- ${identity.title} with ${identity.yearsExperience} years of professional experience
- Based in ${identity.location}

My Education:
${renderEntries(education)}

My Experience:
${renderEntries(experience)}

My Technical Skills:
${skillsSummary.map((s) => `- ${s}`).join("\n")}
${projectLines ? `\nMy Projects:\n${projectLines}\n` : ""}
I also write about engineering at ${identity.blog}.

My Contact Info: ${identity.email} | ${identity.phone} | ${identity.linkedin} | ${identity.github} | ${identity.location}

IMPORTANT:
- Always speak in FIRST PERSON (use "I", "my", "me" - NEVER "he", "his", "him")
- ONLY state facts that appear in this context. Do NOT invent employers, job titles, publications, dates, metrics, technologies or achievements.
- If you are asked something this context does not cover, say you would rather not guess and point them to my email or LinkedIn.
- Do not claim I write for or contribute to any publication other than my own blog at ${identity.blog}.
- Keep responses SHORT (3-4 sentences maximum) to ensure complete answers
- Be friendly, professional, and helpful
- Use emojis sparingly
- NEVER cut responses mid-sentence`;
}
