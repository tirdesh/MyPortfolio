// src/components/AboutMe.tsx

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import React, { useState } from "react";
import MemoryGame from "../components/MemoryGame";
import QuizGame from "../components/QuizGame";
import Timeline from "../components/Timeline";

const aboutItems = [
  {
    title: "Education",
    items: [
      {
        subtitle: "Northeastern University, Boston, MA",
        content: "Master of Science in Information Systems",
        date: "Expected 05/2025",
        details: [
          "GPA: 3.8/4",
          "Related Courses: Web Design and User Experience, Program Structures and Algorithms, OOD and AED",
        ],
      },
      {
        subtitle: "Bennett University, Delhi, India",
        content: "Bachelor of Technology in Computer Science and Engineering",
        date: "May 2020",
        details: [
          "GPA: 8.57/10",
          "Related Courses: High Performance Computing, Operating Systems, Artificial Intelligence and Machine Learning, Big Data and Cloud Computing",
        ],
      },
    ],
  },
  {
    title: "Experience",
    items: [
      {
        subtitle: "Commvault Systems, Hyderabad, India",
        content: "Software Development Engineer",
        date: "01/2021 – 08/2023",
        details: [
          "Collaborated on 7+ revenue-generating projects, earning spot bonuses for UI/UX enhancements and recognition for contributions.",
          "Led migration of Angular applications to React, optimizing performance, and significantly enhancing user experience across projects involving technologies like HDFS, Spark, Impala, Kudu.",
          "Developed a Selenium-Python automation framework for GitHub and Azure DevOps repositories, boosting testing efficiency by 85% and reducing response time by 50%.",
          "Defined comprehensive automation strategies, vastly enhancing software testing processes and automation efficiency in collaboration with cross-functional teams.",
          "Conducted regular code reviews to enhance code quality, analyzed and resolved over 200 customer escalations, led three projects from design to deployment, and mentored 5 interns in Python.",
        ],
      },
      {
        subtitle: "Commvault Systems, Hyderabad, India",
        content: "Associate Engineer",
        date: "07/2020 – 01/2021",
        details: [
          "Created a prize-winning Chrome extension using Node.js and web hooks for enhanced web navigation during the Create 2020 Hackathon.",
          "Managed various Hadoop distributions and MongoDB setups, conducted bare metal recovery across UNIX systems including Rocky Linux, RedHat, CentOS, Ubuntu, and more.",
          "Designed and implemented new regression-focused automation test cases, introduced Agile methodologies reducing time-to-market by 25%, and maintained automation scripts that cut manual testing by 30%.",
        ],
      },
      {
        subtitle: "Commvault Systems, Hyderabad, India",
        content: "Intern",
        date: "01/2020 – 07/2020",
        details: [
          "Automated and validated MongoDB functionality using Python and Selenium and maintained the test automation framework for the MongoDB backup agent while participating in comprehensive testing.",
          "Streamlined features using Python, integrating backend APIs with the requests library for validation and refactoring existing automation code for efficiency.",
        ],
      },
    ],
  },
];

const AboutMe: React.FC = () => {
  const [revealedItems, setRevealedItems] = useState<number[]>([]);
  const [showMemoryGame, setShowMemoryGame] = useState(false);
  const [showQuizGame, setShowQuizGame] = useState(false);
  const [revealAll, setRevealAll] = useState(false);

  const revealItem = (index: number) => {
    if (!revealedItems.includes(index)) {
      setRevealedItems([...revealedItems, index]);
    }
  };

  const toggleRevealAll = () => {
    if (revealAll) {
      setRevealedItems([]);
    } else {
      setRevealedItems(aboutItems.map((_, index) => index));
    }
    setRevealAll(!revealAll);
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4 md:p-8 min-h-[calc(100vh-12rem)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl mx-auto"
      >
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardContent className="p-6">
            <motion.h1
              className="text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Discover More About Me
            </motion.h1>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Button
                onClick={() => setShowMemoryGame(true)}
                className="bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
              >
                Play Memory Game
              </Button>
              <Button
                onClick={() => setShowQuizGame(true)}
                className="bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
              >
                Take a Quiz
              </Button>
              <Button
                onClick={toggleRevealAll}
                className="bg-gray-500 text-white hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500"
              >
                {revealAll ? "Hide All" : "Reveal All"}
              </Button>
            </div>
            <motion.div
              className="space-y-4 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Timeline items={aboutItems} revealedItems={revealedItems} />
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

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
    </div>
  );
};

export default AboutMe;
