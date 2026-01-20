import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  className?: string
}

export default function Button({children, className = '', ...props } : ButtonProps) {
  return (
    <button
      className={cn(
        "bg-primary text-primary-foreground tracking-wide py-1 px-3 rounded cursor-pointer disabled:cursor-not-allowed disabled:bg-secondary", className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
