"use client";

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

const testData = [
  { session: 1, score: 4 },
  { session: 2, score: 5 },
  { session: 3, score: 4 },
  { session: 4, score: 6 },
  { session: 5, score: 5 },
  { session: 6, score: 7 },
  { session: 7, score: 6 },
  { session: 8, score: 8 },
  { session: 9, score: 7 },
  { session: 10, score: 7 },
];
type PerformanceChartProps = {
  data?: { session: number; score: number }[];
};

export default function PerformanceChart({ data = testData }: PerformanceChartProps) {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 pb-4">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart
            data={data}
            margin={{ top: 8, right: 12, left: -12, bottom: 0 }}
          >
            <defs>
              <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-border)"
              vertical={false}
            />
            <XAxis
              dataKey="session"
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              domain={[0, 10]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                color: "var(--color-foreground)",
                fontSize: "13px",
              }}
              labelFormatter={(label) => `Session ${label}`}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="var(--color-primary)"
              strokeWidth={2}
              fill="url(#scoreGradient)"
              activeDot={{
                r: 5,
                fill: "var(--color-primary)",
                stroke: "var(--color-card)",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
