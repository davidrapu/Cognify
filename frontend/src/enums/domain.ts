export const Domain = {
  MEMORY: "MEMORY",
  ATTENTION: "ATTENTION",
  REACTION: "REACTION",
  PROBLEM_SOLVING: "PROBLEM_SOLVING",
} as const;

export type Domain = (typeof Domain)[keyof typeof Domain];
