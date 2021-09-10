export const INTERVALS = ['month', 'week', 'day'] as const;
export type Interval = typeof INTERVALS[number];

export interface IntervalBalance {
  stringRepresentation: string;
  isPositive: boolean;
}

export type Balance = Map<Interval, IntervalBalance>;
