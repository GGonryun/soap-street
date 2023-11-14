import { router } from "./trpc";
import users from "../routes/users/router";

export const appRouter = router({
  users,
});

export type AppRouter = typeof appRouter;
