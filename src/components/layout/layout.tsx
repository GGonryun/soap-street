import Head from "next/head";
import { FC, ReactNode } from "react";
import { NavigationBar } from "../navigation/navigation-bar";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { Box, Container, CssBaseline, Toolbar } from "@mui/material";
import { useSession } from "next-auth/react";

export const Layout: FC<{
  title: string;
  description?: string;
  children: ReactNode | ReactNode[];
}> = ({ children, title, description }) => {
  const cart = useShoppingCart();
  const session = useSession();
  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box display="flex">
        <CssBaseline />
        <NavigationBar
          user={session.data?.user}
          items={cart.items.reduce((acc, i) => i.quantity + acc, 0)}
        />
        <Box component="main">
          <Toolbar />
          <Container sx={{ pt: 1 }}>{children}</Container>
        </Box>
      </Box>
    </>
  );
};
