import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Delete, Eraser } from "@/components/icons";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

type ClusteredNumbersProps = {
  setUserInput?: React.Dispatch<React.SetStateAction<string | null>>;
  disabled?: boolean;
};

export default function ClusteredNumbers({
  setUserInput,
  disabled,
}: ClusteredNumbersProps) {
  const handleButtonClick = (num: number) => {
    if (setUserInput) {
      setUserInput((prev) => (prev ? prev + num.toString() : num.toString()));
    }
  };
  const handleDelete = () => {
    if (setUserInput) {
      setUserInput((prev) => (prev ? prev.slice(0, -1) : null));
    }
  };
  return (
      <div className=" grid lg:grid-cols-3 grid-cols-4 gap-3">
        {numbers.map((num) => (
          <Button
            disabled={disabled}
            type="button"
            onClick={() => handleButtonClick(num)}
            variant="outline"
            className={cn(
              "p-6 md:p-7 bg-primary/20 rounded-lg flex items-center justify-center cursor-pointer aspect-video",
            )}
            key={num}
          >
            <span className="text-2xl">{num}</span>
          </Button>
        ))}
        <Button
          disabled={disabled}
          type="button"
          onClick={() => setUserInput && setUserInput(null)}
          variant="outline"
          className={cn(
            "p-6 md:p-7 bg-primary/20 rounded-lg flex items-center justify-center cursor-pointer aspect-video",
          )}
        >
          <Eraser size={27} />
        </Button>
        <Button
          disabled={disabled}
          type="button"
          onClick={() => handleDelete()}
          variant="outline"
          className={cn(
            "p-6 md:p-7 bg-primary/20 rounded-lg flex items-center justify-center cursor-pointer aspect-video",
          )}
        >
          <Delete size={40} />
        </Button>
      </div>
  );
}
