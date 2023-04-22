import { Layout } from "@/presentation/components/Layout";
import Protected from "@/presentation/components/Protected";
import { theme } from "@/presentation/styles/theme";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

interface CustomAppProps extends Omit<AppProps, "Component"> {
  Component: AppProps["Component"] & { useLayout?: boolean; auth?: boolean };
}

export default function App({ Component, pageProps }: CustomAppProps) {
  const { useLayout } = Component;

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Notifications />
      {useLayout ? (
        <Layout>
          <Protected>
            <Component {...pageProps} />
          </Protected>
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </MantineProvider>
  );
}
