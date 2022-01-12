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

let nooConversations: { [name: string] : Conversation } = {};
let nooConvoStatements: { [name: string] : ConversationStatement } = {};
let nooConvoResponses: { [name: string] : ConversationResponse } = {};
let nooConvoNarrations: { [name: string] : ConversationNarration } = {};

nooConversations[FTU.A_TERRACED_PLATFORM] = new Conversation({
  name: FTU.A_TERRACED_PLATFORM,
  title: 'Climbing New Stairs',
  partnerKind: '', partnerType: '',
  narrationName: FTU.A_TERRACED_PLATFORM + ' - n0',
  repeatable: false,
  daily: false,
  weight: 0,
  available: () => ( false )
});
