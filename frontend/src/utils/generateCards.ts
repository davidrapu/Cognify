import { symbols } from "@/data/symbols";

// utils/generateCards.ts
export type CardType = {
  id: number;
  value: string;
  matched: boolean;
};

export function generateCards(pairCount: number): CardType[] {
  const selected = symbols.slice(0, pairCount);

  const cards = [...selected, ...selected].map((value, i) => ({
    id: i + 1,
    value,
    matched: false,
  }));

  return cards.sort(() => Math.random() - 0.5);
}
