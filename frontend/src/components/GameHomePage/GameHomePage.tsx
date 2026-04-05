import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import StatCard from "./StatCard";
import PerformanceChart from "@/components/PerformanceChart";
import GameHistory from "./GameHistory";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { cn } from "@/lib/utils";
import { ShieldX } from "@/components/icons";


type GameHomePageProps = {
  title : string;
  description: string;
  onStartGame: () => void;
  highScore: number;
  averageScore: number;
  averageAccuracy: number;
  instructions: { step: number; title: string; desc: string }[];
  history?: {id:string, date: Date; score: number, accuracy: number, reaction: number }[] | undefined;
};

export function GameHomePage(props : GameHomePageProps) {
  const historyCopy = props.history ? [...props.history] : undefined;
  const {loggedIn} = useAuth()
  return (
    <div className="relative min-h-screen bg-background">
      <main className={cn("mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8", !loggedIn && "blur-md")}>
        {/* Header */}
        <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              {props.title || "Game Title"}
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-lg">
              {props.description || "A brief description of the game goes here. It should be concise and engaging to encourage players to start playing."}
            </p>
          </div>
          <Button
            size="lg"
            className="h-12 px-8 text-base font-semibold tracking-wide sm:h-14 sm:px-10 sm:text-lg"
            onClick={props.onStartGame || (() => {})}
          >
            Start Game
          </Button>
        </header>

        <Separator className="my-8" />

        {/* Stats row */}
        <section aria-label="Player statistics">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard
              label="Average Score"
              value={props.averageScore || "0"}
              subtitle="Average across all sessions"
            />
            <StatCard label="High Score" value={props.highScore || "0"} subtitle="Personal best" />
            <StatCard label="Accuracy" value={`${props.averageAccuracy || "0"} %`} subtitle="Overall correct" />
          </div>
        </section>

        {/* Chart + About */}
        <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <PerformanceChart data={historyCopy?.reverse().map((game, index) => ({ session: index+1, score: game.score })) || []} />
          </div>
          <div className="lg:col-span-2">
            <Card className="h-full border-border/50 bg-card flex flex-col">
              <CardHeader>
                <CardTitle className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-6">
                <div className="flex flex-col gap-4">
                  {props.instructions.map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <span className="font-mono text-xs font-bold text-primary">
                        0{item.step}
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold text-foreground">
                          {item.title}
                        </span>
                        <CardDescription className="text-xs leading-relaxed">
                          {item.desc}
                        </CardDescription>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* History */}
        <section className="mt-6">
          <GameHistory history={props.history} />
        </section>
      </main>
      {!loggedIn && (

      <ShieldX className="size-50 fixed left-[50%] top-[35%] text-primary" strokeWidth={1} fill="var(--destructive)" />
      )}
    </div>
  );
}
