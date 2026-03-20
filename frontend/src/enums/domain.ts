export const Domain = {
  MEMORY: "MEMORY",
  ATTENTION: "ATTENTION",
  PROCESSING_SPEED: "PROCESSING_SPEED",
  EXECUTIVE_FUNCTIONS: "EXECUTIVE_FUNCTIONS",
  REASONING: "REASONING",
} as const;

export type Domain = (typeof Domain)[keyof typeof Domain];
