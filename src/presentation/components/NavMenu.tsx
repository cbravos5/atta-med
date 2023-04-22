import { Button, Navbar, NavLink, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import { ComponentProps } from "react";
import { CalendarStats, ChartAreaLine, ChevronRight, Logout, Stethoscope } from "tabler-icons-react";
import { Logo } from "./Logo";

const routes = [
  { icon: <ChartAreaLine size="1.5rem" />, label: "Dashboard", route: "/dashboard" },
  { icon: <CalendarStats size="1.5rem" />,  label: "Agendamentos", route: "/agenda" },
  { icon: <Stethoscope size="1.5rem" />, label: "Registro de Médicos", route: "/medicos" },
];

export function NavMenu(props: Omit<ComponentProps<typeof Navbar>, 'children'>) {
  const theme = useMantineTheme();

  return (
    <Navbar w={300} py="md" hiddenBreakpoint="lg" {...props}>
      <Navbar.Section p="xs" mx="auto" w={{ base: 150 }}>
        <Logo width="100%" height="100%" />
      </Navbar.Section>

      <Navbar.Section grow>
        {routes.map(({ label, route, icon }) => (
          <NavLink component={Link} href={route} label={label} 
          icon={icon}
          rightSection={<ChevronRight size="0.8rem" />}
          variant="filled"
          />
        ))}
      </Navbar.Section>

      <Navbar.Section mx="auto">
        <Button variant="light" rightIcon={<Logout size="1.5rem" />} size="md">
          Sair
        </Button>
      </Navbar.Section>
    </Navbar>
  );
}
