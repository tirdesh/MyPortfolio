// src/pages/Projects.tsx

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  GitHubLogoIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import React, { useMemo, useState } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  image: string;
  featured?: boolean;
  challenges?: string;
  solutions?: string;
}

const projects: Project[] = [
  {
    id: "intellidiary",
    title: "IntelliDiary",
    description: "AI-powered journal diary app for BuildSpace.so",
    tech: ["MERN stack", "Artificial Intelligence"],
    github: "https://github.com/tirdesh/intellidiary",
    live: "https://intellidiary.example.com",
    image: "/path/to/intellidiary-image.jpg",
    featured: true,
    challenges:
      "Implementing natural language processing for sentiment analysis.",
    solutions:
      "Utilized OpenAI's GPT-3 API for advanced text analysis and generation.",
  },
  {
    id: "magicletter",
    title: "MagicLetter",
    description: "Cover letter generation application",
    tech: ["Vite React", "Firebase", "Shadcn-ui", "Tailwind CSS", "TypeScript"],
    github: "https://github.com/tirdesh/magicletter",
    live: "https://magicletter.example.com",
    image: "/path/to/magicletter-image.jpg",
    challenges:
      "Ensuring generated cover letters are personalized and relevant.",
    solutions:
      "Developed a custom algorithm to match job descriptions with user skills and experiences.",
  },
  // ... Add more projects with challenges and solutions
];

const ITEMS_PER_PAGE = 6;

const Projects: React.FC = () => {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = useMemo(() => {
    return projects.filter(
      (project) =>
        (filter === "All" || project.tech.includes(filter)) &&
        (project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.tech.some((tech) =>
            tech.toLowerCase().includes(searchTerm.toLowerCase())
          ))
    );
  }, [filter, searchTerm]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  const currentProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  const uniqueTechnologies = Array.from(
    new Set(projects.flatMap((project) => project.tech))
  );

  const renderTechTags = (tech: string[]) => {
    if (tech.length <= 3) {
      return tech.map((t, index) => (
        <span
          key={index}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded"
        >
          {t}
        </span>
      ));
    } else {
      return (
        <>
          {tech.slice(0, 3).map((t, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded"
            >
              {t}
            </span>
          ))}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded cursor-pointer">
                  +{tech.length - 3}
                </span>
              </TooltipTrigger>
              <TooltipContent>{tech.slice(3).join(", ")}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      );
    }
  };

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

        <div className="mb-8 flex flex-col gap-4">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
          </div>
          <Select
            onValueChange={(value) => {
              setFilter(value);
              setCurrentPage(1);
            }}
            defaultValue="All"
          >
            <SelectTrigger className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white">
              <SelectValue placeholder="Filter by technology" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
              <SelectItem value="All" className="text-gray-800 dark:text-white">
                All Technologies
              </SelectItem>
              {uniqueTechnologies.map((tech) => (
                <SelectItem
                  key={tech}
                  value={tech}
                  className="text-gray-800 dark:text-white"
                >
                  {tech}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <AnimatePresence>
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            layout
          >
            {currentProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Card className="h-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden relative">
                  {project.featured && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold">
                      Featured
                    </div>
                  )}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                      {project.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {renderTechTags(project.tech)}
                    </div>
                    <div className="flex justify-between items-center">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 flex items-center"
                      >
                        <GitHubLogoIcon className="mr-2" /> GitHub
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 flex items-center"
                      >
                        <ExternalLinkIcon className="mr-2" /> Live Demo
                      </a>
                    </div>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="mt-4 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors duration-300"
                    >
                      Learn More
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center space-x-4">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-purple-600 text-white"
            >
              <ChevronLeftIcon className="mr-2" /> Previous
            </Button>
            <span className="text-gray-600 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="bg-purple-600 text-white"
            >
              Next <ChevronRightIcon className="ml-2" />
            </Button>
          </div>
        )}
      </motion.div>

      <Dialog
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        <DialogContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              {selectedProject?.title}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            <p className="mb-4">{selectedProject?.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedProject?.tech.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
              Challenges:
            </h3>
            <p className="mb-4">{selectedProject?.challenges}</p>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
              Solutions:
            </h3>
            <p>{selectedProject?.solutions}</p>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Projects;
