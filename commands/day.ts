import { Command } from "../deps.ts";

type DayCommandOptions = {
  part?: string;
};

const dayAction = async (options: DayCommandOptions, day: string) => {
  try {
    const { partOne, partTwo } = await import(`../days/${day}/mod.ts`);
    switch (options?.part?.toLowerCase()) {
      case "one":
        partOne();
        break;
      case "two":
        partTwo();
        break;
      default:
        partOne();
        partTwo();
    }
  } catch (error) {
    console.error(error);
  }
};

export const day = new Command()
  .arguments("<day:string>")
  .description("run the solution for a given day")
  .option("-p, --part <part:string>", "which part of day's solution to run")
  .action(dayAction);
