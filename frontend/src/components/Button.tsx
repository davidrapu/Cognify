import React from "react";
import { cn } from "@/lib/utils";

const baseButtonClasses =
  "bg-primary text-primary-foreground tracking-wide py-1 px-3 rounded cursor-pointer font-semibold disabled:bg-secondary disabled:cursor-default";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        baseButtonClasses,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}


export function AnimatedButton({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(baseButtonClasses, className, 'hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 ease-out')}
      {...props}
    >
      {children}
    </button>
  );
}

