import { initTRPC } from "@trpc/server";
import { Context } from "../context";
import { auth } from "../middleware/auth";

export const t = initTRPC.context<Context>().create();

export const router = t.router;
export const middleware = t.middleware;

export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(auth);
