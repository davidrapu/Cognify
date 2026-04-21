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
  ShieldX,
} from "@/components/icons";
import GameRecommendations from "./GameRecommendations";
import DomainPerformanceChart from "./DomainPerformanceChart";
import { Suspense, useEffect, useState } from "react";
import { useApiFetch } from "@/hooks/useApiFetch";
import type { SessionData } from "@/types/session.fetched";
import PageLoader from "@/components/PageLoader";
import { useAuth } from "@/contexts/AuthContext/AuthContext";

const games = [
  {
    name: "Digital Span",
    description:
      "Hold sequences of numbers in mind and recall them in order — tests your working memory capacity.",
    icon: Binary,
    location: "/games/digital-span",
    time: "3 MIN",
    colorClass: "bg-[#a3ecef] text-[#006778]",
  },
  {
    name: "Card Match",
    description:
      "Flip cards and find matching pairs — challenges your short-term visual memory and concentration.",
    icon: LayoutGrid,
    location: "/games/card-match",
    time: "5 MIN",
    colorClass: "bg-[#ffd6a5] text-[#7c4a00]",
  },
  {
    name: "Sequence Recall",
    description:
      "Watch a sequence of highlighted tiles and reproduce it exactly — measures sequential memory and processing speed.",
    icon: ListOrdered,
    location: "/games/sequence-recall",
    time: "5 MIN",
    colorClass: "bg-[#c8f7c5] text-[#1a6b16]",
  },
  {
    name: "Visual Search",
    description:
      "Spot a target hidden among distractors as quickly as possible — trains selective attention and visual scanning.",
    icon: Search,
    location: "/games/visual-search",
    time: "3 MIN",
    colorClass: "bg-[#d4c5f9] text-[#3d1a8e]",
  },
  {
    name: "Stroop Test",
    description:
      "Read the colour of a word, not what it says — measures cognitive control and your ability to suppress automatic responses.",
    icon: Palette,
    location: "/games/stroop-test",
    time: "1 MIN",
    colorClass: "bg-[#ffc8c8] text-[#7a0000]",
  },
  {
    name: "Go No Go",
    description:
      "Press for targets, hold back for distractors — assesses impulse control and sustained attention under pressure.",
    icon: Play,
    location: "/games/go-no-go",
    time: "5 MIN",
    colorClass: "bg-[#ffe5a0] text-[#6b4800]",
  },
  {
    name: "Choice Reaction Time",
    description:
      "Match each stimulus to the correct response as fast as you can — evaluates decision speed and mental agility.",
    icon: GitBranch,
    location: "/games/choice-reaction-time",
    time: "3 MIN",
    colorClass: "bg-[#b8e8ff] text-[#004f7c]",
  },
  {
    name: "Pattern Puzzle",
    description:
      "Decode visual patterns and predict what comes next — tests abstract reasoning and problem solving ability.",
    icon: Puzzle,
    location: "/games/pattern-puzzle",
    time: "10 MIN",
    colorClass: "bg-[#ffd7f0] text-[#7a0057]",
  },
  {
    name: "Arithmetic Pattern Puzzle",
    description:
      "Solve mental arithmetic problems against the clock — builds numerical processing speed and working memory.",
    icon: Calculator,
    location: "/games/arithmetic-puzzle",
    time: "8 MIN",
    colorClass: "bg-[#d9f0b0] text-[#3a5c00]",
  },
];

type DomainScores = {
  memory: number;
  reactionScore: number;
  attention: number;
  problemSolving: number;
};
type DomainTrends = {
  memory: SessionData[];
  attention: SessionData[];
  problemSolving: SessionData[];
  reaction: SessionData[];
};

const determineSectionOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  else if (hour < 18) return "afternoon";
  else return "evening";
};

const determineMMSEScoreLevel = (score: number) => {
  if (score >= 24) return "Normal Cognition";
  else if (score >= 18) return "Mild Cognitive Impairment";
  else return "Severe Cognitive Impairment";
};
export default function Dashboard() {
  const apiFetch = useApiFetch();
  const { user, loggedIn } = useAuth();

  const [cognitiveScore, setCognitiveScore] = useState<number>(0);
  const [level, setLevel] = useState<string>("");
  const [domainScores, setDomainScores] = useState<DomainScores>(
    {} as DomainScores,
  );
  const [domainTrends, setDomainTrends] = useState<DomainTrends>(
    {} as DomainTrends,
  );
  const [progress, setProgress] = useState<number>(0);
  const [trend, setTrend] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const [recommended, setRecommended] = useState<{
    featured: (typeof games)[0];
    others: (typeof games)[0][];
  }>({} as { featured: (typeof games)[0]; others: (typeof games)[0][] });
  const [quizScore, setQuizScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const convertToGameName = (name: string) => {
    return name.split("_").join(" ").toLowerCase();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await apiFetch("/analytics");
        const data = await res.json();
        // console.log(data);
        
        setCognitiveScore(data.data.cognitiveScore);
        setLevel(data.data.riskLevel);
        setDomainScores(data.data.domainScores);
        setTrend(data.data.trend);
        setDomainTrends(data.data.domainTrends);
        setProgress(data.data.dailyGoal.progress);
        setComment(data.data.comment);
        setRecommended(data.data.recommended);
        setQuizScore(data.data.quizScore);

        const featuredGameName = convertToGameName(
          data.data.recommendations.featured,
        );
        const othersGameNames = data.data.recommendations.others.map(
          (name: string) => convertToGameName(name),
        );
        const featuredGame = games.find(
          (game) => game.name.toLowerCase() === featuredGameName,
        );
        const otherGames = games.filter((game) =>
          othersGameNames.includes(game.name.toLowerCase()),
        );
        setRecommended({
          featured: featuredGame ?? games[0],
          others: otherGames,
        });

        // console.log("Fetched predictions:", data);
      } catch (error) {
        console.error("Error fetching predictions:", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []); // eslint-disable-line

  return (
    <div className="w-full min-h-screen">
      <SidebarProvider>
        <AppBar />
        <SidebarInset className="flex flex-col min-h-screen">
          <div className="flex justify-between pr-2 pt-2 mb-2">
            <SidebarTrigger className="m-1 text-foreground" />
            <UserAvatar size={9} />
          </div>
          {loggedIn && (
            <Suspense fallback={<PageLoader />}>
              {isLoading ? (
                <PageLoader />
              ) : (
                <main className="flex-1 space-y-10 mx-10 min-h-full pt-2 mb-15 font-family-manrope ">
                  {/* Header */}
                  <div className="flex flex-col gap-y-3 mb-8">
                    <p className="uppercase font-family-manrope text-xs -tracking-tighter text-primary font-medium">
                      dashboard overview
                    </p>
                    <div className="w-full flex justify-between items-center h-max-content">
                      {user && (
                        <h1 className="text-[32px] font-family-pub-sans font-bold text-primary">
                          Good {determineSectionOfDay()},{" "}
                          {user.firstName.charAt(0).toUpperCase() +
                            user.firstName.slice(1)}
                          .
                        </h1>
                      )}
                      <div className="text-right">
                      <p className="text-xs font-medium text-muted-foreground">
                        Cognitive MMSE Score
                      </p>
                      <p className="text-base font-extrabold text-primary ">
                        {determineMMSEScoreLevel(quizScore)} &bull; {quizScore} / 30
                      </p>
                    </div>
                    </div>
                  </div>
                  <section>
                    {/* Cognitive Scores */}
                    <div className="flex gap-x-3">
                      <CognitiveScore
                        comment={comment}
                        score={cognitiveScore * 1000}
                        level={level}
                        trend={trend}
                        progress={progress}
                      />
                      <DomainScores scores={domainScores} />
                    </div>
                  </section>
                  <section>
                    {/* Domain Performance Chart */}
                    <DomainPerformanceChart domainTrends={domainTrends} />
                  </section>
                  {/* Game Recommendations */}
                  <section>
                    <div>
                      <div className="flex gap-x-3 items-center mb-6">
                        <h2 className="w-fit text-2xl font-extrabold text-primary">
                          Daily Recommendations
                        </h2>
                        <div className="h-0 border-2 flex-1" />
                      </div>
                      {/* The Games */}
                      {recommended.featured && (
                        <GameRecommendations
                          featuredGame={recommended.featured}
                          otherGames={recommended.others}
                        />
                      )}
                    </div>
                  </section>
                </main>
              )}
            </Suspense>
          )}
          {!loggedIn && (
            <main className="flex-1 relative">
              <div className="flex-1 space-y-10 mx-10 min-h-full pt-2 mb-15 font-family-manrope blur-lg">
                {/* Header */}
                <div className="flex flex-col gap-y-3 mb-8">
                  <p className="uppercase font-family-manrope text-xs -tracking-tighter text-primary font-medium">
                    dashboard overview
                  </p>
                  <div className="w-full flex justify-between items-center h-max-content">
                    <h1 className="text-[32px] font-family-pub-sans font-bold text-primary">
                      Good morning, Alex.
                    </h1>
                  </div>
                </div>

                <section>
                  <div className="flex gap-x-3">
                    <CognitiveScore
                      comment="Loading..."
                      score={750}
                      level="Low"
                      trend={12}
                      progress={0.6}
                    />
                    <DomainScores
                      scores={{
                        memory: 0.7,
                        attention: 0.8,
                        problemSolving: 0.6,
                        reactionScore: 0.75,
                      }}
                    />
                  </div>
                </section>

                <section>
                  <DomainPerformanceChart
                    domainTrends={{
                      memory: [],
                      attention: [],
                      problemSolving: [],
                      reaction: [],
                    }}
                  />
                </section>

                <section>
                  <div>
                    <div className="flex gap-x-3 items-center mb-6">
                      <h2 className="w-fit text-2xl font-extrabold text-primary">
                        Daily Recommendations
                      </h2>
                      <div className="h-0 border-2 flex-1" />
                    </div>
                    <GameRecommendations
                      featuredGame={games[0]}
                      otherGames={games.slice(1, 3)}
                    />
                  </div>
                </section>
              </div>
              <ShieldX
                className="size-50 fixed left-[50%] top-[35%] text-primary"
                strokeWidth={1}
                fill="var(--destructive)"
              />
            </main>
          )}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
