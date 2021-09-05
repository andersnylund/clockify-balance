import { differenceInMinutes, parseISO } from 'date-fns';
import { getTimeEntries, getUser } from './api';
import { getStartDate } from './starting-date';
import { Interval } from './types';

export const getTrackedMinutesSoFar = async (
  interval: Interval
): Promise<number> => {
  const startDate = getStartDate(interval);

  const user = await getUser();
  const timeEntries = await getTimeEntries(
    user.defaultWorkspace,
    user.id,
    startDate
  );

  const totalMinutesThisMonth = timeEntries.reduce((prev, curr) => {
    const startTimestamp = parseISO(curr.timeInterval.start);
    const endTimestamp = parseISO(curr.timeInterval.end);
    const minutes = differenceInMinutes(endTimestamp, startTimestamp);
    return prev + minutes;
  }, 0);

  return totalMinutesThisMonth;
};
