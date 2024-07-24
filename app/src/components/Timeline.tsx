// src/components/Timeline.tsx

import { motion } from "framer-motion";
import React from "react";

interface TimelineItemProps {
  title: string;
  items: {
    subtitle: string;
    content: string;
    date: string;
    details: string[];
  }[];
  isRevealed: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  items,
  isRevealed,
}) => (
  <motion.div
    className="mb-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
      {title}
    </h2>
    <div className="space-y-6">
      {items.map((item, index) => (
        <div
          key={index}
          className="relative pl-8 pb-6 border-l-2 border-purple-500"
        >
          <div className="absolute w-4 h-4 bg-purple-500 rounded-full -left-[9px] top-0"></div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {item.subtitle}
          </h3>
          <p className="text-md text-gray-600 dark:text-gray-300">
            {item.content}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {item.date}
          </p>
          <ul
            className={`mt-2 list-disc list-inside ${
              isRevealed ? "" : "blur-sm"
            }`}
          >
            {item.details.map((detail, detailIndex) => (
              <li
                key={detailIndex}
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                {detail}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </motion.div>
);

interface TimelineProps {
  items: {
    title: string;
    items: {
      subtitle: string;
      content: string;
      date: string;
      details: string[];
    }[];
  }[];
  revealedItems: number[];
}

const Timeline: React.FC<TimelineProps> = ({ items, revealedItems }) => (
  <div className="space-y-8">
    {items.map((item, index) => (
      <TimelineItem
        key={index}
        title={item.title}
        items={item.items}
        isRevealed={revealedItems.includes(index)}
      />
    ))}
  </div>
);

export default Timeline;
