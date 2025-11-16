import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useRef, useState } from "react";
import ProfilePic from "../assets/ProfilePicc.png";
import { generateAIResponse } from "../utils/aiTerminal";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import About from "./About";
import Projects from "./Projects";
import Skills from "./Skills";
import Contact from "./Contact";

const LandingPage: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { type: "user" | "bot"; content: string }[]
  >([
    { type: "bot", content: "Welcome to my interactive portfolio! 👋" },
    { type: "bot", content: "Ask me anything - try 'Tell me about your projects' or 'What are your skills?'" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const smallScreenChatRef = useRef<HTMLDivElement>(null);

  // Funky rotating placeholders
  const mobilePlaceholders = [
    "💬 Ask me anything...",
    "🚀 What's your favorite project?",
    "🤖 Tell me about your AI work",
    "⚡ What technologies do you use?",
    "🎯 What's your experience?",
    "💡 Show me your skills",
    "🔥 What are you working on?",
    "✨ Tell me something cool",
  ];

  const terminalPlaceholders = [
    "$ ask me anything...",
    "$ what projects have you built?",
    "$ tell me about your AI/ML work",
    "$ what tech stack do you use?",
    "$ what's your background?",
    "$ show me your skills",
    "$ what are you currently working on?",
    "$ tell me something interesting",
    "$ how did you get into coding?",
    "$ what's your favorite language?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (smallScreenChatRef.current) {
      smallScreenChatRef.current.scrollTop =
        smallScreenChatRef.current.scrollHeight;
    }
  };

  useEffect(scrollToBottom, [messages]);

  // Rotate placeholders every 3 seconds
  // Use the maximum length to ensure all placeholders are accessible
  const maxPlaceholderLength = Math.max(mobilePlaceholders.length, terminalPlaceholders.length);
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % maxPlaceholderLength);
    }, 3000);
    return () => clearInterval(interval);
  }, [maxPlaceholderLength]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = input.trim();
      setMessages([...messages, { type: "user", content: userMessage }]);
      processCommand(userMessage);
      setInput("");
    }
  };

  const processCommand = async (command: string) => {
    setIsTyping(true);
    
    try {
      const response = await generateAIResponse(command);
      setMessages((prev) => [...prev, { type: "bot", content: response }]);
    } catch (error) {
      setMessages((prev) => [...prev, { type: "bot", content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full">
      {/* Home Section */}
      <section id="home" className="flex-grow flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4 md:p-8 min-h-[calc(100vh-12rem)]">
        <div className="w-full max-w-7xl mx-auto">
          {/* Content for small screens */}
          <div className="md:hidden text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-2">
              Tirdesh Pettugani
            </h1>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
              Full Stack Developer & AI Engineer
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-left px-4">
              Passionate about creating innovative web solutions and bringing ideas to life through code.
            </p>
            <div className="space-x-4 mb-4">
              <Button
                className="bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/Tirdesh-Resume.pdf";
                  link.download = "Tirdesh-Resume.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                aria-label="Download resume"
              >
                Download CV
              </Button>
              <Button
                className="bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 hover:shadow-lg transition-all duration-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Contact Me
              </Button>
            </div>
          </div>

          {/* Chatbot for small screens */}
          <Card className="w-full max-w-sm mx-auto md:hidden bg-white dark:bg-gray-800 shadow-lg">
            <CardContent className="p-4">
              <div
                ref={smallScreenChatRef}
                className="max-h-[50vh] min-h-[300px] w-full rounded border p-4 mb-4 bg-gray-100 dark:bg-gray-900 overflow-y-auto"
              >
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-4 flex ${
                      msg.type === "user"
                        ? "justify-end"
                        : "justify-start items-end"
                    }`}
                  >
                    {msg.type === "bot" && (
                      <img
                        src={ProfilePic}
                        alt="Tirdesh Pettugani"
                        className="w-8 h-8 rounded-full mr-2 mb-1"
                      />
                    )}
                    <span
                      className={`inline-block p-2 rounded-lg ${
                        msg.type === "user"
                          ? "bg-purple-500 text-white"
                          : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      }`}
                      style={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        maxWidth: "80%",
                      }}
                    >
                      {msg.type === "bot" ? (
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => <p className="mb-1">{children}</p>,
                            strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                            em: ({ children }) => <em className="italic">{children}</em>,
                            ul: ({ children }) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
                            li: ({ children }) => <li className="mb-0.5">{children}</li>,
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      ) : (
                        msg.content
                      )}
                    </span>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex">
                <Input
                  type="text"
                  placeholder={mobilePlaceholders[placeholderIndex % mobilePlaceholders.length]}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-grow mr-2 transition-all duration-300"
                  onFocus={() => setPlaceholderIndex((prev) => (prev + 1) % mobilePlaceholders.length)}
                />
                <Button
                  type="submit"
                  className="bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                  aria-label="Send message"
                >
                  Send
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Two-column layout for larger screens */}
          <div className="hidden md:flex md:space-x-8 items-center min-h-[calc(100vh-12rem)]">
            {/* Left column: Personal information */}
            <div className="w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                Tirdesh Pettugani
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                Full Stack Developer & AI Engineer
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Passionate about creating innovative web solutions and bringing ideas to life through code.
              </p>
              <div className="mb-6">
                <img
                  src={ProfilePic}
                  alt="Tirdesh Pettugani"
                  className="rounded-full w-48 h-48 object-cover border-4 border-white dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  loading="eager"
                />
              </div>
              <div className="space-x-4">
                <Button
                  className="bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = "/Tirdesh-Resume.pdf";
                    link.download = "Tirdesh-Resume.pdf";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  aria-label="Download resume"
                >
                  Download CV
                </Button>
                <Button
                  className="bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 hover:shadow-lg transition-all duration-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  onClick={() => {
                    const contactSection = document.getElementById("contact");
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  Contact Me
                </Button>
              </div>
            </div>

            {/* Right column: Terminal */}
            <div className="w-1/2">
              <Card className="w-full bg-black border-gray-700">
                <CardContent className="p-6">
                  <ScrollArea
                    className="h-[400px] w-full rounded border border-gray-700 p-4 bg-black text-green-500"
                    ref={scrollAreaRef}
                  >
                    <pre
                      className="font-mono text-sm"
                      style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                    >
                      {messages.map((msg, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={
                            msg.type === "user"
                              ? "text-cyan-400"
                              : "text-green-500"
                          }
                        >
                          {msg.type === "user" ? "$ " : "> "}
                          {msg.type === "bot" ? (
                            <ReactMarkdown
                              components={{
                                p: ({ children }) => <p className="mb-1">{children}</p>,
                                strong: ({ children }) => <strong className="font-bold text-green-400">{children}</strong>,
                                em: ({ children }) => <em className="italic">{children}</em>,
                                ul: ({ children }) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
                                li: ({ children }) => <li className="mb-0.5">{children}</li>,
                              }}
                            >
                              {msg.content}
                            </ReactMarkdown>
                          ) : (
                            msg.content
                          )}
                        </motion.div>
                      ))}
                      {isTyping && (
                        <div className="text-green-400">
                          {"> "}
                          <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            Thinking...
                          </motion.span>
                        </div>
                      )}
                    </pre>
                    <div ref={messagesEndRef} />
                  </ScrollArea>
                  <form onSubmit={handleSubmit} className="mt-4 flex">
                    <div className="flex-grow mr-2 relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 font-mono text-sm pointer-events-none">
                        {">"}
                      </span>
                      <Input
                        type="text"
                        placeholder={terminalPlaceholders[placeholderIndex % terminalPlaceholders.length]}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full pl-6 bg-gray-800 text-green-500 border-gray-700 placeholder:text-green-500/50 font-mono transition-all duration-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        disabled={isTyping}
                        onFocus={() => setPlaceholderIndex((prev) => (prev + 1) % terminalPlaceholders.length)}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="bg-green-700 text-white hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-mono"
                      aria-label="Send message"
                      disabled={isTyping}
                    >
                      {isTyping ? "..." : "→"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <motion.section
        id="about"
        className="scroll-mt-16 py-16 md:py-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 [&>div]:!bg-transparent [&>div]:!p-0 [&>div]:!min-h-0"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <About />
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className="scroll-mt-16 py-16 md:py-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 [&>div]:!bg-transparent [&>div]:!p-0 [&>div]:!min-h-0"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <Projects />
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        className="scroll-mt-16 py-16 md:py-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 [&>div]:!bg-transparent [&>div]:!p-0 [&>div]:!min-h-0"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <Skills />
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="scroll-mt-16 py-16 md:py-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 [&>div]:!bg-transparent [&>div]:!p-0 [&>div]:!min-h-0"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <Contact />
      </motion.section>
    </div>
  );
};

export default LandingPage;
