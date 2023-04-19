import { Grid, Title } from '@mantine/core';
import { CalendarMonth } from './CalendarMonth';

type Props = {
  days: (Date | null | undefined)[];
};

export function CalendarGrid({ days }: Props) {
  return (
    <Grid columns={7} gutter={0} w={1000}>
      {days.map((date, i) => (
        <Grid.Col span={1} key={i}>
          <CalendarMonth date={date} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
