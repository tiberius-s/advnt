import { Day } from "../../common/mod.ts";
import { fetchInput } from "../../data/fetch_input.ts";

const input = await fetchInput(Day.Seven);

type File = {
  name: string;
  size: number;
};

type Directory = {
  name: string;
  files: File[];
  directories: Directory[];
  size?: number;
};

const lines = input.split(/\n?\$ /).slice(1);

const commandRegEx = new RegExp(/^(?<command>cd|ls) ?(?<arg>\/|\w+|\.{2})?/);
const fileRegEx = new RegExp(/(?<size>\d+) (?<filename>\w+)/);
const directoryRegEx = new RegExp(/dir (?<dirname>\w+)/);

export function setDirectorySize(node: Directory): number {
  node.size =
    node.directories.map(setDirectorySize).reduce((x, y) => x + y, 0) +
    node.files.reduce((acc: number, file: File): number => acc + file.size, 0);

  return node.size;
}

export function changeDirectory(cwd: string[], fs: Directory) {
  return cwd.reduce((dir, path) => {
    return dir.directories.find((d) => d.name === path)!;
  }, fs);
}

export function crawlDirectory<T>(
  node: Directory,
  callback: (node: Directory) => T,
  results: T[] = [],
): T[] {
  results.push(callback(node));

  for (const item of node.directories) {
    crawlDirectory(item, callback, results);
  }
  return results;
}

export function buildDirectoryTree(lines: string[]) {
  const cwd = [];
  const fs: Directory = { name: "", files: [], directories: [] };
  let currentNode = fs;

  for (const line of lines) {
    const matches = line.match(commandRegEx);
    if (matches?.groups?.command === "cd") {
      if (matches.groups.arg === "/") {
        currentNode.name = matches.groups.arg;
      } else if (matches.groups.arg === "..") {
        cwd.pop();
        currentNode = changeDirectory(cwd, fs);
      } else {
        cwd.push(matches.groups.arg);
        currentNode = changeDirectory(cwd, fs);
      }
    }
    if (matches?.groups?.command === "ls") {
      const items = line.split("\n").slice(1);
      for (const item of items) {
        if (/^dir/.test(item)) {
          const matches = item.match(directoryRegEx);
          currentNode.directories.push(
            <Directory> {
              name: matches?.groups?.dirname,
              files: [],
              directories: [],
            },
          );
        } else {
          const matches = item.match(fileRegEx);
          currentNode.files.push(
            <File> {
              name: matches?.groups?.filename,
              size: parseInt(matches?.groups?.size!, 10),
            },
          );
        }
      }
    }
  }
  return fs;
}

const fs = buildDirectoryTree(lines);

crawlDirectory(fs, setDirectorySize);

export function partOne() {
  const results = crawlDirectory(fs, (node) => {
    const { size } = node;
    return size && size < 100000 ? size : undefined;
  })
    .filter((i): i is number => i !== undefined)
    .reduce((x, y) => x + y, 0);

  console.log(results);
}
export function partTwo() {
  const min = 30000000 - (70000000 - fs.size!);
  const results = crawlDirectory(fs, (node) => {
    const { size } = node;
    return size && size >= min ? size : undefined;
  })
    .filter((i): i is number => i !== undefined)
    .sort((x, y) => x - y);

  console.log(results[0]);
}
