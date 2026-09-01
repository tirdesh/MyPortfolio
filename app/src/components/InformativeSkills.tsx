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
    <Card className="h-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <IconComponent className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-2" />
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
                <p className="text-[13px] text-gray-600 dark:text-gray-300 mt-1 italic">
                  {skill.fact}
                </p>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        {category.skills.length > 5 && (
          <button
            className="mt-4 flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 transition-colors duration-200"
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
  );
};

export default Skills;
