// src/components/AboutMe.tsx

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import React, { useState } from "react";
import MemoryGame from "../components/MemoryGame";
import QuizGame from "../components/QuizGame";
import Timeline from "../components/Timeline";
import PageContainer from "@/components/layout/PageContainer";
import { education, experience } from "../content/profile";

const aboutItems = [
  { title: "Education", items: education },
  { title: "Experience", items: experience },
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
