// components/ui/terminal.tsx
import React, { forwardRef, useState } from "react";

interface TerminalProps {
  onCommand: (command: string) => void;
  messages: string[];
}

export const Terminal = forwardRef<HTMLDivElement, TerminalProps>(
  ({ onCommand, messages }, ref) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onCommand(input);
      setInput("");
    };

    return (
      <div
        ref={ref}
        className="bg-black text-green-500 p-4 rounded-lg h-96 overflow-y-auto font-mono"
      >
        <div className="space-y-2">
          {messages.map((msg, index) => (
            <div key={index} className="whitespace-pre-wrap break-words">
              {msg}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent border-none outline-none w-full"
            placeholder="Type a command..."
          />
        </form>
      </div>
    );
  }
);

Terminal.displayName = "Terminal";
