import { differenceInMinutes, parseISO } from 'date-fns';
import { getTimeEntries, getUser } from './api';

export const getTrackedMinutesSoFar = async (): Promise<number> => {
  const user = await getUser();
  const timeEntries = await getTimeEntries(user.defaultWorkspace, user.id);

  const totalMinutesThisMonth = timeEntries.reduce((prev, curr) => {
    const startTimestamp = parseISO(curr.timeInterval.start);
    const endTimestamp = parseISO(curr.timeInterval.end);
    const minutes = differenceInMinutes(endTimestamp, startTimestamp);
    return prev + minutes;
  }, 0);

  return totalMinutesThisMonth;
};
