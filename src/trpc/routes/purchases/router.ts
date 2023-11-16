import { t } from "@/trpc/server/trpc";
import get from "./get";
import list from "./list";

export default t.router({
  list,
  get,
});
