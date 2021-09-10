import { getTrackedMinutesSoFar } from './tracked-minutes';
import { Balance, Interval, IntervalBalance, INTERVALS } from './types';
import { getExpectedMinutesSoFar } from './working-minutes';

export const getBalance = async (): Promise<Balance> => {
  const balance = new Map<Interval, IntervalBalance>();

  for (const interval of INTERVALS) {
    const intervalBalance = await getBalanceForInterval(interval);
    balance.set(interval, intervalBalance);
  }

  return balance;
};

const getBalanceForInterval = async (
  interval: Interval
): Promise<IntervalBalance> => {
  const expectedMinutesSoFar = getExpectedMinutesSoFar(interval);
  const trackedMinutesSoFar = await getTrackedMinutesSoFar(interval);

  const totalMinuteBalance = trackedMinutesSoFar - expectedMinutesSoFar;
  const hours = Math.floor(Math.abs(totalMinuteBalance) / 60);
  const minutes = Math.abs(totalMinuteBalance) - hours * 60;

  return {
    stringRepresentation: `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`,
    isPositive: totalMinuteBalance >= 0,
  };
};
