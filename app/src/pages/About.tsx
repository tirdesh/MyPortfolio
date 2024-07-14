import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import React from "react";

const About: React.FC = () => {
  return (
    <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4 md:p-8 min-h-[calc(100vh-12rem)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl mx-auto"
      >
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardContent className="p-6">
            <motion.h1
              className="text-4xl font-bold text-gray-800 dark:text-white mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              About Me
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              I'm Tirdesh Pettugani, a Full Stack Developer with a passion for
              creating innovative web solutions. With a background in
              Information Systems from Northeastern University and over 4 years
              of experience at Commvault Systems, I've honed my skills in
              various technologies and led multiple successful projects.
            </motion.p>
            <motion.div
              className="grid md:grid-cols-2 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div>
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Education
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Master of Science in Information Systems
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Northeastern University, Boston, MA
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Experience
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Software Development Engineer
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Commvault Systems, Hyderabad, India
                </p>
              </div>
            </motion.div>
            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Button className="bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600">
                Download CV
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default About;
