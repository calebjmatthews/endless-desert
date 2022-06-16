import { Conversation, ConversationStatement, ConversationResponse,
  ConversationNarration, dailyConversationUsed } from '../../models/conversation';
import Icon from '../../models/icon';
import { GameState } from '../../models/game_state';
import { CONVERSATIONS } from '../../enums/conversations';
const CVS = CONVERSATIONS;
import { FORTUITIES } from '../../enums/fortuities';
const FTU = FORTUITIES;
import { PEOPLE } from '../../enums/people';
import { RESOURCE_SPECIFICITY } from '../../enums/resource_specificity';
const RSP = RESOURCE_SPECIFICITY;
import { RESOURCE_TYPES } from '../../enums/resource_types';
const RTY = RESOURCE_TYPES;
import { RESOURCE_TAGS } from '../../enums/resource_tags';
const RTA = RESOURCE_TAGS;
import { RESOURCE_SUBCATEGORIES } from '../../enums/resource_subcategories';
const RSC = RESOURCE_SUBCATEGORIES;
import { SVGS } from '../../enums/svgs';
import { QUESTS } from '../../enums/quests';

let droConversations: { [name: string] : Conversation } = {};
let droConvoStatements: { [name: string] : ConversationStatement } = {};
let droConvoResponses: { [name: string] : ConversationResponse } = {};
let droConvoNarrations: { [name: string] : ConversationNarration } = {};

droConversations[CVS.DRO_THE_NOBLE_DROMEDARY] = new Conversation({
  name: CVS.DRO_THE_NOBLE_DROMEDARY,
  title: 'The Noble Dromedary',
  partnerKind: 'person', partnerType: PEOPLE.DROMEDARIAN,
  narrationName: CVS.DRO_THE_NOBLE_DROMEDARY + ' - n0',
  repeatable: false,
  daily: false,
  weight: 1000,
  available: () => (false)
});
droConvoNarrations[CVS.DRO_THE_NOBLE_DROMEDARY + ' - n0'] = new ConversationNarration({
  name: CVS.DRO_THE_NOBLE_DROMEDARY + ' - n0',
  text: `A figure bearing a heavy pack and leading a long line of Dromedaries approaches your town. Both the figure and the animals sway as they walk, like trees in the wind.`,
  statementName: CVS.DRO_THE_NOBLE_DROMEDARY + ' - s0'
});
droConvoStatements[CVS.DRO_THE_NOBLE_DROMEDARY + ' - s0'] = new ConversationStatement({
  name: CVS.DRO_THE_NOBLE_DROMEDARY + ' - s0',
  partnerKind: 'person', partnerType: PEOPLE.DROMEDARIAN,
  text: `Hello there, young one. I hear you have need for a ride through the desert, for beasts of burden to carry water and wares? There is no finer creature than the Dromedary: look upon its noble hump, its spreading feet, its hooded eye! The price is high for such admirable beasts, but how could it be else? Tell me, what are you most able to supply?`,
  responseNames: [CVS.DRO_THE_NOBLE_DROMEDARY + ' - r0f',
    CVS.DRO_THE_NOBLE_DROMEDARY + ' - r0l', CVS.DRO_THE_NOBLE_DROMEDARY + ' - r0k']
});
droConvoResponses[CVS.DRO_THE_NOBLE_DROMEDARY + ' - r0f'] = new ConversationResponse({
  name: CVS.DRO_THE_NOBLE_DROMEDARY + ' - r0f',
  textIntro: `Food and drink.`,
  text: `Food and drink.`,
  statementName: CVS.DRO_THE_NOBLE_DROMEDARY + ' - s1f',
  available: ((gState: GameState) =>
    (!gState.questStatus?.quests[QUESTS.DROMEDARIES_RATIONS]
      && !gState.questStatus?.questsCompleted[QUESTS.DROMEDARIES_RATIONS])
  )
});
droConvoStatements[CVS.DRO_THE_NOBLE_DROMEDARY + ' - s1f'] = new ConversationStatement({
  name: CVS.DRO_THE_NOBLE_DROMEDARY + ' - s1f',
  partnerKind: 'person', partnerType: PEOPLE.DROMEDARIAN,
  text: `Well enough. We have a need for salted Provisions, neatly wrapped in Papyrus and ready for travel. Provide this and ten worthy Dromedaries will be yours.`,
  questsBegin: [QUESTS.DROMEDARIES_RATIONS]
});
droConvoResponses[CVS.DRO_THE_NOBLE_DROMEDARY + ' - r0l'] = new ConversationResponse({
  name: CVS.DRO_THE_NOBLE_DROMEDARY + ' - r0l',
  textIntro: `Luxuries.`,
  text: `Luxuries.`,
  statementName: CVS.DRO_THE_NOBLE_DROMEDARY + ' - s1l',
  available: ((gState: GameState) =>
    (!gState.questStatus?.quests[QUESTS.DROMEDARIES_LINEN]
      && !gState.questStatus?.questsCompleted[QUESTS.DROMEDARIES_LINEN])
  )
});
droConvoStatements[CVS.DRO_THE_NOBLE_DROMEDARY + ' - s1l'] = new ConversationStatement({
  name: CVS.DRO_THE_NOBLE_DROMEDARY + ' - s1l',
  partnerKind: 'person', partnerType: PEOPLE.DROMEDARIAN,
  text: `Indeed? We have a need for spun Linen and Crude Needles for tailoring. Provide this and ten worthy Dromedaries will be yours.`,
  questsBegin: [QUESTS.DROMEDARIES_LINEN]
});
droConvoResponses[CVS.DRO_THE_NOBLE_DROMEDARY + ' - r0k'] = new ConversationResponse({
  name: CVS.DRO_THE_NOBLE_DROMEDARY + ' - r0k',
  textIntro: `Tools of knowledge.`,
  text: `Tools of knowledge.`,
  statementName: CVS.DRO_THE_NOBLE_DROMEDARY + ' - s1k',
  available: ((gState: GameState) =>
    (!gState.questStatus?.quests[QUESTS.DROMEDARIES_GEARWORK]
      && !gState.questStatus?.questsCompleted[QUESTS.DROMEDARIES_GEARWORK])
  )
});
droConvoStatements[CVS.DRO_THE_NOBLE_DROMEDARY + ' - s1k'] = new ConversationStatement({
  name: CVS.DRO_THE_NOBLE_DROMEDARY + ' - s1k',
  partnerKind: 'person', partnerType: PEOPLE.DROMEDARIAN,
  text: `Very good. We have a need for precision Gearwork, with accompanying Field Notes documenting their use. Provide this and ten worthy Dromedaries will be yours.`,
  questsBegin: [QUESTS.DROMEDARIES_GEARWORK]
});

droConversations[CVS.DRO_BARTERING_DROMEDARY] = new Conversation({
  name: CVS.DRO_BARTERING_DROMEDARY,
  title: 'Bartering for Dromedaries',
  partnerKind: 'person', partnerType: PEOPLE.DROMEDARIAN,
  narrationName: CVS.DRO_BARTERING_DROMEDARY + ' - n0',
  repeatable: false,
  daily: false,
  weight: 1000,
  available: () => (false)
});
droConvoNarrations[CVS.DRO_BARTERING_DROMEDARY + ' - n0'] = new ConversationNarration({
  name: CVS.DRO_BARTERING_DROMEDARY + ' - n0',
  text: `The Dromedarian return again, alone but for the long procession of animals.`,
  statementName: CVS.DRO_BARTERING_DROMEDARY + ' - s0'
});
droConvoStatements[CVS.DRO_BARTERING_DROMEDARY + ' - s0'] = new ConversationStatement({
  name: CVS.DRO_BARTERING_DROMEDARY + ' - s0',
  partnerKind: 'person', partnerType: PEOPLE.DROMEDARIAN,
  text: `Finding the dromedaries equal to your needs? A question that needs no answer; without them travel through the desert is impossible. And naturally you require more, correct? Another unnecessary question. What are you best able to supply this time?`,
  responseNames: [CVS.DRO_BARTERING_DROMEDARY + ' - r0f',
    CVS.DRO_BARTERING_DROMEDARY + ' - r0l', CVS.DRO_BARTERING_DROMEDARY + ' - r0k']
});
droConvoResponses[CVS.DRO_BARTERING_DROMEDARY + ' - r0f'] = new ConversationResponse({
  name: CVS.DRO_BARTERING_DROMEDARY + ' - r0f',
  textIntro: `Food and drink.`,
  text: `Food and drink.`,
  statementName: CVS.DRO_BARTERING_DROMEDARY + ' - s1f',
  available: ((gState: GameState) =>
    (!gState.questStatus?.quests[QUESTS.DROMEDARIES_RATIONS]
      && !gState.questStatus?.questsCompleted[QUESTS.DROMEDARIES_RATIONS])
  )
});
droConvoStatements[CVS.DRO_BARTERING_DROMEDARY + ' - s1f'] = new ConversationStatement({
  name: CVS.DRO_BARTERING_DROMEDARY + ' - s1f',
  partnerKind: 'person', partnerType: PEOPLE.DROMEDARIAN,
  text: `Well enough. We have a need for salted Provisions, neatly wrapped in Papyrus and ready for travel. Provide this and ten worthy Dromedaries will be yours.`,
  questsBegin: [QUESTS.DROMEDARIES_RATIONS]
});
droConvoResponses[CVS.DRO_BARTERING_DROMEDARY + ' - r0l'] = new ConversationResponse({
  name: CVS.DRO_BARTERING_DROMEDARY + ' - r0l',
  textIntro: `Luxuries.`,
  text: `Luxuries.`,
  statementName: CVS.DRO_BARTERING_DROMEDARY + ' - s1l',
  available: ((gState: GameState) =>
    (!gState.questStatus?.quests[QUESTS.DROMEDARIES_LINEN]
      && !gState.questStatus?.questsCompleted[QUESTS.DROMEDARIES_LINEN])
  )
});
droConvoStatements[CVS.DRO_BARTERING_DROMEDARY + ' - s1l'] = new ConversationStatement({
  name: CVS.DRO_BARTERING_DROMEDARY + ' - s1l',
  partnerKind: 'person', partnerType: PEOPLE.DROMEDARIAN,
  text: `Indeed? We have a need for spun Linen and Crude Needles for tailoring. Provide this and ten worthy Dromedaries will be yours.`,
  questsBegin: [QUESTS.DROMEDARIES_LINEN]
});
droConvoResponses[CVS.DRO_BARTERING_DROMEDARY + ' - r0k'] = new ConversationResponse({
  name: CVS.DRO_BARTERING_DROMEDARY + ' - r0k',
  textIntro: `Tools of knowledge.`,
  text: `Tools of knowledge.`,
  statementName: CVS.DRO_BARTERING_DROMEDARY + ' - s1k',
  available: ((gState: GameState) =>
    (!gState.questStatus?.quests[QUESTS.DROMEDARIES_GEARWORK]
      && !gState.questStatus?.questsCompleted[QUESTS.DROMEDARIES_GEARWORK])
  )
});
droConvoStatements[CVS.DRO_BARTERING_DROMEDARY + ' - s1k'] = new ConversationStatement({
  name: CVS.DRO_BARTERING_DROMEDARY + ' - s1k',
  partnerKind: 'person', partnerType: PEOPLE.DROMEDARIAN,
  text: `Very good. We have a need for precision Gearwork, with accompanying Field Notes documenting their use. Provide this and ten worthy Dromedaries will be yours.`,
  questsBegin: [QUESTS.DROMEDARIES_GEARWORK]
});

droConversations[CVS.DRO_A_SUSPICION] = new Conversation({
  name: CVS.DRO_A_SUSPICION,
  title: 'A Suspicion of the Dromedarian',
  partnerKind: 'person', partnerType: PEOPLE.DROMEDARIAN,
  narrationName: CVS.DRO_A_SUSPICION + ' - n0',
  repeatable: false,
  daily: false,
  weight: 1000,
  available: () => (false)
});
droConvoNarrations[CVS.DRO_A_SUSPICION + ' - n0'] = new ConversationNarration({
  name: CVS.DRO_A_SUSPICION + ' - n0',
  text: `You spot the Dromedarian's return from far away, a slow swaying figure silhouetted against the sky.`,
  statementName: CVS.DRO_A_SUSPICION + ' - s0'
});
droConvoStatements[CVS.DRO_A_SUSPICION + ' - s0'] = new ConversationStatement({
  name: CVS.DRO_A_SUSPICION + ' - s0',
  partnerKind: 'person', partnerType: PEOPLE.DROMEDARIAN,
  text: `Pleasant days, young one. You have a question for me?`,
  responseNames: [CVS.DRO_A_SUSPICION + ' - r0c',
    CVS.DRO_A_SUSPICION + ' - r0a', CVS.DRO_A_SUSPICION + ' - r0h']
});
droConvoResponses[CVS.DRO_A_SUSPICION + ' - r0c'] = new ConversationResponse({
  name: CVS.DRO_A_SUSPICION + ' - r0c',
  textIntro: `How can you be the only Dromedary breeders?`,
  text: `How can you be the only Dromedary breeders in the Endless Desert?`,
  statementName: CVS.DRO_A_SUSPICION + ' - s1c',
});
droConvoStatements[CVS.DRO_A_SUSPICION + ' - s1c'] = new ConversationStatement({
  name: CVS.DRO_A_SUSPICION + ' - s1c',
  partnerKind: 'person', partnerType: PEOPLE.DROMEDARIAN,
  text: `Not hoarded tools or secret knowledge, as I can see you suspect. These are delicate animals when bearing young, and we are the only people with sufficient insight and gentleness to care for them properly. You'd like more of them now, natually. What are you best able to provide?`,
  responseNames: [CVS.DRO_A_SUSPICION + ' - r1f',
    CVS.DRO_A_SUSPICION + ' - r1l', CVS.DRO_A_SUSPICION + ' - r1k']
});
droConvoResponses[CVS.DRO_A_SUSPICION + ' - r0a'] = new ConversationResponse({
  name: CVS.DRO_A_SUSPICION + ' - r0a',
  textIntro: `Nope. I just want more Dromedaries.`,
  text: `Nope. I just want more Dromedaries.`,
  statementName: CVS.DRO_A_SUSPICION + ' - s1a',
});
droConvoStatements[CVS.DRO_A_SUSPICION + ' - s1a'] = new ConversationStatement({
  name: CVS.DRO_A_SUSPICION + ' - s1a',
  partnerKind: 'person', partnerType: PEOPLE.DROMEDARIAN,
  text: `Directly to business, an admirable attitude. What are you best able to provide?`,
  responseNames: [CVS.DRO_A_SUSPICION + ' - r1f',
    CVS.DRO_A_SUSPICION + ' - r1l', CVS.DRO_A_SUSPICION + ' - r1k']
});
droConvoResponses[CVS.DRO_A_SUSPICION + ' - r0h'] = new ConversationResponse({
  name: CVS.DRO_A_SUSPICION + ' - r0h',
  textIntro: `All the Dromedaries you sell are male...`,
  text: `All the Dromedaries you sell are male... Quite a coincidence, don't you think?`,
  statementName: CVS.DRO_A_SUSPICION + ' - s1h',
});
droConvoStatements[CVS.DRO_A_SUSPICION + ' - s1h'] = new ConversationStatement({
  name: CVS.DRO_A_SUSPICION + ' - s1h',
  partnerKind: 'person', partnerType: PEOPLE.DROMEDARIAN,
  text: `I'm certain I don't know what you're implying. Think hard on weather you want our relationship to be friendly or adversarial. The choice is yours, and if you want to continue buying noble beasts from us, isn't the choice obvious?

Now, to business. What do you wish to provide?`,
  responseNames: [CVS.DRO_A_SUSPICION + ' - r1f',
    CVS.DRO_A_SUSPICION + ' - r1l', CVS.DRO_A_SUSPICION + ' - r1k']
});
droConvoResponses[CVS.DRO_A_SUSPICION + ' - r1f'] = new ConversationResponse({
  name: CVS.DRO_A_SUSPICION + ' - r1f',
  textIntro: `Food and drink.`,
  text: `Food and drink.`,
  statementName: CVS.DRO_A_SUSPICION + ' - s2f',
  available: ((gState: GameState) =>
    (!gState.questStatus?.quests[QUESTS.DROMEDARIES_BEER]
      && !gState.questStatus?.questsCompleted[QUESTS.DROMEDARIES_BEER])
  )
});
droConvoStatements[CVS.DRO_A_SUSPICION + ' - s2f'] = new ConversationStatement({
  name: CVS.DRO_A_SUSPICION + ' - s2f',
  partnerKind: 'person', partnerType: PEOPLE.DROMEDARIAN,
  text: `Well enough. We have a need for crisp, freshly brewed Beer sealed in Terracotta jars. Provide this and ten noble Dromedaries will be yours.`,
  questsBegin: [QUESTS.DROMEDARIES_BEER]
});
droConvoResponses[CVS.DRO_A_SUSPICION + ' - r1l'] = new ConversationResponse({
  name: CVS.DRO_A_SUSPICION + ' - r1l',
  textIntro: `Luxuries.`,
  text: `Luxuries.`,
  statementName: CVS.DRO_A_SUSPICION + ' - s2l',
  available: ((gState: GameState) =>
    (!gState.questStatus?.quests[QUESTS.DROMEDARIES_OLIVE_OIL]
      && !gState.questStatus?.questsCompleted[QUESTS.DROMEDARIES_OLIVE_OIL])
  )
});
droConvoStatements[CVS.DRO_A_SUSPICION + ' - s2l'] = new ConversationStatement({
  name: CVS.DRO_A_SUSPICION + ' - s2l',
  partnerKind: 'person', partnerType: PEOPLE.DROMEDARIAN,
  text: `Indeed? We have a need for cleanly pressed Olive Oil, strained and transferred into Ashware vessels. Provide this and ten worthy Dromedaries will be yours.`,
  questsBegin: [QUESTS.DROMEDARIES_OLIVE_OIL]
});
droConvoResponses[CVS.DRO_A_SUSPICION + ' - r1k'] = new ConversationResponse({
  name: CVS.DRO_A_SUSPICION + ' - r1k',
  textIntro: `Tools of knowledge.`,
  text: `Tools of knowledge.`,
  statementName: CVS.DRO_A_SUSPICION + ' - s2k',
  available: ((gState: GameState) =>
    (!gState.questStatus?.quests[QUESTS.DROMEDARIES_LENSES]
      && !gState.questStatus?.questsCompleted[QUESTS.DROMEDARIES_LENSES])
  )
});
droConvoStatements[CVS.DRO_A_SUSPICION + ' - s2k'] = new ConversationStatement({
  name: CVS.DRO_A_SUSPICION + ' - s2k',
  partnerKind: 'person', partnerType: PEOPLE.DROMEDARIAN,
  text: `Very good. We have a need for finely ground glass Lenses, and Torches by which to use them in nighttime study. Provide this and ten noble Dromedaries will be yours.`,
  questsBegin: [QUESTS.DROMEDARIES_LENSES]
});

droConversations[CVS.DRO_SOUTHERN_WADI] = new Conversation({
  name: CVS.DRO_SOUTHERN_WADI,
  title: 'A Suspicion of the Dromedarian',
  partnerKind: 'person', partnerType: PEOPLE.DROMEDARIAN,
  narrationName: CVS.DRO_SOUTHERN_WADI + ' - n0',
  repeatable: false,
  daily: false,
  weight: 1000,
  available: () => (false)
});
droConvoNarrations[CVS.DRO_SOUTHERN_WADI + ' - n0'] = new ConversationNarration({
  name: CVS.DRO_SOUTHERN_WADI + ' - n0',
  text: `The now familiar figure of the Dromedarian approaches; the head of a line of moving forms that stretches into the distance.`,
  statementName: CVS.DRO_SOUTHERN_WADI + ' - s0'
});
droConvoStatements[CVS.DRO_SOUTHERN_WADI + ' - s0'] = new ConversationStatement({
  name: CVS.DRO_SOUTHERN_WADI + ' - s0',
  partnerKind: 'person', partnerType: PEOPLE.DROMEDARIAN,
  text: `Tell me young one, have you traveled to the south? There is a wadi where once lived a tribe of Dromedary breeders, many ages ago. You must tell me if you find it, I would greatly desire to see any past examples of our ancient art.

Now, you desire more of the noblest of all beasts? Naturally you do. What are you best able to supply us?`,
responseNames: [CVS.DRO_SOUTHERN_WADI + ' - r0f',
  CVS.DRO_SOUTHERN_WADI + ' - r0l', CVS.DRO_SOUTHERN_WADI + ' - r0k']
});
droConvoResponses[CVS.DRO_SOUTHERN_WADI + ' - r0f'] = new ConversationResponse({
name: CVS.DRO_SOUTHERN_WADI + ' - r0f',
textIntro: `Food and drink.`,
text: `Food and drink.`,
statementName: CVS.DRO_SOUTHERN_WADI + ' - s1f',
available: ((gState: GameState) =>
  (!gState.questStatus?.quests[QUESTS.DROMEDARIES_WINE]
    && !gState.questStatus?.questsCompleted[QUESTS.DROMEDARIES_WINE])
)
});
droConvoStatements[CVS.DRO_SOUTHERN_WADI + ' - s1f'] = new ConversationStatement({
name: CVS.DRO_SOUTHERN_WADI + ' - s1f',
partnerKind: 'person', partnerType: PEOPLE.DROMEDARIAN,
text: `Well enough. We have a need for Wine, decanted and bottled into Glassware. Provide this and ten most excellent Dromedaries will be yours.`,
questsBegin: [QUESTS.DROMEDARIES_WINE]
});
droConvoResponses[CVS.DRO_SOUTHERN_WADI + ' - r0l'] = new ConversationResponse({
name: CVS.DRO_SOUTHERN_WADI + ' - r0l',
textIntro: `Luxuries.`,
text: `Luxuries.`,
statementName: CVS.DRO_SOUTHERN_WADI + ' - s1l',
available: ((gState: GameState) =>
  (!gState.questStatus?.quests[QUESTS.DROMEDARIES_INK]
    && !gState.questStatus?.questsCompleted[QUESTS.DROMEDARIES_INK])
)
});
droConvoStatements[CVS.DRO_SOUTHERN_WADI + ' - s1l'] = new ConversationStatement({
name: CVS.DRO_SOUTHERN_WADI + ' - s1l',
partnerKind: 'person', partnerType: PEOPLE.DROMEDARIAN,
text: `Indeed? We have a need for Ferrous Ink to be eventually dried and used as kohl, and stored in Faience vases. Provide this and ten most excellent Dromedaries will be yours.`,
questsBegin: [QUESTS.DROMEDARIES_INK]
});
droConvoResponses[CVS.DRO_SOUTHERN_WADI + ' - r0k'] = new ConversationResponse({
name: CVS.DRO_SOUTHERN_WADI + ' - r0k',
textIntro: `Tools of knowledge.`,
text: `Tools of knowledge.`,
statementName: CVS.DRO_SOUTHERN_WADI + ' - s1k',
available: ((gState: GameState) =>
  (!gState.questStatus?.quests[QUESTS.DROMEDARIES_GLASS]
    && !gState.questStatus?.questsCompleted[QUESTS.DROMEDARIES_GLASS])
)
});
droConvoStatements[CVS.DRO_SOUTHERN_WADI + ' - s1k'] = new ConversationStatement({
name: CVS.DRO_SOUTHERN_WADI + ' - s1k',
partnerKind: 'person', partnerType: PEOPLE.DROMEDARIAN,
text: `Very good. We have a need for Float Glass of crystal clarity, and Abrasive with which to grind it. Provide this and ten most excellent Dromedaries will be yours.`,
questsBegin: [QUESTS.DROMEDARIES_GLASS]
});

export { droConversations, droConvoStatements, droConvoResponses, droConvoNarrations }
