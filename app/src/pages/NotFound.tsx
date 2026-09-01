// src/pages/NotFound.tsx

import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  // A static SPA cannot answer with a real 404 status, so keep this view out of
  // the index instead. Previously every mistyped URL returned 200 and silently
  // redirected home, which reads to a crawler as a duplicate of the homepage.
  useEffect(() => {
    const tag = document.createElement("meta");
    tag.name = "robots";
    tag.content = "noindex";
    document.head.appendChild(tag);
    return () => {
      document.head.removeChild(tag);
    };
  }, []);

  return (
    <PageContainer maxWidth="7xl">
      <div className="text-center">
        <p className="font-mono text-sm text-purple-600 dark:text-purple-400 mb-3">
          404
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          That page does not exist
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-prose mx-auto">
          The link may be out of date, or the address may have a typo in it.
          Everything below still works.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/projects">Projects</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/skills">Skills</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/contact">Contact</Link>
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default NotFound;
