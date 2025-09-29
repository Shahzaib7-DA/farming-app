import React from "react";
import { MessageCircle } from "lucide-react";

interface AskSummaryButtonProps {
  onClick: () => void;
  label?: string;
}

export const AskSummaryButton: React.FC<AskSummaryButtonProps> = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-400 to-blue-400 dark:from-green-700 dark:to-blue-700 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200 focus:outline-none"
    aria-label={label || "Ask Assistant for Summary"}
    type="button"
  >
    <MessageCircle className="w-5 h-5" />
    <span className="hidden sm:inline">{label || "Ask Assistant Summary"}</span>
  </button>
);
