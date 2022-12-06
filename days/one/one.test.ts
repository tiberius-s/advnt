import { assertExists } from "../../devDeps.ts";
import { totalsByElf } from "./one.ts";

Deno.test("totalsByElf is defined", () => {
  assertExists(totalsByElf);
});
