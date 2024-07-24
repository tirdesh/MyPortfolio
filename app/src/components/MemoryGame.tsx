// src/components/MemoryGame.tsx

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeIcon, ComponentInstanceIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { CloudIcon, DatabaseIcon, X } from "lucide-react";
import React, { useEffect, useState } from "react";

interface CardData {
  id: number;
  content: string;
  icon: React.ReactNode;
  revealed: boolean;
}

const initialCards: CardData[] = [
  {
    id: 1,
    content: "Code",
    icon: <CodeIcon className="w-10 h-10" />,
    revealed: false,
  },
  {
    id: 2,
    content: "Code",
    icon: <CodeIcon className="w-10 h-10" />,
    revealed: false,
  },
  {
    id: 3,
    content: "Cloud",
    icon: <CloudIcon className="w-10 h-10" />,
    revealed: false,
  },
  {
    id: 4,
    content: "Cloud",
    icon: <CloudIcon className="w-10 h-10" />,
    revealed: false,
  },
  {
    id: 5,
    content: "Component",
    icon: <ComponentInstanceIcon className="w-10 h-10" />,
    revealed: false,
  },
  {
    id: 6,
    content: "Component",
    icon: <ComponentInstanceIcon className="w-10 h-10" />,
    revealed: false,
  },
  {
    id: 7,
    content: "Database",
    icon: <DatabaseIcon className="w-10 h-10" />,
    revealed: false,
  },
  {
    id: 8,
    content: "Database",
    icon: <DatabaseIcon className="w-10 h-10" />,
    revealed: false,
  },
];

const shuffleArray = (array: CardData[]) => {
  return array.sort(() => Math.random() - 0.5);
};

interface MemoryGameProps {
  onClose: () => void;
  onReveal: (index: number) => void;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ onClose, onReveal }) => {
  const [cards, setCards] = useState<CardData[]>(
    shuffleArray([...initialCards])
  );
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (matchedPairs === initialCards.length / 2) {
      setGameOver(true);
    }
  }, [matchedPairs]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || cards[index].revealed) return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      if (cards[firstIndex].content === cards[secondIndex].content) {
        const newCards = cards.map((card, i) =>
          i === firstIndex || i === secondIndex
            ? { ...card, revealed: true }
            : card
        );
        setCards(newCards);
        setMatchedPairs(matchedPairs + 1);
        onReveal(matchedPairs);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <Card className="w-11/12 max-w-md bg-white dark:bg-gray-800">
        <CardHeader className="relative flex items-center px-6 py-4">
          <CardTitle className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
            Memory Game
          </CardTitle>
          <Button
            variant="ghost"
            onClick={onClose}
            className="ml-auto text-gray-500 hover:text-gray-700 p-1 h-auto"
          >
            <X className="h-6 w-6" />
          </Button>
        </CardHeader>
        <CardContent className="grid grid-cols-4 gap-4 p-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className={`aspect-square flex items-center justify-center rounded-lg cursor-pointer ${
                card.revealed
                  ? "bg-blue-200 dark:bg-blue-700"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
              onClick={() => handleCardClick(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {card.revealed || flippedCards.includes(index) ? (
                <motion.div
                  initial={{ rotateY: 180 }}
                  animate={{ rotateY: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {card.icon}
                </motion.div>
              ) : (
                <motion.div
                  className="text-4xl font-bold text-gray-400 dark:text-gray-500"
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 180 }}
                  transition={{ duration: 0.5 }}
                >
                  ?
                </motion.div>
              )}
            </motion.div>
          ))}
        </CardContent>
        <CardContent className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Click on the tiles to reveal the icons. Match pairs to unlock
            information about me!
          </p>
        </CardContent>
        {gameOver && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 text-center"
          >
            <p className="text-xl font-semibold mb-4">
              Congratulations! You've revealed all the information about me.
            </p>
            <Button
              onClick={onClose}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Close Game
            </Button>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};

export default MemoryGame;
