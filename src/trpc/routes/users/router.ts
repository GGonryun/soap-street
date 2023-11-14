import { t } from "@/trpc/server/trpc";
import verify from "./verify";
import register from "./register";

export default t.router({
  register,
  verify,
});
