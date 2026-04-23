import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BrainCog, TrendingDown, TrendingUp } from "@/components/icons";
import CustomProgress from "@/components/CustomProgress";

export default function CognitiveScore({
  score,
  level,
  trend,
  progress,
  comment
}: {
  score: number;
  level: string;
  trend: number | null;
  progress: number;
  comment: string;
}) {
  const trendPositive = trend !== null && trend >= 0;
  return (
    <Card className="flex-1 rounded-sm border-none gap-3 h-fit">
      <CardHeader className="text-primary text-lg font-bold">
        <div className="flex w-full justify-between items-center">
          <h3 className="text-md">{level} Cognitive Risk</h3>
          <BrainCog className="size-5" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Cognitive Score */}
        <div className="flex gap-y-3 flex-col">
          <div className="flex items-baseline">
            <p className="text-5xl text-primary font-extrabold">
              {Number(score).toFixed(0)}
            </p>
            {trend !== null && (
              <div
                className={`${trendPositive ? "text-acceptive" : "text-destructive"} flex gap-x-1 ml-2 text-xs font-bold items-center`}
              >
                {trendPositive ? (
                  <TrendingUp size={12} strokeWidth={2} />
                ) : (
                  <TrendingDown size={12} strokeWidth={2} />
                )}
                <p>{Math.abs(Math.round(trend * 100) / 100)}%</p>
              </div>
            )}
          </div>
          <p className="text-muted-foreground text-sm max-w-70 font-semibold">
            {comment}
          </p>
          <div className="h-7 border-b"></div>
        </div>
        {/* Daily Goal */}
        <div className="space-y-3 mb-2">
          <div className="flex justify-between text-[11px] font-extrabold">
            <p className="text-muted-foreground uppercase tracking-widest">
              daily goal
            </p>
            <p className="text-primary">{progress * 100}% Complete</p>
          </div>
          <CustomProgress value={progress * 100} max={100} className="h-3" />
        </div>
      </CardContent>
    </Card>
  );
}
