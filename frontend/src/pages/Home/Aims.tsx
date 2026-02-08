import React from 'react'

export default function Aims() {
  return (
    <section className="flex flex-col items-center gap-y-8 py-16 bg-secondary/40 w-full">
      <h2 className="text-3xl font-semibold tracking-wider">Our Aims</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AimCard title="Measure">
          Provide accurate, repeatable cognitive assessments using
          evidence-based tasks.
        </AimCard>

        <AimCard title="Support">
          Help users understand their cognitive strengths and track changes over
          time.
        </AimCard>

        <AimCard title="Improve">
          Enable daily practice that promotes sharper thinking and mental
          resilience.
        </AimCard>
      </div>
    </section>
  );
}

type cardProps = {
  title: string;
  children: React.ReactNode;
}

function AimCard({ title, children }: cardProps) {
  return (
    <div className="bg-card border border-border rounded-[1.75em] p-[2em] max-w-88">
      <h3 className="mb-2 text-lg font-semibold text-primary">{title}</h3>
      <p className="text-sm leading-relaxed text-card-foreground">{children}</p>
    </div>
  );
}
