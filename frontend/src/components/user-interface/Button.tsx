
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "danger" | "outline";
}

export default function Button({
  children,
  size = "md",
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-black hover:bg-gray-200 ",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 bg-white text-black hover:bg-gray-50",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      {...props}
      className={`
      inline-flex
        items-center
        justify-center
        gap-2
        rounded-full
        font-medium
        transition
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${sizes[size]}
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

