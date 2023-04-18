import { Text } from '@mantine/core';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Atta Med</title>
        <meta name="description" content="Atta Med - Clínica Médica" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Text fz="lg">Hello</Text>
      </main>
    </>
  );
}