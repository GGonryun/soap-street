import type { Meta } from "@storybook/react";
import { SportsEsports } from "@mui/icons-material";
import { UserAccount } from "./user-account";

const Story: Meta<typeof UserAccount> = {
  component: UserAccount,
  title: "Account/UserAccount",
};
export default Story;

export const Primary = {
  args: {
    email: "example@test.com",
    role: "SELLER",
  },
};
