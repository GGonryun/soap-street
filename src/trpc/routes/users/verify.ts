import { privateProcedure } from "@/trpc/server/trpc";
import { z } from "zod";

export default privateProcedure
  .output(
    z.object({
      ok: z.boolean(),
    })
  )
  .query(({ ctx: { session } }) => {
    console.log("verify", session);
    return { ok: true };
  });
