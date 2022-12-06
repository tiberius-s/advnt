import { fetchInput, InputFile } from "../../data/fetch_input.ts";

const input = await fetchInput(InputFile.DayFour);

export function parseElf(elf: string) {
  return elf.split("-").map((limit) => parseInt(limit, 10)) as [number, number];
}

export function toRange(elf: [start: number, end: number]) {
  return Array.from({ length: elf[1] - elf[0] + 1 }, (_, i) => i + elf[0]);
}

const rows = input.split("\n").map((row) =>
  row.split(",").map(parseElf).map(toRange)
);

export function checkOverlaps(
  elfOneSections: number[],
  elfTwoSections: number[],
): boolean {
  return (
    elfOneSections.filter((i) => elfTwoSections.includes(i)).length ===
      elfTwoSections.length ||
    elfTwoSections.filter((i) => elfOneSections.includes(i)).length ===
      elfOneSections.length
  );
}

export function hasDuplicates(
  elfOneSections: number[],
  elfTwoSections: number[],
): boolean {
  return (
    elfOneSections.filter((i) => elfTwoSections.includes(i)).length > 0 ||
    elfTwoSections.filter((i) => elfOneSections.includes(i)).length > 0
  );
}

export function partOne() {
  let overlaps = 0;
  for (const [elfOneSections, elfTwoSections] of rows) {
    if (checkOverlaps(elfOneSections, elfTwoSections)) {
      overlaps++;
    }
  }
  console.log(overlaps);
}

export function partTwo() {
  let duplicates = 0;
  for (const [elfOneSections, elfTwoSections] of rows) {
    if (hasDuplicates(elfOneSections, elfTwoSections)) {
      duplicates++;
    }
  }
  console.log(duplicates);
}
