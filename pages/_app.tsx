import "../styles/globals.css";
import { useState } from "react";
import type { AppProps } from "next/app";
import Layout from "@components/Layout";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import PageLoading from "@components/PageLoading";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={session}>
          <PageLoading />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
