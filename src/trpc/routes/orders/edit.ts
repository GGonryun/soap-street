import { privateProcedure } from "@/trpc/server/trpc";
import { orderStatusSchema } from "@/types/customer-purchases";
import { z } from "zod";

export default privateProcedure
  .input(
    z.object({
      id: z.string(),
      status: orderStatusSchema,
      trackingId: z.string().nullable(),
    })
  )
  .output(z.boolean())
  .mutation(async ({ ctx: { db, user }, input }) => {
    if (!user.id) throw new Error("User not found");

    try {
      await db.order.update({
        where: { id: input.id },
        data: {
          status: input.status,
          trackingId: input.trackingId,
        },
      });

      return true;
    } catch (error) {
      console.error(`failed to update order`, error);
      return false;
    }
  });
