import { privateProcedure } from "@/trpc/server/trpc";
import { orderSchema } from "@/types/customer-purchases";
import { z } from "zod";

export default privateProcedure
  .output(
    z.array(
      orderSchema.extend({
        createdAt: z.string(),
        products: z.array(z.string()),
        total: z.number(),
      })
    )
  )
  .query(async ({ ctx: { db, user } }) => {
    if (!user.id) throw new Error("User not found");

    const orders = await db.order.findMany({
      where: { sellerId: user.id },
    });

    const productIds = orders.map((order) => order.productIds).flat();

    const products = await db.product.findMany({
      where: { id: { in: productIds } },
    });

    return orders.map((order) => {
      const total = order.productIds.reduce((acc, productId) => {
        const product = products.find((product) => product.id === productId);
        if (!product) return acc;

        return acc + product.price;
      }, 0);

      const productNames = order.productIds
        .map((productId) => {
          const product = products.find((product) => product.id === productId);
          if (!product) return "";

          return product.name;
        })
        .filter(Boolean)
        .filter((value, index, self) => self.indexOf(value) === index);

      return {
        ...order,
        products: productNames,
        createdAt: order.createdAt.toString(),
        total: total,
      };
    });
  });
