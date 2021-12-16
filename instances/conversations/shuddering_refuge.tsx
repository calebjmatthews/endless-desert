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

let sreConversations: { [name: string] : Conversation } = {};
let sreConvoStatements: { [name: string] : ConversationStatement } = {};
let sreConvoResponses: { [name: string] : ConversationResponse } = {};
let sreConvoNarrations: { [name: string] : ConversationNarration } = {};

sreConversations[CVS.SRE_SAYING_HELLO + ' - 0'] = new Conversation({
  name: CVS.SRE_SAYING_HELLO + ' - 0',
  title: 'Saying Hello',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SHUDDERING_REFUGE,
  statementName: CVS.SND_SAYING_HELLO + ' - s0',
  repeatable: true,
  daily: false,
  weight: 0,
  available: () => ( true )
});
sreConvoStatements[CVS.SRE_SAYING_HELLO + ' - s0'] = new ConversationStatement({
  name: CVS.SRE_SAYING_HELLO + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SHUDDERING_REFUGE,
  text: `Good day, |me_prefix|. I hope you are leaving your study on occasion; one should know the color of the sky.`
});

sreConversations[FTU.SHUDDERING_FIGURE + ' - 0'] = new Conversation({
  name: FTU.SHUDDERING_FIGURE + ' - 0',
  title: 'A Shuddering Figure',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SHUDDERING_REFUGE,
  statementName: FTU.SHUDDERING_FIGURE + ' - s0',
  repeatable: false,
  daily: false,
  weight: 0,
  available: () => ( false )
});
sreConvoStatements[FTU.SHUDDERING_FIGURE + ' - s0'] = new ConversationStatement({
  name: FTU.SHUDDERING_FIGURE + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SHUDDERING_REFUGE,
  text: `My name is Da Nang. My people and I have traveled thousands of miles, across seas and forests, suffering every step of the way. But these smooth waves of sand speak of a beginning. And perhaps we are far enough away, now.`,
  responseNames: [FTU.SHUDDERING_FIGURE + ' - r0c', FTU.SHUDDERING_FIGURE + ' - r0a',
    FTU.SHUDDERING_FIGURE + ' - r0h']
});
sreConvoResponses[FTU.SHUDDERING_FIGURE + ' - r0c'] = new ConversationResponse({
  name: FTU.SHUDDERING_FIGURE + ' - r0c',
  textIntro: `You're welcome to live here.`,
  text: `You're welcome to live here. If you're willing to work and learn, there's a place for you.`,
  statementName: FTU.SHUDDERING_FIGURE + ' - s1c',
  speechType: 'Calm'
});
sreConvoStatements[FTU.SHUDDERING_FIGURE + ' - s1c'] = new ConversationStatement({
  name: FTU.SHUDDERING_FIGURE + ' - s1c',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SHUDDERING_REFUGE,
  text: `You are kind. We will stay here, in the desert, and think no more on what we have seen.`,
  leaderJoins: LEADER_TYPES.SHUDDERING_REFUGE
});
sreConvoResponses[FTU.SHUDDERING_FIGURE + ' - r0a'] = new ConversationResponse({
  name: FTU.SHUDDERING_FIGURE + ' - r0a',
  textIntro: `Hold on, no one said you could stay.`,
  text: `Hold on, no one said you could stay.`,
  statementName: FTU.SHUDDERING_FIGURE + ' - s1a',
  speechType: 'Aggressive'
});
sreConvoStatements[FTU.SHUDDERING_FIGURE + ' - s1a'] = new ConversationStatement({
  name: FTU.SHUDDERING_FIGURE + ' - s1a',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SHUDDERING_REFUGE,
  text: `Perhaps not. But this place offers the refuge we have been seeking. Unless you remove us by force we will travel no longer.`,
  leaderJoins: LEADER_TYPES.SHUDDERING_REFUGE
});
sreConvoResponses[FTU.SHUDDERING_FIGURE + ' - r0h'] = new ConversationResponse({
  name: FTU.SHUDDERING_FIGURE + ' - r0h',
  textIntro: `You could always walk a bit farther.`,
  text: `You could always walk a bit farther. This is the desert, you know. Sun, predetors, a notable lack of water?`,
  statementName: FTU.SHUDDERING_FIGURE + ' - s1h',
  speechType: 'Humorous'
});
sreConvoStatements[FTU.SHUDDERING_FIGURE + ' - s1h'] = new ConversationStatement({
  name: FTU.SHUDDERING_FIGURE + ' - s1h',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SHUDDERING_REFUGE,
  text: `We are used to hot sun and harsh work. And this place offers the refuge we have been seeking. Unless you remove us by force we will travel no longer.`,
  leaderJoins: LEADER_TYPES.SHUDDERING_REFUGE
});

export { sreConversations, sreConvoStatements, sreConvoResponses, sreConvoNarrations }
