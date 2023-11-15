import { t } from "@/trpc/server/trpc";
import create from "./create";
import get from "./get";
import edit from "./edit";
import archive from "./archive";
import list from "./list";
import market from "./market";

export default t.router({
  get,
  create,
  edit,
  list,
  archive,
  market,
});
