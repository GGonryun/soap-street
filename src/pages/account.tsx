import { Box, Button } from "@mui/material";
import { Layout } from "@/components/layout/layout";
import { signOut, useSession } from "next-auth/react";
import { UserAccount } from "@/components/account/user-account";
import { CreatedUserResponse } from "@/types/create-user-form";

export default function Account() {
  const session = useSession();

  if (!session.data?.user) return <Box>Not logged in</Box>;

  return (
    <Layout title="Account" description="View account information">
      <UserAccount
        onSignOut={() => signOut()}
        email={session.data?.user?.email}
        role={session.data?.user?.role as CreatedUserResponse["role"]}
      />
    </Layout>
  );
}
