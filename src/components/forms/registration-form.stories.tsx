import type { Meta } from "@storybook/react";
import { RegistrationForm } from "./registration-form";

const Story: Meta<typeof RegistrationForm> = {
  component: RegistrationForm,
  title: "Forms/RegistrationForm",
};
export default Story;

export const Primary = {
  args: {},
};
