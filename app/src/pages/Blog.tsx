// src/pages/Blog.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import React from "react";

const blogPosts = [
  {
    title: "My Journey in Tech",
    date: "2024-07-01",
    excerpt: "Reflecting on my experiences and growth in the tech industry...",
    imageUrl: "https://via.placeholder.com/800x600?text=Tech",
  },
  {
    title: "The Future of AI in Software Development",
    date: "2024-06-15",
    excerpt:
      "Exploring the potential impacts of AI on the software development process...",
    imageUrl: "https://via.placeholder.com/800x600?text=AI",
  },
  {
    title: "Building Scalable Web Applications",
    date: "2024-05-30",
    excerpt:
      "Best practices and techniques for creating robust, scalable web apps...",
    imageUrl: "https://via.placeholder.com/800x600?text=Web",
  },
];
const Blog: React.FC = () => {
  return (
    <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4 md:p-8 min-h-[calc(100vh-12rem)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl mx-auto"
      >
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-8 text-center font-serif">
          Tech Chronicles
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover filter sepia"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20"></div>
                </div>
                <CardHeader className="bg-gray-50 dark:bg-gray-700 p-4">
                  <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white font-serif">
                    {post.title}
                  </CardTitle>
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                    {post.date}
                  </p>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-gray-600 dark:text-gray-300 mb-4 font-serif">
                    {post.excerpt}
                  </p>
                  <motion.a
                    href="#"
                    className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 inline-block underline font-serif"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Continue Reading...
                  </motion.a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        {/* Vintage-inspired Ad Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 text-center shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 font-serif">
            Join My Newsletter!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 font-serif">
            Stay up-to-date with the latest tech news!
          </p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded font-serif hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600">
            Learn More
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Blog;
