import { differenceInMinutes, parseISO, intervalToDuration } from 'date-fns';
import { getTimeEntries, getUser } from './api';
import { getExpectedMinutesThisMonthSoFar } from './working-minutes';

interface Balance {
  monthString: string;
  monthIsPositive: boolean;
}

export const getBalance = async (): Promise<Balance> => {
  const expectedMinutesThisMonthSoFar = getExpectedMinutesThisMonthSoFar();

  const user = await getUser();
  const timeEntries = await getTimeEntries(user.defaultWorkspace, user.id);

  const totalMinutesThisMonth = timeEntries.reduce((prev, curr) => {
    const startTimestamp = parseISO(curr.timeInterval.start);
    const endTimestamp = parseISO(curr.timeInterval.end);
    const minutes = differenceInMinutes(endTimestamp, startTimestamp);
    return prev + minutes;
  }, 0);

  const minutes = totalMinutesThisMonth - expectedMinutesThisMonthSoFar;

  const result = intervalToDuration({ start: 0, end: minutes * 60 * 1000 });

  return {
    monthString: `${result.hours}:${result.minutes}`,
    monthIsPositive: minutes >= 0,
  };
};
