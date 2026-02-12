
export default function GameLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex h-full justify-center backdrop-blur-sm">
      <div className="min-h-[90%] flex flex-col self-center drop-shadow-xl/30 bg-secondary aspect-video rounded-2xl border p-5 gap-y-3 animate-in zoom-in-0 duration-300">{children}</div>
    </div>
  );
}
