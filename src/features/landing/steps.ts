/** How-it-works steps. Copy is translated via `steps.s{n}Title` / `steps.s{n}Desc`. */
export interface HowItWorksStep {
  n: 1 | 2 | 3 | 4 | 5;
  emoji: string;
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  { n: 1, emoji: '➕' },
  { n: 2, emoji: '🧪' },
  { n: 3, emoji: '🚚' },
  { n: 4, emoji: '⏳' },
  { n: 5, emoji: '💰' },
];
