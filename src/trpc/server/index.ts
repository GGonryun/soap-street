import { router } from "./trpc";
import users from "../routes/users/router";
import products from "../routes/products/router";
import sellers from "../routes/sellers/router";

export const appRouter = router({
  users,
  products,
  sellers,
});

export type AppRouter = typeof appRouter;
