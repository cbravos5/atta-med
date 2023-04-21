import { addScrollBar } from "@/presentation/helpers/addScrollBar";
import { mediaQuery } from "@/presentation/helpers/mediaQuery";
import { AppointmentsTable } from "@/presentation/dashboard/AppointmentsTable";
import { PageContent } from "@/presentation/components/PageContent";
import { Space } from "@mantine/core";
import { Accordion, Box, Divider, Flex, Title, useMantineTheme } from "@mantine/core";
import { CountingCard } from "@/presentation/dashboard/CountingCard";

export default function Dashboard() {
  const theme = useMantineTheme();

  return (
    <PageContent pageTitle="Dashboard" w="75%" maw={1200} miw={600}>
      <Flex direction="column" gap="lg" sx={{ [mediaQuery(theme.breakpoints.md)]: { flexDirection: "row" } }}>
        <CountingCard label="Agendamentos hoje" value={32} />
        <CountingCard label="Cancelamentos hoje" value={5} />
      </Flex>

      <Space h="lg" />

      <Title order={2} fw={600} sx={{ alignSelf: "start" }}>
        Agendamentos para hoje
      </Title>
      <Divider color="gray" size="xs" w="100%" />

      <Box w="100%" miw={600} mih={250} h="30vh" mah={400} sx={{ overflowY: "auto", ...addScrollBar() }}>
        <Accordion w="100%" maw="100%">
          <Accordion.Item value="1234567">
            <Accordion.Control>Dr. José Wilcker - CRM 1234567</Accordion.Control>
            <Accordion.Panel>
              <AppointmentsTable />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="flexibility">
            <Accordion.Control>Dr. Ramos da Costa - CRM 1784567</Accordion.Control>
            <Accordion.Panel>
              <AppointmentsTable />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="focus-ring">
            <Accordion.Control>Dra. Maria Antonieta da Silva - CRM 1784437</Accordion.Control>
            <Accordion.Panel>
              <AppointmentsTable />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Box>
    </PageContent>
  );
}
