import { Day } from "../../common/mod.ts";
import { fetchInput } from "../../data/fetch_input.ts";

const input = await fetchInput(Day.Two);
const rows = input.split("\n");

enum Play {
  Rock = "A",
  Paper = "B",
  Scissors = "C",
}

export function partOne() {
  enum UserSelection {
    Rock = "X",
    Paper = "Y",
    Scissors = "Z",
  }
  const againstRock = new Map([
    [UserSelection.Rock, 3],
    [UserSelection.Paper, 6],
    [UserSelection.Scissors, 0],
  ]);

  const againstPaper = new Map([
    [UserSelection.Rock, 0],
    [UserSelection.Paper, 3],
    [UserSelection.Scissors, 6],
  ]);

  const againstScissors = new Map([
    [UserSelection.Rock, 6],
    [UserSelection.Paper, 0],
    [UserSelection.Scissors, 3],
  ]);

  const match = new Map<Play, Map<UserSelection, number>>([
    [Play.Rock, againstRock],
    [Play.Paper, againstPaper],
    [Play.Scissors, againstScissors],
  ]);

  const selectionPoints = new Map([
    [UserSelection.Rock, 1],
    [UserSelection.Paper, 2],
    [UserSelection.Scissors, 3],
  ]);

  let score = 0;
  for (const row of rows) {
    const [elf, user] = row.split(" ");
    const outcome = match.get(elf as Play)!.get(user as UserSelection)!;
    const selection = selectionPoints.get(user as UserSelection)!;
    score += outcome + selection;
  }

  console.log(score);
}

export function partTwo() {
  enum MatchOutcome {
    Lose = "X",
    Draw = "Y",
    Win = "Z",
  }
  const againstRock = new Map([
    [MatchOutcome.Win, Play.Paper],
    [MatchOutcome.Draw, Play.Rock],
    [MatchOutcome.Lose, Play.Scissors],
  ]);

  const againstPaper = new Map([
    [MatchOutcome.Win, Play.Scissors],
    [MatchOutcome.Draw, Play.Paper],
    [MatchOutcome.Lose, Play.Rock],
  ]);

  const againstScissors = new Map([
    [MatchOutcome.Win, Play.Rock],
    [MatchOutcome.Draw, Play.Scissors],
    [MatchOutcome.Lose, Play.Paper],
  ]);

  const match = new Map([
    [Play.Rock, againstRock],
    [Play.Paper, againstPaper],
    [Play.Scissors, againstScissors],
  ]);

  const selectionPoints = new Map([
    [Play.Rock, 1],
    [Play.Paper, 2],
    [Play.Scissors, 3],
  ]);

  const outcomePoints = new Map([
    [MatchOutcome.Win, 6],
    [MatchOutcome.Draw, 3],
    [MatchOutcome.Lose, 0],
  ]);

  let score = 0;
  for (const row of rows) {
    const [elf, outcome] = row.split(" ");
    const userPlay = match.get(elf as Play)!.get(outcome as MatchOutcome)!;
    const selectionPts = selectionPoints.get(userPlay)!;
    const outcomePts = outcomePoints.get(outcome as MatchOutcome)!;
    score += outcomePts + selectionPts;
  }

  console.log(score);
}
