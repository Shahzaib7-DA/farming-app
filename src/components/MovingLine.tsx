import React, { useEffect, useRef, useState } from 'react';

const EN_TEXT =
  'Dear user, You are offline. Some of the features or queries you ask the assistant may not be replied back. Instead, use SMS to send queries.';
const ML_TEXT =
  'പ്രിയ ഉപയോക്താവേ, നിങ്ങൾ ഓഫ്‌ലൈനിലാണ്. അസിസ്റ്റന്റിനോട് ചോദിക്കുന്ന ചില ഫീച്ചറുകൾക്കും ചോദ്യങ്ങൾക്കും മറുപടി ലഭിക്കില്ല. പകരം SMS ഉപയോഗിച്ച് ചോദ്യങ്ങൾ അയയ്ക്കുക.';

export const MovingLine: React.FC<{ isOffline: boolean }> = ({ isOffline }) => {
  const [lang, setLang] = useState<'en' | 'ml'>('en');
  const [key, setKey] = useState(0); // To restart animation
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Slower speed: 16s per slide
  const ANIMATION_DURATION = 16000;

  useEffect(() => {
    if (!isOffline) return;
    timeoutRef.current = setTimeout(() => {
      setLang((prev) => (prev === 'en' ? 'ml' : 'en'));
      setKey((k) => k + 1); // Restart animation
    }, ANIMATION_DURATION);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [lang, isOffline]);

  if (!isOffline) return null;

  return (
    <div className="w-full h-12 flex items-center overflow-hidden bg-gray-100 dark:bg-gray-900 transition-colors">
      <span
        key={key}
        className="text-lg font-semibold text-green-700 dark:text-green-300 whitespace-nowrap animate-moving-line-rtl"
        style={{ animationDuration: ANIMATION_DURATION + 'ms' }}
      >
        {lang === 'en' ? EN_TEXT : ML_TEXT}
      </span>
    </div>
  );
};

// Tailwind CSS: Add this to your global styles (e.g., index.css or tailwind.config.js)
// @layer utilities {
//   .animate-moving-line-rtl {
//     animation: moving-line-rtl 16s linear forwards;
//   }
//   @keyframes moving-line-rtl {
//     0% { transform: translateX(100%); }
//     100% { transform: translateX(-100%); }
//   }
// }
