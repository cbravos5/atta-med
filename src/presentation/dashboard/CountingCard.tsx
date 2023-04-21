import { Card, Flex, Title, useMantineTheme } from "@mantine/core";
import CountUp from "react-countup";

type Props = {
  label: string;
  value?: number;
};

export function CountingCard({ label, value = 0 }: Props) {
  const theme = useMantineTheme();

  return (
    <Card radius="lg" shadow="md" miw={300} bg={theme.colors.primary[0]} sx={{ aspectRatio: "5 / 4" }}>
      <Flex direction="column" justify="center" align="center" h="100%" pb="sm" gap="md">
        <Title order={3} fw={500} ta="center" color={theme.colors.secondary[0]}>
          {label}
        </Title>
        <Title order={1} size={58} ta="center" color={theme.colors.secondary[0]}>
          <CountUp end={value} duration={3} />
        </Title>
      </Flex>
    </Card>
  );
}
