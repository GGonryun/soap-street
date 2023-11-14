import type { Meta } from "@storybook/react";
import { NavigationBar } from "./navigation-bar";

const Story: Meta<typeof NavigationBar> = {
  component: NavigationBar,
  title: "Navigation/NavigationBar",
};
export default Story;

export const LoggedIn = {
  args: {
    email: "miguel@example.com",
    items: 5,
  },
};

export const LoggedOut = {
  args: {
    items: 3,
  },
};
