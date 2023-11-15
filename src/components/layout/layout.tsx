import Head from "next/head";
import { FC, ReactNode, useEffect, useState } from "react";
import { NavigationBar } from "../navigation/navigation-bar";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { Box, Container, CssBaseline, Toolbar } from "@mui/material";
import { useSession } from "next-auth/react";

export const Layout: FC<{
  title: string;
  description?: string;
  children: ReactNode | ReactNode[];
}> = ({ children, title, description }) => {
  const [items, setItems] = useState(0);
  const cart = useShoppingCart();
  const session = useSession();

  // a hack which prevents server side rendering on the nav bar.
  useEffect(() => {
    setItems(cart.items.length);
  }, [cart.items]);

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
        <NavigationBar user={session.data?.user} items={items} />
        <Box component="main">
          <Toolbar />
          <Container sx={{ pt: 1 }}>{children}</Container>
        </Box>
      </Box>
    </>
  );
};
