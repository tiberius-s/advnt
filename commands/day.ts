import { Command } from '../deps.ts';
import days from '../days/mod.ts';

const adventDayWords = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
  'twenty',
  'twenty-one',
  'twenty-two',
  'twenty-three',
  'twenty-four',
  'twenty-five',
];

const numberToWordsMap = new Map<number, string>();
adventDayWords.forEach((item, idx) => numberToWordsMap.set(idx + 1, item));

function validateDayArg(input: string) {
  const num = parseInt(input, 10);
  if (!Number.isNaN(num) && num >= 0 && num <= 25) {
    return numberToWordsMap.get(num)!;
  }
  if (adventDayWords.includes(input)) {
    return input;
  }
  throw Error(
    'day argument needs to be a number between 1 - 25 or a kebab-case string. Examples: 1 | one | twenty-two',
  );
}

type DayCommandOptions = {
  part?: string;
};

const dayAction = (options: DayCommandOptions, arg: string) => {
  const day = validateDayArg(arg);
  try {
    const { partOne, partTwo } = days[day];
    switch (options?.part?.toLowerCase()) {
      case 'one':
        partOne();
        break;
      case 'two':
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
  .arguments('<day:string>')
  .description('run the solution for a given day')
  .option('-p, --part <part:string>', "which part of day's solution to run")
  .action(dayAction);
