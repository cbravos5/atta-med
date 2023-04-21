import dayjs from "dayjs";

export function getNextMonth(date: Date) {
  return dayjs(date).add(1, "month").toDate();
}

export function getPreviousMonth(date: Date) {
  return dayjs(date).add(-1, "month").toDate();
}

export function getMonth(date: Date) {
  const firstDay = dayjs(date).date(1);

  return generateMonth(firstDay);
}

export function generateMonthCalendar(month: (Date | null | undefined)[]) {
  const week = [0, 1, 2, 3, 4, 5, 6];

  const calendar = [] as (Date | null | undefined)[];

  // reverse month so that pop is popping the first, second and so on
  month.reverse();

  // add day to corresponing week column
  while (month.length > 0) {
    week.forEach((day) => {
      if (month[month.length - 1]?.getDay() === day) calendar.push(month.pop());
      else calendar.push(null);
    });
  }

  // make sure that the calendar has 42 slots
  const remainingDays = 42 - calendar.length;
  Array(remainingDays)
    .fill(null)
    .forEach(() => calendar.push(null));

  return calendar;
}

function generateMonth(firstDay: dayjs.Dayjs) {
  const daysInMonth = firstDay.daysInMonth();

  const month = Array(daysInMonth)
    .fill(null)
    .map((_, i) => dayjs(firstDay).add(i, "day").toDate());

  const lastDay = month[daysInMonth - 1];

  return { firstDay: firstDay.toDate(), month, lastDay };
}
