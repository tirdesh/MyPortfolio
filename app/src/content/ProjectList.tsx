// src/content/ProjectList.tsx

export interface Project {
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

export const projects: Project[] = [
  {
    id: "learnx",
    title: "LearnX",
    description: "iOS learning platform for mastering Data Structures and Algorithms with structured modules, interactive quizzes, real-time progress tracking, and community-driven discussion forums for mobile-first learning.",
    tech: ["iOS", "SwiftUI", "Firebase"],
    github: "https://github.com/tirdesh/learnx",
    live: "https://youtu.be/lk7-5Qedr1o",
    image:
      "https://raw.githubusercontent.com/tirdesh/MyPortfolio/main/app/src/assets/ncnl.jpeg",
    featured: true,
    challenges:
      "Creating an engaging mobile-first learning experience with real-time progress tracking and community features.",
    solutions:
      "Developed an iOS app using SwiftUI for native performance and Firebase for real-time data synchronization, enabling seamless progress tracking and community interactions.",
  },
  {
    id: "magicletter",
    title: "MagicLetter",
    description: "Scalable cover letter generation application using Firebase and AI providers (Cohere, OpenAI, Claude) with real-time preview, multiple templates, and easy customization for streamlined job application workflows.",
    tech: [
      "Vite",
      "React",
      "Firebase",
      "Shadcn-ui",
      "Tailwind CSS",
      "TypeScript",
      "Cohere",
      "OpenAI",
      "Claude",
    ],
    github: "https://github.com/tirdesh/magicletter",
    live: "https://magicletter.vercel.app",
    image:
      "https://raw.githubusercontent.com/tirdesh/magicletter/main/app/src/assets/image.png",
    featured: true,
    challenges:
      "Ensuring generated cover letters are personalized and relevant. Managing diverse job descriptions and user profiles effectively.",
    solutions:
      "Developed a custom algorithm to match job descriptions with user skills and experiences. Integrated multiple AI providers (Cohere, OpenAI, Claude) for improved content relevance and customization with real-time preview capabilities.",
  },
  {
    id: "findaroomie",
    title: "Find A Roomie",
    description: "Web application streamlining accommodation search for international students with integrated real-time messaging, blog features, and collaborative tools to facilitate roommate connections.",
    tech: ["MERN stack", "React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/tirdesh/findaroomie",
    live: "https://find-a-roomie.vercel.app",
    image:
      "https://raw.githubusercontent.com/tirdesh/FindARoomie/main/frontend/public/logo512.png",
    featured: true,
    challenges:
      "Implementing real-time messaging and collaborative features for international students to find suitable roommates.",
    solutions:
      "Utilized MERN stack for full-stack development with real-time messaging capabilities. Enhanced search algorithms and integrated blog features to facilitate better roommate connections and community building.",
  },
  {
    id: "intellidiary",
    title: "IntelliDiary",
    description: "AI-powered journal diary app for BuildSpace.so",
    tech: ["MERN stack", "Artificial Intelligence"],
    github: "https://github.com/tirdesh/intellidiary",
    live: "https://intellidiary.example.com",
    image:
      "https://raw.githubusercontent.com/tirdesh/MyPortfolio/main/app/src/assets/ncnl.jpeg",
    challenges:
      "Implementing natural language processing for sentiment analysis. Ensuring the accuracy of sentiment analysis across diverse user entries.",
    solutions:
      "Utilized OpenAI's GPT-3 API for advanced text analysis and generation. Implemented custom algorithms to enhance the accuracy of sentiment analysis and feedback generation.",
  },
  {
    id: "dispatchgenius",
    title: "DispatchGenius",
    description: "Delivery management system for international students",
    tech: ["Java", "JavaFX", "FXML", "CSS"],
    github: "https://github.com/tirdesh/dispatchgenius",
    live: "https://dispatchgenius.example.com",
    image:
      "https://raw.githubusercontent.com/tirdesh/DispatchGenius/main/src/images/background/Untitled%20Project%20(1).jpg",
    challenges:
      "Addressing the complex needs of international students for accessing necessities and sending gifts. Ensuring cost-effective and reliable delivery solutions.",
    solutions:
      "Developed a user-friendly platform with features like streamlined scheduling and robust feedback systems. Implemented modular architecture for scalability and secure user authentication.",
  },
  {
    id: "eatwise",
    title: "EatWise",
    description: "Dietary management system",
    tech: ["Java", "JavaFX", "FXML", "CSS"],
    github: "https://github.com/tirdesh/eatwise",
    live: "https://eatwise.example.com",
    image:
      "https://raw.githubusercontent.com/tirdesh/EatWise/main/EATWISEGUI_Images/nutritionWatch.png",
    challenges:
      "Tracking and managing diverse nutritional data. Ensuring user-friendly interfaces for dietary logging and goal setting.",
    solutions:
      "Developed Nutri Match and Nutri Sort features for discovering nutritionally similar foods and organizing items by nutritional value. Designed intuitive UI/UX for ease of use.",
  },
  {
    id: "pybot",
    title: "PyBot: Indoor Navigating Bot",
    description: "AI-driven navigation bot for indoor environments",
    tech: ["Python", "Artificial Intelligence"],
    github: "https://github.com/tirdesh/pybot",
    live: "https://indoornavigatingbot.example.com",
    image:
      "https://raw.githubusercontent.com/tirdesh/MyPortfolio/main/app/src/assets/ncnl.jpeg",
    challenges:
      "Optimizing pathfinding algorithms for indoor navigation. Reducing collisions with obstacles.",
    solutions:
      "Utilized the A* pathfinding algorithm for efficient route calculation. Implemented advanced obstacle avoidance techniques to reduce collisions by up to 70%.",
  },
  {
    id: "bubank",
    title: "BUBank",
    description: "Basic banking system simulation",
    tech: ["Python", "EasyGUI"],
    github: "https://github.com/tirdesh/bubank",
    live: "https://bubank.example.com",
    image:
      "https://raw.githubusercontent.com/tirdesh/MyPortfolio/main/app/src/assets/ncnl.jpeg",
    challenges:
      "Ensuring secure and reliable data storage. Verifying customer identities through Aadhar card details and handling user authentication.",
    solutions:
      "Implemented account creation with verification using Aadhar card details and date of birth. Utilized text files for data persistence, ensuring reliable storage of customer information.",
  },
  {
    id: "sine",
    title: "sine",
    description: "Movie recommendation system",
    tech: ["Python", "Machine Learning"],
    github: "https://github.com/tirdesh/sine",
    live: "https://sine.example.com",
    image:
      "https://raw.githubusercontent.com/tirdesh/MyPortfolio/main/app/src/assets/ncnl.jpeg",
    challenges:
      "Generating accurate recommendations based on user preferences and behavior. Ensuring high user satisfaction with recommendations.",
    solutions:
      "Employing collaborative filtering techniques to analyze user preferences and behavior. Achieved a 70% user satisfaction rate by tailoring recommendations to similar user profiles.",
  },
];
