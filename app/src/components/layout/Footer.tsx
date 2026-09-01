import { Linkedin, Mail, Phone, Rss } from "lucide-react";
import React from "react";
import { siGithub } from "simple-icons";

export const Footer: React.FC = () => {
  // Was hardcoded to 2024 and went stale for two years.
  const year = new Date().getFullYear();

  return (
    <footer className="p-4 md:p-5 bg-background/95 backdrop-blur-sm border-t border-border/40 text-foreground">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="mb-3 md:mb-0 text-sm md:text-base">
          &copy; {year} No Code No Life. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a
            href="https://github.com/tirdesh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 hover:text-primary transition-colors duration-200 fill-current"
            >
              <title>GitHub</title>
              <path d={siGithub.path} />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/tirdesh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded"
          >
            <Linkedin className="w-5 h-5 hover:text-primary transition-colors duration-200" />
          </a>
          <a 
            href="mailto:pettugani.t@northeastern.edu"
            aria-label="Email"
            className="focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded"
          >
            <Mail className="w-5 h-5 hover:text-primary transition-colors duration-200" />
          </a>
          <a
            href="/blog/rss.xml"
            aria-label="Blog RSS feed"
            className="focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded"
          >
            <Rss className="w-5 h-5 hover:text-primary transition-colors duration-200" />
          </a>
          <a 
            href="tel:+18573167532"
            aria-label="Phone"
            className="focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded"
          >
            <Phone className="w-5 h-5 hover:text-primary transition-colors duration-200" />
          </a>
        </div>
      </div>
    </footer>
  );
};
