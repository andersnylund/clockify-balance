import { differenceInDays, getDate, isWeekend, setDate } from 'date-fns';
import { isHoliday } from './holidays';
import { getStartDate } from './starting-date';
import { Interval } from './types';

export const getExpectedMinutesSoFar = (interval: Interval): number => {
  const startDate = getStartDate(interval);
  const startDateDay = getDate(startDate);

  const numberOfDays = differenceInDays(new Date(), startDate) + 1;

  const days = Array(numberOfDays)
    .fill(undefined)
    .map((_, index) => index + startDateDay);

  const expectedMinutes = days.reduce((prev, dateOfMonth) => {
    const day = setDate(new Date(), dateOfMonth);
    const isWeekendOrHoliday = isWeekend(day) || isHoliday(day);
    if (isWeekendOrHoliday) {
      return prev;
    } else {
      return prev + 7.5 * 60;
    }
  }, 0);
  return expectedMinutes;
};
