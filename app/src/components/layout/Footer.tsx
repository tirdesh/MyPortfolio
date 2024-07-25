import { Linkedin, Mail, Phone } from "lucide-react";
import React from "react";
import { siGithub } from "simple-icons";

export const Footer: React.FC = () => {
  return (
    <footer className="p-6 bg-background text-foreground">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="mb-4 md:mb-0">
          &copy; 2024 No Code No Life. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a
            href="https://github.com/tirdesh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 hover:text-primary transition-colors fill-current"
            >
              <title>GitHub</title>
              <path d={siGithub.path} />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/tirdesh"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-5 h-5 hover:text-primary transition-colors" />
          </a>
          <a href="mailto:pettugani.t@northeastern.edu">
            <Mail className="w-5 h-5 hover:text-primary transition-colors" />
          </a>
          <a href="tel:+18573167532">
            <Phone className="w-5 h-5 hover:text-primary transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  );
};
