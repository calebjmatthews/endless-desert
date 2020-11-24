import Memo from '../models/memo';
import { MEMOS } from '../enums/memos';

let memos: { [name: string] : Memo } = {};

memos[MEMOS.INTRO_ONE] = new Memo({
  name: MEMOS.INTRO_ONE,
  title: "The Endless Desert",
  text: "Rumors say anything can be found in the desert: ancient knowledge, buried jade, even a dusky path back from the land of the dead. \n\nBut perhaps it was foolish to run towards its center on your own."
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
  text: "You find some meager leavings in the rubble:\n\n+ 22 Seeds\n+ 8 Water\n+ 51 Lentils\n +12 Oak Wood\n +287 Yellow Sand\n +17 Red Clay"
});

memos[MEMOS.LOOK_AROUND_REPAIR] = new Memo({
  name: MEMOS.LOOK_AROUND_REPAIR,
  title: "An Apparent Struggle",
  text: "And there's a cracked and leaking cistern at the back of the village. You'll have to repair it to have any hope of survival."
});

memos[MEMOS.CISTERN_REPAIRED] = new Memo({
  name: MEMOS.CISTERN_REPAIRED,
  title: "Flowing Water",
  text: "The tributary that flows into the cistern now makes a reassuring burble as water level begins to rise. And now that you've repaired the sandstone walls of the gigantic basin, you can climb down and access the reminant of the village's stored water:\n+ 2080 Water"
});

memos[MEMOS.CISTERN_REPAIRED_NEXT] = new Memo({
  name: MEMOS.CISTERN_REPAIRED_NEXT,
  title: "Flowing Water",
  text: "You're not going to die of thirst any time soon, but you could use a reliable food source. There's some sort of crop field that has run wild, but could be beaten back into shape."
});

memos[MEMOS.FIELD_REPAIRED] = new Memo({
  name: MEMOS.FIELD_REPAIRED,
  title: "Lentis, Hmm",
  text: "You'd never tilled the ground before, and it wasn't pleasant. But there were enough scavenged bags of seed and fallow lentil plants to make a productive field. Lentils aren't inspiring, but they grow fast and they'll keep you alive."
});

memos[MEMOS.FIELD_REPAIRED_NEXT] = new Memo({
  name: MEMOS.FIELD_REPAIRED_NEXT,
  title: "Lentis, Hmm",
  text: "Now, shelter. After patching holes in sandstone and tearing woody weeds from the rock-hard soil, what you need is a place to rest."
});

memos[MEMOS.STUDY_REPAIRED] = new Memo({
  name: MEMOS.STUDY_REPAIRED,
  title: "A New Home",
  text: "It's surprising to think so, but it is. You had been so rightfully concerned with the next task needed to keep yourself alive, and then the next after that, but... \n\nLooking around this tiny house, its dusty floors, its worn but handsome writing desk, it's impossible not to see. You've made yourself a new home."
});

memos[MEMOS.STUDY_REPAIRED_NEXT] = new Memo({
  name: MEMOS.STUDY_REPAIRED_NEXT,
  title: "A New Home",
  text: "And now you can start your true work. The desert is going to give you its every secret; you are going to see everything there is to see, and learn everything there is to learn. \n\nNo dusky path will be barred from you."
});

export { memos };
