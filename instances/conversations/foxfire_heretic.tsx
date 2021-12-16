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

let ffhConversations: { [name: string] : Conversation } = {};
let ffhConvoStatements: { [name: string] : ConversationStatement } = {};
let ffhConvoResponses: { [name: string] : ConversationResponse } = {};
let ffhConvoNarrations: { [name: string] : ConversationNarration } = {};

ffhConversations[CVS.FFH_SAYING_HELLO + ' - 0'] = new Conversation({
  name: CVS.FFH_SAYING_HELLO + ' - 0',
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

ffhConversations[FTU.UNREPENTANT_FIGURE + ' - 0'] = new Conversation({
  name: FTU.UNREPENTANT_FIGURE + ' - 0',
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

export { ffhConversations, ffhConvoStatements, ffhConvoResponses, ffhConvoNarrations }
