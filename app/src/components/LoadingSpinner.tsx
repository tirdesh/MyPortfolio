import { motion } from "framer-motion";
import React from "react";

const LoadingSpinner: React.FC = () => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const spinnerVariants = {
    initial: { scale: 0.8, rotate: 0 },
    animate: { 
      scale: [0.8, 1, 0.8],
      rotate: 360,
      transition: {
        scale: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotate: {
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        },
      },
    },
  };

  const pulseVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: [0, 1, 0],
      y: [10, 0, -10],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const dotsVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const dotVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-[calc(100vh-12rem)] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          className="relative w-20 h-20"
          variants={spinnerVariants}
          initial="initial"
          animate="animate"
        >
          <div className="absolute inset-0 border-4 border-purple-200 dark:border-purple-800 rounded-full"></div>
          <motion.div
            className="absolute inset-0 border-4 border-transparent border-t-purple-600 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          ></motion.div>
          <motion.div
            className="absolute inset-0 border-4 border-transparent border-r-purple-400 rounded-full"
            animate={{ rotate: -360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          ></motion.div>
        </motion.div>
        
        <motion.div
          className="flex flex-col items-center gap-2"
          variants={pulseVariants}
          initial="initial"
          animate="animate"
        >
          <motion.p
            className="text-gray-600 dark:text-gray-300 text-xl font-semibold"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Loading
          </motion.p>
          <motion.div
            className="flex gap-1"
            variants={dotsVariants}
            initial="initial"
            animate="animate"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-purple-600 rounded-full"
                variants={dotVariants}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;
