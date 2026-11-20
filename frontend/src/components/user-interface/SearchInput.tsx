import type { InputHTMLAttributes } from "react";

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "filled";
}

const sizeClasses = {
  sm: "py-1.5 pl-9 pr-3 text-xs",
  md: "py-2 pl-10 pr-3 text-sm",
  lg: "py-3 pl-11 pr-4 text-base",
};

const variantClasses = {
  outline: "border border-gray-300 bg-white focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white",
  filled: "border border-transparent bg-gray-100 focus:border-blue-500 focus:bg-white dark:bg-gray-800 dark:text-white",
};

export default function SearchInput({
  size = "md",
  variant = "outline",
  className = "",
  ...props
}: SearchInputProps) {
  return (
    <div className="relative min-w-0 flex-1">
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </svg>
      <input
        {...props}
        type="search"
        className={`w-full rounded-lg outline-none transition focus:ring-2 focus:ring-blue-100 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      />
    </div>
  );
}
