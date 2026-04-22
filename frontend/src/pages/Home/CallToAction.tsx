import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function CallToAction({loggedIn} : {loggedIn: boolean}) {
    const navigate = useNavigate()
  return (
    <section className="max-w-7xl mx-auto px-8 mb-24">
      <div className="hero-gradient rounded-[2rem] p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl">
        <div>
          <h2 className="font-family-pub-sans text-4xl lg:text-6xl font-extrabold text-primary-foreground mb-8 tracking-tight">
            Ready to understand your brain?
          </h2>
          <p className="text-primary-foreground/70 text-lg lg:text-xl max-w-2xl mx-auto mb-12">
            Take your first assessment today and get a clear picture of where
            your memory, attention, and reaction speed stand right now.
          </p>
          <div className="flex justify-center">
            <Button onClick={() => navigate(loggedIn ? "/quiz" : "/login")} className="px-10 py-8 bg-primary-foreground text-primary hover:bg-primary-foreground rounded-full text-lg shadow-xl duration-300 ease-in-out transition-all active:scale-95 hover:opacity-90 cursor-pointer">
              Get Started For Free
            </Button>
          </div>
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary rounded-full blur-[120px] opacity-30"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-tertiary rounded-full blur-[120px] opacity-20"></div>
      </div>
    </section>
  );
}
