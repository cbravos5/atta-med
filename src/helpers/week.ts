import dayjs from "dayjs";

export class Week {
  public getNextWeek(date: Date) {
    const firstDay = dayjs(date).day(7).day(0);
  
    return this.generateWeek(firstDay);
  }

  public getLastWeek(date: Date) {
    const firstDay = dayjs(date).day(-1).day(0);
  
    return this.generateWeek(firstDay);
  }

  public getWeek(date: Date) {
    const firstDay = dayjs(date).day(0);
    
    return this.generateWeek(firstDay);
  }

  private generateWeek(firstDay: dayjs.Dayjs) {
    const week = Array(7).fill(null).map((_,i) => dayjs(firstDay).add(i, 'day').toDate());
  
    const lastDay = week[6];
  
    return { firstDay: firstDay.toDate(), week, lastDay };
  }
}