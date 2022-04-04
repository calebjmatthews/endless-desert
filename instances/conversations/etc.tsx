import { Conversation, ConversationStatement, ConversationResponse,
  ConversationNarration, dailyConversationUsed } from '../../models/conversation';
import Icon from '../../models/icon';
import { GameState } from '../../models/game_state';
import { CONVERSATIONS } from '../../enums/conversations';
const CVS = CONVERSATIONS;
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

let etcConversations: { [name: string] : Conversation } = {};
let etcConvoStatements: { [name: string] : ConversationStatement } = {};
let etcConvoResponses: { [name: string] : ConversationResponse } = {};
let etcConvoNarrations: { [name: string] : ConversationNarration } = {};

/*
S:I've been journeying through this area, seeking a rumoured town rising in popularity. I've had no luck finding it whatsoever, and to sour my day further my camel took a poor turn and dropped me, ruining my fourth-finest riding dress.

CR: How can I help?
CS: Good, good, the proper response to a lady of my station. Fetch supplies to mend my dress, and you will be richly rewarded.

AR: You're standing on my foot.
AS: And I'm sure your foot feels suitably honored. Quickly, fetch supplies to mend my dress, and you will be richly rewarded.

HR: Your discomfort here must be unbearable.
HS: It is indeed; the simplest fool would understand that. Fetch supplies to mend my dress, and I will consider ignoring the impertinent tone of that remark.
*/
