import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const performanceData = [
  { session: 1, memory: 5, attention: 6, processing: 9, reasoning: 3 },
  { session: 2, memory: 6, attention: 7, processing: 7, reasoning: 4 },
  { session: 3, memory: 5, attention: 6, processing: 8, reasoning: 5 },
  { session: 4, memory: 7, attention: 8, processing: 6, reasoning: 5 },
  { session: 5, memory: 6, attention: 7, processing: 7, reasoning: 6 },
  { session: 6, memory: 8, attention: 9, processing: 5, reasoning: 6 },
  { session: 7, memory: 7, attention: 8, processing: 6, reasoning: 7 },
  { session: 8, memory: 8, attention: 9, processing: 4, reasoning: 7 },
  { session: 9, memory: 7, attention: 8, processing: 5, reasoning: 8 },
  { session: 10, memory: 8, attention: 9, processing: 3, reasoning: 8 },
];

const domainConfig = [
  { key: "memory", name: "Memory", color: "var(--primary)" },
  { key: "attention", name: "Attention", color: "#22c55e" },
  { key: "processing", name: "Processing", color: "#f59e0b" },
  { key: "reasoning", name: "Reasoning", color: "#ec4899" },
];

export default function DomainPerformanceChart() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {domainConfig.map((domain) => (
        <Card key={domain.key} className="border-border/50 bg-card">
          <CardHeader className="pb-1 pt-4 px-4">
            <div className="flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: domain.color }}
              />
              <CardTitle className="text-sm font-bold tracking-wider text-foreground">
                {domain.name}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="px-2 pb-3">
            <ResponsiveContainer width="100%" height={120}>
              <AreaChart
                data={performanceData}
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
                      stopColor={domain.color}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="100%"
                      stopColor={domain.color}
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
                  domain={[0, 10]}
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
                />
                <Area
                  type="monotone"
                  dataKey={domain.key}
                  name={domain.name}
                  stroke={domain.color}
                  strokeWidth={2}
                  fill={`url(#${domain.key}Gradient)`}
                  activeDot={{
                    r: 4,
                    fill: domain.color,
                    stroke: "var(--card)",
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
