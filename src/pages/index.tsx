import { Divider, Typography } from "@mui/material";
import { Layout } from "@/components/layout/layout";
import { RegistrationFooter } from "@/components/footer/registration-footer";

export default function Home() {
  return (
    <>
      <Layout
        title="Soap Street"
        description="Bubbles, Barter, Bliss - Where soap dreams come true, and cleanliness is currency"
      >
        <Typography variant="h5">TODO: Products</Typography>
        <Divider />
        <RegistrationFooter />
      </Layout>
    </>
  );
}
