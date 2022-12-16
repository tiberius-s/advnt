import { Day } from "../../common/mod.ts";
import { fetchInput } from "../../data/fetch_input.ts";

const input = await fetchInput(Day.Eight);

export function scan(reverse = false, tallestYet = -1) {
  return (acc: boolean[], curr: number, idx: number, arr: number[]) => {
    const prev = reverse ? idx + 1 : idx - 1;
    const isVisible = curr > (arr[prev] ?? -1) && curr > tallestYet
      ? true
      : false;
    if (curr > tallestYet) tallestYet = curr;
    reverse ? acc.unshift(isVisible) : acc.push(isVisible);
    return acc;
  };
}

export function mapRowVisibility(row: number[]): boolean[] {
  const fromLeft = row.reduce(scan(), []);
  const fromRight = row.reduceRight(scan(true), []);
  return fromLeft.map((x, idx) => (fromRight[idx] || x ? true : false));
}

export function setScenicScore(
  grid: number[][],
  tgrid: number[][],
  coords: [x: number, y: number],
) {
  const [x, y] = coords;
  const height = grid[x][y];

  const [left, right] = [
    grid[x].slice().splice(0, y),
    grid[x].slice().splice(y + 1),
  ];
  const [up, down] = [
    tgrid[y].slice().splice(0, x),
    transposed[y].slice().splice(x + 1),
  ];

  return (
    calculateScore(height, left, true) *
    calculateScore(height, right) *
    calculateScore(height, up, true) *
    calculateScore(height, down)
  );
}

export function calculateScore(height: number, slice: number[], reverse = false) {
  if (slice.length === 0) return 0;
  let score = 1;

  let [counter, test, increment] = reverse
    ? [
      slice.length - 1,
      (counter: number) => counter > 0,
      (counter: number) => --counter,
    ]
    : [
      0,
      (counter: number) => counter < slice.length - 1,
      (counter: number) => ++counter,
    ];

  for (counter; test(counter); counter = increment(counter)) {
    if (height <= slice[counter]) {
      break;
    }
    score++;
  }

  return score;
}

const grid = input.split("\n").map((line) =>
  line.split("").map((num) => parseInt(num, 10))
);
const transposed = grid.map((row, rowIdx) =>
  row.map((_, colIdx) => grid[colIdx][rowIdx])
);
const matrices = [grid, transposed];

export function partOne() {
  const result = matrices
    .map((grid) => grid.map((row) => mapRowVisibility(row)))
    .reduce((grid, tGrid) =>
      grid.map((row, rowIdx) =>
        row.map((_, colIdx) => grid[rowIdx][colIdx] || tGrid[colIdx][rowIdx])
      )
    )
    .map((r) => r.filter((v) => v).length)
    .reduce((x, y) => x + y, 0);

  console.log(result);
}
export function partTwo() {
  const result = matrices[0]
    .map((row, rIdx) =>
      row.map((_, cIdx) =>
        setScenicScore(matrices[0], matrices[1], [rIdx, cIdx])
      )
    )
    .map((row) => row.reduce((x, y) => (x > y ? x : y)))
    .reduce((x, y) => (x > y ? x : y));

  console.log(result);
}
