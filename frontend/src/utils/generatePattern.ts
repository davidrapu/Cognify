function generateColorPatternAdvanced(length = 6) {
  const COLOR_CLASSES: Record<string, string> = {
    red: "bg-red-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    orange: "bg-orange-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
  } as const;

  const COLORS = ["red", "green", "yellow", "orange", "purple", "pink"];

    const type = Math.floor(Math.random() * 3);
//   const type = 2;

  const getRandomColor = () =>
    COLORS[Math.floor(Math.random() * COLORS.length)];

  let pattern = [];

  if (type === 0) {
    // Repeating pattern (A B A B)
    const a = getRandomColor();
    let b;
    do {
      b = getRandomColor();
    } while (b === a);

    for (let i = 0; i < length; i++) {
      pattern.push(i % 2 === 0 ? a : b);
    }
  }

  if (type === 1) {
    // Triple pattern (A B C A B C)
    const colors = Array.from(
      new Set([getRandomColor(), getRandomColor(), getRandomColor()]),
    );

    for (let i = 0; i < length; i++) {
      pattern.push(colors[i % colors.length]);
    }
  }

  if (type === 2) {
    const a = getRandomColor();
    let b;
    do {
      b = getRandomColor();
    } while (b === a);

    pattern = [];

    for (let i = 0; i < length; i++) {
      pattern.push(i % 4 < 2 ? a : b);
    }
  }

  return { pattern, COLOR_CLASSES };
}

export default function generatePatternQuestion(length = 6) {
  const { pattern, COLOR_CLASSES } = generateColorPatternAdvanced(length);

  // pick a random index to hide
  const missingIndex = Math.floor(Math.random() * length);

  const answer = pattern[missingIndex];

  // create visible pattern with one missing
  const visiblePattern = [...pattern];
  visiblePattern[missingIndex] = "?";

  return {
    pattern: visiblePattern,
    answer,
    missingIndex,
    COLOR_CLASSES,
    fullPattern: pattern, // useful for debugging
  };
}
