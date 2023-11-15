import { ShoppingCartProvider } from "@/hooks/useShoppingCart";
import "@/styles/globals.css";
import { trpc } from "@/trpc/client";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ShoppingCartProvider>
        <Component {...pageProps} />
      </ShoppingCartProvider>
    </SessionProvider>
  );
}

export default trpc.withTRPC(App);
