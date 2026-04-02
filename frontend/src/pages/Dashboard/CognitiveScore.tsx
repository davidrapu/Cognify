import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BrainCog, TrendingUp } from "@/components/icons";
import CustomProgress from "@/components/CustomProgress";

export default function CognitiveScore() {
  return (
    <Card className="flex-1 rounded-sm border-none gap-3">
      <CardHeader className="text-primary text-lg font-bold">
        <div className="flex w-full justify-between items-center">
          <h3>High-Level Score</h3>
          <BrainCog className="size-5" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Cognitive Score */}
        <div className="flex gap-y-3 flex-col">
          <div className="flex items-baseline">
            <p className="text-5xl text-primary font-extrabold">842</p>
            <div
              className={`text-acceptive flex gap-x-1 ml-2 text-xs font-bold items-center`}
            >
              <TrendingUp size={12} strokeWidth={2} />
              <p>12%</p>
            </div>
          </div>
          <p className="text-muted-foreground text-sm max-w-70 font-semibold">
            Your cognitive peak was reached during the memory assessment
            yesterday.
          </p>
          <div className="h-7 border-b"></div>
        </div>
        {/* Daily Goal */}
        <div className="space-y-3 mb-2">
            <div className="flex justify-between text-[11px] font-extrabold">
                <p className="text-muted-foreground uppercase tracking-widest">daily goal</p>
                <p className="text-primary">85% Complete</p>
            </div>
            <CustomProgress value={85} max={100} className="h-3"   />
        </div>
      </CardContent>
    </Card>
  );
}
