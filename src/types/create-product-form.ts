import { z } from "zod";

export const productObjectSchema = z.object({
  id: z.string().min(1).max(255),
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255).nullable(),
  price: z.number().min(0),
  quantity: z.number().min(0),
  imageUrl: z.string().min(1).max(255),
  seller: z.object({
    id: z.string().min(1).max(255),
    email: z.string().min(1).max(255),
  }),
});

// TODO: better name, this product object omits several properties
// but the word "simple" doesn't accurately reflect that.
export const simpleProductObject = productObjectSchema.omit({
  seller: true,
  description: true,
  quantity: true,
});
export type SimpleProductObject = z.infer<typeof simpleProductObject>;

export const groupedProductObject = productObjectSchema.omit({
  seller: true,
  description: true,
});
export type GroupedProductObject = z.infer<typeof groupedProductObject>;

export type ProductObject = z.infer<typeof productObjectSchema>;

export const createProductFormSchema = productObjectSchema.omit({
  imageUrl: true,
  id: true,
  seller: true,
});

export type CreateProductForm = z.infer<typeof createProductFormSchema>;

export const EMPTY_CREATE_PRODUCT_FORM: CreateProductForm = {
  name: "",
  description: "",
  price: 0,
  quantity: 0,
};
