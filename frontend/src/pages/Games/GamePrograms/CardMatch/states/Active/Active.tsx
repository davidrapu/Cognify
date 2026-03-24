import { useEffect, useState } from "react";
import ObjectCard from "./Card";
import {
  type CardMatchAction,
  type CardMatchState,
} from "@/hooks/useCardMatchReducer";
import { generateCards } from "@/utils/generateCards";
import { cn } from "@/lib/utils";
import { AnimatedButton } from "@/components/Button";
import { ChevronRight } from "@/components/icons";
import { Card } from "@/components/ui/card";

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
  const [matchTime, setMatchTime] = useState<number>(0);
  const [allFlipped, setAllFlipped] = useState(true);
  const [streak, setStreak] = useState<number>(0);

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

  // for the time take to find matches, we want to start the timer when a card is flipped
  // and stop it when second card is flipped, regardless of whether it's a match or not.
  // This way, we can accurately measure the time taken for each attempt, regardless of whether it was successful or not.
  useEffect(() => {
    const verifyMatch = (card1Id: number, card2Id: number) => {
      const [firstCard, secondCard] = [
        cards.find((card) => card.id === card1Id),
        cards.find((card) => card.id === card2Id),
      ];

      if (!firstCard || !secondCard) return false;

      return firstCard.value === secondCard.value;
    };


    if (choiceOne === null) return;


    if (choiceTwo !== null) {
      dispatch({
        type: "updateTotalTime",
        payload: {
          time: matchTime,
          correct: verifyMatch(choiceOne, choiceTwo),
        },
      });
      setMatchTime(0); // eslint-disable-line
      return; // don't start timer if choiceTwo is already set
    }

    const timer = setInterval(() => {
      setMatchTime((prev) => prev + 10);
    }, 10);

    return () => clearInterval(timer); // this correctly stops the timer
  }, [choiceOne, choiceTwo, dispatch, matchTime, cards]);

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
      dispatch({type: "increaseTotalCorrect" });

      setStreak((prev) => prev + 1);

      if (streak + 1 > state.highestConsecutiveCorrect) {
        // If the new streak is greater than the current highest consecutive correct, update it in the state
        dispatch({ type: "updateHighestConsecutiveCorrect", payload: streak + 1 });
      }

    } else {
      dispatch({type: "increaseTotalIncorrect" });
      setStreak(0);
      setTimeout(() => reset(), 600);
    }
  }, [choiceOne, choiceTwo, cards, dispatch, state.highestConsecutiveCorrect, streak]);
  const handleFlip = (id: number) => {
    handleChoice(id);
  };

  return (
    <div className="flex flex-col items-center gap-y-5 p-3">
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold leading-normal tracking-[0.2em] font-family-heading">
          Card Matching
        </h1>
        <div className="flex justify-between text-[17px] w-full">
          <Card className="bg-card text-secondary-foreground rounded-2xl p-3">
            Matches: {state.matchedCards} / {pairs}
          </Card>
          <Card className="bg-card text-secondary-foreground rounded-2xl p-3">
            Attempts: {state.totalAttempts}
          </Card>
        </div>
      </div>
      <Card className="flex flex-col gap-y-4 px-5 pt-10 pb-7 rounded-[30px] bg-card/40 backdrop-blur-sm">
        <div
          className={cn("grid gap-5 w-fit justify-items-center mx-auto")}
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          }}
        >
          {cards.map((card) => (
            <ObjectCard
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
      </Card>
    </div>
  );
}
