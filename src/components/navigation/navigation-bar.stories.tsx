import type { Meta } from "@storybook/react";
import { NavigationBar } from "./navigation-bar";

const Story: Meta<typeof NavigationBar> = {
  component: NavigationBar,
  title: "Navigation/NavigationBar",
};
export default Story;

export const LoggedInBuyer = {
  args: {
    user: {
      id: "1",
      email: "buyer@example.com",
      role: "BUYER",
    },
    items: 5,
  },
};

export const LoggedInSeller = {
  args: {
    user: {
      id: "1",
      email: "seller@example.com",
      role: "SELLER",
    },
    items: 5,
  },
};

export const LoggedOut = {
  args: {
    items: 3,
  },
};
