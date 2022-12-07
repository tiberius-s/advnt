import { Command } from "./deps.ts";
import { dayCommand } from "./commands/mod.ts";

await new Command()
  .name("advnt")
  .version("0.0.1")
  .description("Command line runner for solutions of Advent of Code 2022")
  .command("day", dayCommand)
  .parse(Deno.args);
