import "@/styles/globals.css";
import { trpc } from "@/trpc/client";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default trpc.withTRPC(App);
