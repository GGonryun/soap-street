import { z } from "zod";
import { groupedProductObject } from "./create-product-form";
import { createdUserResponseSchema } from "./create-user-form";

export const orderStatusSchema = z.enum([
  "PENDING",
  "SHIPPED",
  "CANCELLED",
  "DELIVERED",
]);

export type OrderStatus = z.infer<typeof orderStatusSchema>;

export const orderStatusLabels: Record<OrderStatus, string> = {
  PENDING: "Pending",
  SHIPPED: "Shipped",
  CANCELLED: "Cancelled",
  DELIVERED: "Delivered",
};
export const orderSchema = z.object({
  id: z.string(),
  productIds: z.array(z.string()),
  trackingId: z.string().nullable(),
  status: orderStatusSchema,
});

export type BasicOrder = z.infer<typeof orderSchema>;

export const editOrderFormSchema = orderSchema.pick({
  id: true,
  status: true,
  trackingId: true,
});

export type EditOrderForm = z.infer<typeof editOrderFormSchema>;

export const detailedOrderSchema = orderSchema.extend({
  purchaseId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  seller: createdUserResponseSchema,
  products: z.array(groupedProductObject),
});

export type DetailedOrder = z.infer<typeof detailedOrderSchema>;

export const purchaseSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Purchase = z.infer<typeof purchaseSchema>;
