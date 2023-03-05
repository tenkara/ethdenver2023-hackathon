import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MetamaskProvider } from "@/hooks/useMetamask";

export default function App({ Component, pageProps }: AppProps) {
    const [queryClient] = React.useState(() => new QueryClient());
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <MetamaskProvider>
                <QueryClientProvider client={queryClient}>
                    <Component {...pageProps} />
                </QueryClientProvider>
            </MetamaskProvider>
        </MantineProvider>
    );
}
