// import Button from "@/components/Button"
import { useNavigate } from "react-router";
import { Brain, Eye, Zap, Puzzle } from "@/components/icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import image from "@/assets/images/Pop-up-rafiki.svg";

const games = [
  {
    category: "Memory",
    icon: Brain,
    games: [
      { name: "Card Match", path: "card-match" },
      { name: "Digital Span", path: "digital-span" },
      { name: "Sequence Recall", path: "sequence-recall" },
    ],
  },
  {
    category: "Attention",
    icon: Eye,
    games: [
      { name: "Visual Search", path: "visual-search" },
      { name: "Stroop Test", path: "stroop-test" },
    ],
  },
  {
    category: "Reaction Time",
    icon: Zap,
    games: [
      { name: "Simple Reaction Time", path: "simple-reaction-time" },
      { name: "Go/No-Go", path: "go-no-go" },
      { name: "Complex Reaction Time", path: "complex-reaction-time" },
    ],
  },
  {
    category: "Problem Solving",
    icon: Puzzle,
    games: [
      { name: "Pattern Puzzle", path: "pattern-puzzle" },
      { name: "Arithmetic Puzzle", path: "arithmetic-puzzle" },
    ],
  },
];

export default function GamesHome() {
  // const navigate = useNavigate()
  return (
    <div className="flex-1 flex flex-col h-full px-5 py-2 gap-y-5">
      <div className="bg-primary/70 w-full rounded-2xl flex justify-center p-3">

        <div className="flex gap-y-2 max-w-2xl flex-col justify-center text-center">
          <h1 className="text-6xl font-bold tracking-wide text-primary-foreground font-family-heading">Train Your Mind</h1>

          <p className="text-muted-foreground text-sm sm:text-base font-medium">
            Strengthen memory, sharpen focus, improve reaction speed, and
            enhance problem-solving through structured cognitive challenges.
          </p>
        </div>

        <img
          src={image}
          alt="Deep Work Illustration"
          className="max-w-sm rounded-2xl"
        />
      </div>

      {games.map((gameCategory, index) => (
        <GameCardRow key={index} rowDataObject={gameCategory} />
      ))}
    </div>
  );
}

type GameCardRowProps = {
  rowDataObject: {
    category: string;
    icon: React.ComponentType<{ size: number; fill: string; color: string }>;
    games: { name: string; path: string }[];
  };
};

function GameCardRow({ rowDataObject }: GameCardRowProps) {
  const navigate = useNavigate();
  return (
    <div className="space-y-1">
      <div className="flex gap-x-1 items-center">
        <rowDataObject.icon
          size={14}
          fill="var(--primary-foreground)"
          color="var(--primary)"
        />
        <p className="font-family-heading text-sm text-primary">
          {rowDataObject.category}
        </p>
      </div>
      <Carousel className="w-full">
        <CarouselContent className="-ml-2">
          {rowDataObject.games.map((game, index) => (
            <CarouselItem
              className="basis-4/5 sm:basis-1/2 lg:basis-1/3"
              key={index}
            >
              <div
                className="bg-muted w-full h-30 rounded-2xl cursor-pointer"
                onClick={() => navigate(game.path)}
              ></div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
