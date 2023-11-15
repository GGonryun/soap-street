import { privateProcedure } from "@/trpc/server/trpc";
import { productObjectSchema } from "@/types/create-product-form";
import { z } from "zod";

export default privateProcedure
  .output(z.array(productObjectSchema))
  .query(async ({ ctx: { user, db } }) => {
    try {
      if (!user.id) throw new Error("User not found");

      const items = await db.product.findMany({
        where: {
          sellerId: user.id,
        },
        include: {
          seller: true,
        },
      });

      return items;
    } catch (error) {
      console.error(`Error listing product: ${error}`);
      return [];
    }
  });
