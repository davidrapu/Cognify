import { cn } from "@/lib/utils";

export default function ScoreMeter({
  score,
  className,
  max = 30
}: {
  score: number;
  className?: string;
  max?: number;
}) {
  return (
    <div className="flex gap-1 flex-wrap w-fit">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={cn(
            `h-5 w-3 rounded-sm ${i < score ? "bg-primary" : "bg-muted"}`,
            className,
          )}
        />
      ))}
    </div>
  );
}
