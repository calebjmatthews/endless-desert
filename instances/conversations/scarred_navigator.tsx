import { Conversation, ConversationStatement, ConversationResponse,
  ConversationNarration, dailyConversationUsed } from '../../models/conversation';
import Leader from '../../models/leader';
import Icon from '../../models/icon';
import { GameState } from '../../models/game_state';
import { CONVERSATIONS } from '../../enums/conversations';
const CVS = CONVERSATIONS;
import { FORTUITIES } from '../../enums/fortuities';
const FTU = FORTUITIES;
import { LEADER_TYPES } from '../../enums/leader_types';
import { RESOURCE_SPECIFICITY } from '../../enums/resource_specificity';
const RSP = RESOURCE_SPECIFICITY;
import { RESOURCE_TYPES } from '../../enums/resource_types';
const RTY = RESOURCE_TYPES;
import { RESOURCE_TAGS } from '../../enums/resource_tags';
const RTA = RESOURCE_TAGS;
import { RESOURCE_SUBCATEGORIES } from '../../enums/resource_subcategories';
const RSC = RESOURCE_SUBCATEGORIES;
import { EQUIPMENT_TYPES } from '../../enums/equipment_types';
const EQT = EQUIPMENT_TYPES;
import { QUESTS } from '../../enums/quests';

let scnConversations: { [name: string] : Conversation } = {};
let scnConvoStatements: { [name: string] : ConversationStatement } = {};
let scnConvoResponses: { [name: string] : ConversationResponse } = {};
let scnConvoNarrations: { [name: string] : ConversationNarration } = {};

scnConversations[CVS.SCN_SAYING_HELLO] = new Conversation({
  name: CVS.SCN_SAYING_HELLO,
  title: 'Saying Hello',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SCARRED_NAVIGATOR,
  statementName: CVS.SCN_SAYING_HELLO + ' - s0',
  repeatable: true,
  daily: false,
  weight: 0,
  available: () => ( true )
});
scnConvoStatements[CVS.SCN_SAYING_HELLO + ' - s0'] = new ConversationStatement({
  name: CVS.SCN_SAYING_HELLO + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SCARRED_NAVIGATOR,
  text: `Hello. Sorry, I'm not exactly in the mood for casual conversation.`
});

scnConversations[FTU.LIMPING_FIGURE] = new Conversation({
  name: FTU.LIMPING_FIGURE,
  title: 'A Limping Figure',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SCARRED_NAVIGATOR,
  statementName: FTU.LIMPING_FIGURE + ' - s0',
  repeatable: false,
  daily: false,
  weight: 0,
  available: () => ( false )
});
scnConvoStatements[FTU.LIMPING_FIGURE + ' - s0'] = new ConversationStatement({
  name: FTU.LIMPING_FIGURE + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SCARRED_NAVIGATOR,
  text: `Yes, I know how I look. That's the way it works in the Red Crows: if you want anyone to take you seriously you have to back up your words. Not long ago I could have sent any of these whelps sprawling, but I guess my age is beginning to show.`,
  responseNames: [FTU.LIMPING_FIGURE + ' - r0p', FTU.LIMPING_FIGURE + ' - r0r',
    FTU.LIMPING_FIGURE + ' - r0s']
});
scnConvoResponses[FTU.LIMPING_FIGURE + ' - r0p'] = new ConversationResponse({
  name: FTU.LIMPING_FIGURE + ' - r0p',
  textIntro: `Could you talk through it?`,
  text: `Could you talk through it? The Crows ought to respect your experience by now.`,
  statementName: FTU.LIMPING_FIGURE + ' - s1p',
  speechType: 'Calm'
});
scnConvoStatements[FTU.LIMPING_FIGURE + ' - s1p'] = new ConversationStatement({
  name: FTU.LIMPING_FIGURE + ' - s1p',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SCARRED_NAVIGATOR,
  text: `Hahaha! "Talk through it?" You don't know what you're on about. Remind me to come to you the next time I need to work out a quarrel between children.`
});
scnConvoResponses[FTU.LIMPING_FIGURE + ' - r0r'] = new ConversationResponse({
  name: FTU.LIMPING_FIGURE + ' - r0r',
  textIntro: `I'll back you up. I have a mattock and know how to swing it.`,
  text: `I'll back you up. I have a mattock and know how to swing it.`,
  statementName: FTU.LIMPING_FIGURE + ' - s1r',
  speechType: 'Aggressive',
  cost: [{specificity: RSP.EXACT, type: EQT.ROUGH_MATTOCK + ' (U)', quantity: 1}]
});
scnConvoStatements[FTU.LIMPING_FIGURE + ' - s1r'] = new ConversationStatement({
  name: FTU.LIMPING_FIGURE + ' - s1r',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SCARRED_NAVIGATOR,
  text: `You would, would you? You'd get yourself beat half to death, of course, but I can see if your eyes that you mean it. Great skies, what am I doing with the Crows these days? They're just waiting until I'm too old to guard my own.

Better to stay here, no question. If you would have us, my crew and I are yours. Although I'm keeping that mattock.`,
  leaderJoins: LEADER_TYPES.SCARRED_NAVIGATOR

});
scnConvoResponses[FTU.LIMPING_FIGURE + ' - r0s'] = new ConversationResponse({
  name: FTU.LIMPING_FIGURE + ' - r0s',
  textIntro: `Bring a cane, next time.`,
  text: `Bring a cane, next time.`,
  statementName: FTU.LIMPING_FIGURE + ' - s1s',
});
scnConvoStatements[FTU.LIMPING_FIGURE + ' - s1s'] = new ConversationStatement({
  name: FTU.LIMPING_FIGURE + ' - s1s',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SCARRED_NAVIGATOR,
  text: `Hahaha, Go kick sand, you lout! Although I take your point well enough; does no good to mope about like my best days are behind me. I ought to be better than that.`
});

scnConversations[CVS.SCN_WATER_EARTH] = new Conversation({
  name: CVS.SCN_WATER_EARTH,
  title: 'Scarred Navigator: Water and Earth',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SCARRED_NAVIGATOR,
  statementName: CVS.SCN_WATER_EARTH + ' - s0',
  repeatable: false,
  daily: false,
  weight: 1000,
  available: (gState: GameState, conversation: Conversation) => (false)
});
scnConvoStatements[CVS.SCN_WATER_EARTH + ' - s0'] = new ConversationStatement({
  name: CVS.SCN_WATER_EARTH + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SCARRED_NAVIGATOR,
  text: `G'day, there. Do you or your town have any stores of Wood? I can see clearly enough there's no forest-worthy land around here, but perhaps others have traded it to you over time. Our ships are in constant need of good lumber for repairs, and I've got a range of tools I'd offer in trade.`,
  responseNames: [CVS.SCN_WATER_EARTH + ' - r0p',
    CVS.SCN_WATER_EARTH + ' - r0r', CVS.SCN_WATER_EARTH + ' - r0s']
});
scnConvoResponses[CVS.SCN_WATER_EARTH + ' - r0p'] = new ConversationResponse({
  name: CVS.SCN_WATER_EARTH + ' - r0p',
  textIntro: `Do you have anything to keep a Cistern watertight?`,
  text: `Do you have anything to keep a Cistern watertight?`,
  statementName: CVS.SCN_WATER_EARTH + ' - s1p'
});
scnConvoStatements[CVS.SCN_WATER_EARTH + ' - s1p'] = new ConversationStatement({
  name: CVS.SCN_WATER_EARTH + ' - s1p',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SCARRED_NAVIGATOR,
  text: `Sure do, we've mad an art of sealing hulls with pitch. One hundred bundles of Wood and it's yours.`,
  questsBegin: [QUESTS.SIMPLE_TOOLS_POT_OF_SEALANT_PITCH]
});
scnConvoResponses[CVS.SCN_WATER_EARTH + ' - r0r'] = new ConversationResponse({
  name: CVS.SCN_WATER_EARTH + ' - r0r',
  textIntro: `How about something to help grow Reeds?`,
  text: `How about something to help grow Reeds?`,
  statementName: CVS.SCN_WATER_EARTH + ' - s1r'
});
scnConvoStatements[CVS.SCN_WATER_EARTH + ' - s1r'] = new ConversationStatement({
  name: CVS.SCN_WATER_EARTH + ' - s1r',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SCARRED_NAVIGATOR,
  text: `Yeah, tending Reeds can be slow, muddy work. I've got a specially made Rake made by peoples farther up the All-River, one hundred bundles of Wood and it's yours.`,
  questsBegin: [QUESTS.SIMPLE_TOOLS_REED_MUCK_RAKE]
});
scnConvoResponses[CVS.SCN_WATER_EARTH + ' - r0s'] = new ConversationResponse({
  name: CVS.SCN_WATER_EARTH + ' - r0s',
  textIntro: `I could use something for shoveling Clay.`,
  text: `I could use something for shoveling Clay.`,
  statementName: CVS.SCN_WATER_EARTH + ' - s1s'
});
scnConvoStatements[CVS.SCN_WATER_EARTH + ' - s1s'] = new ConversationStatement({
  name: CVS.SCN_WATER_EARTH + ' - s1s',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SCARRED_NAVIGATOR,
  text: `The clay soil in these parts crumbles easily, doesn't it? I've got a Spade made to cup it together, and for one hundred bundles of Wood it's yours.`,
  questsBegin: [QUESTS.SIMPLE_TOOLS_CLAY_SPADE_BROAD]
});

scnConversations[CVS.SCN_FIRE_LEAVES] = new Conversation({
  name: CVS.SCN_FIRE_LEAVES,
  title: 'Scarred Navigator: Fire and Leaves',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SCARRED_NAVIGATOR,
  statementName: CVS.SCN_FIRE_LEAVES + ' - s0',
  repeatable: false,
  daily: false,
  weight: 1000,
  available: (gState: GameState, conversation: Conversation) => (false)
});
scnConvoStatements[CVS.SCN_FIRE_LEAVES + ' - s0'] = new ConversationStatement({
  name: CVS.SCN_FIRE_LEAVES + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SCARRED_NAVIGATOR,
  text: `Hello again! Your town's been great for Wood so far, certainly better than I expected! I hope you're ready with more. I have tools to provide in exchange, naturally.`,
  responseNames: [CVS.SCN_FIRE_LEAVES + ' - r0f',
    CVS.SCN_FIRE_LEAVES + ' - r0t', CVS.SCN_FIRE_LEAVES + ' - r0o']
});
scnConvoResponses[CVS.SCN_FIRE_LEAVES + ' - r0f'] = new ConversationResponse({
  name: CVS.SCN_FIRE_LEAVES + ' - r0f',
  textIntro: `Do you have anything for charring Wood quickly?`,
  text: `Do you have anything for charring Wood quickly?`,
  statementName: CVS.SCN_FIRE_LEAVES + ' - s1f'
});
scnConvoStatements[CVS.SCN_FIRE_LEAVES + ' - s1f'] = new ConversationStatement({
  name: CVS.SCN_FIRE_LEAVES + ' - s1f',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SCARRED_NAVIGATOR,
  text: `The Charcoal burners among Alabaster's Edificiers use this set of Bellows that creates a powerful stream of air. For two hundred bundles of wood, it's yours.`,
  questsBegin: [QUESTS.SIMPLE_TOOLS_CHAR_BELLOWS_FERVENT]
});
scnConvoResponses[CVS.SCN_FIRE_LEAVES + ' - r0t'] = new ConversationResponse({
  name: CVS.SCN_FIRE_LEAVES + ' - r0t',
  textIntro: `How about something to create higher quality Charcoal?`,
  text: `How about something to create higher quality Charcoal?`,
  statementName: CVS.SCN_FIRE_LEAVES + ' - s1t'
});
scnConvoStatements[CVS.SCN_FIRE_LEAVES + ' - s1t'] = new ConversationStatement({
  name: CVS.SCN_FIRE_LEAVES + ' - s1t',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SCARRED_NAVIGATOR,
  text: `The Charcoal burners among Alabaster's Edificiers use this set of Bellows that creates a carefully controlled stream of air. For two hundred bundles of wood, it's yours.`,
  questsBegin: [QUESTS.SIMPLE_TOOLS_CHAR_BELLOWS_TEMPERATE]
});
scnConvoResponses[CVS.SCN_FIRE_LEAVES + ' - r0o'] = new ConversationResponse({
  name: CVS.SCN_FIRE_LEAVES + ' - r0o',
  textIntro: `I could use something for tending Olive trees.`,
  text: `I could use something for tending Olive trees.`,
  statementName: CVS.SCN_FIRE_LEAVES + ' - s1o'
});
scnConvoStatements[CVS.SCN_FIRE_LEAVES + ' - s1o'] = new ConversationStatement({
  name: CVS.SCN_FIRE_LEAVES + ' - s1o',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SCARRED_NAVIGATOR,
  text: `Alabaster's Keepers of the Hanging Gardens use these Shears to tend Olive trees without damaging them. For two hundred bundles of wood, they're yours.`,
  questsBegin: [QUESTS.SIMPLE_TOOLS_OLIVE_GRAFTING_SHEARS]
});

export { scnConversations, scnConvoStatements, scnConvoResponses, scnConvoNarrations }
