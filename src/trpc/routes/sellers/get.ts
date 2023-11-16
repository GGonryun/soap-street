import { publicProcedure } from "@/trpc/server/trpc";
import { productObjectSchema } from "@/types/create-product-form";
import { createdUserResponseSchema } from "@/types/create-user-form";
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
        products: z.array(productObjectSchema.omit({ seller: true })),
        details: createdUserResponseSchema,
      })
      .optional()
  )
  .query(async ({ ctx: { db }, input: { id } }) => {
    const response = await db.user.findUnique({
      where: {
        id,
        role: "SELLER",
      },
      include: {
        products: true,
      },
    });

    if (!response) return undefined;

    return {
      products: response.products,
      details: {
        id: response.id,
        email: response.email,
        role: response.role,
      },
    };
  });
