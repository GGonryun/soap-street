import type { Meta } from "@storybook/react";
import { ShoppingCartList } from "./shopping-cart-list";

const Story: Meta<typeof ShoppingCartList> = {
  component: ShoppingCartList,
  title: "Cart/ShoppingCartList",
};
export default Story;

export const Empty = {
  args: {
    products: [],
  },
};

export const WithProducts = {
  args: {
    products: [
      {
        id: "1",
        name: "Product 1",
        price: 11.49,
        imageUrl:
          "https://9u5sq01tduqtq9hy.public.blob.vercel-storage.com/Background-G3wN2RJ3SAlCxSWxAfJ9kPWwezfali.png",
      },
      {
        id: "2",
        name: "Product 2",
        price: 13.49,
        imageUrl:
          "https://9u5sq01tduqtq9hy.public.blob.vercel-storage.com/Background-G3wN2RJ3SAlCxSWxAfJ9kPWwezfali.png",
      },
    ],
  },
};
