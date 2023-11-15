import type { Meta } from "@storybook/react";
import { CreateProductModal } from "./create-product-modal";

const Story: Meta<typeof CreateProductModal> = {
  component: CreateProductModal,
  title: "Modals/CreateProductModal",
};
export default Story;

export const EmptyForm = {
  args: {
    open: true,
    form: {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      status: "",
    },
  },
};

export const FilledForm = {
  args: {
    open: true,
    form: {
      name: "My Awesome Product",
      description: "This is an awesome product",
      price: 9.99,
      quantity: 12,
      status: "",
    },
  },
};
