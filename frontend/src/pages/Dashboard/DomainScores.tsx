
type DomainScores = {
  memory: number;
  reactionScore: number;
  attention: number;
  problemSolving: number;
};

export default function DomainScores({scores}: {scores: DomainScores}) {
  const domains = [
    { name: "Memory", value: `${Math.round(scores.memory * 100)}%`, color: "bg-primary" },
    { name: "Reaction", value: `${Math.round(scores.reactionScore * 100)}%`, color: "bg-primary/90" },
    { name: "Attention", value: `${Math.round(scores.attention * 100)}%`, color: "bg-primary/80" },
    { name: "Problem Solving", value: `${Math.round(scores.problemSolving * 100)}%`, color: "bg-primary/70" },
  ];
  return (
    <div className="flex-2 bg-muted rounded-sm px-6 pt-7 space-y-5">
      {/* Head */}
      <h3 className="text-primary font-bold text-xl">Neurological Domains</h3>
      {/* The domains */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-[repeat(4,minmax(20px,1fr))] md:gap-0 ">
        {domains.map((domain) => (
          <div
            key={domain.name}
            className="space-y-2 flex flex-col items-center"
          >
            <div className="h-45 w-25 md:w-30 bg-muted-foreground/20 border rounded-sm flex flex-col-reverse px-4">
              <div
                style={{ height: domain.value }}
                className={` rounded-full ${domain.color}`}
              />
            </div>
            <p className="text-[11px] uppercase font-bold text-center tracking-widest">
              {domain.name}
            </p>
          </div>
        ))}
      </div>

      {/* To be decided but could add best scores or something */}
    </div>
  );
}
