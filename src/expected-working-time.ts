import { intervalToDuration } from 'date-fns';
import { getTrackedMinutesSoFar } from './tracked-minutes';
import { getExpectedMinutesThisMonthSoFar } from './working-minutes';

interface Balance {
  monthString: string;
  monthIsPositive: boolean;
}

export const getBalance = async (): Promise<Balance> => {
  const expectedMinutesThisMonthSoFar = getExpectedMinutesThisMonthSoFar();
  const trackedMinutesSoFar = await getTrackedMinutesSoFar();

  const minutes = trackedMinutesSoFar - expectedMinutesThisMonthSoFar;

  const result = intervalToDuration({ start: 0, end: minutes * 60 * 1000 });

  return {
    monthString: `${result.hours}:${result.minutes}`,
    monthIsPositive: minutes >= 0,
  };
};
