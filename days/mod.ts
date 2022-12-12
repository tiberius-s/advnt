import * as one from './one/mod.ts';
import * as two from './two/mod.ts';
import * as three from './three/mod.ts';
import * as four from './four/mod.ts';
import * as five from './five/mod.ts';
import * as six from './six/mod.ts';
import * as seven from './seven/mod.ts';

type SolutionModule = {
  partOne: () => void;
  partTwo: () => void;
};

export default {
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
} as Record<string, SolutionModule>;
