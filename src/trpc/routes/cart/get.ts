import { publicProcedure } from "@/trpc/server/trpc";
import { simpleProductObject } from "@/types/create-product-form";
import { z } from "zod";

export default publicProcedure
  .input(
    z.object({
      productIds: z.array(z.string()),
    })
  )
  .output(z.array(simpleProductObject))
  .query(async ({ ctx: { db }, input: { productIds } }) => {
    const products = await db.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      select: {
        id: true,
        name: true,
        price: true,
        imageUrl: true,
      },
    });
    return products;
  });
