import { Container } from "@mui/material";
import { Layout } from "@/components/layout/layout";
import { RegistrationFooter } from "@/components/footer/registration-footer";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { CreateUserForm } from "@/types/create-user-form";
import { RegistrationForm } from "@/components/forms/registration-form";
import { signIn } from "next-auth/react";

export default function Register() {
  const { push } = useRouter();
  const [form, setForm] = useState<CreateUserForm>({
    email: "",
    password: "",
    role: "BUYER",
  });
  const registerUser = trpc.users.register.useMutation();
  const handleSubmission = async () => {
    try {
      const result = await registerUser.mutateAsync(form);
      console.log(`Created user ${result.email} with id ${result.id}`);
      let res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      console.log("success!", res);

      push("/login");
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  return (
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
        <RegistrationForm
          onSubmit={handleSubmission}
          onUpdate={setForm}
          form={form}
        />
      </Container>
    </Layout>
  );
}
