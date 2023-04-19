import { Grid, Title } from '@mantine/core';
import { CalendarMonth } from './CalendarMonth';

const weekDays = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
];

type Props = {
  days: (Date | null | undefined)[];
};

export function CalendarGrid({ days }: Props) {
  return (
    <Grid columns={7} gutter={0} w={1000}>
      {weekDays.map((name, i) => (
        <Grid.Col span={1} key={name + i}>
          <Title ta="center" order={3}>
            {name}
          </Title>
        </Grid.Col>
      ))}
      {days.map((date, i) => (
        <Grid.Col span={1} key={i}>
          <CalendarMonth date={date} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
