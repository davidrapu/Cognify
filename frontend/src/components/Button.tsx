import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.PropsWithChildren{
  className?: string
  disabled?: boolean
  onClick?: () => void
}

export default function Button({children, className = '', disabled = false, onClick} : ButtonProps) {
  return (
    <button
      className={cn(
        "bg-primary text-primary-foreground tracking-wide py-1 px-3 rounded cursor-pointer disabled:cursor-not-allowed disabled:bg-secondary", className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
