import { motion } from "framer-motion";
import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "7xl";
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  maxWidth = "4xl",
  className = "",
}) => {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "4xl": "max-w-4xl",
    "7xl": "max-w-7xl",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div
      className="flex-grow flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4 md:p-8 min-h-[calc(100vh-12rem)]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={contentVariants}
        className={`w-full ${maxWidthClasses[maxWidth]} mx-auto ${className}`}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default PageContainer;
