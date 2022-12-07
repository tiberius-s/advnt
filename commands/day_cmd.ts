import { Command } from "../deps.ts";
import { Day } from "../common/mod.ts";
import days from "../days/mod.ts";

const numberWords = Object.values<string>(Day);
const numberToWordsMap = new Map<number, string>();
numberWords.forEach((item, idx) => numberToWordsMap.set(idx + 1, item));

function validateDayArg(input: string) {
  const num = parseInt(input, 10);
  if (!Number.isNaN(num) && num >= 0 && num <= numberToWordsMap.size) {
    return numberToWordsMap.get(num)!;
  }
  if (numberWords.includes(input)) {
    return input;
  }
  throw Error(
    `day argument needs to be a number, 1-${numberWords.length}, or a string, one to ${
      numberWords[numberWords.length - 1]
    }.`,
  );
}

type DayCommandOptions = {
  part?: string;
};

const dayAction = (options: DayCommandOptions, arg: string) => {
  try {
    const day = validateDayArg(arg);
    const { partOne, partTwo } = days[day];
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

export const dayCommand = new Command()
  .arguments("<day:string>")
  .description("run the solution for a given day")
  .option("-p, --part <part:string>", "which part of day's solution to run")
  .action(dayAction);
