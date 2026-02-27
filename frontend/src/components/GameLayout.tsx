
export default function GameLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex min-h-full border justify-center backdrop-blur-sm">
      <div className="lg:min-h-150 md:min-h-100 sm:min-h-500 flex flex-col self-center drop-shadow-xl/30 bg-secondary md:aspect-video rounded-2xl p-5 gap-y-3 animate-in zoom-in-0 duration-300">{children}</div>
    </div>
  );
}
