import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const historyData = [
  { id: 1, date: "Today", score: 7, accuracy: 88, reaction: 2 },
  { id: 2, date: "Today", score: 6, accuracy: 75, reaction: 3 },
  { id: 3, date: "Yesterday", score: 5, accuracy: 60, reaction: 4},
  { id: 4, date: "Yesterday", score: 8, accuracy: 92, reaction: 7 },
  { id: 5, date: "Feb 24", score: 4, accuracy: 50, reaction: 10 },
];

type GameHistoryProps = {
  history?: { id: number; date: string; score: number, accuracy: number, reaction: number }[];
};

export default function GameHistory({ history = historyData }: GameHistoryProps) {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <CardTitle className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Recent Games
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-2">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="pl-6 text-xs uppercase tracking-wider text-muted-foreground">
                Date
              </TableHead>
              <TableHead className="text-right text-xs uppercase tracking-wider text-muted-foreground">
                Score
              </TableHead>
              <TableHead className="text-right text-xs uppercase tracking-wider text-muted-foreground">
                Accuracy
              </TableHead>
              <TableHead className="pr-6 text-right text-xs uppercase tracking-wider text-muted-foreground">
                Avg Reaction Time <span className="lowercase">(ms)</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((game) => (
              <TableRow
                key={game.id}
                className="border-border/30 hover:bg-accent/50"
              >
                <TableCell className="pl-6 text-foreground">
                  {game.date}
                </TableCell>
                <TableCell className="text-right font-mono text-foreground">
                  {game.score}
                </TableCell>
                <TableCell className="text-right font-mono text-muted-foreground">
                  {game.accuracy}%
                </TableCell>
                <TableCell className="text-right font-mono text-muted-foreground">
                  {game.reaction}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
