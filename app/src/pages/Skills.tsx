// src/pages/Skills.tsx

import InformativeSkills from "@/components/InformativeSkills";
import InteractiveSkills from "@/components/InteractiveSkills";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import React from "react";
import PageContainer from "@/components/layout/PageContainer";

// Rendered standalone on its own route (h1), and inlined as a section on the
// home page (h2), so the page keeps exactly one top-level heading.
export type SectionHeading = { as?: "h1" | "h2" };

const Skills: React.FC<SectionHeading> = ({ as = "h1" }) => {
  const Heading = motion[as];
  return (
    <PageContainer maxWidth="7xl">
      <Heading
        className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        My Tech Arsenal
      </Heading>
      <Card className="bg-white dark:bg-gray-800 shadow-lg">
        <CardContent className="p-4 sm:p-6 md:p-8">
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
    </PageContainer>
  );
};

export default Skills;
