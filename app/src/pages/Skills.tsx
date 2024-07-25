// src/pages/Skills.tsx

import InformativeSkills from "@/components/InformativeSkills";
import InteractiveSkills from "@/components/InteractiveSkills";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import React from "react";

const Skills: React.FC = () => {
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
              My Tech Arsenal
            </motion.h1>
            <Tabs defaultValue="informative" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-200 dark:bg-gray-700">
                <TabsTrigger
                  value="informative"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white"
                >
                  Informative
                </TabsTrigger>
                <TabsTrigger
                  value="interactive"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white"
                >
                  Interactive
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="informative"
                className="text-gray-800 dark:text-gray-200"
              >
                <InformativeSkills />
              </TabsContent>
              <TabsContent
                value="interactive"
                className="text-gray-800 dark:text-gray-200"
              >
                <InteractiveSkills />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Skills;
