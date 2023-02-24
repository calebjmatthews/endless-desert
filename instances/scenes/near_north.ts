import RichText from '../../models/rich_text';
import { Scene, SceneAction, SceneOutcome, SceneText } from '../../models/scene';
import Icon from '../../models/icon';
import { EXPEDITION_EVENTS } from '../../enums/expedition_events';
import { RESOURCE_SPECIFICITY } from '../../enums/resource_specificity';
const RSP = RESOURCE_SPECIFICITY;
import { RESOURCE_TAGS } from '../../enums/resource_tags';
const RTA = RESOURCE_TAGS;
import { RESOURCE_TYPES } from '../../enums/resource_types';
const RTY = RESOURCE_TYPES;
import { LEADER_QUALITIES } from '../../enums/leader_qualities';
const LEQ = LEADER_QUALITIES;

const nnScenes: { [id: string]: Scene } = {};
const nnSceneTexts: { [id: string]: SceneText } = {};
const nnSceneActions: { [id: string] : SceneAction } = {};

nnScenes[EXPEDITION_EVENTS.SCORPIONS] = new Scene({
  id: EXPEDITION_EVENTS.SCORPIONS,
  name: 'Black Shapes From the Ground',
  next: {ids: [`${EXPEDITION_EVENTS.SCORPIONS} - 0`], type: 'SceneText'}
});
nnSceneTexts[`${EXPEDITION_EVENTS.SCORPIONS} - 0`] = new SceneText({
  id: `${EXPEDITION_EVENTS.SCORPIONS} - 0`,
  subType: 'narration',
  text: new RichText({ type: 'Text', contents: [`At first there's just a scuttering, a sound barely recognizable over wind and shifting sands. There's one moving form, then ten... highest heavens, there are scorpions everywhere!`] }),
  next: {ids: [`${EXPEDITION_EVENTS.SCORPIONS} - 1a`, `${EXPEDITION_EVENTS.SCORPIONS} - 1d`],
    type: 'SceneAction'}
});
nnSceneActions[`${EXPEDITION_EVENTS.SCORPIONS} - 1a`] = new SceneAction({
  id: `${EXPEDITION_EVENTS.SCORPIONS} - 1a`,
  subType: 'action',
  label: `Surround yourself with traps`,
  next: {ids: [`${EXPEDITION_EVENTS.SCORPIONS} - 2a`], type: 'SceneText'},
  getCost: (difficulty: number) => (
    [ {specificity: RSP.TAG, kind: RTA.ACTION_TRAP, value: (7500 * difficulty) } ]
  )
});
nnSceneTexts[`${EXPEDITION_EVENTS.SCORPIONS} - 2a`] = new SceneText({
  id: `${EXPEDITION_EVENTS.SCORPIONS} - 2a`,
  subType: 'narration',
  text: new RichText({ type: 'Text', contents: [`The scorpions are already swarming around you, so you have to set the traps quickly and precisely. Soon you're surrounded by much more pleasant sounds: mechanisms snapping and carapaces cracking.`] }),
  next: {ids: [`${EXPEDITION_EVENTS.SCORPIONS} - 3a`], type: 'SceneText'},
});
nnSceneTexts[`${EXPEDITION_EVENTS.SCORPIONS} - 3a`] = new SceneText({
  id: `${EXPEDITION_EVENTS.SCORPIONS} - 3a`,
  subType: 'narration',
  text: new RichText({ type: 'Text', contents: [`Afterwards, the traps are sprung and can't be salvaged. But, you may be able to make something of these scorpion parts.`] }),
  outcome: new SceneOutcome({
    gainResources: [{ specificity: RSP.EXACT, kind: RTY.CHITENOUS_PINS, value: [801, 2399] }],
  })
});
// nnSceneActions[`${EXPEDITION_EVENTS.SCORPIONS} - 1b`] = new SceneAction({
//   id: `${EXPEDITION_EVENTS.SCORPIONS} - 1b`,
//   subType: 'action',
//   label: `Locate where they're emerging from`,
//   description: new RichText({ type: 'Text', contents: [``] }),
//   next: {ids: [`${EXPEDITION_EVENTS.SCORPIONS} - 2b`], type: 'SceneText'},
// });
// nnSceneActions[`${EXPEDITION_EVENTS.SCORPIONS} - 1c`] = new SceneAction({
//   id: `${EXPEDITION_EVENTS.SCORPIONS} - 1c`,
//   subType: 'action',
//   label: `Become still and transcend any poison`,
//   description: new RichText({ type: 'Text', contents: [``] }),
//   next: {ids: [`${EXPEDITION_EVENTS.SCORPIONS} - 2c`], type: 'SceneText'},
// });
nnSceneActions[`${EXPEDITION_EVENTS.SCORPIONS} - 1d`] = new SceneAction({
  id: `${EXPEDITION_EVENTS.SCORPIONS} - 1d`,
  subType: 'action',
  label: `Run away and hope for the best`,
  next: {ids: [`${EXPEDITION_EVENTS.SCORPIONS} - 2d`], type: 'SceneText'},
});
nnSceneTexts[`${EXPEDITION_EVENTS.SCORPIONS} - 2d`] = new SceneText({
  id: `${EXPEDITION_EVENTS.SCORPIONS} - 2d`,
  subType: 'narration',
  text: new RichText({ type: 'Text', contents: [`There's no clear route to escape, stinging tails bristle everywhere you look. Running while kicking and stomping is the best you can do.`] }),
  next: {ids: [`${EXPEDITION_EVENTS.SCORPIONS} - 3d`], type: 'SceneText'}
});
nnSceneTexts[`${EXPEDITION_EVENTS.SCORPIONS} - 3d`] = new SceneText({
  id: `${EXPEDITION_EVENTS.SCORPIONS} - 3d`,
  subType: 'narration',
  text: new RichText({ type: 'Text', contents: [`Well, that could have gone better. You and your people are covered in stings, and you've traveled quite a ways off your original route.

But you're all still alive.`] }),
  outcome: new SceneOutcome({
    affectLeader: [{ quality: LEQ.LIFE, change: -10 }],
    changeLocation: { percentage: 10 },
  })
});

export { nnScenes, nnSceneTexts, nnSceneActions };