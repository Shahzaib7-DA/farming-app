import React, { useEffect, useState } from "react";

export function DarkModeSwitch() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setDark(true);
    if (theme === "light") setDark(false);
  }, []);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className={`ml-2 px-3 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold transition flex items-center gap-2`}
      title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {dark ? (
        <span role="img" aria-label="moon">🌙</span>
      ) : (
        <span role="img" aria-label="sun">☀️</span>
      )}
      <span className="hidden sm:inline">{dark ? "Dark" : "Light"} Mode</span>
    </button>
  );
}
