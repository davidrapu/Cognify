import { useEffect, useState } from "react";
import Card from "./Card";
import cardsObj from "@/data/cards.json";

const shuffledCards = cardsObj.cards.sort(() => Math.random() - 0.5);
export default function CardMatch() {
  const [cards, setCards] = useState<typeof cardsObj.cards>(shuffledCards);
  const [choiceOne, setChoiceOne] = useState<number | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<number | null>(null);


  const handleChoice = (id: number) => {
    if (choiceTwo !== null) return; // Prevent selecting more than two cards

    if (choiceOne === null) setChoiceOne(id);
    else setChoiceTwo(id);
  }
  const reset = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
  }

  useEffect(() => {
    if (!choiceOne || !choiceTwo) return;

    const [firstCard, secondCard] = [
      cards.find((card) => card.id === choiceOne),
      cards.find((card) => card.id === choiceTwo),
    ];

    if (firstCard?.value === secondCard?.value) {
      // Matche found
      setCards((prevCards) => {
        return prevCards.map((card) => {
          if ((firstCard && card.id === firstCard.id) || (secondCard && card.id === secondCard.id)) {
            return { ...card, matched: true };
          }
          return card;
        });
      });
      reset();
    }
    else {
      setTimeout(() => reset(), 600);
    }
  }, [choiceOne, choiceTwo, cards]);

  const handleFlip = (id: number) => {
    handleChoice(id);
  }


  return (
    <main className="p-10 border-2 border-red flex flex-col ">
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
    </main>
  );
}
