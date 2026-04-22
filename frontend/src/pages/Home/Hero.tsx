import { ArrowRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function Hero({loggedIn} : {loggedIn: boolean}) {
    const navigate = useNavigate()
  return (
    <section className="max-w-7xl mx-auto px-8 py-20 lg:py-32 grid lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-7 animate-in slide-in-from-bottom-20 fade-in duration-1000">
        <span className="inline-block py-1 px-4 rounded-full bg-secondary text-secondary-foreground text-xs font-bold tracking-widest uppercase mb-6">
          BUILT FOR YOUR BRAIN
        </span>
        <h1 className="font-family-pub-sans text-5xl lg:text-7xl font-extrabold tracking-tight text-primary leading-[1.1] mb-8">
          Stay ahead of <br />
          <span className="text-secondary italic">cognitive decline.</span>
        </h1>
        <p className="text-on-surface-variant text-lg lg:text-xl max-w-xl leading-relaxed mb-10">
          Ten minutes of play. A lifetime of insight. Cognify's science-backed
          games detect early signs of cognitive change before they become a
          concern.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={() => navigate(loggedIn ? "/quiz" : "/signup")}
            className="px-8 hero-gradient py-5 rounded-full text-primary-foreground font-bold text-base transition-transform active:scale-95 shadow-lg flex items-center gap-2 hover:scale-103 duration-300 ease-in-out"
          >
            Get Started
            <span className="material-symbols-outlined">
              <ArrowRight />
            </span>
          </Button>
        </div>
      </div>
      <div className="lg:col-span-5 relative">
        <div className="aspect-square rounded-3xl bg-surface-container overflow-hidden relative shadow-2xl">
          <img
            alt="Abstract neural network visualization"
            className="w-full h-full object-cover"
            data-alt="Abstract glowing blue neural network connections"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAa2ElBFBYweG42IRtreXe0n_pYLoQkyJFizGwI_4ZZPLSbOGxmbPrFJa8z2CKOEXQgn4FFrOXw0eZBFCw7EX7EqknZSbN1avy2Gh0G-T9ixj-cEd2PyLM4X4LiFfLDrJgK-2hiIsyZtid120r6nqhTAem6lvQ9pzoDcfbck5ZQLK30Ve3t3_VZ8U7GiGMRLWBcPXG9S6uEPZ65aSj-sOMo22El3xxc0TgAIq4KyaWLLWgVNfaXuvwZ-COfSOtCNm9mDw0wzAG3YCi0"
          />
          <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
        </div>
      </div>
    </section>
  );
}
