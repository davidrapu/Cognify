import { useEffect, useState } from "react";
import Card from "./Card";
import {
  type CardMatchAction,
  type CardMatchState,
} from "@/hooks/useCardMatchReducer";
import { generateCards } from "@/utils/generateCards";
import { cn } from "@/lib/utils";
import { AnimatedButton } from "@/components/Button";
import { ChevronRight } from "@/components/icons";

type CardMatchProps = {
  dispatch: React.Dispatch<CardMatchAction>;
  state: CardMatchState;
  pairs: number;
  cols: number;
};

export default function Active({
  dispatch,
  state,
  pairs,
  cols,
}: CardMatchProps) {
  const [cards, setCards] = useState(() => generateCards(pairs));

  const [choiceOne, setChoiceOne] = useState<number | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<number | null>(null);
  const [allFlipped, setAllFlipped] = useState(true);

  const handleChoice = (id: number) => {
    if (choiceTwo !== null) return; // Prevent selecting more than two cards

    if (choiceOne === null) setChoiceOne(id);
    else {
      setChoiceTwo(id);
      dispatch({ type: "increaseAttempts" });
    }
  };
  const reset = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAllFlipped(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (choiceOne === null || choiceTwo === null) return;

    const [firstCard, secondCard] = [
      cards.find((card) => card.id === choiceOne),
      cards.find((card) => card.id === choiceTwo),
    ];

    if (firstCard?.value === secondCard?.value) {
      // Match found
      setCards((prevCards) => {// eslint-disable-line
        return prevCards.map((card) => {
          if (
            (firstCard && card.id === firstCard.id) ||
            (secondCard && card.id === secondCard.id)
          ) {
            return { ...card, matched: true };
          }
          return card;
        });
      });
      reset();
      setTimeout(() => dispatch({ type: "increaseMatchedCards" }), 250);
    } else {
      setTimeout(() => reset(), 600);
    }
  }, [choiceOne, choiceTwo, cards, dispatch]);
  const handleFlip = (id: number) => {
    handleChoice(id);
  };

  return (
    <div className="flex flex-col items-center gap-y-5 p-3">
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold leading-normal tracking-[0.2em] font-(family-name:--headings)">
          Card Matching
        </h1>
        <div className="flex justify-between text-[17px] w-full">
          <p className="bg-card text-secondary-foreground rounded-2xl p-3">
            Matches: {state.matchedCards} / {pairs}
          </p>
          <p className="bg-card text-secondary-foreground rounded-2xl p-3">
            Attempts: {state.totalAttempts}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-y-4 px-5 pt-10 pb-7 rounded-[30px] bg-card backdrop-blur-sm">
        <div
          className={cn("grid gap-5 w-fit justify-items-center mx-auto")}
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          }}
        >
          {cards.map((card) => (
            <Card
              key={card.id}
              cardObj={card}
              choiceOne={choiceOne}
              choiceTwo={choiceTwo}
              handleFlip={handleFlip}
              cols={cols}
              allFlipped={allFlipped}
            />
          ))}
        </div>
        {state.matchedCards === pairs && (
          <AnimatedButton
            onClick={() =>
              dispatch({
                type: "setGameState",
                payload: "completed",
              })
            }
            className="w-fit px-8 py-2 self-end animate-in fade-in slide-in-from-top-20 duration-300"
          >
            <ChevronRight
              absoluteStrokeWidth={false}
              size={25}
              strokeWidth={3}
            />
          </AnimatedButton>
        )}
      </div>
    </div>
  );
}
