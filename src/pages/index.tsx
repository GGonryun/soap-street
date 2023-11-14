import Head from "next/head";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <>
      <Head>
        <title>Soap Street</title>
        <meta
          name="description"
          content="Bubbles, Barter, Bliss - Where soap dreams come true, and cleanliness is currency"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box>Home Page</Box>
      </main>
    </>
  );
}
