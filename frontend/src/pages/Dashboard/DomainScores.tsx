export default function DomainScores() {
  const domains = [
    { name: "Memory", value: "75%", color: "bg-primary" },
    { name: "Reaction", value: "60%", color: "bg-primary/90" },
    { name: "Attention", value: "90%", color: "bg-primary/80" },
    { name: "Problem Solving", value: "45%", color: "bg-primary/70" },
  ];
  return (
    <div className="flex-2 bg-muted rounded-sm px-6 pt-7 space-y-5">
      {/* Head */}
      <h3 className="text-primary font-bold text-xl">Neurological Domains</h3>
      {/* The domains */}
      <div className="flex items-center gap-x-5 justify-center w-full ">
        {domains.map((domain) => (
          <div key={domain.name} className="space-y-2">
            <div className="h-60 w-35 bg-muted-foreground/20 border rounded-sm flex flex-col-reverse px-4">
              <div style={{height: domain.value}} className={` rounded-full ${domain.color}`} />
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
