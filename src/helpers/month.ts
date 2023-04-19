import dayjs from "dayjs";

export class Month {
  public getNextMonth(date: Date) {
    const firstDay = dayjs(date).add(1, 'month').date(1);
  
    return this.generateMonth(firstDay);
  }

  public getLastMonth(date: Date) {
    const firstDay = dayjs(date).add(-1, 'month').date(1);
  
    return this.generateMonth(firstDay);
  }

  public getMonth(date: Date) {
    const firstDay = dayjs(date).date(1);
    
    return this.generateMonth(firstDay);
  }

  private generateMonth(firstDay: dayjs.Dayjs) {
    const daysInMonth = firstDay.daysInMonth();

    const month = Array(daysInMonth).fill(null).map((_,i) => dayjs(firstDay).add(i, 'day').toDate());
  
    const lastDay = month[daysInMonth - 1];
  
    return { firstDay: firstDay.toDate(), month, lastDay };
  }
}