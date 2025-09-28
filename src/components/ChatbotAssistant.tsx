import { useNetworkStatusEffect } from "./useNetworkStatusEffect";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle, FiX, FiSend } from "react-icons/fi";
import { VoiceButton } from "./VoiceButton";
import localAnswers from "../data/localDB.json";

const initialMessages = [
  {
    sender: "assistant",
    text: "👋 Hi, I am your Assistant. I’m here to help you with your farm queries.",
  },
];

function getMockAnswer(userMsg: string) {
  // Pick a random response from faqs in localDB.json
  const faqs = Array.isArray(localAnswers.faqs) ? localAnswers.faqs : [];
  if (faqs.length > 0) {
    const idx = Math.floor(Math.random() * faqs.length);
    return faqs[idx].response;
  }
  return "Sorry, I don't have an answer for that yet!";
}


export default function ChatbotAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-reply when going offline
  useNetworkStatusEffect((online) => {
    if (!online) {
      const offlineMsg = "You are offline. You can send a query through SMS or wait till the network resumes. Thank you.";
      setMessages((msgs) => [
        ...msgs,
        { sender: "assistant", text: offlineMsg },
      ]);
      // Voice response
      if ('speechSynthesis' in window) {
        const utter = new window.SpeechSynthesisUtterance(offlineMsg);
        utter.lang = 'en-IN';
        window.speechSynthesis.speak(utter);
      }
    }
  });

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages((msgs) => [
      ...msgs,
      { sender: "user", text: userMsg },
    ]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { sender: "assistant", text: getMockAnswer(userMsg) },
      ]);
      setTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="chat-fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="bg-gradient-to-br from-green-500 to-blue-500 text-white rounded-full shadow-xl w-14 h-14 flex items-center justify-center text-3xl hover:scale-110 focus:outline-none"
            aria-label="Open chat assistant"
            onClick={() => setOpen(true)}
          >
            <FiMessageCircle />
          </motion.button>
        )}
      </AnimatePresence>
      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-80 max-w-[90vw] h-[32rem] flex flex-col rounded-xl shadow-xl bg-gradient-to-br from-green-400/90 to-blue-500/90 backdrop-blur-lg border border-white/30 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-green-600/80 to-blue-600/80">
              <span className="font-bold text-white text-lg">Farmer Assistant</span>
              <button
                className="text-white hover:text-red-200 text-xl focus:outline-none"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                <FiX />
              </button>
            </div>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2 bg-transparent">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={
                    msg.sender === "user"
                      ? "flex justify-end"
                      : "flex justify-start"
                  }
                >
                  <div
                    className={
                      msg.sender === "user"
                        ? "bg-green-500 text-white rounded-2xl rounded-br-sm px-4 py-2 max-w-[75%] shadow-md text-right"
                        : "bg-blue-500 text-white rounded-2xl rounded-bl-sm px-4 py-2 max-w-[75%] shadow-md text-left"
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-blue-400 text-white rounded-2xl rounded-bl-sm px-4 py-2 max-w-[75%] shadow-md text-left animate-pulse">
                    Assistant is typing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            {/* Input */}
            <form
              className="flex items-center gap-2 px-3 py-3 bg-white/70 backdrop-blur-md"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                type="text"
                className="flex-1 rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800 bg-white"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={typing}
                autoFocus={open}
              />
              <VoiceButton
                onResult={(text) => {
                  setInput(text);
                  setTimeout(() => handleSend(), 100);
                }}
                disabled={typing}
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 text-xl focus:outline-none disabled:opacity-50"
                disabled={!input.trim() || typing}
                aria-label="Send message"
              >
                <FiSend />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
