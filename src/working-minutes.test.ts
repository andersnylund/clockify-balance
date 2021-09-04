import { getExpectedMinutesThisMonthSoFar } from './working-minutes';
import tk from 'timekeeper';

describe('working-minutes', () => {
  it('works in the middle of the month', () => {
    tk.freeze('2021-08-21');
    const minutes = getExpectedMinutesThisMonthSoFar();
    expect(minutes).toEqual(112.5 * 60);
  });

  it('works during juhannus', () => {
    tk.freeze('2021-06-30');
    const minutes = getExpectedMinutesThisMonthSoFar();
    expect(minutes).toEqual(157.5 * 60);
  });

  it('works in december', () => {
    tk.freeze('2021-12-31');
    const minutes = getExpectedMinutesThisMonthSoFar();
    expect(minutes).toEqual(150 * 60); // the new years eve is apparently up to interpretation
  });
});
