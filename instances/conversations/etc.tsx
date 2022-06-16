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

let etcConversations: { [name: string] : Conversation } = {};
let etcConvoStatements: { [name: string] : ConversationStatement } = {};
let etcConvoResponses: { [name: string] : ConversationResponse } = {};
let etcConvoNarrations: { [name: string] : ConversationNarration } = {};

etcConversations[FTU.A_SOILED_YET_SHINING_GOWN] = new Conversation({
  name: FTU.A_SOILED_YET_SHINING_GOWN,
  title: 'An Shining, yet Soiled Figure',
  partnerKind: 'person', partnerType: PEOPLE.TOURMALINE_JEWELER,
  statementName: FTU.A_SOILED_YET_SHINING_GOWN + ' - s0',
  repeatable: false,
  daily: false,
  weight: 0,
  available: () => ( false )
});
etcConvoStatements[FTU.A_SOILED_YET_SHINING_GOWN + ' - s0'] = new ConversationStatement({
  name: FTU.A_SOILED_YET_SHINING_GOWN + ' - s0',
  partnerKind: 'person', partnerType: PEOPLE.TOURMALINE_JEWELER,
  text: `I've been journeying through this area, seeking a rumoured town rising in popularity. I've had no luck finding it whatsoever, and to sour my day further my camel took a poor turn and dropped me, ruining my fourth-finest riding dress.`,
  responseNames: [FTU.A_SOILED_YET_SHINING_GOWN + ' - r0c', FTU.A_SOILED_YET_SHINING_GOWN + ' - r0a',
    FTU.A_SOILED_YET_SHINING_GOWN + ' - r0h']
});
etcConvoResponses[FTU.A_SOILED_YET_SHINING_GOWN + ' - r0c'] = new ConversationResponse({
  name: FTU.A_SOILED_YET_SHINING_GOWN + ' - r0c',
  textIntro: `How can I help?`,
  text: `How can I help?`,
  statementName: FTU.A_SOILED_YET_SHINING_GOWN + ' - s1c',
  speechType: 'Calm'
});
etcConvoStatements[FTU.A_SOILED_YET_SHINING_GOWN + ' - s1c'] = new ConversationStatement({
  name: FTU.A_SOILED_YET_SHINING_GOWN + ' - s1c',
  partnerKind: 'person', partnerType: PEOPLE.TOURMALINE_JEWELER,
  text: `Good, good, the proper response to a lady of my station. Fetch supplies to mend my dress, and you will be richly rewarded.`,
  questsBegin: [QUESTS.NATIONS_TOURMALINE_JEWELERS]
});
etcConvoResponses[FTU.A_SOILED_YET_SHINING_GOWN + ' - r0a'] = new ConversationResponse({
  name: FTU.A_SOILED_YET_SHINING_GOWN + ' - r0a',
  textIntro: `You're standing on my foot.`,
  text: `You're standing on my foot.`,
  statementName: FTU.A_SOILED_YET_SHINING_GOWN + ' - s1a',
  speechType: 'Aggressive'
});
etcConvoStatements[FTU.A_SOILED_YET_SHINING_GOWN + ' - s1a'] = new ConversationStatement({
  name: FTU.A_SOILED_YET_SHINING_GOWN + ' - s1a',
  partnerKind: 'person', partnerType: PEOPLE.TOURMALINE_JEWELER,
  text: `And I'm sure your foot feels suitably honored. Quickly, fetch supplies to mend my dress, and you will be richly rewarded.`,
  questsBegin: [QUESTS.NATIONS_TOURMALINE_JEWELERS]
});
etcConvoResponses[FTU.A_SOILED_YET_SHINING_GOWN + ' - r0h'] = new ConversationResponse({
  name: FTU.A_SOILED_YET_SHINING_GOWN + ' - r0h',
  textIntro: `Your discomfort here must be unbearable.`,
  text: `Your discomfort here must be unbearable.`,
  statementName: FTU.A_SOILED_YET_SHINING_GOWN + ' - s1h',
  speechType: 'Humorous'
});
etcConvoStatements[FTU.A_SOILED_YET_SHINING_GOWN + ' - s1h'] = new ConversationStatement({
  name: FTU.A_SOILED_YET_SHINING_GOWN + ' - s1h',
  partnerKind: 'person', partnerType: PEOPLE.TOURMALINE_JEWELER,
  text: `It is indeed; the simplest fool would understand that. Fetch supplies to mend my dress, and I will consider ignoring the impertinent tone of that remark.`,
  questsBegin: [QUESTS.NATIONS_TOURMALINE_JEWELERS]
});

/*
xxxConversations[CVS.XXX_CONVO_NAME] = new Conversation({
  name: CVS.XXX_CONVO_NAME,
  title: 'Getting Serious',
  partnerKind: 'leader', partnerType: LEADER_TYPES.LEADER_NAME,
  statementName: CVS.XXX_CONVO_NAME + ' - s0',
  repeatable: false,
  daily: false,
  weight: 1000,
  available: (gState: GameState, conversation: Conversation) => (true)
});
xxxConvoStatements[CVS.XXX_CONVO_NAME + ' - s0'] = new ConversationStatement({
  name: CVS.XXX_CONVO_NAME + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.LEADER_NAME,
  text: `STATEMENT TEXT!!!`,
  responseNames: [CVS.XXX_CONVO_NAME + ' - r0c',
    CVS.XXX_CONVO_NAME + ' - r0a', CVS.XXX_CONVO_NAME + ' - r0h']
});
xxxConvoResponses[CVS.XXX_CONVO_NAME + ' - r0c'] = new ConversationResponse({
  name: CVS.XXX_CONVO_NAME + ' - r0c',
  textIntro: `CALM RESPONSE INTRO!!!`,
  text: `CALM RESPONSE TEXT!!!`,
  statementName: CVS.XXX_CONVO_NAME + ' - s1c',
  speechType: 'Calm'
});
xxxConvoStatements[CVS.XXX_CONVO_NAME + ' - s1c'] = new ConversationStatement({
  name: CVS.XXX_CONVO_NAME + ' - s1c',
  partnerKind: 'leader', partnerType: LEADER_TYPES.LEADER_NAME,
  text: `CALM FOLLOWING STATEMENT!!!`,
  gainResources: [{specificity: RSP.EXACT, type: RTY.A_RESOURCE, value: 1}],
  leaderJoins: LEADER_TYPES.A_LEADER,
  questsBegin: [QUESTS.A_QUEST],
  completeResearch: [RESEARCHES.A_RESEARCH]
});
xxxConvoResponses[CVS.XXX_CONVO_NAME + ' - r0a'] = new ConversationResponse({
  name: CVS.XXX_CONVO_NAME + ' - r0a',
  textIntro: `AGGRESSIVE RESPONSE INTRO!!!`,
  text: `AGGRESSIVE RESPONSE TEXT!!!`,
  statementName: CVS.XXX_CONVO_NAME + ' - s1a',
  speechType: 'Aggressive'
});
xxxConvoStatements[CVS.XXX_CONVO_NAME + ' - s1a'] = new ConversationStatement({
  name: CVS.XXX_CONVO_NAME + ' - s1a',
  partnerKind: 'leader', partnerType: LEADER_TYPES.LEADER_NAME,
  text: `AGGRESSIVE FOLLOWING STATEMENT!!!`,
  gainResources: [{specificity: RSP.EXACT, type: RTY.A_RESOURCE, value: 1}],
  leaderJoins: LEADER_TYPES.A_LEADER,
  questsBegin: [QUESTS.A_QUEST],
  completeResearch: [RESEARCHES.A_RESEARCH]
});
xxxConvoResponses[CVS.XXX_CONVO_NAME + ' - r0h'] = new ConversationResponse({
  name: CVS.XXX_CONVO_NAME + ' - r0h',
  textIntro: `HUMOROUS RESPONSE INTRO!!!`,
  text: `HUMOROUS RESPONSE TEXT!!!`,
  statementName: CVS.XXX_CONVO_NAME + ' - s1h',
  speechType: 'Humorous'
});
xxxConvoStatements[CVS.XXX_CONVO_NAME + ' - s1h'] = new ConversationStatement({
  name: CVS.XXX_CONVO_NAME + ' - s1h',
  partnerKind: 'leader', partnerType: LEADER_TYPES.LEADER_NAME,
  text: `HUMOROUS FOLLOWING STATEMENT!!!`,
  gainResources: [{specificity: RSP.EXACT, type: RTY.A_RESOURCE, value: 1}],
  leaderJoins: LEADER_TYPES.A_LEADER,
  questsBegin: [QUESTS.A_QUEST],
  completeResearch: [RESEARCHES.A_RESEARCH]
});
*/

/*
N: A figure bearing a heavy pack and leading a long line of Dromedaries approaches your town. Both the figure and the animals sway as they walk, like trees in the wind.
N (after first): The Dromedarian return again, alone but for the long procession of animals.
D: Hello there, young one. I hear you have need for a ride through the desert, for beasts of burden to carry water and wares? There is no finer creature than the Dromedary: look upon its noble hump, its spreading feet, its hooded eye! The price is high for such admirable beasts, but how could it be else? Tell me, what are you most able to supply?
D (after first): Finding the dromedaries equal to your needs? A question that needs no answer; without them travel through the desert is impossible. And naturally you require more, correct? Another unnecessary question. What are you best able to supply this time?

Y: Food and drink.
D: Well enough. We have a need for salted Provisions, neatly wrapped in Papyrus and ready for travel. Provide this and ten worthy Dromedaries will be yours.

Y: Luxuries.
D: Indeed? We have a need for spun Linen and Crude Needles for tailoring. Provide this and ten worthy Dromedaries will be yours.

Y: Tools of knowledge.
D: Very good. We have a need for precision Gearwork, with accompanying Field Notes documenting their use. Provide this and ten worthy Dromedaries will be yours.
*/

/*
D: Pleasant days, young one. You have a question for me?

C: How can you be the only Dromedary breeders in the Endless Desert?
D: Not hoarded tools or secret knowledge, as I can see you suspect. These are delicate animals when bearing young, and we are the only people with sufficient insight and gentleness to care for them properly. You'd like more of them now, natually. What are you best able to provide?

A: Nope. I just want more Dromedaries.
D: As you wish, to business. What are you best able to provide?

H: All the Dromedaries you sell are male... Quite a coincidence, don't you think?
D: I'm certain I don't know what you're implying. Think hard on weather you want our relationship to be friendly or adversarial. The choice is yours. Now, business. What do you wish to provide?

Y: Food and drink.
D: Well enough. We have a need for crisp, freshly brewed Beer sealed in Earthenware jars. Provide this and ten noble Dromedaries will be yours.

Y: Luxuries.
D: Indeed? We have a need for Olive Oil, cleanly pressed and ready for transport in Ashware jars. Provide this and ten noble Dromedaries will be yours.

Y: Tools of knowledge.
D: Very good. We have a need for finely ground glass Lenses, and Torches by which to use them in nighttime study. Provide this and ten noble Dromedaries will be yours.
*/

/*
D: Tell me young one, have you traveled to the south? There is a wadi where once lived a tribe of Dromedary breeders, many ages ago. You must tell me if you find it, I would greatly desire to see any past examples of our ancient art.

Now, you desire more of the noblest of all beasts? Naturally you do. What are you best able to supply us?

Y: Food and drink.
D: Well enough. We have a need for Wine, decanted and bottled into Glassware. Provide this and ten most excellent Dromedaries will be yours.

Y: Luxuries.
D: Indeed? We have a need for Ferrous Ink to be eventually dried and used as kohl, and stored in Faience vases. Provide this and ten most excellent Dromedaries will be yours.

Y: Tools of knowledge.
D: Very good. We have a need for Float Glass of crystal clarity, and Abrasive with which to grind it. Provide this and ten most excellent Dromedaries will be yours.
*/

export { etcConversations, etcConvoStatements, etcConvoResponses, etcConvoNarrations }
