import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Play } from "@/components/icons";
import { type LucideIcon } from "lucide-react";
import ActivityCard from "./ActivityCard";

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
  return (
    <div className="flex gap-x-4 min-h-120 max-h-150">
      {/* main game */}
      <Card className="relative flex-1 bg-muted max-h-100 rounded-xl overflow-clip group">
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0452DHfy0QuYLqK_0Nyi1blnK1szP0PBMK2ljQHidSAet3TFDoAfkIHw8YPhzHyDYqcYuWWzjStGa5tS8jR6lmwLPt4VT-cU3wImge9gXEY-Htxrr_q2-QyCRzfGjk-zTipUF-ReDzPNqCrYiWgNg5ldU8t76b8vjN2dnE5k7lAKWqQqnV0EGso67omeCzKE6xSVSdtdyscLgLox3UgJqfz66NEBg8BhbxQxBhCnVOwR5IqwxgH8juLiiIeeYRo0wtSkeXFHzcM9d"
          alt="Pattern Recall Visualization"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-10 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-md">
            <Badge className="bg-secondary-primary text-secondary-primary-foreground text-[10px] font-bold tracking-widest uppercase inline-block">
              NEURO-RECALL SERIES
            </Badge>
            <h3 className="font-headline text-4xl font-extrabold text-white mb-2">
              {featuredGame.name}
            </h3>
            <p className="text-white/80 font-medium">
              {featuredGame.description}
            </p>
          </div>
          <button
            onClick={() => {}}
            className="bg-white text-primary w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shrink-0 cursor-pointer"
          >
            <Play className="w-8 h-8 fill-primary" />
          </button>
        </div>
      </Card>
      {/* 2 extra games */}
      <div className="flex flex-col gap-8">
        {otherGames.map((game) => (
          <ActivityCard
            key={game.name}
            Icon={game.icon}
            title={game.name}
            description={game.description}
            time={game.time}
            colorClass={game.colorClass}
          />
        ))}
      </div>
    </div>
  );
}
