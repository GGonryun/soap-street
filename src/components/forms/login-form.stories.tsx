import type { Meta } from "@storybook/react";
import { LogInForm } from "./login-form";

const Story: Meta<typeof LogInForm> = {
  component: LogInForm,
  title: "Forms/LogInForm",
};
export default Story;

export const Empty = {
  args: {
    form: {
      email: "",
      password: "",
    },
  },
};

export const Seller = {
  args: {
    form: {
      email: "miguel@example.com",
      password: "1234567890",
    },
  },
};
