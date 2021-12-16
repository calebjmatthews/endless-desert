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

let auwConversations: { [name: string] : Conversation } = {};
let auwConvoStatements: { [name: string] : ConversationStatement } = {};
let auwConvoResponses: { [name: string] : ConversationResponse } = {};
let auwConvoNarrations: { [name: string] : ConversationNarration } = {};

auwConversations[CVS.AUW_SAYING_HELLO + ' - 0'] = new Conversation({
  name: CVS.AUW_SAYING_HELLO + ' - 0',
  title: 'Saying Hello',
  partnerKind: 'leader', partnerType: LEADER_TYPES.AUSPICIOUS_WAIF,
  statementName: CVS.AUW_SAYING_HELLO + ' - s0',
  repeatable: true,
  daily: false,
  weight: 0,
  available: () => ( true )
});
auwConvoStatements[CVS.AUW_SAYING_HELLO + ' - s0'] = new ConversationStatement({
  name: CVS.AUW_SAYING_HELLO + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.AUSPICIOUS_WAIF,
  text: `How's it going, boss? Staying productive? The ink on your fingers says yes.`
});

auwConversations[FTU.SLIGHT_FIGURE + ' - 0'] = new Conversation({
  name: FTU.SLIGHT_FIGURE + ' - 0',
  title: 'A Slight Figure',
  partnerKind: 'leader', partnerType: LEADER_TYPES.AUSPICIOUS_WAIF,
  statementName: FTU.SLIGHT_FIGURE + ' - s0',
  repeatable: false,
  daily: false,
  weight: 0,
  available: () => ( false )
});
auwConvoStatements[FTU.SLIGHT_FIGURE + ' - s0'] = new ConversationStatement({
  name: FTU.SLIGHT_FIGURE + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.AUSPICIOUS_WAIF,
  text: `Hey, boss. Just wanting to say I appreciate the educating. Never thought I had any use for book learning, but I can't keep from rolling around all of it in my head. Had some thoughts about that, er, algebra proof you showed us. Mind taking a look?"`,
  responseNames: [FTU.SLIGHT_FIGURE + ' - r0c', FTU.SLIGHT_FIGURE + ' - r0a',
    FTU.SLIGHT_FIGURE + ' - r0h']
});
auwConvoResponses[FTU.SLIGHT_FIGURE + ' - r0c'] = new ConversationResponse({
  name: FTU.SLIGHT_FIGURE + ' - r0c',
  textIntro: `This is excellent work!`,
  text: `This is excellent work! You should be proud.`,
  statementName: FTU.SLIGHT_FIGURE + ' - s1c',
  speechType: 'Calm'
});
auwConvoStatements[FTU.SLIGHT_FIGURE + ' - s1c'] = new ConversationStatement({
  name: FTU.SLIGHT_FIGURE + ' - s1c',
  partnerKind: 'leader', partnerType: LEADER_TYPES.AUSPICIOUS_WAIF,
  text: `I don't know about all that... Kind of you to say, but I'm new to all this. New, but getting better.

  Speaking of which, I've been talking these things over with some of the young folk from the trading caravans. I'm getting a crew of my own going. Assuming that'd be alright with you, boss.`,
  leaderJoins: LEADER_TYPES.AUSPICIOUS_WAIF
});
auwConvoResponses[FTU.SLIGHT_FIGURE + ' - r0a'] = new ConversationResponse({
  name: FTU.SLIGHT_FIGURE + ' - r0a',
  textIntro: `You're doing algebra for fun?`,
  text: `You're doing algebra for fun?`,
  statementName: FTU.SLIGHT_FIGURE + ' - s1a',
  speechType: 'Aggressive'
});
auwConvoStatements[FTU.SLIGHT_FIGURE + ' - s1a'] = new ConversationStatement({
  name: FTU.SLIGHT_FIGURE + ' - s1a',
  partnerKind: 'leader', partnerType: LEADER_TYPES.AUSPICIOUS_WAIF,
  text: `I'm as surprised as you are. And it's not fun, exactly... It's like I can't help it. I need to know what I'm capable of.

  Speaking of which, I've been talking these things over with some of the young folk from the trading caravans. I'm getting a crew of my own going. Assuming that'd be alright with you, boss.`,
  leaderJoins: LEADER_TYPES.AUSPICIOUS_WAIF
});
auwConvoResponses[FTU.SLIGHT_FIGURE + ' - r0h'] = new ConversationResponse({
  name: FTU.SLIGHT_FIGURE + ' - r0h',
  textIntro: `Nicely done, but... Where'd you get the parchment?`,
  text: `Nicely done, but... Where'd you get the parchment?`,
  statementName: FTU.SLIGHT_FIGURE + ' - s1h',
  speechType: 'Humorous'
});
auwConvoStatements[FTU.SLIGHT_FIGURE + ' - s1h'] = new ConversationStatement({
  name: FTU.SLIGHT_FIGURE + ' - s1h',
  partnerKind: 'leader', partnerType: LEADER_TYPES.AUSPICIOUS_WAIF,
  text: `Haha, you got me there. It came from an oasis town, before I arrived here. An... Unwitting donation to the next generation.

  Speaking of which, I've been talking things over with some of the young folk from the trading caravans. I'm getting a crew of my own going. Assuming that'd be alright with you, boss.`,
  leaderJoins: LEADER_TYPES.AUSPICIOUS_WAIF
});

export { auwConversations, auwConvoStatements, auwConvoResponses, auwConvoNarrations }
