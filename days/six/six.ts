import { Day } from "../../common/mod.ts";
import { fetchInput } from "../../data/fetch_input.ts";

const input = await fetchInput(Day.Six);

function findUniqueStreak(input: string, uniquesLength: number) {
  const buffer = [];
  let markerEnd: number;
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    buffer.push(char);
    if (buffer.length > uniquesLength) {
      buffer.shift();
    }
    if (new Set(buffer).size === uniquesLength) {
      markerEnd = i + 1;
      break;
    }
  }
  return markerEnd!;
}

export function partOne() {
  const markerEnd = findUniqueStreak(input, 4);
  console.log(markerEnd);
}

export function partTwo() {
  const markerEnd = findUniqueStreak(input, 14);
  console.log(markerEnd);
}
