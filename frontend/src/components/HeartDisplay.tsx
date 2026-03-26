import { Heart } from "@/components/icons";

export default function HeartDisplay({
  numberOfFilledHearts,
  innerColor,
  outerColor,
  length
}: {
  numberOfFilledHearts?: number;
  innerColor?: string;
  outerColor?: string;
  length: number;
}) {
  return (
    <div className="flex gap-x-2 flex-row-reverse">
      {Array.from({ length: length }).map((_, index) => (
        <Heart
          key={index}
          className="size-7"
          fill={index < (numberOfFilledHearts ?? 0) ? innerColor || "var(--primary-foreground)" : "none"}
          stroke={outerColor || "var(--primary-foreground)"}
          strokeWidth={2}
        />
      ))}
    </div>
  );
}
