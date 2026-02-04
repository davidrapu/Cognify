import { motion } from "framer-motion";
import cardImage from "@/assets/images/card-bg.jpg";
import { cn } from "@/lib/utils";

type CardProps = {
  cardObj: { id: number; value: string; matched: boolean };
  choiceOne: number | null;
  choiceTwo: number | null;
  handleFlip: (id: number) => void;
  disabled: boolean;
};

export default function Card ({cardObj, choiceOne, choiceTwo, handleFlip, disabled }: CardProps) {
  const flipped = choiceOne === cardObj.id || choiceTwo === cardObj.id;

  return (
    <motion.div
      onClick={() => handleFlip(cardObj.id)}
      whileHover={ flipped || disabled ? {} : { scale: 1.05 }}
      transition={ flipped || disabled ? {} : { type: "spring" }}
      className={cn("w-50 h-38 bg-card m-2 rounded-[10px] cursor-pointer text-3xl flex items-center justify-center border-2 border-secondary overflow-hidden")}
    >
      {flipped || cardObj.matched ? (
        cardObj.value
      ) : (
        <img
          src={cardImage}
          alt="Card back"
          className="w-full h-full rounded-[8px]"
        />
      )}
    </motion.div>
  )}