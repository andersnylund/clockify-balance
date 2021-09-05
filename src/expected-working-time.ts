import { intervalToDuration } from 'date-fns';
import { getTrackedMinutesSoFar } from './tracked-minutes';
import { getExpectedMinutesSoFar } from './working-minutes';

interface Balance {
  monthString: string;
  monthIsPositive: boolean;
  weekString: string;
  weekIsPositive: boolean;
}

export const getBalance = async (): Promise<Balance> => {
  const expectedMinutesThisMonthSoFar = getExpectedMinutesSoFar('month');
  const expectedMinutesThisWeekSoFar = getExpectedMinutesSoFar('week');

  const trackedMinutesThisMonth = await getTrackedMinutesSoFar('month');
  const trackedMinutesThisWeek = await getTrackedMinutesSoFar('week');

  const monthMinutes = trackedMinutesThisMonth - expectedMinutesThisMonthSoFar;
  const monthInterval = intervalToDuration({
    start: 0,
    end: monthMinutes * 60 * 1000,
  });

  const weekMinutes = trackedMinutesThisWeek - expectedMinutesThisWeekSoFar;
  const weekInterval = intervalToDuration({
    start: 0,
    end: weekMinutes * 60 * 1000,
  });

  return {
    monthString: `${monthInterval.hours}:${monthInterval.minutes}`,
    monthIsPositive: monthMinutes >= 0,
    weekString: `${weekInterval.hours}:${weekInterval.minutes}`,
    weekIsPositive: weekMinutes >= 0,
  };
};
