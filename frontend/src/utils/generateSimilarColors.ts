// utils/generateSimilarColors.ts

type ColorConfig = {
  count: number;
  baseHue?: number;
  saturation?: number;
  lightness?: number;
  lightnessShift?: number;
};

export function generateSimilarColors({
  count,
  baseHue = Math.random() * 360,
  saturation = 70,
  lightness = 60,
  lightnessShift = 10,
}: ColorConfig) {
  const colors: string[] = [];
  const oddIndex = Math.floor(Math.random() * count);

  // Randomly decide if odd one should be lighter or darker
  const shift = Math.random() > 0.5 ? lightnessShift : -lightnessShift;

  // Base color
  const baseColor = `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;

  // Odd color - lighter or darker
  const oddLightness = Math.max(0, Math.min(100, lightness + shift));
  const oddColor = `hsl(${baseHue}, ${saturation}%, ${oddLightness}%)`;

  for (let i = 0; i < count; i++) {
    colors.push(i === oddIndex ? oddColor : baseColor);
  }

  return { colors, oddIndex };
}
