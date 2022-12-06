import { dirname, fromFileUrl, resolve } from "../deps.ts";

const dir = dirname(fromFileUrl(import.meta.url));

export enum InputFile {
  DayOne = "one_input.txt",
  DayTwo = "two_input.txt",
  DayThree = "three_input.txt",
  DayFour = "four_input.txt",
  DayFive = "five_input.txt",
  DaySix = "six_input.txt",
}

export function fetchInput(filename: string) {
  const path = resolve(dir, filename);
  return Deno.readTextFile(path);
}
