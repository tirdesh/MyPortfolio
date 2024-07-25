// src/content/SkillList.tsx

import {
  BookmarkIcon,
  CodeIcon,
  GlobeIcon,
  TableIcon,
} from "@radix-ui/react-icons";
import { CloudIcon, SettingsIcon } from "lucide-react";

export const skillCategories = [
  {
    category: "Languages",
    icon: CodeIcon,
    skills: [
      {
        name: "Python",
        trivia: "First learned for a data science project in college",
        fact: "Python is known for its simplicity and readability, making it a favorite among beginners and experts alike.",
      },
      {
        name: "Java",
        trivia: "Used extensively in my first internship",
        fact: "Java's 'write once, run anywhere' capability makes it highly versatile for cross-platform applications.",
      },
      {
        name: "JavaScript",
        trivia: "Picked up while building my personal website",
        fact: "JavaScript is the backbone of web development, enabling interactive and dynamic websites.",
      },
      {
        name: "TypeScript",
        trivia: "Adopted for better code maintainability in large projects",
        fact: "TypeScript adds static types to JavaScript, reducing bugs and enhancing code quality.",
      },
      {
        name: "C++",
        trivia: "Learned for competitive programming",
        fact: "C++ is known for its performance and is widely used in system/software development and game programming.",
      },
    ],
  },
  {
    category: "Databases",
    icon: TableIcon,
    skills: [
      {
        name: "MongoDB",
        trivia: "Used in a NoSQL project for a startup",
        fact: "MongoDB's document-oriented storage is ideal for handling large volumes of unstructured data.",
      },
      {
        name: "MySQL",
        trivia: "First database I learned in a web development course",
        fact: "MySQL is the world's most popular open-source database, known for its reliability and ease of use.",
      },
      {
        name: "Oracle DB",
        trivia: "Encountered in an enterprise-level project",
        fact: "Oracle DB is renowned for its robust performance and scalability in handling large-scale applications.",
      },
      {
        name: "SQL Server",
        trivia: "Used extensively in my current job",
        fact: "SQL Server integrates well with other Microsoft products, making it a preferred choice for many businesses.",
      },
      {
        name: "Hive",
        trivia: "Learned for big data processing in a data engineering role",
        fact: "Hive simplifies querying large datasets in Hadoop using a SQL-like interface.",
      },
      {
        name: "HBase",
        trivia: "Used in a distributed computing project",
        fact: "HBase is a non-relational database modeled after Google's Bigtable, designed for real-time read/write access to large datasets.",
      },
    ],
  },
  {
    category: "Web Technologies",
    icon: GlobeIcon,
    skills: [
      {
        name: "React",
        trivia: "My go-to library for frontend development",
        fact: "React's component-based architecture allows for reusable and maintainable UI components.",
      },
      {
        name: "Next.js",
        trivia: "Adopted for its excellent SEO capabilities",
        fact: "Next.js provides server-side rendering and static site generation, enhancing performance and SEO.",
      },
      {
        name: "Node.js",
        trivia: "First server-side JavaScript runtime I learned",
        fact: "Node.js enables JavaScript to be used for server-side scripting, allowing for full-stack development with a single language.",
      },
      {
        name: "Angular",
        trivia: "Used in a large-scale enterprise application",
        fact: "Angular's two-way data binding simplifies the synchronization between the model and the view.",
      },
      {
        name: "Flask",
        trivia: "Preferred for quick Python web projects",
        fact: "Flask is a micro web framework for Python, known for its simplicity and flexibility.",
      },
    ],
  },
  {
    category: "Libraries",
    icon: BookmarkIcon,
    skills: [
      {
        name: "TensorFlow",
        trivia: "Used for deep learning projects in computer vision",
        fact: "TensorFlow is an open-source library for machine learning, developed by Google Brain.",
      },
      {
        name: "Keras",
        trivia: "Preferred for quick prototyping of neural networks",
        fact: "Keras is a high-level neural networks API, written in Python and capable of running on top of TensorFlow.",
      },
      {
        name: "NumPy",
        trivia: "Essential for numerical computing in Python",
        fact: "NumPy provides support for large, multi-dimensional arrays and matrices, along with a collection of mathematical functions.",
      },
      {
        name: "Pandas",
        trivia: "Go-to library for data manipulation and analysis",
        fact: "Pandas offers data structures and operations for manipulating numerical tables and time series.",
      },
      {
        name: "Scikit-learn",
        trivia: "Used extensively for machine learning projects",
        fact: "Scikit-learn is a simple and efficient tool for data mining and data analysis, built on NumPy, SciPy, and matplotlib.",
      },
    ],
  },
  {
    category: "Cloud Platforms",
    icon: CloudIcon,
    skills: [
      {
        name: "Azure",
        trivia: "Primary cloud platform in my current role",
        fact: "Azure offers a wide range of cloud services, including those for computing, analytics, storage, and networking.",
      },
      {
        name: "AWS",
        trivia: "First cloud platform I learned, used for personal projects",
        fact: "AWS is the leading cloud service provider, known for its extensive range of services and global reach.",
      },
      {
        name: "GCP",
        trivia: "Explored for its machine learning capabilities",
        fact: "GCP provides a suite of cloud computing services, including tools for machine learning and data analytics.",
      },
    ],
  },
  {
    category: "Tools",
    icon: SettingsIcon,
    skills: [
      {
        name: "Git",
        trivia: "Essential for all my development work",
        fact: "Git is a distributed version control system, allowing multiple developers to work on a project simultaneously.",
      },
      {
        name: "Azure DevOps",
        trivia: "Used for CI/CD in enterprise projects",
        fact: "Azure DevOps provides developer services for support teams to plan work, collaborate on code development, and build and deploy applications.",
      },
      {
        name: "Selenium",
        trivia: "First automation tool I learned",
        fact: "Selenium is a portable framework for testing web applications, supporting multiple browsers and platforms.",
      },
      {
        name: "UiPath",
        trivia: "Used for RPA projects in finance domain",
        fact: "UiPath is a leading RPA tool, automating repetitive tasks and business processes.",
      },
      {
        name: "MS Office",
        trivia: "Daily driver for documentation and analysis",
        fact: "MS Office is a suite of productivity applications, including Word, Excel, and PowerPoint, widely used in business environments.",
      },
    ],
  },
];
