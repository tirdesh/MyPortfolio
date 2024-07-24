// src/components/QuizGame.tsx

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
  revealInfo: string;
}

const questions: Question[] = [
  {
    text: "Guess my favorite programming language?",
    options: ["JavaScript", "Python", "Java", "C++"],
    correctAnswer: 1,
    revealInfo:
      "I love Python for its simplicity and versatility in data science and web development!",
  },
  {
    text: "Which project am I most proud of?",
    options: ["IntelliDiary", "MagicLetter", "EatWise", "Find A Roomie"],
    correctAnswer: 0,
    revealInfo:
      "IntelliDiary combines my passion for AI and personal productivity tools.",
  },
  {
    text: "Where did I work before pursuing my Master's degree?",
    options: ["Google", "Microsoft", "Commvault Systems", "Amazon"],
    correctAnswer: 2,
    revealInfo:
      "I spent over 3 years at Commvault Systems, growing from an intern to a Software Development Engineer.",
  },
  // Add more questions as needed
];

const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

interface QuizGameProps {
  onClose: () => void;
  onReveal: (index: number) => void;
}

const QuizGame: React.FC<QuizGameProps> = ({ onClose, onReveal }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  const handleSubmit = useCallback(() => {
    if (selectedAnswer === null) {
      // Time's up or no answer selected
      setShowResult(true);
      return;
    }

    if (
      shuffledOptions[selectedAnswer] ===
      questions[currentQuestion].options[
        questions[currentQuestion].correctAnswer
      ]
    ) {
      setScore(score + 1);
    }

    onReveal(currentQuestion);
    setShowResult(true);
  }, [selectedAnswer, shuffledOptions, currentQuestion, score, onReveal]);

  useEffect(() => {
    setShuffledOptions(shuffleArray([...questions[currentQuestion].options]));
    setSelectedAnswer(null);
    setTimeLeft(30);
  }, [currentQuestion]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, handleSubmit]);

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

  const handleNext = () => {
    if (currentQuestion >= questions.length - 1) {
      setGameOver(true);
      questions.forEach((_, index) => onReveal(index));
    } else {
      setShowResult(false);
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    }
  };

  if (gameOver) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <Card className="w-11/12 max-w-lg bg-white dark:bg-gray-800">
          <CardHeader className="text-center py-6">
            <CardTitle className="text-3xl font-bold">
              Congratulations!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-center"
            >
              You've completed the quiz and revealed all information about me.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <p className="text-lg font-semibold">Your Score</p>
              <p className="text-3xl font-bold text-primary">
                {score} out of {questions.length}
              </p>
            </motion.div>
          </CardContent>
          <CardFooter className="flex justify-center pt-2 pb-6">
            <Button onClick={onClose} className="w-full max-w-xs">
              Close
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <Card className="w-11/12 max-w-lg bg-white dark:bg-gray-800">
        <CardHeader className="relative flex items-center px-6 py-4">
          <CardTitle className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
            Quiz: Get to Know Me!
          </CardTitle>
          <Button
            variant="ghost"
            onClick={onClose}
            className="ml-auto text-gray-500 hover:text-gray-700 p-1 h-auto"
          >
            <X className="h-6 w-6" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <p className="text-lg flex-grow mr-4">
              {questions[currentQuestion].text}
            </p>
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <span className="text-lg font-bold">{timeLeft}</span>
            </div>
          </div>
          <RadioGroup
            onValueChange={(value) => setSelectedAnswer(parseInt(value))}
            value={
              selectedAnswer !== null ? selectedAnswer.toString() : undefined
            }
            className="space-y-2"
          >
            {shuffledOptions.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-grow cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <AnimatePresence>
            {!showResult ? (
              <Button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="w-full"
              >
                Submit Answer
              </Button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full"
              >
                <p className="mb-4 text-center">
                  {shuffledOptions[selectedAnswer!] ===
                  questions[currentQuestion].options[
                    questions[currentQuestion].correctAnswer
                  ]
                    ? "Correct! "
                    : "Oops, that's not right. "}
                  {questions[currentQuestion].revealInfo}
                </p>
                <Button onClick={handleNext} className="w-full">
                  {currentQuestion >= questions.length - 1
                    ? "Finish Quiz"
                    : "Next Question"}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default QuizGame;
