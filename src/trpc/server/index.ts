import { router } from "./trpc";
import users from "../routes/users/router";
import products from "../routes/products/router";

export const appRouter = router({
  users,
  products,
});

export type AppRouter = typeof appRouter;
