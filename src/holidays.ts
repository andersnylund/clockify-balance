import { getMonth, parse, isSameDay } from 'date-fns';
import Holidays from 'date-holidays';

const holidayDateString = 'yyyy-MM-dd HH:mm:ss';

export const getHolidaysOfThisMonth = (): Date[] => {
  const now = new Date();
  const finnishHolidayInstance = new Holidays('FI', {
    types: ['public', 'bank'],
    languages: ['fi'],
    timezone: 'Europe/Helsinki',
  });
  const currentMonth = getMonth(now);
  const holidays = finnishHolidayInstance.getHolidays(now);
  const holidaysThisMonth = holidays.filter((holiday) => {
    const holidayMonth = getMonth(parse(holiday.date, holidayDateString, now));
    return holidayMonth === currentMonth;
  });
  return holidaysThisMonth.map((holiday) =>
    parse(holiday.date, holidayDateString, now)
  );
};

export const isHoliday = (date: Date): boolean => {
  const holidays = getHolidaysOfThisMonth();
  return holidays.find((holiday) => isSameDay(date, holiday)) !== undefined;
};
