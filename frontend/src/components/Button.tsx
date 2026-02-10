import React from "react";
import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps} from "framer-motion";

const baseButtonClasses =
  "bg-primary text-primary-foreground tracking-wide py-1 px-3 rounded cursor-pointer font-semibold disabled:cursor-not-allowed disabled:bg-secondary";


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

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  className?: string;
}

export function AnimatedButton({
  children,
  className = "",
  ...props
}: AnimatedButtonProps) {
  return (
    <motion.button
      className={cn(baseButtonClasses, className)}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

