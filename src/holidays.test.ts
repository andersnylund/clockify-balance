import tk from 'timekeeper';
import { getHolidaysOfThisMonth } from './holidays';

describe('holidays', () => {
  describe('getHolidaysOfThisMonth', () => {
    it('works on juhannus', () => {
      tk.freeze('2021-06-05');
      expect(
        getHolidaysOfThisMonth().map((holiday) => holiday.getDate())
      ).toEqual([25, 26]);
    });

    it('works on joulu', () => {
      tk.freeze('2021-12-05');
      expect(
        getHolidaysOfThisMonth().map((holiday) => holiday.getDate())
      ).toEqual([6, 24, 25, 26, 31]);
    });
  });
});
