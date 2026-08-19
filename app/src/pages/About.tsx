// src/components/AboutMe.tsx

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import React, { useState } from "react";
import MemoryGame from "../components/MemoryGame";
import QuizGame from "../components/QuizGame";
import Timeline from "../components/Timeline";
import PageContainer from "@/components/layout/PageContainer";

const aboutItems = [
  {
    title: "Education",
    items: [
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
      },
    ],
  },
  {
    title: "Experience",
    items: [
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
    ],
  },
];

const AboutMe: React.FC = () => {
  const [revealedItems, setRevealedItems] = useState<number[]>([]);
  const [showMemoryGame, setShowMemoryGame] = useState(false);
  const [showQuizGame, setShowQuizGame] = useState(false);

  const revealItem = (index: number) => {
    if (!revealedItems.includes(index)) {
      setRevealedItems([...revealedItems, index]);
    }
  };

  // Check if all items are revealed
  const allRevealed = revealedItems.length === aboutItems.length;

  const toggleRevealAll = () => {
    if (allRevealed) {
      setRevealedItems([]);
    } else {
      setRevealedItems(aboutItems.map((_, index) => index));
    }
  };

  return (
    <PageContainer maxWidth="7xl">
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Discover More About Me
      </motion.h1>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <Button
          onClick={() => setShowMemoryGame(true)}
          className="bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          aria-label="Play memory game"
        >
          Play Memory Game
        </Button>
        <Button
          onClick={() => setShowQuizGame(true)}
          className="bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          aria-label="Take a quiz"
        >
          Take a Quiz
        </Button>
        <Button
          onClick={toggleRevealAll}
          className="bg-gray-500 text-white hover:bg-gray-600 dark:bg-white dark:text-gray-800 hover:bg-gray-600 dark:hover:bg-gray-200 transition-all duration-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          aria-label={allRevealed ? "Hide all details" : "Reveal all details"}
        >
          {allRevealed ? "Hide All" : "Reveal All"}
        </Button>
      </div>
      <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-8">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Timeline items={aboutItems} revealedItems={revealedItems} />
          </motion.div>
        </CardContent>
      </Card>

      {showMemoryGame && (
        <MemoryGame
          onClose={() => setShowMemoryGame(false)}
          onReveal={revealItem}
        />
      )}
      {showQuizGame && (
        <QuizGame
          onClose={() => setShowQuizGame(false)}
          onReveal={revealItem}
        />
      )}
    </PageContainer>
  );
};

export default AboutMe;
