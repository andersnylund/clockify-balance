import { getExpectedWorkingHoursThisMonthSoFar } from './working-hours';
import tk from 'timekeeper';

describe('working-hours', () => {
  it('works in the middle of the month', () => {
    tk.freeze('2021-08-21');
    const hours = getExpectedWorkingHoursThisMonthSoFar();
    expect(hours).toEqual(112.5);
  });

  it('works during juhannus', () => {
    tk.freeze('2021-06-30');
    const hours = getExpectedWorkingHoursThisMonthSoFar();
    expect(hours).toEqual(157.5);
  });

  it('works in december', () => {
    tk.freeze('2021-12-31');
    const hours = getExpectedWorkingHoursThisMonthSoFar();
    expect(hours).toEqual(150); // the new years eve is up to interpretation
  });
});
