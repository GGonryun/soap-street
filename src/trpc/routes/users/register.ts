import { publicProcedure } from "@/trpc/server/trpc";
import { z } from "zod";

export default publicProcedure
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(8),
    })
  )
  .output(
    z.object({
      id: z.string(),
      email: z.string().email(),
      role: z.union([z.literal("SELLER"), z.literal("BUYER")]),
    })
  )
  .mutation(async ({ input: { email, password }, ctx: { db } }) => {
    const user = await db.user.create({
      data: {
        email,
        // TODO: support encrypted passwords
        password,
        role: "BUYER",
      },
    });

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  });
