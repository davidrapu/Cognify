import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Play } from "@/components/icons";
import { type LucideIcon } from "lucide-react";
import ActivityCard from "./ActivityCard";
import {useNavigate } from "react-router";

type Game = {
  name: string;
  description: string;
  icon: LucideIcon;
  location: string;
  time: string;
  colorClass: string;
};

type GameRecommendationProps = {
    featuredGame : Game,
    otherGames : Game[]
}

export default function GameRecommendations({ featuredGame, otherGames } : GameRecommendationProps) {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col gap-y-4 md:flex-row md:gap-x-6">
      {/* main game */}
      <Card className="relative min-h-80 flex-2 min-w-0 bg-muted rounded-xl overflow-clip group md:shrink-0 md:min-w-60 md:max-h-100 lg:">
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0452DHfy0QuYLqK_0Nyi1blnK1szP0PBMK2ljQHidSAet3TFDoAfkIHw8YPhzHyDYqcYuWWzjStGa5tS8jR6lmwLPt4VT-cU3wImge9gXEY-Htxrr_q2-QyCRzfGjk-zTipUF-ReDzPNqCrYiWgNg5ldU8t76b8vjN2dnE5k7lAKWqQqnV0EGso67omeCzKE6xSVSdtdyscLgLox3UgJqfz66NEBg8BhbxQxBhCnVOwR5IqwxgH8juLiiIeeYRo0wtSkeXFHzcM9d"
          alt="Pattern Recall Visualization"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-10 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-md">
            <Badge className="bg-secondary-primary text-secondary-primary-foreground text-[8px] font-bold tracking-widest uppercase inline-block">
              FEATURED
            </Badge>
            <h3 className="font-headline text-xl font-extrabold text-white mb-2">
              {featuredGame.name}
            </h3>
            <p className="text-white/80 text-xs font-medium">
              {featuredGame.description}
            </p>
          </div>
          <button
            onClick={() => {
              navigate(featuredGame.location);
            }}
            className="bg-white text-primary size-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shrink-0 cursor-pointer"
          >
            <Play className="size-5 fill-primary" />
          </button>
        </div>
      </Card>
      {/* 2 extra games */}
      <div className="flex flex-col gap-4 md:w-50 lg:flex-1 md:shrink-0">
        {otherGames.map((game) => (
          <ActivityCard
            key={game.name}
            Icon={game.icon}
            title={game.name}
            description={game.description}
            time={game.time}
            colorClass={game.colorClass}
            location={game.location}
          />
        ))}
      </div>
    </div>
  );
}
