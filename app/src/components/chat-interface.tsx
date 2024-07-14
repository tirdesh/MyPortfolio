// components/ui/chat-interface.tsx
import React, { useState } from "react";

interface ChatInterfaceProps {
  onSendMessage: (message: string) => void;
  messages: string[];
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onSendMessage,
  messages,
}) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(input);
    setInput("");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-96 flex flex-col">
      <div className="flex-grow overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            {msg}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border rounded-l-lg p-2"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-r-lg px-4"
        >
          Send
        </button>
      </form>
    </div>
  );
};
