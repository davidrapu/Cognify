import { BrainCircuit } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Link } from 'react-router';

type LogoProps = {
  className?: string
  size?: "small" | "default"
}

export function Logo({ className, size = "default" }: LogoProps) {
  return (
    <Link to="/" className={cn("flex flex-row items-center gap-x-2")}>
      <BrainCircuit color="#0083a3" size={size === "small" ? 30 : 35} />
      <span
        className={cn(
          "m-0 font-family-heading text-[1.8em] tracking-[0.3em]",
          className,
        )}
      >
        COG-NIFY
      </span>
    </Link>
  );
}

export function LogoIcon(){
  return (
    <span>
      <BrainCircuit color="#0083a3" size={25} />
    </span>
  );
}


