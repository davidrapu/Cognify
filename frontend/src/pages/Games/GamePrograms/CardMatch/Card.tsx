import { cn } from "@/lib/utils";

type CardProps = {
  cardObj: { id: number; value: string; matched: boolean };
  choiceOne: number | null;
  choiceTwo: number | null;
  handleFlip: (id: number) => void;
  cols: number
};

export default function Card({
  cardObj,
  choiceOne,
  choiceTwo,
  handleFlip,
  cols
}: CardProps) {
  const flipped =
    cardObj.matched || choiceOne === cardObj.id || choiceTwo === cardObj.id;

  return (
    <div
      className={cn(
        "w-34 h-26 m-2 transform-3d cursor-pointer perspective-[1000px] transition-transform duration-300",
        flipped && "cursor-not-allowed",
        !flipped && 'hover:scale-[1.1]',
        cols === 6 && "w-35 h-27",
        cols === 8 && "w-30 h-22",
      )}
      onClick={flipped ? undefined : () => handleFlip(cardObj.id)}
    >
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-300 transform-3d",
          flipped && "rotate-y-180",
        )}
      >
        {/* FRONT */}
        <div
          className={cn(
            "absolute inset-0 rounded-[10px] border border-secondary-foreground",
            "bg-linear-to-tr/hsl from-primary to-secondary to-90%",
            "backface-hidden flex items-center justify-center",
          )}
        ></div>

        {/* BACK */}
        <div
          className={cn(
            "absolute inset-0 rounded-[10px] border border-secondary-foreground",
            "bg-card backface-hidden rotate-y-180",
            "flex items-center justify-center text-3xl",
          )}
        >
          {cardObj.value}
        </div>
      </div>
    </div>
  );
}
