import { useEffect, useState } from "react";
import Card from "./Card";
import cardsObj from "@/data/cards.json";
import { motion } from "framer-motion";
import {type CardMatchAction} from "@/hooks/useCardMatchReducer";

const shuffledCards = cardsObj.cards.sort(() => Math.random() - 0.5);

type CardMatchProps = {
    dispatch: React.Dispatch<CardMatchAction>;
}

export default function CardMatch({dispatch}: CardMatchProps) {
  const [cards, setCards] = useState<typeof cardsObj.cards>(shuffledCards);
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
    if (!choiceOne || !choiceTwo) return;

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
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2 }}
      className="px-30 py-10 rounded-[30px] bg-secondary/25"
    >
      <div className="grid grid-cols-4 gap-4 w-fit justify-items-center mx-auto">
        {Array.from({ length: 16 }).map((_, i) => (
          <Card
            cardObj={cards[i]}
            choiceOne={choiceOne}
            choiceTwo={choiceTwo}
            handleFlip={handleFlip}
            key={i}
          />
        ))}
      </div>
    </motion.div>
  );
}
