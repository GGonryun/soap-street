import { t } from "@/trpc/server/trpc";
import create from "./create";
import get from "./get";
import edit from "./edit";
import archive from "./archive";
import list from "./list";

export default t.router({
  get,
  create,
  edit,
  list,
  archive,
});
