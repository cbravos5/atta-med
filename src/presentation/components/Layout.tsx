import { AppShell, Box, Burger, Flex, Header, MediaQuery, Text } from "@mantine/core";
import Head from "next/head";
import { PropsWithChildren, useState } from "react";
import { fullDateParser } from "../helpers/parsers";
import { NavMenu } from "./NavMenu";

export function Layout({ children }: PropsWithChildren) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Head>
        <title>Atta Med</title>
        <meta name="description" content="Atta Med - Clínica Médica" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell
      navbarOffsetBreakpoint="lg"
      navbar={
        <NavMenu hidden={!opened} fixed />
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <Flex  align="center" h="100%">
            <MediaQuery largerThan="lg" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                mr="xl"
              />
            </MediaQuery>

            <Text>{fullDateParser.format(new Date())}</Text>
          </Flex>
        </Header>
      }
      styles={{
        main: { height: '100%', overflowY: 'scroll' }
      }}
    >
     {children}
    </AppShell>
    </>
  );
}
