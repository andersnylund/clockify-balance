import { startOfMonth, startOfWeek } from 'date-fns';
import { Interval } from './types';

export const getStartDate = (interval: Interval): Date => {
  switch (interval) {
    case 'month':
      return startOfMonth(new Date());
    case 'week':
      return startOfWeek(new Date(), { weekStartsOn: 1 });
    default:
      return startOfMonth(new Date());
  }
};
