import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const typeStyles: Record<string, string> = {
  market: "bg-green-100 border-green-300 text-green-900",
  pest: "bg-orange-100 border-orange-300 text-orange-900",
  weather: "bg-blue-100 border-blue-300 text-blue-900",
  scheme: "bg-purple-100 border-purple-300 text-purple-900",
};

const foldedCornerStyles: Record<string, string> = {
  market: "bg-green-200",
  pest: "bg-orange-200",
  weather: "bg-blue-200",
  scheme: "bg-purple-200",
};

interface NoteProps {
  type: "market" | "pest" | "weather" | "scheme";
  message: string;
  onClose?: () => void;
  duration?: number; // ms, optional auto-dismiss
}

export const Note: React.FC<NoteProps> = ({ type, message, onClose, duration }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose && onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div
      className={`fixed z-50 bottom-6 right-6 min-w-[220px] max-w-xs shadow-xl rounded-xl border-2 p-4 pr-8 flex items-start gap-2 animate-pop-in ${typeStyles[type]} transition-all`}
      style={{ boxShadow: "0 8px 32px 0 rgba(0,0,0,0.12)", fontFamily: "'Segoe UI', 'Poppins', sans-serif" }}
    >
      {/* Folded corner */}
      <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden rounded-tr-xl">
        <div className={`absolute right-0 top-0 w-8 h-8 ${foldedCornerStyles[type]}`} style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />
      </div>
      <div className="flex-1 text-base font-medium" style={{ wordBreak: "break-word" }}>{message}</div>
      <button
        className="absolute top-2 right-2 text-lg text-black/40 hover:text-black/80 focus:outline-none"
        aria-label="Close note"
        onClick={() => { setVisible(false); onClose && onClose(); }}
        tabIndex={0}
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

// Animation CSS
const style = document.createElement('style');
style.innerHTML = `
@keyframes pop-in {
  0% { transform: scale(0.7) translateY(40px); opacity: 0; }
  80% { transform: scale(1.05) translateY(-8px); opacity: 1; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}
.animate-pop-in {
  animation: pop-in 0.45s cubic-bezier(.23,1.12,.72,.98);
}
`;
if (typeof document !== 'undefined' && !document.getElementById('note-pop-in-style')) {
  style.id = 'note-pop-in-style';
  document.head.appendChild(style);
}
