import { useNetworkStatusEffect } from "./useNetworkStatusEffect";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle, FiX, FiSend } from "react-icons/fi";
import { VoiceButton } from "./VoiceButton";
import localAnswers from "../data/localDB.json";
import { useLanguage } from "@/hooks/useLanguage";
export default function ChatbotAssistant() {
  type ChatMessage = {
    sender: string;
    text: string;
    meta?: { summaryKey?: string };
  };

  const initialMessages: ChatMessage[] = [
    {
      sender: "assistant",
      text: "__INIT__",
    },
  ];

  function getMockAnswer(userMsg: string) {
    const faqs = Array.isArray(localAnswers.faqs) ? localAnswers.faqs : [];
    if (faqs.length > 0) {
      const idx = Math.floor(Math.random() * faqs.length);
      return faqs[idx].response;
    }
    return "Sorry, I don't have an answer for that yet!";
  }

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const offlineVoicePlayed = useRef({ en: false, ml: false });
  const summarySpokenRef = useRef<{ [key: string]: boolean }>({});
  const { t, language } = useLanguage();

  // Auto-reply when going offline
  useNetworkStatusEffect((online) => {
    if (!online) {
      const offlineMsgEn = "You are offline. You can send a query through SMS or wait till the network resumes. Thank you.";
      const offlineMsgMl = "നിങ്ങൾ ഓഫ്‌ലൈനിലാണ്. നിങ്ങൾക്ക് SMS മുഖേന ചോദ്യം അയയ്ക്കാനോ നെറ്റ്‌വർക്ക് പുനഃസ്ഥാപിക്കുമ്പോൾ കാത്തിരിക്കാനോ കഴിയും. നന്ദി.";
      setMessages((msgs) => [
        ...msgs,
        { sender: "assistant", text: offlineMsgEn },
        { sender: "assistant", text: offlineMsgMl },
      ]);
      // Voice response: only once per language
      if ('speechSynthesis' in window) {
        if (!offlineVoicePlayed.current.en) {
          const utterEn = new window.SpeechSynthesisUtterance(offlineMsgEn);
          utterEn.lang = 'en-IN';
          window.speechSynthesis.speak(utterEn);
          offlineVoicePlayed.current.en = true;
          utterEn.onend = () => {
            if (!offlineVoicePlayed.current.ml) {
              const utterMl = new window.SpeechSynthesisUtterance(offlineMsgMl);
              utterMl.lang = 'ml-IN';
              window.speechSynthesis.speak(utterMl);
              offlineVoicePlayed.current.ml = true;
            }
          };
        }
      }
    }
  });


  useEffect(() => {
    // Initialize first assistant message localized
    setMessages((prev) => {
      if (prev.length > 0 && prev[0].text === "__INIT__") {
        const next = [...prev];
        next[0] = { sender: "assistant", text: t('assistantIntro') };
        return next;
      }
      return prev;
    });
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  function handleSend() {
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
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Button with Noticeable Prompt */}
      <AnimatePresence>
        {!open && (
          <motion.div
            key="chat-fab-wrap"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="flex flex-col items-end gap-2"
          >
            {/* Speech bubble */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-1 px-4 py-2 rounded-2xl rounded-br-none bg-gradient-to-br from-blue-500/90 to-green-500/90 text-white font-semibold shadow-lg text-base md:text-lg border border-white/20 dark:border-white/10 animate-bounce"
              style={{ boxShadow: '0 4px 24px 0 rgba(34,197,94,0.15)' }}
            >
              <span className="drop-shadow">{t('chatBubblePrompt')}</span>
            </motion.div>
            {/* Pulsing button */}
            <motion.button
              key="chat-fab"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="relative bg-gradient-to-br from-green-500 to-blue-500 text-white rounded-full shadow-2xl w-16 h-16 flex items-center justify-center text-4xl hover:scale-110 focus:outline-none border-4 border-white/40 dark:border-white/10"
              aria-label="Open chat assistant"
              onClick={() => setOpen(true)}
            >
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400/40 dark:bg-green-600/30 opacity-75 animate-ping"></span>
              <FiMessageCircle className="relative z-10" />
            </motion.button>
          </motion.div>
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
              <span className="font-bold text-white text-lg">{t('chatHeaderTitle')}</span>
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
                    {t('typingIndicator')}
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
                placeholder={t('inputPlaceholder')}
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
