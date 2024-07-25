// src/pages/Skills.tsx

import { Card, CardContent } from "@/components/ui/card";
import { skillCategories } from "@/content/SkillList";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import React, { useState } from "react";

const SkillCategory: React.FC<{ category: (typeof skillCategories)[0] }> = ({
  category,
}) => {
  const [expanded, setExpanded] = useState(false);
  const visibleSkills = expanded
    ? category.skills
    : category.skills.slice(0, 5);
  const IconComponent = category.icon;

  return (
    <Card className="h-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <IconComponent className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-2" />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            {category.category}
          </h2>
        </div>
        <ul className="space-y-3">
          <AnimatePresence>
            {visibleSkills.map((skill, skillIndex) => (
              <motion.li
                key={skillIndex}
                className="text-gray-700 dark:text-gray-300"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-medium">{skill.name}</span>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {skill.trivia}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 italic">
                  {skill.fact}
                </p>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        {category.skills.length > 5 && (
          <button
            className="mt-4 flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors duration-200"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                <ChevronUpIcon className="mr-1" /> View Less
              </>
            ) : (
              <>
                <ChevronDownIcon className="mr-1" /> View More
              </>
            )}
          </button>
        )}
      </CardContent>
    </Card>
  );
};

const Skills: React.FC = () => {
  return (
    <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4 md:p-8 min-h-[calc(100vh-12rem)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          My Tech Arsenal
        </h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SkillCategory category={category} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Skills;
