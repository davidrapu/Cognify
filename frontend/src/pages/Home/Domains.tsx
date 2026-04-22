import { Brain, Calculator, Eye, Zap } from "@/components/icons";

export default function Domains() {
  return (
    <section className="bg-secondary py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-16">
          <h2 className="font-family-pub-sans text-3xl lg:text-4xl font-extrabold text-primary mb-4">
            The Four Pillars
          </h2>
          <p className="text-on-surface-variant max-w-2xl">
            Our assessments target the specific neural clusters that define
            high-level cognitive function.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card p-8 rounded-3xl transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <span className="text-primary text-3xl">
                <Brain />
              </span>
            </div>
            <h3 className="font-family-pub-sans text-xl font-bold text-primary mb-3">
              Memory
            </h3>
            <p className="text-card-foreground text-sm leading-relaxed">
              Track how well you retain and recall information over time — from
              remembering sequences to recognising patterns you've seen before.
            </p>
          </div>

          <div className="bg-card p-8 rounded-3xl transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <span className="text-primary text-4xl">
                <Zap />
              </span>
            </div>
            <h3 className="font-family-pub-sans text-xl font-extrabold text-primary mb-3">
              Reaction Time
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Measure how quickly your brain processes and responds to stimuli —
              a key early indicator of cognitive slowing.
            </p>
          </div>

          <div className="bg-card p-8 rounded-3xl transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <span className="text-primary text-3xl">
                <Calculator />
              </span>
            </div>
            <h3 className="font-family-pub-sans text-xl font-extrabold text-primary mb-3">
              Problem-Solving
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Challenge your ability to reason, plan, and think flexibly through
              puzzles that adapt to your performance level.
            </p>
          </div>

          <div className="bg-card p-8 rounded-3xl transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <span className="text-primary text-3xl">
                <Eye />
              </span>
            </div>
            <h3 className="font-headline text-xl font-extrabold text-primary mb-3">
              Attention
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Test how well you stay focused, filter distractions, and control
              impulsive responses under pressure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
