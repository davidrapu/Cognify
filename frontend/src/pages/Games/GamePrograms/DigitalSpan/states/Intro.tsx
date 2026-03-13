import GameLayout from "@/components/GameLayout";
import { Play } from "@/components/icons";
import {
  type SpanGameAction,
} from "@/hooks/useSpanGameReducer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Intro({
  dispatch
}: {
  dispatch: React.Dispatch<SpanGameAction>;
}) {
  return (
    <GameLayout>
      <div className="flex-2 bg-primary rounded-2xl flex items-center justify-center">
        <h1 className="md:text-6xl font-bold text-primary-foreground font-family-heading tracking-widest">
          Instructions
        </h1>
      </div>
      <div className="grid grid-cols-4 gap-x-4">
        <Card className="p-2 gap-y-0">
          <CardHeader>
            <CardTitle className="flex flex-col text-xl text-primary font-family-heading tracking-wider">
              1.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4">
              <li>A sequence of numbers will appear on the screen.</li>
              <li>Try to memorize them in the correct order.</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="p-2 gap-y-0">
          <CardHeader>
            <CardTitle className="flex flex-col text-xl text-primary font-family-heading tracking-wider">
              2.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4">
              <li>
                The longer the sequence you can recall, the higher your score!
              </li>
              <li>
                Every 4 consecutive correct answers increases the length of the
                sequence.
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="p-2 gap-y-0">
          <CardHeader>
            <CardTitle className="flex flex-col text-xl text-primary font-family-heading tracking-wider">
              3.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4">
              <li>
                You have 6 attempts to reach your highest score. Good luck!
              </li>
              <li>
                Good Luck!
              </li>
            </ul>
          </CardContent>
        </Card>
        <div className="flex items-center justify-center">
          <span
            onClick={() => {
              dispatch({ type: "playGame" });
            }}
            className="bg-primary rounded-xl aspect-video h-20 flex items-center justify-center cursor-pointer"
          >
            <Play
              fill="var(--primary-foreground)"
              size={40}
              className="text-primary-foreground"
            />
          </span>
        </div>
      </div>
    </GameLayout>
  );
}
