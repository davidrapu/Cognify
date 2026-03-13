
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

function getPerformanceMessage(accuracy: number): {
  label: string;
  tone: "success" | "neutral" | "warn";
} {
  if (accuracy >= 80) return { label: "Excellent recall", tone: "success" };
  if (accuracy >= 60) return { label: "Solid performance", tone: "neutral" };
  return { label: "Keep practicing", tone: "warn" };
}

function formatTime(ms: number): string {
  if (ms < 1000) return `${ms} ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

type CopletedGameSessionProps = {
  totalTime: { time: number; correct: boolean }[];
  totalCorrect: number;
  totalIncorrect: number;
  totalAttempts: number;
  highestConsecutiveCorrect: number;
  goHome: () => void;
  playAgain: () => void;
  includeHistory?: boolean;
};

export default function Completed({
  totalTime,
  totalAttempts,
  totalCorrect,
  totalIncorrect,
  highestConsecutiveCorrect,
  goHome,
  playAgain,
  includeHistory = true
}: CopletedGameSessionProps) {
  const accuracy =
    totalAttempts > 0
      ? Math.round((totalCorrect / totalAttempts) * 100)
      : 0;

  const avgTime =
    totalTime.length > 0
      ? totalTime.reduce((sum, t) => sum + t.time, 0) /
        totalTime.length
      : 0;

  const performance = getPerformanceMessage(accuracy);

  const toneColors = {
    success: "text-primary",
    neutral: "text-chart-4",
    warn: "text-chart-5",
  };

  const toneBadge = {
    success: "bg-primary/15 text-primary border-primary/20",
    neutral: "bg-chart-4/15 text-chart-4 border-chart-4/20",
    warn: "bg-chart-5/15 text-chart-5 border-chart-5/20",
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="flex w-full max-w-lg flex-col gap-8">
        {/* Hero Score */}
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Game Over
          </p>
          <div className="flex flex-col items-center gap-1">
            <span
              className={`text-7xl font-bold tracking-tight ${toneColors[performance.tone]}`}
            >
              {highestConsecutiveCorrect}
            </span>
            <p className="text-sm text-muted-foreground">
              Highest Streak
            </p>
          </div>
          <Badge variant="outline" className={toneBadge[performance.tone]}>
            {performance.label}
          </Badge>
        </div>

        <Separator className="bg-border/50" />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-border/50 bg-card">
            <CardContent className="flex flex-col gap-1 p-4">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Accuracy
              </span>
              <span className=" text-2xl font-bold text-foreground">
                {accuracy} %
              </span>
              <span className="text-xs text-muted-foreground">
                {totalCorrect} of {totalAttempts} correct
              </span>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card">
            <CardContent className="flex flex-col gap-1 p-4">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Avg. Time
              </span>
              <span className=" text-2xl font-bold text-foreground">
                {formatTime(Math.round(avgTime))}
              </span>
              <span className="text-xs text-muted-foreground">per attempt</span>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card">
            <CardContent className="flex flex-col gap-1 p-4">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Correct
              </span>
              <span className=" text-2xl font-bold text-primary">
                {totalCorrect}
              </span>
              <span className="text-xs text-muted-foreground">choices</span>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card">
            <CardContent className="flex flex-col gap-1 p-4">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Incorrect
              </span>
              <span className=" text-2xl font-bold text-destructive">
                {totalIncorrect}
              </span>
              <span className="text-xs text-muted-foreground">choices</span>
            </CardContent>
          </Card>
        </div>

        {/* Attempt Timeline */}
        {includeHistory && totalTime.length > 0 && (
          <Card className="border-border/50 bg-card">
            <CardContent className="flex flex-col gap-3 p-4">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Attempt Timeline
              </span>
              <div className="flex items-end gap-1" style={{ height: 64 }}>
                {totalTime.map((attempt, i) => {
                  const maxTime = Math.max(
                    ...totalTime.map((t) => t.time),
                  );
                  const heightPercent =
                    maxTime > 0 ? (attempt.time / maxTime) * 100 : 50;
                  return (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            key={i}
                            className="relative flex-1"
                            style={{ height: "100%" }}
                          >
                            <div
                              className={`absolute bottom-0 w-full rounded-sm ${
                                attempt.correct
                                  ? "bg-primary/70 hover:bg-primary"
                                  : "bg-destructive/70 hover:bg-destructive"
                              }`}
                              style={{
                                height: `${Math.max(heightPercent, 12)}%`,
                                minHeight: 4,
                              }}
                            />
                          </div>
                        </TooltipTrigger>

                        <TooltipContent side="top">
                          {formatTime(attempt.time)}
                        </TooltipContent>
                      </Tooltip>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-primary" />
                  Correct
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-destructive" />
                  Incorrect
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 cursor-pointer border-border/50"
            onClick={() => goHome()}
          >
            Home
          </Button>
          <Button
            className="flex-1 cursor-pointer"
            onClick={() => playAgain()}
          >
            Play Again
          </Button>
        </div>
      </div>
    </div>
  );
}
