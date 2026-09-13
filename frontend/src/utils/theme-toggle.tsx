import { SunMedium,Star } from "lucide-react";


import { useTheme } from "../context/themeContext";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`
        relative inline-flex h-6 w-14 shrink-0 items-center
        rounded-full p-1
        border border-gray-100
        transition-colors duration-300 ease-out
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-offset-2 focus-visible:ring-gray-400
        dark:focus-visible:ring-offset-gray-900
        cursor-pointer
        ${isDark ? "bg-zinc-800 border-zinc-800" : "bg-gray-50"}
      `}
    >
      {/* Track icons (static, faded) */}
      <SunMedium
        size={12}
        strokeWidth={2}
        className={`
          absolute left-1.5 text-amber-500
          transition-opacity duration-300
          ${isDark ? "opacity-0" : "opacity-100"}
        `}
      />
      <Star
        size={12}
        strokeWidth={2}
        className={`
          absolute right-1.5 text-gray-300
          transition-opacity duration-300
          ${isDark ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* Sliding thumb */}
      <span
        className={`
          relative flex h-5 w-5 items-center justify-center
          rounded-full bg-white dark:bg-zinc-700 shadow-md
          transition-transform duration-300 ease-out
          ${isDark ? "translate-x-7" : "translate-x-0"}
        `}
      >
        {isDark ? (
          <Star size={12} strokeWidth={2} className="text-gray-100" />
        ) : (
          <SunMedium size={12} strokeWidth={2} className="text-amber-500" />
        )}
      </span>
    </button>
  );
};