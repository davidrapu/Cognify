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
  isMobile: boolean;
  games: {
    title: string;
    description: string;
    mobileDescription: string;
    domain: string;
    imgLink: string;
    gameLocation: string;
  }[];
};

export default function GameRowSection({
  domain = "Cognitive Domain",
  games,
  isMobile,
}: GameRowSectionProps) {
  const navigate = useNavigate();
  return (
    <section>
      <Carousel className="space-y-5">
        <div className="flex gap-x-3 items-center">
          <div className="w-1.5 h-6 bg-primary rounded-full"></div>
          <h3 className="font-family-manrope font-bold text-primary tracking-wide text-lg md:text-xl lg:text-2xl">
            {domain} Domain
          </h3>
        </div>
        <CarouselContent className="-ml-2 py-3">
          {games.map((game) => (
            <CarouselItem className="basis-auto" key={game.title}>
              <Card className="group w-45 md:w-60 h-full pb-7 pt-0 gap-4 overflow-clip hover:border-primary/20 hover:drop-shadow-lg transition-transform duration-300">
                <div className="relative max-h-35 flex contain-content items-center justify-center bg-primary">
                  <img
                    className=" object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    src={game.imgLink}
                  />
                  <Badge className="absolute bottom-2 right-2 text-[10px] uppercase bg-secondary text-primary py-1 tracking-widest">
                    {game.domain}
                  </Badge>
                </div>
                <div className="flex-2 px-3 gap-y-2 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="text-md md:text-xl font-bold tracking-wide font-family-manrope">
                      {game.title}
                    </h4>
                    <p className="text-sm md:text-base mb-3 tracking-[0.005em] text-muted-foreground">
                      {isMobile ? game.mobileDescription : game.description}
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
