import type { Meta } from "@storybook/react";
import { RegistrationForm } from "./registration-form";

const Story: Meta<typeof RegistrationForm> = {
  component: RegistrationForm,
  title: "Forms/RegistrationForm",
};
export default Story;

export const Empty = {
  args: {
    form: {
      email: "",
      password: "",
      role: "BUYER",
    },
  },
};

export const Seller = {
  args: {
    form: {
      email: "miguel@example.com",
      password: "1234567890",
      role: "SELLER",
    },
  },
};
