import { Day } from "../../common/mod.ts";
import { fetchInput } from "../../data/fetch_input.ts";

const input = await fetchInput(Day.Five);

const [cratesInput, operations] = input.split("\n\n").map((inputStr) =>
  inputStr.split("\n")
);
const numberOfStacks = parseInt(
  cratesInput
    .pop()!
    .split(" ")
    .findLast((el) => el !== " ")!,
);

function parseCrateInputLine(crateLine: string, stacks: Map<number, string[]>) {
  let counter = 1;
  let crateIndex = 1;
  let element = "";
  while (element !== undefined) {
    element = crateLine[crateIndex];
    if (element?.trim()) {
      stacks.get(counter)!.push(element);
    }
    crateIndex += 4;
    counter++;
  }
}

function initializeStacks(numberOfStacks: number, cratesInput: string[]) {
  const stacks = new Map<number, string[]>();
  for (let i = 1; i <= numberOfStacks; i++) {
    stacks.set(i, []);
  }
  for (const line of cratesInput) {
    parseCrateInputLine(line, stacks);
  }
  return stacks;
}

function printTopCrates(stacks: Map<number, string[]>) {
  const result: (string | undefined)[] = [];
  stacks.forEach((stack) => {
    result.push(stack.shift());
  });
  return result.filter((i) => i).join("");
}

export function partOne() {
  const stacks = initializeStacks(numberOfStacks, cratesInput);
  for (const line of operations) {
    const [amount, source, destination] = line.match(/\d+/g)?.map((num) =>
      parseInt(num, 10)
    )!;
    for (let i = 0; i < amount; i++) {
      const item = stacks.get(source)?.shift()!;
      stacks.get(destination)?.unshift(item);
    }
  }

  console.log(printTopCrates(stacks));
}

export function partTwo() {
  const stacks = initializeStacks(numberOfStacks, cratesInput);
  for (const line of operations) {
    const [amount, source, destination] = line.match(/\d+/g)?.map((num) =>
      parseInt(num, 10)
    )!;
    const queue: string[] = [];
    for (let i = 0; i < amount; i++) {
      const item = stacks.get(source)?.shift()!;
      queue.push(item);
    }
    queue.reverse().forEach((item) => stacks.get(destination)?.unshift(item));
  }
  console.log(printTopCrates(stacks));
}
