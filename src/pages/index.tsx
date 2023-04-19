import { CalendarGrid } from '@/components/CalendarGrid';
import { CalendarMonth } from '@/components/CalendarMonth';
import { WeekGrid } from '@/components/WeekGrid';
import {
  generateMonthCalendar,
  getMonth,
  getNextMonth,
  getPreviousMonth,
} from '@/helpers/month';
import { getNextWeek, getPreviousWeek, getWeek } from '@/helpers/week';
import {
  ActionIcon,
  Box,
  Button,
  Card,
  CardSection,
  Center,
  Flex,
  Grid,
  Group,
  Select,
  Text,
  Title,
} from '@mantine/core';
import Head from 'next/head';
import { useCallback, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, Plus } from 'tabler-icons-react';

const parseMonth = new Intl.DateTimeFormat('pt-BR', {
  month: 'long',
  year: 'numeric',
});

const weekNames = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
];

type Views = 'week' | 'month';

export default function Home() {
  const [viewDate, setViewDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<Views>('month');

  const monthDays = useMemo(() => {
    const { month } = getMonth(viewDate);

    return generateMonthCalendar(month);
  }, [viewDate, currentView]);

  const weekDays = useMemo(() => {
    const { week } = getWeek(viewDate);

    return week;
  }, [viewDate, currentView]);

  const onPreviousView = useCallback(() => {
    const newViewDate =
      currentView === 'month'
        ? getPreviousMonth(viewDate)
        : getPreviousWeek(viewDate);

    setViewDate(() => newViewDate);
  }, [viewDate, currentView]);

  const onNextView = useCallback(() => {
    const newViewDate =
      currentView === 'month' ? getNextMonth(viewDate) : getNextWeek(viewDate);

    setViewDate(() => newViewDate);
  }, [viewDate, currentView]);

  return (
    <>
      <Head>
        <title>Atta Med</title>
        <meta name="description" content="Atta Med - Clínica Médica" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box w="100%" h="100%">
        <Flex
          direction="column"
          w="fit-content"
          mx="auto"
          p="lg"
          justify="center"
          align="center"
          gap="lg"
          sx={{ color: 'GrayText' }}
        >

          <Select
            label="Visualizar por"
            defaultValue="month"
            onChange={(value) => setCurrentView(value as Views)}
            data={[{ value: 'month', label: 'Mês' },{ value: 'week', label: 'Semana' }]}
          />

          <Flex w="100%" justify="space-between">
            <ActionIcon size={50} onClick={onPreviousView}>
              <ChevronLeft size={50} />
            </ActionIcon>
            <Title order={2}>{parseMonth.format(viewDate)}</Title>
            <ActionIcon size={50} onClick={onNextView}>
              <ChevronRight size={50} />
            </ActionIcon>
          </Flex>

          <Flex justify="space-between" w="100%">
            {weekNames.map((name, i) => (
              <Title key={name + i} w="100%" ta="center" order={3}>
                {name}
              </Title>
            ))}
          </Flex>

          {currentView === 'month' && <CalendarGrid days={monthDays} />}
          {currentView === 'week' && <WeekGrid days={weekDays} />}
        </Flex>
      </Box>
    </>
  );
}
