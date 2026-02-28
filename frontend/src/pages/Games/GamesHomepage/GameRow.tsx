import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useNavigate } from "react-router";

type GameCardRowProps = {
  rowDataObject: {
    category: string;
    icon: React.ComponentType<{ size: number; fill: string; color: string }>;
    games: { name: string; path: string }[];
  };
};

export default function GameCardRow({ rowDataObject }: GameCardRowProps) {
  const navigate = useNavigate();
  return (
    <div className="space-y-1">
      <div className="flex gap-x-1 items-center">
        <rowDataObject.icon
          size={14}
          fill="var(--primary-foreground)"
          color="var(--primary)"
        />
        <p className="font-family-heading tracking-wide text-sm text-primary">
          {rowDataObject.category}
        </p>
      </div>
      <Carousel className="w-full">
        <CarouselContent className="-ml-2">
          {rowDataObject.games.map((game, index) => (
            <CarouselItem
              className="basis-1/2 sm:basis-1/2 lg:basis-1/3"
              key={index}
            >
              <div
                className="bg-muted w-full h-30 rounded-2xl cursor-pointer flex items-center justify-center text-muted-foreground"
                onClick={() => navigate(game.path)}
              >
                {game.name}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
