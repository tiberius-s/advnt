import { fetchInput, InputFile } from "../../data/fetch_input.ts";

const input = await fetchInput(InputFile.DayThree);
const rows = input.split("\n");

function findIntersection(left: string, right: string) {
  const leftSet = [...new Set(left.split(""))];
  const rightSet = [...new Set(right.split(""))];
  return leftSet.filter((item) => rightSet.includes(item)).shift();
}

function getPriority(item: string): number {
  const code = item.charCodeAt(0);
  return code <= 90 ? code - 38 : code - 96;
}

export function partOne() {
  let score = 0;
  for (const row of rows) {
    const left = row.substring(0, row.length / 2);
    const right = row.substring(row.length / 2);

    const commonItem = findIntersection(left, right)!;
    score += getPriority(commonItem);
  }

  console.log(score);
}

export function partTwo() {
  let score = 0;
  for (let i = 0; i < rows.length; i += 3) {
    const distinctItems = [
      ...new Set((rows[i] + rows[i + 1] + rows[i + 2]).split("")),
    ];

    let commonItem = "";
    for (const item of distinctItems) {
      if (
        rows[i].includes(item) && rows[i + 1].includes(item) &&
        rows[i + 2].includes(item)
      ) {
        commonItem = item;
        break;
      }
    }
    score += getPriority(commonItem);
  }

  console.log(score);
}
