// src/pages/Skills.tsx

import { skillCategories } from "@/content/SkillList";
import {
  ActiveElement,
  ArcElement,
  ChartEvent,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from "chart.js";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const BUBBLE_SIZE = 80;
const BORDER_PADDING = 20;

const getRandomPosition = (width: number, height: number) => ({
  x:
    Math.random() * (width - BUBBLE_SIZE - 2 * BORDER_PADDING) + BORDER_PADDING,
  y:
    Math.random() * (height - BUBBLE_SIZE - 2 * BORDER_PADDING) +
    BORDER_PADDING,
});

const getRandomVelocity = () => ({
  x: (Math.random() - 0.5) * 4,
  y: (Math.random() - 0.5) * 4,
});

const MIN_BUBBLE_SIZE = 60;
const MAX_BUBBLE_SIZE = 120;

const SkillCategoryBubble: React.FC<{
  category: (typeof skillCategories)[0];
  onClick: () => void;
  containerSize: { width: number; height: number };
  maxSkillCount: number;
}> = ({ category, onClick, containerSize, maxSkillCount }) => {
  const controls = useAnimation();

  // Calculate bubble size based on skill count
  const skillCount = category.skills.length;
  const bubbleSize =
    MIN_BUBBLE_SIZE +
    (MAX_BUBBLE_SIZE - MIN_BUBBLE_SIZE) * (skillCount / maxSkillCount);

  const [position, setPosition] = useState(
    getRandomPosition(containerSize.width, containerSize.height)
  );
  const [velocity, setVelocity] = useState(getRandomVelocity());

  useEffect(() => {
    const updatePosition = () => {
      let newX = position.x + velocity.x;
      let newY = position.y + velocity.y;
      let newVelocityX = velocity.x;
      let newVelocityY = velocity.y;

      if (
        newX <= BORDER_PADDING ||
        newX >= containerSize.width - bubbleSize - BORDER_PADDING
      ) {
        newVelocityX = -newVelocityX;
        newX = Math.max(
          BORDER_PADDING,
          Math.min(newX, containerSize.width - bubbleSize - BORDER_PADDING)
        );
      }
      if (
        newY <= BORDER_PADDING ||
        newY >= containerSize.height - bubbleSize - BORDER_PADDING
      ) {
        newVelocityY = -newVelocityY;
        newY = Math.max(
          BORDER_PADDING,
          Math.min(newY, containerSize.height - bubbleSize - BORDER_PADDING)
        );
      }

      setPosition({ x: newX, y: newY });
      setVelocity({ x: newVelocityX, y: newVelocityY });
      controls.set({ x: newX, y: newY });
    };

    const interval = setInterval(updatePosition, 50);
    return () => clearInterval(interval);
  }, [position, velocity, controls, containerSize, bubbleSize]);

  return (
    <motion.div
      className="absolute flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white cursor-pointer"
      style={{ width: bubbleSize, height: bubbleSize }}
      animate={controls}
      onClick={onClick}
    >
      <span className="text-center text-sm">{category.category}</span>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    (typeof skillCategories)[0] | null
  >(null);
  const [selectedSkill, setSelectedSkill] = useState<{
    name: string;
    trivia: string;
    fact: string;
  } | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const pieData = {
    labels: selectedCategory?.skills.map((skill) => skill.name) || [],
    datasets: [
      {
        data: selectedCategory?.skills.map(() => 1) || [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "right" as const,
        labels: {
          color: "white",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: { dataIndex: number }) => {
            const skill = selectedCategory?.skills[context.dataIndex];
            return skill ? skill.name : "";
          },
        },
      },
    },
    onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        setSelectedSkill(selectedCategory?.skills[index] || null);
      }
    },
  };
  const maxSkillCount = Math.max(
    ...skillCategories.map((category) => category.skills.length)
  );
  return (
    <div className="relative flex-grow flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4 md:p-8 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-200 mb-8">My Skills</h1>
      <div
        ref={containerRef}
        className="border-4 border-indigo-500 rounded-lg w-full h-[calc(100vh-120px)]"
      >
        {!selectedCategory &&
          skillCategories.map((category, index) => (
            <SkillCategoryBubble
              key={index}
              category={category}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedSkill(null); // Close skill info if another category is clicked
              }}
              containerSize={containerSize}
              maxSkillCount={maxSkillCount}
            />
          ))}
        <AnimatePresence>
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative w-full h-full max-w-3xl max-h-3xl p-8">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[80%] h-[80%] relative">
                        <div className="absolute top-3 left-0 right-12 text-white text-center font-semibold py-2 rounded-md shadow-lg">
                          Click on a skill slice to learn more
                        </div>
                        <Pie data={pieData} options={pieOptions} />
                        <button
                          className="absolute top-2 right-2 text-white z-10 bg-red-500 rounded-full w-8 h-8 flex items-center justify-center"
                          onClick={() => {
                            setSelectedCategory(null);
                            setSelectedSkill(null);
                          }}
                        >
                          X
                        </button>
                        {selectedSkill && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <div className="relative bg-gray-800 rounded-full w-[45%] h-[45%] flex items-center justify-center p-4 border-2 border-indigo-300">
                              <button
                                className="absolute top-1 right-1 text-white z-10 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                                onClick={() => setSelectedSkill(null)}
                              >
                                X
                              </button>
                              <div className="text-center">
                                <h3 className="text-lg font-bold text-white mb-2">
                                  {selectedSkill.name}
                                </h3>
                                <p className="text-sm text-gray-300 mb-2">
                                  {selectedSkill.trivia}
                                </p>
                                <p className="text-xs text-gray-400 italic">
                                  {selectedSkill.fact}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Skills;
