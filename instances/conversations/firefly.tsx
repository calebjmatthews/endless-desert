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

let fifConversations: { [name: string] : Conversation } = {};
let fifConvoStatements: { [name: string] : ConversationStatement } = {};
let fifConvoResponses: { [name: string] : ConversationResponse } = {};
let fifConvoNarrations: { [name: string] : ConversationNarration } = {};

fifConversations[CVS.FIF_INTRODUCTION] = new Conversation({
  name: CVS.FIF_INTRODUCTION,
  title: `The Voice You've Been Hearing...`,
  partnerKind: 'people', partnerType: PEOPLE.FIREFLY,
  statementName: CVS.FIF_INTRODUCTION + ' - s0',
  repeatable: false,
  daily: false,
  weight: 0,
  available: () => ( false )
});
fifConvoStatements[CVS.FIF_INTRODUCTION + ' - s0'] = new ConversationStatement({
  name: CVS.FIF_INTRODUCTION + ' - s0',
  partnerKind: 'people', partnerType: PEOPLE.FIREFLY,
  text:
`      talented hands
mind
      so
          quick
   you see me now`,
  responseNames: [CVS.FIF_INTRODUCTION + ' - r0']
});
fifConvoResponses[CVS.FIF_INTRODUCTION + ' - r0'] = new ConversationResponse({
  name: CVS.FIF_INTRODUCTION + ' - r0',
  textIntro: `Who are you?`,
  text: `Yes, I see you. Who... Who are you?`,
  statementName: CVS.FIF_INTRODUCTION + ' - s1'
});
fifConvoStatements[CVS.FIF_INTRODUCTION + ' - s1'] = new ConversationStatement({
  name: CVS.FIF_INTRODUCTION + ' - s1',
  partnerKind: 'people', partnerType: PEOPLE.FIREFLY,
  text:
`

fire



    rising`,
  responseNames: [CVS.FIF_INTRODUCTION + ' - r1']
});
fifConvoResponses[CVS.FIF_INTRODUCTION + ' - r1'] = new ConversationResponse({
  name: CVS.FIF_INTRODUCTION + ' - r1',
  textIntro: `Fire rising?`,
  text: `Fire rising?`,
  statementName: CVS.FIF_INTRODUCTION + ' - s2'
});
fifConvoStatements[CVS.FIF_INTRODUCTION + ' - s2'] = new ConversationStatement({
  name: CVS.FIF_INTRODUCTION + ' - s2',
  partnerKind: 'people', partnerType: PEOPLE.FIREFLY,
  text:
`flame
   flying
fires
   soaring
heat
   air
fiery
   wind`,
  responseNames: [CVS.FIF_INTRODUCTION + ' - r2c', CVS.FIF_INTRODUCTION + ' - r2a', CVS.FIF_INTRODUCTION + ' - r2h']
});
fifConvoResponses[CVS.FIF_INTRODUCTION + ' - r2c'] = new ConversationResponse({
  name: CVS.FIF_INTRODUCTION + ' - r2c',
  textIntro: `You're an elemental?`,
  text: `You're an elemental? A spirit of fire and air?`,
  statementName: CVS.FIF_INTRODUCTION + ' - s3c',
  speechType: 'Calm'
});
fifConvoStatements[CVS.FIF_INTRODUCTION + ' - s3c'] = new ConversationStatement({
  name: CVS.FIF_INTRODUCTION + ' - s3c',
  partnerKind: 'people', partnerType: PEOPLE.FIREFLY,
  text:
`     yesno
air yes  fire yes
   spirit yes
  elemental no`,
  responseNames: [CVS.FIF_INTRODUCTION + ' - r3c']
});
fifConvoResponses[CVS.FIF_INTRODUCTION + ' - r2a'] = new ConversationResponse({
  name: CVS.FIF_INTRODUCTION + ' - r2a',
  textIntro: `Ok, ok, calm down.`,
  text: `Ok, ok, calm down.`,
  statementName: CVS.FIF_INTRODUCTION + ' - s3a',
  speechType: 'Aggressive'
});
fifConvoStatements[CVS.FIF_INTRODUCTION + ' - s3a'] = new ConversationStatement({
  name: CVS.FIF_INTRODUCTION + ' - s3a',
  partnerKind: 'people', partnerType: PEOPLE.FIREFLY,
  text: `am         calm`,
  responseNames: [CVS.FIF_INTRODUCTION + ' - r3a']
});
fifConvoResponses[CVS.FIF_INTRODUCTION + ' - r2h'] = new ConversationResponse({
  name: CVS.FIF_INTRODUCTION + ' - r2h',
  textIntro: `So... You're a firefly.`,
  text: `So... You're a firefly.`,
  statementName: CVS.FIF_INTRODUCTION + ' - s3h',
  speechType: 'Humorous'
});
fifConvoStatements[CVS.FIF_INTRODUCTION + ' - s3h'] = new ConversationStatement({
  name: CVS.FIF_INTRODUCTION + ' - s3h',
  partnerKind: 'people', partnerType: PEOPLE.FIREFLY,
  text: `yes yes

fire
   fly`,
  responseNames: [CVS.FIF_INTRODUCTION + ' - r3h']
});
fifConvoResponses[CVS.FIF_INTRODUCTION + ' - r3c'] = new ConversationResponse({
  name: CVS.FIF_INTRODUCTION + ' - r3c',
  textIntro: `What is it you want?`,
  text: `What is it you want?`,
  statementName: CVS.FIF_INTRODUCTION + ' - s4',
});
fifConvoResponses[CVS.FIF_INTRODUCTION + ' - r3a'] = new ConversationResponse({
  name: CVS.FIF_INTRODUCTION + ' - r3a',
  textIntro: `What is it you want?`,
  text: `Thanks for that. Now, what is it you want?`,
  statementName: CVS.FIF_INTRODUCTION + ' - s4',
});
fifConvoResponses[CVS.FIF_INTRODUCTION + ' - r3h'] = new ConversationResponse({
  name: CVS.FIF_INTRODUCTION + ' - r3h',
  textIntro: `What is it you want?`,
  text: `Not sure we understood each other there. Anyway, what do you want?`,
  statementName: CVS.FIF_INTRODUCTION + ' - s4',
});
fifConvoStatements[CVS.FIF_INTRODUCTION + ' - s4'] = new ConversationStatement({
  name: CVS.FIF_INTRODUCTION + ' - s4',
  partnerKind: 'people', partnerType: PEOPLE.FIREFLY,
  text:
`    offerings
   for     you
  show  me  all
  tell  me  all
offerings for you`
});

fifConversations[CVS.TESTING] = new Conversation({
  name: CVS.TESTING,
  title: `Testing`,
  partnerKind: 'people', partnerType: PEOPLE.FIREFLY,
  statementName: CVS.TESTING + ' - s0',
  repeatable: false,
  daily: false,
  weight: 0,
  available: () => ( false )
});
fifConvoStatements[CVS.TESTING + ' - s0'] = new ConversationStatement({
  name: CVS.TESTING + ' - s0',
  partnerKind: 'people', partnerType: PEOPLE.FIREFLY,
  text:
`      some
      testing`,
  responseNames: [CVS.TESTING + ' - r0']
});
fifConvoResponses[CVS.TESTING + ' - r0'] = new ConversationResponse({
  name: CVS.TESTING + ' - r0',
  textIntro: `Testing, is it?`,
  text: `Testing, is it?`,
  statementName: CVS.TESTING + ' - s1',
  cost: [{specificity: RSP.EXACT, type: RTY.LENTIL, quantity: 100},
    {specificity: RSP.EXACT, type: RTY.WATER, quantity: 100}]
});
fifConvoStatements[CVS.TESTING + ' - s1'] = new ConversationStatement({
  name: CVS.TESTING + ' - s1',
  partnerKind: 'people', partnerType: PEOPLE.FIREFLY,
  text:
`    yes testing`,
  gainResources: [{specificity: RSP.EXACT, type: RTY.RED_KEY, value: 13000}]
});

export { fifConversations, fifConvoStatements, fifConvoResponses, fifConvoNarrations };
