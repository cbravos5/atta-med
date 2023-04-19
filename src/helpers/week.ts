import dayjs from 'dayjs';

export function getNextWeek(date: Date) {
  return dayjs(date).add(1, 'week').toDate();
}

export function getPreviousWeek(date: Date) {
  return dayjs(date).add(-1, 'week').toDate();
}

export function getWeek(date: Date) {
  const firstDay = dayjs(date).day(0);

  return generateWeek(firstDay);
}

function generateWeek(firstDay: dayjs.Dayjs) {
  const week = Array(7)
    .fill(null)
    .map((_, i) => dayjs(firstDay).add(i, 'day').toDate());

  const lastDay = week[6];

  return { firstDay: firstDay.toDate(), week, lastDay };
}
