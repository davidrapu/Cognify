import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SessionData } from "@/types/session.fetched";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type DomainTrends = {
  memory: SessionData[];
  attention: SessionData[];
  problemSolving: SessionData[];
  reaction: SessionData[];
};

type Props = {
  domainTrends: DomainTrends;
};

const domainConfig = [
  { key: "memory", name: "Memory", color: "var(--primary)" },
  { key: "attention", name: "Attention", color: "#22c55e" },
  { key: "reaction", name: "Reaction", color: "#f59e0b" },
  { key: "problemSolving", name: "Problem Solving", color: "#ec4899" },
];

export default function DomainPerformanceChart({ domainTrends }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex gap-x-3 items-center mb-6">
        <h2 className="w-fit text-xl font-extrabold text-primary">
          Domain Performance (Last 10 Sessions)
        </h2>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {domainConfig.map((domain) => {
          const sessions = domainTrends[domain.key as keyof DomainTrends] ?? [];
          const data = sessions
            .slice(-10)
            .map((s, i) => ({ session: i + 1, score: s.gameScore }));

          const isIncreasing =
            data.length > 1 && data[data.length - 1].score > data[0].score;
          const trendColor = isIncreasing
            ? "var(--acceptive-2)"
            : "var(--destructive)";

          return (
            <Card key={domain.key} className="border-border/50 bg-card">
              <CardHeader className="pb-1 pt-4 px-4">
                <div className="flex items-center gap-2">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: trendColor }}
                  />
                  <CardTitle className="text-sm font-bold tracking-wider text-foreground">
                    {domain.name}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="px-2 pb-3">
                {data.length === 0 ? (
                  <div className="h-30 flex items-center justify-center text-xs text-muted-foreground">
                    No sessions yet
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={120}>
                    <AreaChart
                      data={data}
                      margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id={`${domain.key}Gradient`}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor={trendColor}
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="100%"
                            stopColor={trendColor}
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--border)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="session"
                        tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
                        tickLine={false}
                        axisLine={false}
                        domain={[0, 1]}
                        tickFormatter={(value) =>
                          `${(value * 100).toFixed(0)}%`
                        }
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: "8px",
                          color: "var(--foreground)",
                          fontSize: "12px",
                        }}
                        labelFormatter={(label) => `Session ${label}`}
                        formatter={(value) =>
                          [
                            typeof value === "number"
                              ? `${(value * 100).toFixed(0)}%`
                              : "N/A",
                            domain.name,
                          ] as [string, string]
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="score"
                        name={domain.name}
                        stroke={trendColor}
                        strokeWidth={2}
                        fill={`url(#${domain.key}Gradient)`}
                        activeDot={{
                          r: 4,
                          fill: trendColor,
                          stroke: "var(--card)",
                          strokeWidth: 2,
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
