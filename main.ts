import { Command } from "./deps.ts";
import { day } from "./commands/mod.ts";

await new Command()
  .name("advnt")
  .version("0.0.1")
  .description("Command line runner for solutions of Advent of Code 2022")
  .command("day", day)
  .parse(Deno.args);
