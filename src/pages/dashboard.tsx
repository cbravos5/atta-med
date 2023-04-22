import { addScrollBar } from "@/presentation/helpers/addScrollBar";
import { mediaQuery } from "@/presentation/helpers/mediaQuery";
import { AppointmentsTable } from "@/presentation/dashboard/AppointmentsTable";
import { PageContent } from "@/presentation/components/PageContent";
import { Skeleton, Space } from "@mantine/core";
import { Accordion, Box, Divider, Flex, Title, useMantineTheme } from "@mantine/core";
import { CountingCard } from "@/presentation/dashboard/CountingCard";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Appointment } from "@/domain/Models/Appointment";
import { getAppointments } from "@/main/Registry";
import { notifications } from "@mantine/notifications";

export default function Dashboard() {
  const theme = useMantineTheme();
  const [isLoading, setIsLoading] = useDisclosure(true);

  const [appointments, setAppointments] = useState([] as Appointment[]);

  const onGetAppointments = useCallback(async (date: Date) => {
    setIsLoading.open();
    try {
      const response = await getAppointments.execute(date);

      setAppointments(response);
    } catch (error) {
      notifications.show({
        title: "Erro",
        message: "Ocorreu um problema ao buscar pelos agendamentos!",
      });
    } finally {
      setIsLoading.close();
    }
  }, []);

  useEffect(() => {
    onGetAppointments(new Date());
  }, []);

  const appointmentsByMedic = useMemo(
    () =>
      appointments.reduce((group, appointment) => {
        const {
          medic: { name },
        } = appointment;
        group[name] = group[name] ?? [];
        group[name].push(appointment);
        return group;
      }, {} as { [key: string]: Appointment[] }),
    [appointments]
  );

  const todayAppointments = useMemo(
    () => appointments.filter(({ isCancelled }) => !isCancelled),
    [appointments]
  );

  return (
    <PageContent pageTitle="Dashboard" w="75%" maw={1200} miw={600}>
      <Flex direction="column" gap="lg" sx={{ [mediaQuery(theme.breakpoints.md)]: { flexDirection: "row" } }}>
        <CountingCard label="Agendamentos hoje" value={todayAppointments.length} />
        <CountingCard label="Cancelamentos hoje" value={appointments.length - todayAppointments.length} />
      </Flex>

      <Space h="lg" />

      <Title order={2} fw={600} sx={{ alignSelf: "start" }}>
        Agendamentos para hoje
      </Title>
      <Divider color="gray" size="xs" w="100%" />

      <Skeleton visible={isLoading}>
        <Box w="100%" miw={600} mih={250} h="30vh" mah={400} sx={{ overflowY: "auto", ...addScrollBar() }}>
          <Accordion w="100%" maw="100%">
            {Object.keys(appointmentsByMedic).map((key, i) => (
              <Accordion.Item value={key + i}>
                <Accordion.Control>
                  {appointmentsByMedic[key].at(0)?.medic.name + " " + appointmentsByMedic[key].at(0)?.medic.crm}
                </Accordion.Control>
                <Accordion.Panel>
                  <AppointmentsTable appointments={appointmentsByMedic[key]} />
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Box>
      </Skeleton>
    </PageContent>
  );
}

Dashboard.useLayout = true;
