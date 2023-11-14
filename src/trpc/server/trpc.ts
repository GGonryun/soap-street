import { TRPCError, initTRPC } from "@trpc/server";
import { Context } from "../context";

export const t = initTRPC.context<Context>().create();

export const router = t.router;

export const auth = t.middleware(({ next, ctx, type, path }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: `Authorization middleware stopped unauthorized user from completing request ${type} - ${path}`,
    });
  }

  return next({
    ctx: {
      user: ctx.session.user,
    },
  });
});

export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(auth);
