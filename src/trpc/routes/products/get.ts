import { privateProcedure } from "@/trpc/server/trpc";
import { productObjectSchema } from "@/types/create-product-form";
import { z } from "zod";

export default privateProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .output(productObjectSchema.omit({ seller: true }).nullable())
  .query(async ({ ctx: { user, db }, input: { id } }) => {
    try {
      if (!user.id) throw new Error("User not found");

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
