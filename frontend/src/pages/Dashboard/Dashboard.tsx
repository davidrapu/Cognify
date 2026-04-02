import AppBar from "@/components/AppBar/AppBar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import UserAvatar from "@/components/UserAvatar";
import CognitiveScore from "./CognitiveScore";
import DomainScores from "./DomainScores";
import {
  Binary,
  Calculator,
  GitBranch,
  LayoutGrid,
  ListOrdered,
  Palette,
  Play,
  Puzzle,
  Search,
} from "@/components/icons";
import GameRecommendations from "./GameRecommendations";
import DomainPerformanceChart from "./DomainPerformanceChart";

const games = [
  {
    name: "Digital Span",
    description:
      "Hold sequences of numbers in mind and recall them in order — tests your working memory capacity.",
    icon: Binary,
    location: "/games/digital-span",
    time: "12 MIN",
    colorClass: "bg-[#a3ecef] text-[#006778]",
  },
  {
    name: "Card Matching",
    description:
      "Flip cards and find matching pairs — challenges your short-term visual memory and concentration.",
    icon: LayoutGrid,
    location: "/games/card-match",
    time: "10 MIN",
    colorClass: "bg-[#ffd6a5] text-[#7c4a00]",
  },
  {
    name: "Sequence Recall",
    description:
      "Watch a sequence of highlighted tiles and reproduce it exactly — measures sequential memory and processing speed.",
    icon: ListOrdered,
    location: "/games/sequence-recall",
    time: "10 MIN",
    colorClass: "bg-[#c8f7c5] text-[#1a6b16]",
  },
  {
    name: "Visual Search",
    description:
      "Spot a target hidden among distractors as quickly as possible — trains selective attention and visual scanning.",
    icon: Search,
    location: "/games/visual-search",
    time: "8 MIN",
    colorClass: "bg-[#d4c5f9] text-[#3d1a8e]",
  },
  {
    name: "Stroop Test",
    description:
      "Read the colour of a word, not what it says — measures cognitive control and your ability to suppress automatic responses.",
    icon: Palette,
    location: "/games/stroop-test",
    time: "8 MIN",
    colorClass: "bg-[#ffc8c8] text-[#7a0000]",
  },
  {
    name: "Go / No Go",
    description:
      "Press for targets, hold back for distractors — assesses impulse control and sustained attention under pressure.",
    icon: Play,
    location: "/games/go-no-go",
    time: "10 MIN",
    colorClass: "bg-[#ffe5a0] text-[#6b4800]",
  },
  {
    name: "Choice Reaction Time",
    description:
      "Match each stimulus to the correct response as fast as you can — evaluates decision speed and mental agility.",
    icon: GitBranch,
    location: "/games/choice-reaction-time",
    time: "8 MIN",
    colorClass: "bg-[#b8e8ff] text-[#004f7c]",
  },
  {
    name: "Pattern Puzzle",
    description:
      "Decode visual patterns and predict what comes next — tests abstract reasoning and problem solving ability.",
    icon: Puzzle,
    location: "/games/pattern-puzzle",
    time: "12 MIN",
    colorClass: "bg-[#ffd7f0] text-[#7a0057]",
  },
  {
    name: "Arithmetic Puzzle",
    description:
      "Solve mental arithmetic problems against the clock — builds numerical processing speed and working memory.",
    icon: Calculator,
    location: "/games/arithmetic-puzzle",
    time: "12 MIN",
    colorClass: "bg-[#d9f0b0] text-[#3a5c00]",
  },
];

export default function Dashboard() {
  const featuredGame = games[0]; // For now, just take the first game as featured. Can implement better logic later.
  const otherGames = games.slice(3, 5); // Just take 2 other games for the "Daily Recommendations". Can implement better logic later.

  return (
    <div className="w-full min-h-screen">
      <SidebarProvider>
        <AppBar />
        <SidebarInset className="flex flex-col min-h-screen">
          <div className="flex justify-between pr-2 pt-2 mb-2">
            <SidebarTrigger className="m-1 text-foreground" />
            <UserAvatar size={9} />
          </div>
          <main className="flex-1 space-y-10 mx-10 min-h-full pt-2 mb-15 font-family-manrope ">
            {/* Header */}
            <div className="flex flex-col gap-y-3 mb-8">
              <p className="uppercase font-family-manrope text-xs -tracking-tighter text-primary font-medium">
                dashboard overview
              </p>
              <div className="w-full flex justify-between items-center h-max-content">
                <h1 className="text-[32px] font-family-pub-sans font-bold text-primary">
                  Good morning, Alex.
                </h1>
                <div className="text-right">
                  <p className="text-xs font-medium text-muted-foreground">
                    Cognitive Load Index
                  </p>
                  <p className="text-base font-extrabold text-primary ">
                    Stable &bull; 104 bps
                  </p>
                </div>
              </div>
            </div>
            <section>
              {/* Cognitive Scores */}
              <div className="flex gap-x-3">
                <CognitiveScore />
                <DomainScores />
              </div>
            </section>
            <section>
              {/* Domain Performance Chart */}
              <DomainPerformanceChart />
            </section>
            {/* Game Recommendations */}
            <section>
              <div>
                <div className="flex gap-x-3 items-center mb-6">
                  <h2 className="w-fit text-2xl font-extrabold text-primary">
                    Daily Recommendations
                  </h2>
                  <div className="h-0 border flex-1" />
                </div>
                {/* The Games */}
                <GameRecommendations
                  featuredGame={featuredGame}
                  otherGames={otherGames}
                />
              </div>
            </section>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
