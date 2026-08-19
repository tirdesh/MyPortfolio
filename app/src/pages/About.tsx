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
          "Related Courses: Knowledge Graphs with LLM/Graph DB, WebDev Tools, Program Structures and Algorithms",
        ],
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
        subtitle: "DMSB AI Strategic Hub, Boston, USA",
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
        content: "IT Intern",
        date: "01/2025 – 06/2025",
        details: [
          "Architected an AI-assisted knowledge retrieval system using Gemini models and Vertex AI with RAG capabilities, developing a Python FastAPI backend to process research documents and power an internal chatbot for intelligent query responses.",
          "Developed interactive dashboards integrating multiple service APIs for data visualization and automated reporting, reducing manual data compilation time by 60% and streamlining cross-team access to research information.",
        ],
      },
      {
        subtitle: "Commvault Systems, Hyderabad, India",
        content: "Software Development Engineer",
        date: "01/2021 – 08/2023",
        details: [
          "Contributed to 7+ revenue-generating projects over 4 years, delivering key features and enhancements that earned spot bonuses and company recognition for technical excellence.",
          "Designed and engineered responsive React components from Figma mockups, collaborating with design and backend teams to ensure seamless UI/UX and efficient data integration via GraphQL and REST APIs.",
          "Implemented a Selenium-Python automation framework to validate backup and recovery functionality for GitHub and Azure DevOps repositories, boosting verification efficiency by 85% and reducing validation time by 50%.",
          "Led 3 full-cycle projects from design to deployment, conducted code reviews to maintain quality standards, and mentored 5 junior engineers in Python development and best practices.",
          "Resolved 200+ customer escalations through systematic debugging and root cause analysis, improving product reliability and customer satisfaction.",
        ],
      },
      {
        subtitle: "Commvault Systems, Hyderabad, India",
        content: "Associate Engineer",
        date: "01/2020 – 01/2021",
        details: [
          "Won internal hackathon (Create 2020) by developing a Chrome extension using Node.js and webhooks that enhanced web navigation workflows for internal tools.",
          "Managed Hadoop distributions and MongoDB deployments, conducting bare metal recovery across UNIX systems (Rocky Linux, RedHat, CentOS, Ubuntu) to ensure system reliability and data integrity.",
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
