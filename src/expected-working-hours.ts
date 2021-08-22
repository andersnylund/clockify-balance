import { differenceInMinutes, parseISO } from 'date-fns';
import { getTimeEntries, getUser } from './api';
import { getExpectedWorkingHoursThisMonthSoFar } from './working-hours';

export const getBalance = async (): Promise<number> => {
  const expectedWorkingHoursThisMonthSoFar =
    getExpectedWorkingHoursThisMonthSoFar();

  const user = await getUser();
  const timeEntries = await getTimeEntries(user.defaultWorkspace, user.id);

  const totalMinutesThisMonth = timeEntries.reduce((prev, curr) => {
    const startTimestamp = parseISO(curr.timeInterval.start);
    const endTimestamp = parseISO(curr.timeInterval.end);
    const minutes = differenceInMinutes(endTimestamp, startTimestamp);
    return prev + minutes;
  }, 0);

  const totalHoursThisMonth = totalMinutesThisMonth / 60;

  const balanceNow = totalHoursThisMonth - expectedWorkingHoursThisMonthSoFar;
  return balanceNow;
};
