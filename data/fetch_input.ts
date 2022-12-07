import { dirname, fromFileUrl, resolve } from "../deps.ts";
import { Day } from "../common/mod.ts";

const dir = dirname(fromFileUrl(import.meta.url));

export function fetchInput(day: Day) {
  const filename = `${day}_input.txt`;
  const path = resolve(dir, filename);
  return Deno.readTextFile(path);
}
