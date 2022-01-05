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

let tfsConversations: { [name: string] : Conversation } = {};
let tfsConvoStatements: { [name: string] : ConversationStatement } = {};
let tfsConvoResponses: { [name: string] : ConversationResponse } = {};
let tfsConvoNarrations: { [name: string] : ConversationNarration } = {};

tfsConversations[CVS.TFS_SAYING_HELLO] = new Conversation({
  name: CVS.TFS_SAYING_HELLO,
  title: 'Saying Hello',
  partnerKind: 'leader', partnerType: LEADER_TYPES.TREFOIL_SOWER,
  statementName: CVS.TFS_SAYING_HELLO + ' - s0',
  repeatable: true,
  daily: false,
  weight: 0,
  available: () => ( true )
});
tfsConvoStatements[CVS.TFS_SAYING_HELLO + ' - s0'] = new ConversationStatement({
  name: CVS.TFS_SAYING_HELLO + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.TREFOIL_SOWER,
  text: `So many coming in and out of the town today! Hope they're not tracking sand all over our streets, eh?`
});

tfsConversations[FTU.CHEERY_FIGURE] = new Conversation({
  name: FTU.CHEERY_FIGURE,
  title: 'A Cheery Figure',
  partnerKind: 'leader', partnerType: LEADER_TYPES.TREFOIL_SOWER,
  statementName: FTU.CHEERY_FIGURE + ' - s0',
  repeatable: false,
  daily: false,
  weight: 0,
  available: () => ( false )
});
tfsConvoStatements[FTU.CHEERY_FIGURE + ' - s0'] = new ConversationStatement({
  name: FTU.CHEERY_FIGURE + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.TREFOIL_SOWER,
  text: `I've been traveling from land to land with our trading party, looking for a place to live for a time before returning to the islands. It might be petty, but it's the food that's keeping me from settling down! It's bland, everywhere I go!`,
  responseNames: [FTU.CHEERY_FIGURE + ' - r0l', FTU.CHEERY_FIGURE + ' - r0s',
    FTU.CHEERY_FIGURE + ' - r0p']
});
tfsConvoResponses[FTU.CHEERY_FIGURE + ' - r0l'] = new ConversationResponse({
  name: FTU.CHEERY_FIGURE + ' - r0l',
  textIntro: `How about this?`,
  text: `How about this?`,
  statementName: FTU.CHEERY_FIGURE + ' - s1l',
  cost: [{specificity: RSP.EXACT, type: RTY.LENTIL, quantity: 10}]
});
tfsConvoStatements[FTU.CHEERY_FIGURE + ' - s1l'] = new ConversationStatement({
  name: FTU.CHEERY_FIGURE + ' - s1l',
  partnerKind: 'leader', partnerType: LEADER_TYPES.TREFOIL_SOWER,
  text: `No, no, no, this is exactly what I'm talking about! Edible, yes. But not a reason to put down roots.`
});
tfsConvoResponses[FTU.CHEERY_FIGURE + ' - r0s'] = new ConversationResponse({
  name: FTU.CHEERY_FIGURE + ' - r0s',
  textIntro: `How about this?`,
  text: `How about this`,
  statementName: FTU.CHEERY_FIGURE + ' - s1s',
  cost: [{specificity: RSP.SUBCATEGORY, type: RSC.SOUP, quantity: 10}]
});
tfsConvoStatements[FTU.CHEERY_FIGURE + ' - s1s'] = new ConversationStatement({
  name: FTU.CHEERY_FIGURE + ' - s1s',
  partnerKind: 'leader', partnerType: LEADER_TYPES.TREFOIL_SOWER,
  text: `Hmm. Warm, satisfying, hearty. But bland. I'm not trying to be a lout, but I can't imagine living somewhere and eating soup day after day.`
});
tfsConvoResponses[FTU.CHEERY_FIGURE + ' - r0p'] = new ConversationResponse({
  name: FTU.CHEERY_FIGURE + ' - r0p',
  textIntro: `How about this?`,
  text: `How about this?`,
  statementName: FTU.CHEERY_FIGURE + ' - s1p',
  cost: [{specificity: RSP.SUBCATEGORY, type: RSC.PIE, quantity: 10}]
});
tfsConvoStatements[FTU.CHEERY_FIGURE + ' - s1p'] = new ConversationStatement({
  name: FTU.CHEERY_FIGURE + ' - s1p',
  partnerKind: 'leader', partnerType: LEADER_TYPES.TREFOIL_SOWER,
  text: `Now here's something worth talking about! Flaky crust and the filling steaming hot... Mmmm. My thanks to the cook!

Is this typical, in your town? What a strange world! The best food I've found, here on the edge of the Endless Desert! I'll be staying here, of course.`,
  leaderJoins: LEADER_TYPES.TREFOIL_SOWER
});

export { tfsConversations, tfsConvoStatements, tfsConvoResponses, tfsConvoNarrations }
