import { router } from "./trpc";
import users from "../routes/users/router";
import products from "../routes/products/router";
import sellers from "../routes/sellers/router";
import cart from "../routes/cart/router";
import purchases from "../routes/purchases/router";
import orders from "../routes/orders/router";

export const appRouter = router({
  users,
  products,
  sellers,
  cart,
  purchases,
  orders,
});

export type AppRouter = typeof appRouter;
