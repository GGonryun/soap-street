import { publicProcedure } from "@/trpc/server/trpc";
import {
  ProductObject,
  SimpleProductObject,
} from "@/types/create-product-form";
import { DetailedOrder, detailedOrderSchema } from "@/types/customer-purchases";
import { z } from "zod";

export default publicProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .output(
    z
      .object({
        id: z.string(),
        createdAt: z.date(),
        orders: z.array(detailedOrderSchema),
      })
      .nullable()
  )
  .query(async ({ ctx: { db }, input: { id } }) => {
    const purchase = await db.purchase.findUnique({
      where: { id },
      include: {
        orders: {
          include: {
            seller: true,
          },
        },
      },
    });

    if (!purchase) return null;

    const productIds =
      purchase?.orders.flatMap((order) => order.productIds) ?? [];

    const products = await db.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    const orders: DetailedOrder[] = purchase.orders.map((order) => {
      const productsMap = order.productIds
        .map((productId) => products.find((p) => p.id === productId))
        .filter(Boolean) as SimpleProductObject[];

      const o = {
        ...order,
        seller: order.seller.email,
        products: productsMap,
      };
      return o;
    });

    return {
      id: purchase.id,
      createdAt: purchase.createdAt,
      orders: orders,
    };
  });
