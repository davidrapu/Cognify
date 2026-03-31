import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router";

type GameRowSectionProps = {
  domain: string;
  games: {
    title: string;
    description: string;
    domain: string;
    imgLink: string;
    gameLocation: string;
  }[];
};

export default function GameRowSection({
  domain = "Cognitive Domain",
  games,
}: GameRowSectionProps) {
  const navigate = useNavigate();
  return (
    <section>
      <Carousel className="space-y-5">
        <div className="flex gap-x-3">
          <div className="w-1.5 h-8 bg-primary rounded-full"></div>
          <h3 className="font-family-manrope font-bold text-primary tracking-wide text-2xl">
            {domain} Domain
          </h3>
        </div>
        <CarouselContent className="-ml-2 py-3">
          {games.map((game) => (
            <CarouselItem className="basis-auto" key={game.title}>
              <Card className="group w-70 h-full pb-7 pt-0 gap-4 overflow-clip hover:border-primary/20 hover:drop-shadow-lg transition-transform duration-300">
                <div className="relative max-h-40 flex contain-content items-center justify-center bg-primary">
                  <img
                    className=" object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    src={game.imgLink}
                  />
                  <Badge className="absolute bottom-2 right-2 text-xs uppercase bg-secondary text-primary py-1 tracking-widest">
                    {game.domain}
                  </Badge>
                </div>
                <div className="flex-2 px-6 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold tracking-wide font-family-manrope">
                      {game.title}
                    </h4>
                    <p className="text-sm mb-3 leading-normal tracking-[0.005em] text-muted-foreground">
                      {game.description}
                    </p>
                  </div>
                  <Button
                    onClick={() => navigate(game.gameLocation)}
                    className="rounded-full bg-secondary text-secondary-foreground tracking-wide group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 cursor-pointer "
                  >
                    View Game
                  </Button>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
