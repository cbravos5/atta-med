import { Box, Flex } from '@mantine/core';
import Head from 'next/head';
import { PropsWithChildren } from 'react';

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Head>
        <title>Atta Med</title>
        <meta name="description" content="Atta Med - Clínica Médica" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex maw="100%" h="100%" direction="column" justify="center" align="center">
        {children}
      </Flex>
    </>
  );
}
