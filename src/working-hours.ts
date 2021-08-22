import { getDate, isWeekend, setDate } from 'date-fns';
import { isHoliday } from './holidays';

export const getExpectedWorkingHoursThisMonthSoFar = (): number => {
  const currentDate = getDate(new Date());

  const days = Array(currentDate)
    .fill(undefined)
    .map((_, index) => index + 1);

  const expectedHours = days.reduce((prev, dateOfMonth) => {
    const day = setDate(new Date(), dateOfMonth);
    const isWeekendOrHoliday = isWeekend(day) || isHoliday(day);
    if (isWeekendOrHoliday) {
      return prev;
    } else {
      return prev + 7.5;
    }
  }, 0);
  return expectedHours;
};
