import { Layout } from '@/presentation/components/Layout';
import { theme } from '@/presentation/styles/theme';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Notifications />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
}
