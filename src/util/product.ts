import { ProductObject } from "@/types/create-product-form";

export const filterProductQuantity = (
  cart: string[],
  product: ProductObject
): number => {
  const quantity = cart?.filter((item) => item === product.id).length ?? 0;

  return Math.max(product.quantity - quantity, 0);
};
