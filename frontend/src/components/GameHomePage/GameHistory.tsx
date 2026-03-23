import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


type GameHistoryProps = {
  history?: { id: number; date: Date; score: number, accuracy: number, reaction: number }[] | undefined;
};

export default function GameHistory({ history }: GameHistoryProps) {
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
                Avg Reaction Time <span className="lowercase">(s)</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history?.map((game) => (
              <TableRow
                key={game.id}
                className="border-border/30 hover:bg-accent/50"
              >
                <TableCell className="pl-6 text-foreground">
                  {game.date.toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right text-foreground">
                  {game.score}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {game.accuracy}%
                </TableCell>
                <TableCell className="text-right text-muted-foreground pr-6">
                  {Math.round(game.reaction / 1000 * 100) / 100}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
