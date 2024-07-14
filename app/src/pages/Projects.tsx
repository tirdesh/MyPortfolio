import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import React from "react";

const projects = [
  {
    title: "IntelliDiary",
    description: "AI-powered journal diary app for BuildSpace.so",
    tech: "MERN stack, Artificial Intelligence",
    link: "https://github.com/tirdesh/intellidiary",
  },
  {
    title: "MagicLetter",
    description: "Cover letter generation application",
    tech: "Vite React, Firebase, Shadcn-ui, Tailwind CSS",
    link: "https://github.com/tirdesh/magicletter",
  },
  // Add more projects here
];

const Projects: React.FC = () => {
  return (
    <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4 md:p-8 min-h-[calc(100vh-12rem)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          My Projects
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                    {project.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Tech: {project.tech}
                  </p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                  >
                    View Project
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Projects;
