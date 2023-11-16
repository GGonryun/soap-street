import { t } from "@/trpc/server/trpc";
import list from "./list";
import edit from "./edit";

export default t.router({
  list,
  edit,
});
