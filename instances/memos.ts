import Memo from '../models/memo';
import { MEMOS } from '../enums/memos';

let memos: { [name: string] : Memo } = {};

memos[MEMOS.INTRO_ONE] = new Memo({
  name: MEMOS.INTRO_ONE,
  title: "The Endless Desert",
  text: "Rumors say anything can be found in the desert: ancient knowledge, buried jade, even a path back from the land of the dead. \n\nBut perhaps it was foolish to run towards its center on your own."
});

memos[MEMOS.INTRO_TWO] = new Memo({
  name: MEMOS.INTRO_TWO,
  title: "The Endless Desert",
  text: "Your food and water are long gone, your breath gasping and your steps slow, when you find a ruined village."
});

memos[MEMOS.LOOK_AROUND] = new Memo({
  name: MEMOS.LOOK_AROUND,
  title: "An Apparent Struggle",
  text: "There are signs of conflict here: a shattered gate, broken doors, and ransacked huts. \n\nBut there aren't any bodies. Maybe the villagers fled as the raiders approached."
});

memos[MEMOS.LOOK_AROUND_LOOT] = new Memo({
  name: MEMOS.LOOK_AROUND_LOOT,
  title: "An Apparent Struggle",
  text: "You find some meager leavings in the rubble:\n\n- 22 Seeds\n- 223 Water\n- 51 Lentils\n -12 Oak Wood\n -287 Yellow Sand\n -17 Red Clay"
});

memos[MEMOS.LOOK_AROUND_REPAIR] = new Memo({
  name: MEMOS.LOOK_AROUND_REPAIR,
  title: "An Apparent Struggle",
  text: "And there's a cracked and leaking cistern at the back of the village. You'll have to repair it to have any hope of survival."
});

export { memos };
