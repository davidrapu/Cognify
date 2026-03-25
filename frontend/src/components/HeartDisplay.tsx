import { Heart } from "@/components/icons";

export default function HeartDisplay({ filled }: { filled: boolean }) {
  return (
    <Heart
      className="size-7"
      fill={filled ? "var(--primary-foreground)" : "none"}
      stroke="var(--primary-foreground)"
      strokeWidth={2}
    />
  );
}
