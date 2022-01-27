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
import { SVGS } from '../../enums/svgs';
import { QUESTS } from '../../enums/quests';
import { RESEARCHES } from '../../enums/researches';

let ffhConversations: { [name: string] : Conversation } = {};
let ffhConvoStatements: { [name: string] : ConversationStatement } = {};
let ffhConvoResponses: { [name: string] : ConversationResponse } = {};
let ffhConvoNarrations: { [name: string] : ConversationNarration } = {};

ffhConversations[CVS.FFH_SAYING_HELLO] = new Conversation({
  name: CVS.FFH_SAYING_HELLO,
  title: 'Saying Hello',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  statementName: CVS.FFH_SAYING_HELLO + ' - s0',
  repeatable: true,
  daily: false,
  weight: 0,
  available: () => ( true )
});
ffhConvoStatements[CVS.FFH_SAYING_HELLO + ' - s0'] = new ConversationStatement({
  name: CVS.FFH_SAYING_HELLO + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  text: `Keeping safe, |me_prefix|? I, of all people, understand the drive to sate curiosity. But don't lose caution.`
});

ffhConversations[FTU.UNREPENTANT_FIGURE] = new Conversation({
  name: FTU.UNREPENTANT_FIGURE,
  title: 'An Unrepentant Figure',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  statementName: FTU.UNREPENTANT_FIGURE + ' - s0',
  repeatable: false,
  daily: false,
  weight: 0,
  available: () => ( false )
});
ffhConvoStatements[FTU.UNREPENTANT_FIGURE + ' - s0'] = new ConversationStatement({
  name: FTU.UNREPENTANT_FIGURE + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  text: `I and my disciples have been ejected from the Ascetics! They say we've forsaken our vows, but when did we vow willing ignorance? The knowledge, the truths, that they hide from their own eyes-- It cannot be tolerated!`,
  responseNames: [FTU.UNREPENTANT_FIGURE + ' - r0c', FTU.UNREPENTANT_FIGURE + ' - r0a',
    FTU.UNREPENTANT_FIGURE + ' - r0h']
});
ffhConvoResponses[FTU.UNREPENTANT_FIGURE + ' - r0c'] = new ConversationResponse({
  name: FTU.UNREPENTANT_FIGURE + ' - r0c',
  textIntro: `What truths do you mean?`,
  text: `What truths do you mean?`,
  statementName: FTU.UNREPENTANT_FIGURE + ' - s1c',
  speechType: 'Calm'
});
ffhConvoStatements[FTU.UNREPENTANT_FIGURE + ' - s1c'] = new ConversationStatement({
  name: FTU.UNREPENTANT_FIGURE + ' - s1c',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  text: `Dangerous truths to be sure, |me_prefix|. But I had not thought the Ascetics were lead by cowards.

  Regardless, anger will not feed or shelter us. We can till fields, raise buildings, and help animals to give birth, and we all will work hard. Allow us to stay.`,
  leaderJoins: LEADER_TYPES.FOXFIRE_HERETIC
});
ffhConvoResponses[FTU.UNREPENTANT_FIGURE + ' - r0a'] = new ConversationResponse({
  name: FTU.UNREPENTANT_FIGURE + ' - r0a',
  textIntro: `No one should turn their back on a companion.`,
  text: `No one should turn their back on a companion.`,
  statementName: FTU.UNREPENTANT_FIGURE + ' - s1a',
  speechType: 'Aggressive'
});
ffhConvoStatements[FTU.UNREPENTANT_FIGURE + ' - s1a'] = new ConversationStatement({
  name: FTU.UNREPENTANT_FIGURE + ' - s1a',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  text: `That's not what galls me. I thought we were united in our denial of the self and our pursuit of deeper meaning.

  Regardless, anger will not feed or shelter us. We can till fields, raise buildings, and help animals to give birth, and we all will work hard. Allow us to stay.`,
  leaderJoins: LEADER_TYPES.FOXFIRE_HERETIC
});
ffhConvoResponses[FTU.UNREPENTANT_FIGURE + ' - r0h'] = new ConversationResponse({
  name: FTU.UNREPENTANT_FIGURE + ' - r0h',
  textIntro: `Sounds like you didn't tolerate it.`,
  text: `Sounds like you didn't tolerate it.`,
  statementName: FTU.UNREPENTANT_FIGURE + ' - s1h',
  speechType: 'Humorous'
});
ffhConvoStatements[FTU.UNREPENTANT_FIGURE + ' - s1h'] = new ConversationStatement({
  name: FTU.UNREPENTANT_FIGURE + ' - s1h',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  text: `Haha, I did not, that is true. Sublety has never been a stength of mine, and this is what it has cost.

  My disciples and I are without food and shelter, because of my choices. We can till fields, raise buildings, and help animals to give birth, and we all will work hard. Allow us to stay.`,
  leaderJoins: LEADER_TYPES.FOXFIRE_HERETIC
});

ffhConversations[CVS.FFH_THRICE_LOCKED_TOME] = new Conversation({
  name: CVS.FFH_THRICE_LOCKED_TOME,
  title: 'A Thrice Locked Tome',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  statementName: CVS.FFH_THRICE_LOCKED_TOME + ' - s0',
  repeatable: false,
  daily: false,
  weight: 100,
  available: (gState: GameState) => {
    if (gState.vault?.resources[`${RTY.BROKEN_RED_KEY}|0`]) {
      if (gState.vault?.resources[`${RTY.BROKEN_RED_KEY}|0`].quantity >= 1) {
        return true;
      }
    }
    return false;
  }
});
ffhConvoStatements[CVS.FFH_THRICE_LOCKED_TOME + ' - s0'] = new ConversationStatement({
  name: CVS.FFH_THRICE_LOCKED_TOME + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  text: `Pleasant days, |me_prefix|. You look as if something occupies your mind.`,
  responseNames: [CVS.FFH_THRICE_LOCKED_TOME + ' - r0']
});
ffhConvoResponses[CVS.FFH_THRICE_LOCKED_TOME + ' - r0'] = new ConversationResponse({
  name: CVS.FFH_THRICE_LOCKED_TOME + ' - r0',
  textIntro: `Do you know what this is?`,
  text: `Actually, yes. Do you know what this is? I found it in the storage caverns below the town, and there's a broken key to match.`,
  statementName: CVS.FFH_THRICE_LOCKED_TOME + ' - s1',
  requirementIcon: new Icon({ provider: 'svg', name: SVGS.TOME }),
  requirementLabel: RTY.THRICE_LOCKED_TOME,
  available: () => ( true )
});
ffhConvoStatements[CVS.FFH_THRICE_LOCKED_TOME + ' - s1'] = new ConversationStatement({
  name: CVS.FFH_THRICE_LOCKED_TOME + ' - s1',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  text: `I've seen a tome like this once before, and opening it was a complicated affair. Both in the unlocking, and in what came afterwards. Please speak truly: why do you seek to do this?`,
  responseNames: [CVS.FFH_THRICE_LOCKED_TOME + ' - r1c', CVS.FFH_THRICE_LOCKED_TOME + ' - r1a', CVS.FFH_THRICE_LOCKED_TOME + ' - r1h']
});
ffhConvoResponses[CVS.FFH_THRICE_LOCKED_TOME + ' - r1c'] = new ConversationResponse({
  name: CVS.FFH_THRICE_LOCKED_TOME + ' - r1c',
  textIntro: `The people who lived here before...`,
  text: `The people who lived here before disappeared. There may be a danger in this town that we're totally unaware of. If it exists, I want to find it.`,
  statementName: CVS.FFH_THRICE_LOCKED_TOME + ' - s2c',
  speechType: 'Calm'
});
ffhConvoStatements[CVS.FFH_THRICE_LOCKED_TOME + ' - s2c'] = new ConversationStatement({
  name: CVS.FFH_THRICE_LOCKED_TOME + ' - s2c',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  text: `A noble reason, but there may be dangers that you will arouse whichever direction you step.`,
  responseNames: [CVS.FFH_THRICE_LOCKED_TOME + ' - r2']
});
ffhConvoResponses[CVS.FFH_THRICE_LOCKED_TOME + ' - r1a'] = new ConversationResponse({
  name: CVS.FFH_THRICE_LOCKED_TOME + ' - r1a',
  textIntro: `I don't need to explain myself.`,
  text: `I don't need to explain myself.`,
  statementName: CVS.FFH_THRICE_LOCKED_TOME + ' - s2a',
  speechType: 'Aggressive'
});
ffhConvoStatements[CVS.FFH_THRICE_LOCKED_TOME + ' - s2a'] = new ConversationStatement({
  name: CVS.FFH_THRICE_LOCKED_TOME + ' - s2a',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  text: `I did not mean to imply impure motives, and I apologize if I offended. Just know that there may be dangers that you will arouse whichever direction you step.`,
  responseNames: [CVS.FFH_THRICE_LOCKED_TOME + ' - r2']
});
ffhConvoResponses[CVS.FFH_THRICE_LOCKED_TOME + ' - r1h'] = new ConversationResponse({
  name: CVS.FFH_THRICE_LOCKED_TOME + ' - r1h',
  textIntro: `Simple curiosity!`,
  text: `Simple curiosity, if you must know! I think you understand how I feel.`,
  statementName: CVS.FFH_THRICE_LOCKED_TOME + ' - s2h',
  speechType: 'Humorous'
});
ffhConvoStatements[CVS.FFH_THRICE_LOCKED_TOME + ' - s2h'] = new ConversationStatement({
  name: CVS.FFH_THRICE_LOCKED_TOME + ' - s2h',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  text: `I certainly do. Perhaps too well, the seeking of knowledge is something I value highly. Simply know that there may be dangers that you will arouse whichever direction you step.`,
  responseNames: [CVS.FFH_THRICE_LOCKED_TOME + ' - r2']
});
ffhConvoResponses[CVS.FFH_THRICE_LOCKED_TOME + ' - r2'] = new ConversationResponse({
  name: CVS.FFH_THRICE_LOCKED_TOME + ' - r2',
  textIntro: `Will you help me?`,
  text: `It may be dangerous, but I want to open the book. Will you help me?`,
  statementName: CVS.FFH_THRICE_LOCKED_TOME + ' - s3',
});
ffhConvoStatements[CVS.FFH_THRICE_LOCKED_TOME + ' - s3'] = new ConversationStatement({
  name: CVS.FFH_THRICE_LOCKED_TOME + ' - s3',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  text: `Perhaps I should not, but... I will. I will help in every way I can.

During the last time I encountered a book like this, I did not assist in the repair of the keys, but I have some idea of what to try. We will need to analyze metals and compare their properties against the broken material. You will need a Furnace and some knowledge of combustion, if you haven't already.`,
  questsBegin: [QUESTS.MYSTICISM_A_THRICE_LOCKED_TOME,
    QUESTS.MYSTICISM_A_RUINED_RED_METAL]
});

ffhConversations[CVS.FFH_A_RUINED_RED_METAL] = new Conversation({
  name: CVS.FFH_A_RUINED_RED_METAL,
  title: 'A Ruined Red Metal',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  statementName: CVS.FFH_A_RUINED_RED_METAL + ' - s0',
  repeatable: false,
  daily: false,
  weight: 0,
  available: () => (false)
});
ffhConvoStatements[CVS.FFH_A_RUINED_RED_METAL + ' - s0'] = new ConversationStatement({
  name: CVS.FFH_A_RUINED_RED_METAL + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  text: `Excellent work, |me_prefix|. After watching you analyze those metals and some time spent in meditative work, I was able to fortunate enough to make a chunk of the red metal. It is mostly iron and copper smelted together in intense heat, combined with a precious light I kept from my days in the ascetics. I do not know how to find more.`,
  responseNames: [CVS.FFH_A_RUINED_RED_METAL + ' - r0c',
    CVS.FFH_A_RUINED_RED_METAL + ' - r0a', CVS.FFH_A_RUINED_RED_METAL + ' - r0h']
});
ffhConvoResponses[CVS.FFH_A_RUINED_RED_METAL + ' - r0c'] = new ConversationResponse({
  name: CVS.FFH_A_RUINED_RED_METAL + ' - r0c',
  textIntro: `Could you ask your former companions?`,
  text: `Could you ask your former companions?`,
  statementName: CVS.FFH_A_RUINED_RED_METAL + ' - s1c',
  speechType: 'Calm'
});
ffhConvoStatements[CVS.FFH_A_RUINED_RED_METAL + ' - s1c'] = new ConversationStatement({
  name: CVS.FFH_A_RUINED_RED_METAL + ' - s1c',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  text: `You misunderstand my situation. If I were to speak to any member of the ascetics, they would act as if I were not there. Such is the nature of my exile.

No, I will have to seek out a new source of otherworldly light on my own. Speak to me when you've gathered the metal powders and fuel.`,
questsBegin: [QUESTS.MYSTICISM_A_THRICE_LOCKED_TOME]
});
ffhConvoResponses[CVS.FFH_A_RUINED_RED_METAL + ' - r0a'] = new ConversationResponse({
  name: CVS.FFH_A_RUINED_RED_METAL + ' - r0a',
  textIntro: `I'll handle everything.`,
  text: `No need to worry. I'll handle everything.`,
  statementName: CVS.FFH_A_RUINED_RED_METAL + ' - s1a',
  speechType: 'Aggressive'
});
ffhConvoStatements[CVS.FFH_A_RUINED_RED_METAL + ' - s1a'] = new ConversationStatement({
  name: CVS.FFH_A_RUINED_RED_METAL + ' - s1a',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  text: `Will you, truly? I do not know how you could possibly find a new source of otherworldly light. But then again, I do not know how I could either.

I will have to trust that you can do what you say. Speak to me when you've gathered what we need.`,
questsBegin: [QUESTS.MYSTICISM_A_THRICE_LOCKED_TOME]
});
ffhConvoResponses[CVS.FFH_A_RUINED_RED_METAL + ' - r0h'] = new ConversationResponse({
  name: CVS.FFH_A_RUINED_RED_METAL + ' - r0h',
  textIntro: `Did you inhale some fumes?`,
  text: `Light, as an ingredient in a metal? Did you inhale some fumes?`,
  statementName: CVS.FFH_A_RUINED_RED_METAL + ' - s1h',
  speechType: 'Humorous'
});
ffhConvoStatements[CVS.FFH_A_RUINED_RED_METAL + ' - s1h'] = new ConversationStatement({
  name: CVS.FFH_A_RUINED_RED_METAL + ' - s1h',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  text: `I did not. The principles are complex, and almost entirely beyond me, but the light is critical. The component metals are inspired. They yearn to be somewhere... Other.

Somehow, I will have to find a new source for the holy light. Speak to me when you've gathered the metal powders and fuel.`,
questsBegin: [QUESTS.MYSTICISM_REPAIRING_THE_FIRST_KEY]
});

ffhConversations[CVS.FFH_REPAIRING_THE_FIRST_KEY] = new Conversation({
  name: CVS.FFH_REPAIRING_THE_FIRST_KEY,
  title: 'Repairing the First Key',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  statementName: CVS.FFH_REPAIRING_THE_FIRST_KEY + ' - s0',
  repeatable: false,
  daily: false,
  weight: 0,
  available: () => (false)
});
ffhConvoStatements[CVS.FFH_REPAIRING_THE_FIRST_KEY + ' - s0'] =
  new ConversationStatement({
  name: CVS.FFH_REPAIRING_THE_FIRST_KEY + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  text: `You have come with what I need to repair the key?`,
  responseNames: [CVS.FFH_REPAIRING_THE_FIRST_KEY + ' - r0y',
    CVS.FFH_REPAIRING_THE_FIRST_KEY + ' - r0n']
});
ffhConvoResponses[CVS.FFH_REPAIRING_THE_FIRST_KEY + ' - r0y'] =
  new ConversationResponse({
  name: CVS.FFH_REPAIRING_THE_FIRST_KEY + ' - r0y',
  textIntro: `Yes, everything.`,
  text: `Yes, everything.`,
  statementName: CVS.FFH_REPAIRING_THE_FIRST_KEY + ' - s1y',
  cost: [{ specificity: RSP.EXACT, type: RTY.BROKEN_RED_KEY, quantity: 1 },
    { specificity: RSP.EXACT, type: RTY.IRON_POWDER, quantity: 20 },
    { specificity: RSP.EXACT, type: RTY.COPPER_POWDER, quantity: 30 },
    { specificity: RSP.EXACT, type: RTY.CHARCOAL, quantity: 70 },
    { specificity: RSP.EXACT, type: RTY.GLOAMING_LIGHT, quantity: 1 }]
});
ffhConvoStatements[CVS.FFH_REPAIRING_THE_FIRST_KEY + ' - s1y'] =
  new ConversationStatement({
  name: CVS.FFH_REPAIRING_THE_FIRST_KEY + ' - s1y',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  text: `Very good, you have the metal powders, the fuel, and the light. Yes, the light. I know about the spirit you've been communing with.`,
  responseNames: [CVS.FFH_REPAIRING_THE_FIRST_KEY + ' - r1']
});
ffhConvoResponses[CVS.FFH_REPAIRING_THE_FIRST_KEY + ' - r0n'] =
  new ConversationResponse({
  name: CVS.FFH_REPAIRING_THE_FIRST_KEY + ' - r0n',
  textIntro: `No, not quite.`,
  text: `No, not quite.`,
  statementName: CVS.FFH_REPAIRING_THE_FIRST_KEY + ' - s1n'
});
ffhConvoStatements[CVS.FFH_REPAIRING_THE_FIRST_KEY + ' - s1n'] =
  new ConversationStatement({
  name: CVS.FFH_REPAIRING_THE_FIRST_KEY + ' - s1n',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  text: `No reason to be troubled. Take the time you need.`
});
ffhConvoResponses[CVS.FFH_REPAIRING_THE_FIRST_KEY + ' - r1'] =
  new ConversationResponse({
  name: CVS.FFH_REPAIRING_THE_FIRST_KEY + ' - r1',
  textIntro: `What can you tell me about The Firefly?`,
  text: `You do? Well enough. What can you tell me about The Firefly?`,
  statementName: CVS.FFH_REPAIRING_THE_FIRST_KEY + ' - s2'
});
ffhConvoStatements[CVS.FFH_REPAIRING_THE_FIRST_KEY + ' - s2'] =
  new ConversationStatement({
  name: CVS.FFH_REPAIRING_THE_FIRST_KEY + ' - s2',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  text: `Is that what you call them? They are from a space within our earth. A layer within many layers. I cannot pretend to understand their minds or their goals, but they sometimes partner with us, when they wish. It is fortunate you've found one. Beyond fortunate.

I will repair this key, now. Come back when you've found another broken key and again communed with "The Firefly", as you call them.`,
  gainResources: [{ specificity: RSP.EXACT, type: RTY.RED_KEY, value: 13000 }],
  questsBegin: [QUESTS.MYSTICISM_REPAIRING_THE_SECOND_KEY]
});

ffhConversations[CVS.FFH_REPAIRING_THE_SECOND_KEY] = new Conversation({
  name: CVS.FFH_REPAIRING_THE_SECOND_KEY,
  title: 'Repairing the Second Key',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  statementName: CVS.FFH_REPAIRING_THE_SECOND_KEY + ' - s0',
  repeatable: false,
  daily: false,
  weight: 0,
  available: () => (false)
});
ffhConvoStatements[CVS.FFH_REPAIRING_THE_SECOND_KEY + ' - s0'] =
  new ConversationStatement({
  name: CVS.FFH_REPAIRING_THE_SECOND_KEY + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  text: `You have the materials I need to repair the second key?`,
  responseNames: [CVS.FFH_REPAIRING_THE_SECOND_KEY + ' - r0y',
    CVS.FFH_REPAIRING_THE_SECOND_KEY + ' - r0n']
});
ffhConvoResponses[CVS.FFH_REPAIRING_THE_SECOND_KEY + ' - r0y'] =
  new ConversationResponse({
  name: CVS.FFH_REPAIRING_THE_SECOND_KEY + ' - r0y',
  textIntro: `Yes, everything.`,
  text: `Yes, everything.`,
  statementName: CVS.FFH_REPAIRING_THE_SECOND_KEY + ' - s1y',
  cost: [{ specificity: RSP.EXACT, type: RTY.BROKEN_RED_KEY, quantity: 1 },
    { specificity: RSP.EXACT, type: RTY.IRON_POWDER, quantity: 20 },
    { specificity: RSP.EXACT, type: RTY.COPPER_POWDER, quantity: 30 },
    { specificity: RSP.EXACT, type: RTY.CHARCOAL, quantity: 70 },
    { specificity: RSP.EXACT, type: RTY.GLOAMING_LIGHT, quantity: 1 }]
});
ffhConvoResponses[CVS.FFH_REPAIRING_THE_SECOND_KEY + ' - r0n'] =
  new ConversationResponse({
  name: CVS.FFH_REPAIRING_THE_SECOND_KEY + ' - r0n',
  textIntro: `No, not quite.`,
  text: `No, not quite.`,
  statementName: CVS.FFH_REPAIRING_THE_SECOND_KEY + ' - s1n'
});
ffhConvoStatements[CVS.FFH_REPAIRING_THE_SECOND_KEY + ' - s1n'] =
  new ConversationStatement({
  name: CVS.FFH_REPAIRING_THE_SECOND_KEY + ' - s1n',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  text: `No reason to be troubled. Take the time you need.`
});
ffhConvoStatements[CVS.FFH_REPAIRING_THE_SECOND_KEY + ' - s1y'] =
  new ConversationStatement({
  name: CVS.FFH_REPAIRING_THE_SECOND_KEY + ' - s1y',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  text: `Very good, I will repair the second key. We are so close now, can you feel it?`,
  gainResources: [{ specificity: RSP.EXACT, type: RTY.RED_KEY, value: 13000 }],
  questsBegin: [QUESTS.MYSTICISM_REPAIRING_THE_THIRD_KEY]
});

ffhConversations[CVS.FFH_REPAIRING_THE_THIRD_KEY] = new Conversation({
  name: CVS.FFH_REPAIRING_THE_THIRD_KEY,
  title: 'Repairing the Third Key',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  statementName: CVS.FFH_REPAIRING_THE_THIRD_KEY + ' - s0',
  repeatable: false,
  daily: false,
  weight: 0,
  available: () => (false)
});
ffhConvoStatements[CVS.FFH_REPAIRING_THE_THIRD_KEY + ' - s0'] =
  new ConversationStatement({
  name: CVS.FFH_REPAIRING_THE_THIRD_KEY + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  text: `You have what we need to repair the final key?`,
  responseNames: [CVS.FFH_REPAIRING_THE_THIRD_KEY + ' - r0y',
    CVS.FFH_REPAIRING_THE_THIRD_KEY + ' - r0n']
});
ffhConvoResponses[CVS.FFH_REPAIRING_THE_THIRD_KEY + ' - r0y'] =
  new ConversationResponse({
  name: CVS.FFH_REPAIRING_THE_THIRD_KEY + ' - r0y',
  textIntro: `Everthing, finally.`,
  text: `Everthing, finally.`,
  statementName: CVS.FFH_REPAIRING_THE_THIRD_KEY + ' - s1y',
  cost: [{ specificity: RSP.EXACT, type: RTY.BROKEN_RED_KEY, quantity: 1 },
    { specificity: RSP.EXACT, type: RTY.IRON_POWDER, quantity: 20 },
    { specificity: RSP.EXACT, type: RTY.COPPER_POWDER, quantity: 30 },
    { specificity: RSP.EXACT, type: RTY.CHARCOAL, quantity: 70 },
    { specificity: RSP.EXACT, type: RTY.GLOAMING_LIGHT, quantity: 1 }]
});
ffhConvoResponses[CVS.FFH_REPAIRING_THE_THIRD_KEY + ' - r0n'] =
  new ConversationResponse({
  name: CVS.FFH_REPAIRING_THE_THIRD_KEY + ' - r0n',
  textIntro: `No, not quite.`,
  text: `No, not quite.`,
  statementName: CVS.FFH_REPAIRING_THE_THIRD_KEY + ' - s1n'
});
ffhConvoStatements[CVS.FFH_REPAIRING_THE_THIRD_KEY + ' - s1n'] =
  new ConversationStatement({
  name: CVS.FFH_REPAIRING_THE_THIRD_KEY + ' - s1n',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  text: `No reason to be troubled. Take the time you need.`
});
ffhConvoStatements[CVS.FFH_REPAIRING_THE_THIRD_KEY + ' - s1y'] =
  new ConversationStatement({
  name: CVS.FFH_REPAIRING_THE_THIRD_KEY + ' - s1y',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  text: `This is it, repairing the final key. It is time to open the tome. Be ready for anything.`,
  gainResources: [{ specificity: RSP.EXACT, type: RTY.RED_KEY, value: 13000 }]
});

ffhConversations[CVS.FFH_OPENING_THE_TOME] = new Conversation({
  name: CVS.FFH_OPENING_THE_TOME,
  title: 'Opening the Tome',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  statementName: CVS.FFH_OPENING_THE_TOME + ' - s0',
  repeatable: false,
  daily: false,
  weight: 0,
  available: () => (false)
});
ffhConvoStatements[CVS.FFH_OPENING_THE_TOME + ' - s0'] =
  new ConversationStatement({
  name: CVS.FFH_OPENING_THE_TOME + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  text: `Here are all three keys before us thanks to you, me, and The Firefly. Are you prepared?`,
  responseNames: [CVS.FFH_OPENING_THE_TOME + ' - r0y',
    CVS.FFH_OPENING_THE_TOME + ' - r0n']
});
ffhConvoResponses[CVS.FFH_OPENING_THE_TOME + ' - r0y'] =
  new ConversationResponse({
  name: CVS.FFH_OPENING_THE_TOME + ' - r0y',
  textIntro: `I'm ready.`,
  text: `I'm ready.`,
  narrationName: CVS.FFH_OPENING_THE_TOME + ' - n1y',
  cost: [{ specificity: RSP.EXACT, type: RTY.THRICE_LOCKED_TOME, quantity: 1 },
    { specificity: RSP.EXACT, type: RTY.RED_KEY, quantity: 3 }]
});
ffhConvoNarrations[CVS.FFH_OPENING_THE_TOME + ' - n1y'] =
  new ConversationNarration({
  name: CVS.FFH_OPENING_THE_TOME + ' - n1y',
  text: `Each key fits into its lock with a resonant clank much louder than seems possible. Guangzhou looks over your shoulder as you hold the book, eyes wide as moons.

The tome's spine gives a creak and a crack as it opens, like an old traveler stretching. Its smell is one you recognize - the perfumed box from the front of your Study - but deeper and more rich.`,
  statementName: CVS.FFH_OPENING_THE_TOME + ' - s1y'
})
ffhConvoResponses[CVS.FFH_OPENING_THE_TOME + ' - r0n'] =
  new ConversationResponse({
  name: CVS.FFH_OPENING_THE_TOME + ' - r0n',
  textIntro: `No, not quite.`,
  text: `No, not quite.`,
  statementName: CVS.FFH_OPENING_THE_TOME + ' - s1n'
});
ffhConvoStatements[CVS.FFH_OPENING_THE_TOME + ' - s1n'] =
  new ConversationStatement({
  name: CVS.FFH_OPENING_THE_TOME + ' - s1n',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  text: `No reason to be troubled. Take the time you need.`
});
ffhConvoStatements[CVS.FFH_OPENING_THE_TOME + ' - s1y'] =
  new ConversationStatement({
  name: CVS.FFH_OPENING_THE_TOME + ' - s1y',
  partnerKind: 'leader', partnerType: LEADER_TYPES.FOXFIRE_HERETIC,
  text: `|name|, look! The mix of ancient text and new, overlapping, with gaps in between. It is as if it were written with the intention of being added to by future writers. I've never seen anything like it... Although I was never allowed to directly look upon the tome the ascetics owned. We have much work to do.`,
  completeResearch: [RESEARCHES.THRICE_LOCKED_TOME]
});

export { ffhConversations, ffhConvoStatements, ffhConvoResponses, ffhConvoNarrations }
