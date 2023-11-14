import { publicProcedure } from "@/trpc/server/trpc";
import { TRPCError } from "@trpc/server";
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
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user)
      throw new TRPCError({
        message: "A user with that email and password does not exist",
        code: "NOT_FOUND",
      });

    // TODO: support encrypted passwords
    if (user.password != password) {
      throw new TRPCError({
        message: "A user with that email and password does not exist",
        code: "BAD_REQUEST",
      });
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  });
