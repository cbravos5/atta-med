import { CalendarGrid } from '@/components/CalendarGrid';
import { CalendarMonth } from '@/components/CalendarMonth';
import { getMonth, getNextMonth, getPreviousMonth } from '@/helpers/month';
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
  Text,
  Title,
} from '@mantine/core';
import Head from 'next/head';
import { useCallback, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, Plus } from 'tabler-icons-react';

const parseMonth = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' })

export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = useMemo(() => {
    const { month } = getMonth(currentMonth);

    const week = [0, 1, 2, 3, 4, 5, 6];

    const calendar = [] as (Date | null | undefined)[];

    month.reverse();

    while (month.length > 0) {
      week.forEach((day) => {
        if (month[month.length - 1]?.getDay() === day)
          calendar.push(month.pop());
        else calendar.push(null);
      });
    }

    const remainingDays = 42 - calendar.length;

    Array(remainingDays).fill(null).forEach(() => calendar.push(null))

    return calendar;
  }, [currentMonth]);

  const onPreviousView = useCallback((current: Date) => {
    const newDate = getPreviousMonth(current);
    setCurrentMonth(() => newDate);
  },[]);

  const onNextView = useCallback((current: Date) => {
    const newDate = getNextMonth(current);
    setCurrentMonth(() => newDate);
  },[]);

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
            <Flex w="100%" justify="space-between">
              <ActionIcon size={50} onClick={() => onPreviousView(currentMonth)}>
                <ChevronLeft size={50} />
              </ActionIcon>
              <Title order={2}>{parseMonth.format(currentMonth)}</Title>
              <ActionIcon size={50} onClick={() => onNextView(currentMonth)}>
                <ChevronRight size={50} />
              </ActionIcon>
            </Flex>
            <CalendarGrid days={days} />
          </Flex>
        </Box>
    </>
  );
}
