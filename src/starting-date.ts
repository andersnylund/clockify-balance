import { startOfDay, startOfMonth, startOfWeek } from 'date-fns';
import { Interval } from './types';

export const getStartDate = (interval: Interval): Date => {
  switch (interval) {
    case 'month':
      return startOfMonth(new Date());
    case 'week':
      return startOfWeek(new Date(), { weekStartsOn: 1 });
    case 'day':
      return startOfDay(new Date());
    default:
      return startOfMonth(new Date());
  }
};
