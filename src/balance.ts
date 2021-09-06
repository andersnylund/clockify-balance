import { getTrackedMinutesSoFar } from './tracked-minutes';
import { Interval } from './types';
import { getExpectedMinutesSoFar } from './working-minutes';

interface Balance {
  monthString: string;
  monthIsPositive: boolean;
  weekString: string;
  weekIsPositive: boolean;
}

export const getBalance = async (): Promise<Balance> => {
  const {
    hours: monthHours,
    minutes: monthMinutes,
    isPositive: monthIsPositive,
  } = await getBalanceForInterval('month');

  const {
    hours: weekHours,
    minutes: weekMinutes,
    isPositive: weekIsPositive,
  } = await getBalanceForInterval('week');

  return {
    monthString: `${monthHours}:${monthMinutes}`,
    monthIsPositive,
    weekString: `${weekHours}:${weekMinutes}`,
    weekIsPositive,
  };
};

const getBalanceForInterval = async (interval: Interval) => {
  const expectedMinutesSoFar = getExpectedMinutesSoFar(interval);
  const trackedMinutesSoFar = await getTrackedMinutesSoFar(interval);

  const totalMinuteBalance = trackedMinutesSoFar - expectedMinutesSoFar;
  const hours = Math.floor(Math.abs(totalMinuteBalance) / 60);
  const minutes = Math.abs(totalMinuteBalance) - hours * 60;

  return {
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    isPositive: totalMinuteBalance >= 0,
  };
};
