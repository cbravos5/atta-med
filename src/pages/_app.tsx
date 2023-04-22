import { Layout } from "@/presentation/components/Layout";
import { theme } from "@/presentation/styles/theme";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

interface CustomAppProps extends Omit<AppProps, "Component"> {
  Component: AppProps["Component"] & { useLayout?: boolean };
}

export default function App({ Component, pageProps }: CustomAppProps) {
  const { useLayout } = Component;

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Notifications />
      {useLayout ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </MantineProvider>
  );
}
