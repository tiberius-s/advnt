import { Day } from "../../common/mod.ts";
import { fetchInput } from "../../data/fetch_input.ts";

const input = await fetchInput(Day.One);

export const totalsByElf = input
  .split("\n\n")
  .map((elf) =>
    elf
      .split("\n")
      .map((item) => parseInt(item, 10))
      .reduce((x, y) => x + y)
  )
  .sort((x, y) => y - x);

// PART ONE
export function partOne() {
  console.log(totalsByElf[0]);
}

// PART TWO
export function partTwo() {
  console.log(totalsByElf.slice(0, 3).reduce((x, y) => x + y));
}
