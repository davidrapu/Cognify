import { cn } from "@/lib/utils";

export default function GameLayout({children, animateIn = true}: {children: React.ReactNode, animateIn?: boolean}) {
  return (
    <div className="flex min-h-full justify-center backdrop-blur-sm">
      <div
        className={cn(
          " md:w-285 md:aspect-video flex flex-col self-center drop-shadow-xl/30 bg-secondary rounded-2xl p-5 gap-y-3",
          animateIn && "animate-in zoom-in-0 duration-300"
        )}
      >
        {children}
      </div>
    </div>
  );
}
