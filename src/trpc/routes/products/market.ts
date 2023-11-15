import { privateProcedure, publicProcedure } from "@/trpc/server/trpc";
import { productObjectSchema } from "@/types/create-product-form";
import { z } from "zod";

export default publicProcedure
  .output(z.array(productObjectSchema))
  .query(async ({ ctx: { db } }) => {
    try {
      const items = await db.product.findMany({
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
