import { generateMonthCalendar, getMonth, getNextMonth, getPreviousMonth } from "@/presentation/helpers/month";
import { getNextWeek, getPreviousWeek, getWeek } from "@/presentation/helpers/week";
import { ActionIcon, Box, createStyles, Flex, SegmentedControl, Title } from "@mantine/core";
import { useCallback, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "tabler-icons-react";
import { PageContent } from "@/presentation/components/PageContent";
import { CalendarGrid } from "@/presentation/agenda/CalendarGrid";
import { WeekGrid } from "@/presentation/agenda/WeekGrid";
import { Appointments } from "@/presentation/agenda/Appointments";
import { NewAppointment } from "@/presentation/agenda/NewAppointment";

type Views = "week" | "month";

const parseMonth = new Intl.DateTimeFormat("pt-BR", {
  month: "long",
  year: "numeric",
});

const weekNames = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

const useMantineStyles = createStyles((theme) => ({
  action: {
    width: 50,
    height: 50,

    ":hover": { backgroundColor: theme.colors.tertiary[0] },
  },
}));

export default function Agenda() {
  const { classes, theme } = useMantineStyles();

  const [viewDate, setViewDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<Views>("month");

  const days = useMemo(() => {
    const { month } = getMonth(viewDate);
    const { week } = getWeek(viewDate);

    return { monthDays: generateMonthCalendar(month), weekDays: week };
  }, [viewDate, currentView]);

  const onPreviousView = useCallback(() => {
    const newViewDate = currentView === "month" ? getPreviousMonth(viewDate) : getPreviousWeek(viewDate);

    setViewDate(() => newViewDate);
  }, [viewDate, currentView]);

  const onNextView = useCallback(() => {
    const newViewDate = currentView === "month" ? getNextMonth(viewDate) : getNextWeek(viewDate);

    setViewDate(() => newViewDate);
  }, [viewDate, currentView]);

  return (
    <PageContent pageTitle="Agenda">
      <SegmentedControl
        styles={{
          indicator: { background: theme.colors.primary[0] },
        }}
        defaultValue="month"
        onChange={(value) => setCurrentView(value as Views)}
        data={[
          { value: "month", label: "Mês" },
          { value: "week", label: "Semana" },
        ]}
        mb="lg"
        w={300}
        sx={{ alignSelf: "flex-end" }}
      />

      <Flex w="100%" justify="space-between">
        <ActionIcon onClick={onPreviousView} className={classes.action}>
          <ChevronLeft size={50} />
        </ActionIcon>
        <Title order={2} fw={500}>
          {parseMonth.format(viewDate)}
        </Title>
        <ActionIcon onClick={onNextView} className={classes.action}>
          <ChevronRight size={50} />
        </ActionIcon>
      </Flex>

      <Flex justify="space-between" w="100%">
        {weekNames.map((name, i) => (
          <Title key={name + i} w="100%" fw={400} ta="center" order={3}>
            {name}
          </Title>
        ))}
      </Flex>
      <Box h={535}>
        {currentView === "month" && <CalendarGrid days={days.monthDays} />}
        {currentView === "week" && <WeekGrid days={days.weekDays} />}
      </Box>

      { <Appointments /> }
      <NewAppointment />
    </PageContent>
  );
}

Agenda.useLayout = true;