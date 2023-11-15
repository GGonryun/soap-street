import { publicProcedure } from "@/trpc/server/trpc";
import { productObjectSchema } from "@/types/create-product-form";
import { z } from "zod";

export default publicProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .output(productObjectSchema.omit({ seller: true }).nullable())
  .query(async ({ ctx: { db }, input: { id } }) => {
    try {
      const item = await db.product.findUnique({
        where: {
          id,
        },
      });

      return item;
    } catch (error) {
      console.error(`Error getting product: ${error}`);
      return null;
    }
  });
