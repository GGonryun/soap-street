import { z } from "zod";

export const productObjectSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  price: z.number().min(0),
  quantity: z.number().min(0),
  imageUrl: z.string().min(1).max(255),
});

export const createProductFormSchema = productObjectSchema.omit({
  imageUrl: true,
});

export type CreateProductForm = z.infer<typeof createProductFormSchema>;

export const EMPTY_CREATE_PRODUCT_FORM: CreateProductForm = {
  name: "",
  description: "",
  price: 0,
  quantity: 0,
};
