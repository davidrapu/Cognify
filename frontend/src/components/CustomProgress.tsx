import { cn } from "@/lib/utils";

type progressPropType = {
  value: number,
  max: number,
  bg?: string,
  color?: string
  className?: string
}

export default function Progress({value, max, bg, color, className}: progressPropType) {
  return (
    <div
      role="progressbar"
      className={cn("h-2 w-full rounded-full bg-primary/20 overflow-hidden",
        bg && `bg-${bg}`,
        className
      )}
    >
      <div
        className={cn(
          "h-full bg-primary rounded-full transition-all duration-200 ease-in-out",
          color && `bg-${color}`,
        )}
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  );
}
