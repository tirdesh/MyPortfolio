import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import React from "react";

const blogPosts = [
  {
    title: "My Journey in Tech",
    date: "2024-07-01",
    excerpt: "Reflecting on my experiences and growth in the tech industry...",
    imageUrl: "https://source.unsplash.com/random/800x600?tech",
  },
  {
    title: "The Future of AI in Software Development",
    date: "2024-06-15",
    excerpt:
      "Exploring the potential impacts of AI on the software development process...",
    imageUrl: "https://source.unsplash.com/random/800x600?ai",
  },
  {
    title: "Building Scalable Web Applications",
    date: "2024-05-30",
    excerpt:
      "Best practices and techniques for creating robust, scalable web apps...",
    imageUrl: "https://source.unsplash.com/random/800x600?web",
  },
  // Add more blog posts here
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
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          My Blog
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {post.date}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.excerpt}
                  </p>
                  <motion.a
                    href="#"
                    className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 inline-block"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Read more
                  </motion.a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Blog;
