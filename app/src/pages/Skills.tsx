import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import React from "react";

const skillCategories = [
  {
    category: "Languages",
    skills: ["Python", "Java", "JavaScript", "TypeScript", "C++"],
  },
  {
    category: "Databases",
    skills: ["MongoDB", "MySQL", "Oracle DB", "SQL Server", "Hive", "HBase"],
  },
  // Add more categories here
];

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
          My Skills
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white dark:bg-gray-800 shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                    {category.category}
                  </h2>
                  <ul className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.li
                        key={skillIndex}
                        className="text-gray-600 dark:text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: skillIndex * 0.1 }}
                      >
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Skills;
