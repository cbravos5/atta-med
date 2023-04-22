import { Medic } from "@/domain/Models/Medic";
import { PageContent } from "@/presentation/components/PageContent";
import { SearchInput } from "@/presentation/components/SearchInput";
import { mediaQuery } from "@/presentation/helpers/mediaQuery";
import { NewMedicForm } from "@/presentation/medics/NewMedicForm";
import { Badge, Box, Button, Card, Flex, Group, Text, Title, useMantineTheme } from "@mantine/core";
import { useCallback, useMemo, useState } from "react";

export default function Medics() {
  const theme = useMantineTheme();

  const [medics, setMedics] = useState([] as Medic[]);
  const [selectedMedic, setSelectedMedic] = useState(null as Medic | null);

  const onSearchMedics = useCallback((searchValue: string) => {
    setMedics([
      {
        name: "João Azevedo",
        id: "90367753-c018-417c-a970-f3724797a4aa",
        crm: "CRM/SP-123456",
        specialty: "Cardiologia",
      },
      {
        name: "Jorge Prado",
        id: "90367753-c018-417c-a970-f3724797a4ba",
        crm: "CRM/SP-123456",
        specialty: "Cardiologia",
      },
      {
        name: "Jonas Brother",
        id: "90367753-c018-417c-a970-f3724797a4ca",
        crm: "CRM/SP-123456",
        specialty: "Cardiologia",
      },
      { name: "John Wick", id: "90367753-c018-417c-a970-f3724797a4da", crm: "CRM/SP-123456", specialty: "Cardiologia" },
    ]);
  }, []);

  const medicsData = useMemo(() => medics.map((medic) => ({ value: medic.name, ...medic })), [medics]);

  return (
    <PageContent pageTitle="Registro de Médicos">
      <Flex
        w="100%"
        align="center"
        justify="center"
        direction="column"
        sx={{
          [mediaQuery(theme.breakpoints.md)]: {
            flexDirection: "row",
            alignItems: 'start'
          },
        }}
      >
        <Flex direction="column" gap="lg" p="1rem">
          <Title order={4}>Pesquisar médico</Title>
          <SearchInput
            mt="sm"
            placeholder="Nome do médico ou CRM"
            data={medicsData}
            onSearch={onSearchMedics}
            onItemSubmit={(medic) => setSelectedMedic(medic as any as Medic)} // Autocomplete doesn't provide proper Type intellisense
          />
          <Box h={150}>
            {selectedMedic && (
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group position="apart" mt="md" mb="xs">
                  <Text weight={500}>{selectedMedic.name}</Text>
                  <Badge color="pink" variant="light">
                    {selectedMedic.specialty}
                  </Badge>
                </Group>

                <Text size="md" fw={500}>
                  {selectedMedic.crm}
                </Text>
              </Card>
            )}
          </Box>
        </Flex>
        <NewMedicForm />
      </Flex>
    </PageContent>
  );
}

Medics.useLayout = true;