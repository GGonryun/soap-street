import { t } from "@/trpc/server/trpc";
import get from "./get";
import checkout from "./checkout";

export default t.router({
  checkout,
  get,
});
