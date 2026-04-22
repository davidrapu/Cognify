import { BadgeCheck, BarChart2, LayoutGrid, Play, Target } from "@/components/icons";
import { Link } from "react-router";

export default function MiniGames({loggedIn} : {loggedIn: boolean}) {
  return (
    <section className="py-24 max-w-7xl mx-auto px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1 relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <div className="aspect-video bg-secondary rounded-2xl p-4 flex flex-col justify-end">
                <span className="text-primary mb-2"><LayoutGrid fill="var(--primary)"/></span>
                <p className="text-xs font-bold text-primary">Card Match</p>
              </div>
              <div className="aspect-square bg-secondary rounded-2xl flex items-center justify-center">
                <span className="text-primary/40 text-4xl"><Target size={30} /></span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="aspect-square bg-primary/70 rounded-2xl flex items-center justify-center">
                <span className="text-secondary text-4xl"><BarChart2 strokeWidth={3} size={40} /></span>
              </div>
              <div className="aspect-video bg-secondary/60 rounded-2xl p-4 flex flex-col justify-end">
                <span className="text-primary mb-2">
                  <Play size={20} fill="var(--primary)" />
                </span>
                <p className="text-xs font-bold text-primary">Go/No-Go</p>
              </div>
            </div>
          </div>
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary-fixed/10 blur-[100px] rounded-full"></div>
        </div>
        <div className="order-1 lg:order-2">
          <span className="text-secondary-primary font-bold tracking-widest text-xs uppercase mb-4 block">
            A New Way to Train
          </span>
          <h2 className="font-family-pub-sans text-4xl lg:text-5xl font-extrabold text-primary mb-8">
            9 Mini-Games.
            <br />
            One clear picture.
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
            Most cognitive tests feel like a chore. Cognify uses nine short,
            engaging games to measure memory, attention, reaction speed, and
            problem-solving — giving you a meaningful snapshot of your brain
            health in under an hour.
          </p>
          <ul className="space-y-4 mb-10">
            <li className="flex items-center gap-3 text-primary font-medium">
              <span className="material-symbols-outlined text-primary">
                <BadgeCheck
                  fill="var(--primary-foreground)"
                  color="var(--primary)"
                />
              </span>
              Adaptive difficulty scaling in real-time
            </li>
            <li className="flex items-center gap-3 text-primary font-medium">
              <span className="text-tertiary">
                <BadgeCheck
                  fill="var(--primary-foreground)"
                  color="var(--primary)"
                />
              </span>
              Short 3-minute session cycles
            </li>
            {/* <li className="flex items-center gap-3 text-primary font-medium">
          <span className="material-symbols-outlined text-tertiary"><BadgeCheck fill="" color="" /></span>
          Cross-device accessibility (Web &amp; Mobile)
        </li> */}
          </ul>
          <Link
            className="text-primary font-bold border-b-2 border-primary/20 hover:border-primary transition-all duration-300 ease-in-out pb-1"
            to={loggedIn ? "/quiz" : "/login"}
          >
            Explore the Games Library
          </Link>
        </div>
      </div>
    </section>
  );
}
