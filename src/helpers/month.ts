import dayjs from "dayjs";

export function getNextMonth(date: Date) {
  return dayjs(date).add(1, 'month').toDate();
}

export function getPreviousMonth(date: Date) {
  return dayjs(date).add(-1, 'month').toDate();
}

export function getMonth(date: Date) {
  const firstDay = dayjs(date).date(1);
  
  return generateMonth(firstDay);
}

function generateMonth(firstDay: dayjs.Dayjs) {
  const daysInMonth = firstDay.daysInMonth();

  const month = Array(daysInMonth).fill(null).map((_,i) => dayjs(firstDay).add(i, 'day').toDate());

  const lastDay = month[daysInMonth - 1];

  return { firstDay: firstDay.toDate(), month, lastDay };
}