import { publicProcedure } from "@/trpc/server/trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

export default publicProcedure
  .input(
    z.object({
      productIds: z.array(z.string()),
    })
  )
  .output(z.string())
  .mutation(async ({ ctx: { db, session }, input: { productIds } }) => {
    // if the user is not logged in then the purchase is anonymous
    const buyerId = session?.user?.id ?? null;

    // create a map of product id's to quantities
    const quantities: Record<string, number> = {};
    for (const productId of productIds) {
      if (quantities[productId]) {
        quantities[productId] += 1;
      } else {
        quantities[productId] = 1;
      }
    }

    // create the orders in a transaction
    const result = await db.$transaction(async (tx) => {
      // search for all the products that were purchased
      const products = await tx.product.findMany({
        where: {
          id: {
            in: productIds,
          },
        },
      });

      // create order groups for each seller.
      const groups: Record<string, string[]> = {};
      for (const product of products) {
        if (!groups[product.sellerId]) {
          groups[product.sellerId] = [];
        }
        groups[product.sellerId].push(product.id);
      }

      // create a purchase group for all the orders.
      const purchase = await tx.purchase.create({
        data: {
          id: uuidv4(),
          buyerId,
        },
      });

      // create an order for each vendor that was purchased from
      for (const sellerId in groups) {
        const productIds = groups[sellerId];
        await tx.order.create({
          data: {
            purchaseId: purchase.id,
            sellerId,
            // create an array of product ids with the correct quantity for each product
            productIds: productIds.flatMap((productId) => {
              const quantity = quantities[productId];
              return Array.from({ length: quantity }, () => productId);
            }),
          },
        });
      }

      // decrement the stock of the products that were purchased
      for (const key in quantities) {
        const quantity = quantities[key];
        await tx.product.update({
          where: {
            id: key,
          },
          data: {
            quantity: {
              decrement: quantity,
            },
          },
        });
      }

      return purchase.id;
    });

    return result;
  });
