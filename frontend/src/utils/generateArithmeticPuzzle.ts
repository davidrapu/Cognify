export default function generateArithmeticQuestion(length = 5) {
  const types = ["add", "multiply", "increasing"];
  const type = types[Math.floor(Math.random() * types.length)];

  const sequence: number[] = [];

  const start = Math.floor(Math.random() * 10) + 1;

  if (type === "add") {
    const diff = Math.floor(Math.random() * 5) + 1; // +1 to +5
    for (let i = 0; i < length; i++) {
      sequence.push(start + i * diff);
    }
  }

  if (type === "multiply") {
    const factor = Math.floor(Math.random() * 3) + 2; // ×2 to ×4
    sequence.push(start);
    for (let i = 1; i < length; i++) {
      sequence.push(sequence[i - 1] * factor);
    }
  }

  if (type === "increasing") {
    let current = start;
    let increment = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < length; i++) {
      sequence.push(current);
      current += increment;
      increment++; // increases each time
    }
  }

  // pick random missing index
  const missingIndex = Math.floor(Math.random() * length);
  const answer = sequence[missingIndex];

  const visible = [...sequence];
  visible[missingIndex] =  -1; // Use -1 to represent the missing number

  return {
    pattern: visible,
    answer,
    fullPattern: sequence,
    type, // useful for debugging
  };
}
