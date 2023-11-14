import { t } from "@/trpc/server/trpc";
import verify from "./verify";
import register from "./register";
import login from "./login";

export default t.router({
  login,
  register,
  verify,
});
