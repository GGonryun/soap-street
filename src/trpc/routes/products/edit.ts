import { privateProcedure } from "@/trpc/server/trpc";
import { productObjectSchema } from "@/types/create-product-form";
import { z } from "zod";

export default privateProcedure
  // TODO: editing does not support changing the image.
  // this would require deleting the old image and uploading a new one.
  .input(productObjectSchema.omit({ imageUrl: true, seller: true }))
  .output(
    z.object({
      ok: z.boolean(),
    })
  )
  .mutation(async ({ ctx: { user, db }, input }) => {
    try {
      if (!user.id) throw new Error("User not found");

      const { id, ...rest } = input;

      const item = await db.product.update({
        where: {
          id,
        },
        data: rest,
      });

      console.info(`Edited product: ${item.id}`);
      return { ok: true };
    } catch (error) {
      console.error(`Error editing product: ${error}`);
      return { ok: false };
    }
  });
