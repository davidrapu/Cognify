import { cn } from "@/lib/utils";

export default function GameLayout({children, animateIn = true, className}: {children: React.ReactNode, animateIn?: boolean, className?: string}) {
  return (
    <div className="flex h-full justify-center backdrop-blur-sm">
      <div
        className={cn(
          // md:w-285 md:aspect-video
          " min-w-[60%] md:max-w-[80%] min-h-100  flex flex-col self-center drop-shadow-xl/30 bg-secondary rounded-2xl p-5 gap-y-3 mx-2",
          animateIn && "animate-in zoom-in-0 duration-300",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
