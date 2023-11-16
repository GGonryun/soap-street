import { z } from "zod";
import { createdUserResponseSchema } from "./create-user-form";
import {
  productObjectSchema,
  simpleProductObject,
} from "./create-product-form";

export const statusSchema = z.enum([
  "PENDING",
  "SHIPPED",
  "CANCELLED",
  "DELIVERED",
  "RETURNED",
]);

export const orderSchema = z.object({
  id: z.string(),
  productIds: z.array(z.string()),
  trackingId: z.string().nullable(),
  status: statusSchema,
});

export const detailedOrderSchema = orderSchema.extend({
  purchaseId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  seller: z.string(),
  products: z.array(simpleProductObject),
});

export type DetailedOrder = z.infer<typeof detailedOrderSchema>;

export const purchaseSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Purchase = z.infer<typeof purchaseSchema>;
