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
import { SVGS } from '../../enums/svgs';

let scnConversations: { [name: string] : Conversation } = {};
let scnConvoStatements: { [name: string] : ConversationStatement } = {};
let scnConvoResponses: { [name: string] : ConversationResponse } = {};
let scnConvoNarrations: { [name: string] : ConversationNarration } = {};

scnConversations[CVS.SCN_SAYING_HELLO + ' - 0'] = new Conversation({
  name: CVS.SCN_SAYING_HELLO + ' - 0',
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

scnConversations[FTU.LIMPING_FIGURE + ' - 0'] = new Conversation({
  name: FTU.LIMPING_FIGURE + ' - 0',
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
  responseNames: [FTU.LIMPING_FIGURE + ' - r0c', FTU.LIMPING_FIGURE + ' - r0a',
    FTU.LIMPING_FIGURE + ' - r0h']
});
scnConvoResponses[FTU.LIMPING_FIGURE + ' - r0c'] = new ConversationResponse({
  name: FTU.LIMPING_FIGURE + ' - r0c',
  textIntro: `Could you talk through it?`,
  text: `Could you talk through it? The Crows ought to respect your experience by now.`,
  statementName: FTU.LIMPING_FIGURE + ' - s1c',
  speechType: 'Calm'
});
scnConvoStatements[FTU.LIMPING_FIGURE + ' - s1c'] = new ConversationStatement({
  name: FTU.LIMPING_FIGURE + ' - s1c',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SCARRED_NAVIGATOR,
  text: `Hahaha! "Talk through it?" You don't know what you're on about. Remind me to come to you the next time I need to work out a quarrel between children.`
});
scnConvoResponses[FTU.LIMPING_FIGURE + ' - r0a'] = new ConversationResponse({
  name: FTU.LIMPING_FIGURE + ' - r0a',
  textIntro: `I'll back you up. I have a mattock and know how to swing it.`,
  text: `I'll back you up. I have a mattock and know how to swing it.`,
  statementName: FTU.LIMPING_FIGURE + ' - s1a',
  speechType: 'Aggressive',
  cost: {specificity: RSP.EXACT, type: EQT.ROUGH_MATTOCK + ' (Unmarked)', quantity: 1}
});
scnConvoStatements[FTU.LIMPING_FIGURE + ' - s1a'] = new ConversationStatement({
  name: FTU.LIMPING_FIGURE + ' - s1a',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SCARRED_NAVIGATOR,
  text: `You would, would you? You'd get yourself beat half to death, of course, but I can see if your eyes that you mean it. Great skies, what am I doing with the Crows these days? They're just waiting until I'm too old to guard my own.

  Better to stay here, no question. If you would have us, my crew and I are yours. Although I'm keeping that mattock.`,
  leaderJoins: LEADER_TYPES.SCARRED_NAVIGATOR

});
scnConvoResponses[FTU.LIMPING_FIGURE + ' - r0h'] = new ConversationResponse({
  name: FTU.LIMPING_FIGURE + ' - r0h',
  textIntro: `Bring a cane, next time.`,
  text: `Bring a cane, next time.`,
  statementName: FTU.LIMPING_FIGURE + ' - s1h',
  cost: {specificity: RSP.EXACT, type: RTY.PIE, quantity: 10}
});
scnConvoStatements[FTU.LIMPING_FIGURE + ' - s1h'] = new ConversationStatement({
  name: FTU.LIMPING_FIGURE + ' - s1h',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SCARRED_NAVIGATOR,
  text: `Hahaha, Go kick sand, you lout! Although I take your point well enough; does no good to mope about like my best days are behind me. I ought to be better than that.`
});

export { scnConversations, scnConvoStatements, scnConvoResponses, scnConvoNarrations }
