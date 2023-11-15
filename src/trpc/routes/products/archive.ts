import { privateProcedure } from "@/trpc/server/trpc";
import { productObjectSchema } from "@/types/create-product-form";
import { z } from "zod";

export default privateProcedure
  // TODO: editing does not support changing the image.
  // this would require deleting the old image and uploading a new one.
  .input(productObjectSchema.pick({ id: true }))
  .output(
    z.object({
      ok: z.boolean(),
    })
  )
  .mutation(async ({ ctx: { user, db }, input }) => {
    try {
      if (!user.id) throw new Error("User not found");

      const { id } = input;

      const item = await db.product.delete({
        where: {
          id,
        },
      });

      console.info(`Deleted product: ${item.id}`);
      return { ok: true };
    } catch (error) {
      console.error(`Error deleting product: ${error}`);
      return { ok: false };
    }
  });
