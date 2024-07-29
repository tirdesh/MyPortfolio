import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePic from "../assets/ProfilePicc.png";
import { commandResponses } from "../utils/commandResponses";

const LandingPage: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { type: "user" | "bot"; content: string }[]
  >([
    { type: "bot", content: "Welcome to my interactive portfolio!" },
    { type: "bot", content: "Type 'help' to see available commands." },
  ]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const smallScreenChatRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (smallScreenChatRef.current) {
      smallScreenChatRef.current.scrollTop =
        smallScreenChatRef.current.scrollHeight;
    }
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { type: "user", content: input }]);
      processCommand(input.trim().toLowerCase());
      setInput("");
    }
  };

  const processCommand = (command: string) => {
    setTimeout(() => {
      const response =
        commandResponses[command as keyof typeof commandResponses] ||
        commandResponses.default(command);

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content:
            typeof response === "function" ? response(command) : response,
        },
      ]);
    }, 300);
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4 md:p-8 min-h-[calc(100vh-12rem)]">
      <div className="w-full max-w-7xl mx-auto ">
        {/* Content for small screens */}
        <div className="md:hidden text-center mb-6 ">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Tirdesh Pettugani
          </h1>
          <Button
            className="bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
            onClick={() => {
              const link = document.createElement("a");
              link.href = "/Tirdesh-Resume.pdf";
              link.download = "Tirdesh-Resume.pdf";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            Download CV
          </Button>
        </div>

        {/* Chatbot for small screens */}
        <Card className="w-full max-w-sm mx-auto md:hidden bg-white dark:bg-gray-800 shadow-lg">
          <CardContent className="p-4">
            <div
              ref={smallScreenChatRef}
              className="h-[400px] w-full rounded border p-4 mb-4 bg-gray-100 dark:bg-gray-900 overflow-y-auto"
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    msg.type === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <span
                    className={`inline-block p-2 rounded-lg ${
                      msg.type === "user"
                        ? "bg-purple-500 text-white"
                        : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                    }`}
                    style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                  >
                    {msg.content}
                  </span>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex">
              <Input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow mr-2"
              />
              <Button
                type="submit"
                className="bg-purple-600 text-white hover:bg-purple-700"
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
            <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
              Tirdesh Pettugani
            </h1>
            <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
              Full Stack Developer
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              Passionate about creating innovative web solutions and bringing
              ideas to life through code.
            </p>
            <div className="mb-6">
              <img
                src={ProfilePic}
                alt="John Doe"
                className="rounded-full w-48 h-48 object-cover border-4 border-white dark:border-gray-700"
              />
            </div>
            <div className="space-x-4">
              <Button
                className="bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/Tirdesh-Resume.pdf";
                  link.download = "Tirdesh-Resume.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                Download CV
              </Button>
              <Button
                className="bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                onClick={() => navigate("/contact")}
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
                      <div
                        key={index}
                        className={
                          msg.type === "user"
                            ? "text-cyan-400"
                            : "text-green-500"
                        }
                      >
                        {msg.type === "user" ? "$ " : "> "}
                        {msg.content}
                      </div>
                    ))}
                  </pre>
                  <div ref={messagesEndRef} />
                </ScrollArea>
                <form onSubmit={handleSubmit} className="mt-4 flex">
                  <Input
                    type="text"
                    placeholder="Type a command..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow mr-2 bg-gray-800 text-green-500 border-gray-700"
                  />
                  <Button
                    type="submit"
                    className="bg-green-700 text-white hover:bg-green-600"
                  >
                    Send
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
