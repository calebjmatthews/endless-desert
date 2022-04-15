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
import { QUESTS } from '../../enums/quests';

let etcConversations: { [name: string] : Conversation } = {};
let etcConvoStatements: { [name: string] : ConversationStatement } = {};
let etcConvoResponses: { [name: string] : ConversationResponse } = {};
let etcConvoNarrations: { [name: string] : ConversationNarration } = {};

etcConversations[CVS.ETC_A_SOILED_YET_SHINING_GOWN] = new Conversation({
  name: CVS.ETC_A_SOILED_YET_SHINING_GOWN,
  title: 'An Shining, yet Soiled Figure',
  partnerKind: 'person', partnerType: PEOPLE.TOURMALINE_JEWELER,
  statementName: CVS.ETC_A_SOILED_YET_SHINING_GOWN + ' - s0',
  repeatable: false,
  daily: false,
  weight: 0,
  available: () => ( false )
});
etcConvoStatements[CVS.ETC_A_SOILED_YET_SHINING_GOWN + ' - s0'] = new ConversationStatement({
  name: CVS.ETC_A_SOILED_YET_SHINING_GOWN + ' - s0',
  partnerKind: 'person', partnerType: PEOPLE.TOURMALINE_JEWELER,
  text: `I've been journeying through this area, seeking a rumoured town rising in popularity. I've had no luck finding it whatsoever, and to sour my day further my camel took a poor turn and dropped me, ruining my fourth-finest riding dress.`,
  responseNames: [CVS.ETC_A_SOILED_YET_SHINING_GOWN + ' - r0c', CVS.ETC_A_SOILED_YET_SHINING_GOWN + ' - r0a',
    CVS.ETC_A_SOILED_YET_SHINING_GOWN + ' - r0h']
});
etcConvoResponses[CVS.ETC_A_SOILED_YET_SHINING_GOWN + ' - r0c'] = new ConversationResponse({
  name: CVS.ETC_A_SOILED_YET_SHINING_GOWN + ' - r0c',
  textIntro: `How can I help?`,
  text: `How can I help?`,
  statementName: CVS.ETC_A_SOILED_YET_SHINING_GOWN + ' - s1c',
  speechType: 'Calm'
});
etcConvoStatements[CVS.ETC_A_SOILED_YET_SHINING_GOWN + ' - s1c'] = new ConversationStatement({
  name: CVS.ETC_A_SOILED_YET_SHINING_GOWN + ' - s1c',
  partnerKind: 'person', partnerType: PEOPLE.TOURMALINE_JEWELER,
  text: `Good, good, the proper response to a lady of my station. Fetch supplies to mend my dress, and you will be richly rewarded.`,
  questsBegin: [QUESTS.NATIONS_TOURMALINE_JEWELERS]
});
etcConvoResponses[CVS.ETC_A_SOILED_YET_SHINING_GOWN + ' - r0a'] = new ConversationResponse({
  name: CVS.ETC_A_SOILED_YET_SHINING_GOWN + ' - r0a',
  textIntro: `You're standing on my foot.`,
  text: `You're standing on my foot.`,
  statementName: CVS.ETC_A_SOILED_YET_SHINING_GOWN + ' - s1a',
  speechType: 'Aggressive'
});
etcConvoStatements[CVS.ETC_A_SOILED_YET_SHINING_GOWN + ' - s1a'] = new ConversationStatement({
  name: CVS.ETC_A_SOILED_YET_SHINING_GOWN + ' - s1a',
  partnerKind: 'person', partnerType: PEOPLE.TOURMALINE_JEWELER,
  text: `And I'm sure your foot feels suitably honored. Quickly, fetch supplies to mend my dress, and you will be richly rewarded.`,
  questsBegin: [QUESTS.NATIONS_TOURMALINE_JEWELERS]
});
etcConvoResponses[CVS.ETC_A_SOILED_YET_SHINING_GOWN + ' - r0h'] = new ConversationResponse({
  name: CVS.ETC_A_SOILED_YET_SHINING_GOWN + ' - r0h',
  textIntro: `Your discomfort here must be unbearable.`,
  text: `Your discomfort here must be unbearable.`,
  statementName: CVS.ETC_A_SOILED_YET_SHINING_GOWN + ' - s1h',
  speechType: 'Humorous'
});
etcConvoStatements[CVS.ETC_A_SOILED_YET_SHINING_GOWN + ' - s1h'] = new ConversationStatement({
  name: CVS.ETC_A_SOILED_YET_SHINING_GOWN + ' - s1h',
  partnerKind: 'person', partnerType: PEOPLE.TOURMALINE_JEWELER,
  text: `It is indeed; the simplest fool would understand that. Fetch supplies to mend my dress, and I will consider ignoring the impertinent tone of that remark.`,
  questsBegin: [QUESTS.NATIONS_TOURMALINE_JEWELERS]
});

export { etcConversations, etcConvoStatements, etcConvoResponses, etcConvoNarrations }
