import { privateProcedure, publicProcedure } from "@/trpc/server/trpc";
import { purchaseSchema, statusSchema } from "@/types/customer-purchases";
import { z } from "zod";

export default privateProcedure
  .output(z.array(purchaseSchema.extend({ status: statusSchema })))
  .query(async ({ ctx: { db, user } }) => {
    if (!user.id) throw new Error("User not found");

    const purchases = await db.purchase.findMany({
      where: { buyerId: user.id },
      include: { orders: true },
    });

    return purchases.map((purchase) => {
      const shipped = purchase.orders.every(
        (order) => order.status === "SHIPPED"
      );
      if (shipped) return { ...purchase, status: "SHIPPED" };
      const delivered = purchase.orders.every(
        (order) => order.status === "DELIVERED"
      );
      if (delivered) return { ...purchase, status: "DELIVERED" };

      return { ...purchase, status: "PENDING" };
    });
  });
