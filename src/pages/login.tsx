import { Container } from "@mui/material";
import { Layout } from "@/components/layout/layout";
import { RegistrationFooter } from "@/components/footer/registration-footer";
import { useRouter } from "next/router";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { ConnectUserForm } from "@/types/connect-user-form";
import { LogInForm } from "@/components/forms/login-form";

export default function Login() {
  const { push } = useRouter();
  const [form, setForm] = useState<ConnectUserForm>({
    email: "",
    password: "",
  });
  const handleSubmission = async () => {
    try {
      let res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (res?.ok) {
        push("/");
      } else {
        console.log("failed to login", res);
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("Failed to log in");
      console.error(error);
      return false;
    }
  };
  return (
    <Layout title="Login" description="Log in and make purchases!">
      <RegistrationFooter />
      <Container
        sx={{
          display: "grid",
          placeItems: "center",
          flexGrow: 1,
          height: "50vh",
        }}
      >
        <LogInForm onSubmit={handleSubmission} onUpdate={setForm} form={form} />
      </Container>
    </Layout>
  );
}
