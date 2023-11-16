import { publicProcedure } from "@/trpc/server/trpc";
import {
  GroupedProductObject,
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
      const quantities = order.productIds.reduce((acc, curr) => {
        if (acc[curr]) {
          acc[curr] += 1;
        } else {
          acc[curr] = 1;
        }
        return acc;
      }, {} as Record<string, number>);

      const productsMap: GroupedProductObject[] = [];
      for (const key in quantities) {
        const quantity = quantities[key];
        const product = products.find((p) => p.id === key);
        if (!product) continue;

        productsMap.push({
          ...product,
          quantity,
        });
      }

      const o = {
        ...order,
        seller: order.seller,
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
