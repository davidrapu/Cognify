import CardMatch from "./CardMatch";
import cardObj from "@/data/cards.json";
import { useCardMatchReducer } from "@/hooks/useCardMatchReducer";

export default function CardMatchGame() {
  const [state, dispatch] = useCardMatchReducer();
  return (
    // Depending on the state show the navigation bar
    //       <header>
    //     <Nav />
    //   </header>
    <main className="p-10 mx-auto ">
      <div className="flex flex-col items-center gap-y-6">
        <div className="flex flex-col">
          <h1 className="text-5xl font-bold leading-loose tracking-[0.2em] font-(family-name:--headings)">
            Card Matching
          </h1>
          <div className="flex justify-between text-[17px] w-full ">
            <p className="bg-secondary text-secondary-foreground rounded-[20px] px-10 py-4 ">
              Matches: {state.matchedCards} / {cardObj.cards.length / 2}
            </p>
            <p className="bg-secondary text-secondary-foreground rounded-[20px] px-10 py-4 ">
              Attempts: {state.totalAttempts}
            </p>
          </div>
        </div>
        <CardMatch dispatch={dispatch} />
        {state.matchedCards === cardObj.cards.length / 2 && (
          <div className="flex flex-col items-center gap-y-4">
            <h2 className="text-3xl font-bold">
              Congratulations! You've matched all the cards!
            </h2>
          </div>
        )}
      </div>
    </main>
  );
}
