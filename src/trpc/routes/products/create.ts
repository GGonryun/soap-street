import { privateProcedure } from "@/trpc/server/trpc";
import { productObjectSchema } from "@/types/create-product-form";
import { z } from "zod";

export default privateProcedure
  .input(productObjectSchema)
  .output(
    z.object({
      ok: z.boolean(),
    })
  )
  .mutation(async ({ ctx: { user, db }, input }) => {
    try {
      if (!user.id) throw new Error("User not found");

      const item = await db.product.create({
        data: {
          ...input,
          sellerId: user.id,
        },
      });

      console.info(`Created product: ${item.id}`);
      return { ok: true };
    } catch (error) {
      console.error(`Error creating product: ${error}`);
      return { ok: false };
    }
  });
