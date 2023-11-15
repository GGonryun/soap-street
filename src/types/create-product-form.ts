import { z } from "zod";

export const productObjectSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  price: z.number().min(0),
  quantity: z.number().min(0),
  status: z.string().min(1).max(255),
  imageUrl: z.string().min(1).max(255),
});

export const createProductFormSchema = productObjectSchema.omit({
  imageUrl: true,
});

export type CreateProductForm = z.infer<typeof createProductFormSchema>;
