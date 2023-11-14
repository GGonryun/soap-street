import { Box, Container, Typography, styled } from "@mui/material";
import { Layout } from "@/components/layout/layout";
import { RegistrationForm } from "@/components/forms/registration-form";
import { RegistrationFooter } from "@/components/footer/registration-footer";

export default function Register() {
  return (
    <>
      <Layout title="Register" description="Make an account!">
        <RegistrationFooter />
        <Container
          sx={{
            display: "grid",
            placeItems: "center",
            flexGrow: 1,
            height: "50vh",
          }}
        >
          <RegistrationForm onSubmit={async () => true} />
        </Container>
      </Layout>
    </>
  );
}
