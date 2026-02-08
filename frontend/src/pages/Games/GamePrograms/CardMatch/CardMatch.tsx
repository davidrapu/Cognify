import { useEffect, useState } from "react";
import Card from "./Card";
import {type CardMatchAction} from "@/hooks/useCardMatchReducer";
import { generateCards } from "@/utils/generateCards";
import { cn } from "@/lib/utils";

type CardMatchProps = {
  dispatch: React.Dispatch<CardMatchAction>;
  pairs: number;
  cols: number
};


export default function CardMatch({dispatch, pairs, cols}: CardMatchProps) {
const [cards, setCards] = useState(() => generateCards(pairs));

  const [choiceOne, setChoiceOne] = useState<number | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<number | null>(null);

  const handleChoice = (id: number) => {
    if (choiceTwo !== null) return; // Prevent selecting more than two cards

    if (choiceOne === null) setChoiceOne(id);
    else {
      setChoiceTwo(id)
      dispatch({ type: "increaseAttempts" });
    }
  };
  const reset = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  useEffect(() => {
    if (choiceOne === null || choiceTwo === null) return;

    const [firstCard, secondCard] = [
      cards.find((card) => card.id === choiceOne),
      cards.find((card) => card.id === choiceTwo),
    ];

    if (firstCard?.value === secondCard?.value) {
      // Match found
      setCards((prevCards) => {
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
    <div
      className="px-5 py-10 rounded-[30px] bg-card backdrop-blur-sm"
    >
      <div
        className={cn("grid gap-y-2 gap-x-4 w-fit justify-items-center mx-auto")}
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
          />
        ))}
      </div>
    </div>
  );
}
