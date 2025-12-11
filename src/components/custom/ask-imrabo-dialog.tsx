"use client";

import * as React from "react";
import { Bot, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

type Message = {
  id: number;
  from: "user" | "bot";
  text: string;
};

export default function AskImraboDialog() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const chatEndRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus textarea on dialog open
  React.useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  async function fetchBotResponse(userMessage: string): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`You said: "${userMessage}". How can I assist further?`);
      }, 1500);
    });
  }

  async function handleSend() {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { id: Date.now(), from: "user", text: userMessage }]);
    setLoading(true);

    const botResponse = await fetchBotResponse(userMessage);
    setMessages((prev) => [...prev, { id: Date.now() + 1, from: "bot", text: botResponse }]);
    setLoading(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200"
          aria-label="Open Ask Imrabo chat dialog"
        >
          <Bot className="w-4 h-4 mb-0.5" aria-hidden="true" />
          <span className="flex items-center gap-2 text-xs font-medium">Ask Imrabo</span>
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-lg flex flex-col h-[600px] max-h-[90vh] bg-white dark:bg-gray-900"
        aria-modal="true"
        aria-labelledby="imrabo-dialog-title"
        aria-describedby="imrabo-dialog-description"
      >
        <DialogHeader>
          <DialogTitle id="imrabo-dialog-title">Ask Imrabo</DialogTitle>
          <DialogDescription id="imrabo-dialog-description" className="text-muted-foreground">
            Ask any questions you have, and Imrabo will assist you.
          </DialogDescription>
        </DialogHeader>

        {/* Chat Messages */}
        <div
          className="flex-1 overflow-y-auto border rounded-md p-4 mt-4 space-y-4 bg-gray-50 dark:bg-gray-800"
          role="log"
          aria-live="polite"
          aria-relevant="additions"
        >
          {messages.length === 0 && (
            <p className="text-gray-500 text-center select-none">Start the conversation!</p>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex max-w-[80%] p-3 rounded-lg shadow-sm ${
                msg.from === "user"
                  ? "bg-blue-600 text-white ml-auto flex-row-reverse gap-2"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              } items-center`}
            >
              {msg.from === "user" ? (
                <User className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Bot className="w-5 h-5" aria-hidden="true" />
              )}
              <p className="whitespace-pre-wrap break-words">{msg.text}</p>
            </div>
          ))}

          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="mt-4 flex items-center gap-2">
          <label htmlFor="chat-input" className="sr-only">
            Type your message
          </label>
          <textarea
            id="chat-input"
            ref={textareaRef}
            className="flex-1 rounded-md border border-gray-300 p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            rows={2}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            aria-disabled={loading}
          />
          <Button
            onClick={handleSend}
            disabled={loading || input.trim() === ""}
            className="flex items-center gap-2"
            aria-label="Send message"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                role="img"
                aria-label="Loading"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            ) : (
              <>
                <Send className="w-4 h-4" aria-hidden="true" />
                Send
              </>
            )}
          </Button>
        </div>

        <DialogClose
          className="absolute top-3 right-3 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Close dialog"
        >
          ×
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
