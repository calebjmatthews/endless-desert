import { Conversation, ConversationStatement, ConversationResponse }
  from '../models/conversation';
import Icon from '../models/icon';
import { LEADER_TYPES } from '../enums/leader_types';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
const RSP = RESOURCE_SPECIFICITY;
import { RESOURCE_TYPES } from '../enums/resource_types';
const RTY = RESOURCE_TYPES;
import { RESOURCE_TAGS } from '../enums/resource_tags';
const RTA = RESOURCE_TAGS;
import { RESOURCE_SUBCATEGORIES } from '../enums/resource_subcategories';
const RSC = RESOURCE_SUBCATEGORIES;
import { SVGS } from '../enums/svgs';

let conversations: { [name: string] : Conversation } = {};
let convoStatements: { [name: string] : ConversationStatement } = {};
let convoResponses: { [name: string] : ConversationResponse } = {};

conversations['A Familiar Figure - 0'] = new Conversation({
  name: 'A Familiar Figure - 0',
  statementName: 'A Familiar Figure - s0',
  repeatable: false,
  weight: 0,
  available: () => (false)
});
convoStatements['A Familiar Figure - s0'] = new ConversationStatement({
  name: 'A Familiar Figure - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: 'High heavens, kid! Out into the desert, on your own, no supplies. Did you have a death wish?',
  responseNames: ['A Familiar Figure - r1c', 'A Familiar Figure - r1r',
    'A Familiar Figure - r1h']
});
convoResponses['A Familiar Figure - r1c'] = new ConversationResponse({
  name: 'A Familiar Figure - r1c',
  textIntro: 'Someone had to do something.',
  text: 'Someone had to do something. Dani has been gone far too long.',
  statementName: 'A Familiar Figure - s2c',
  speechType: 'Calm'
});
convoStatements['A Familiar Figure - s2c'] = new ConversationStatement({
  name: 'A Familiar Figure - s2c',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: 'And you couldn\'t be slowed down by anyone else, huh? If you want to help Dani, take care of yourself, you fool. From now on it\'ll be me doing the exploring, and you doing the reading and counting and such. Less likely you\'ll get yourself killed that way.',
  leaderJoins: LEADER_TYPES.SAMANNOUD
});
convoResponses['A Familiar Figure - r1r'] = new ConversationResponse({
  name: 'A Familiar Figure - r1r',
  textIntro: 'You\'ve been following me!?',
  text: 'You\'ve been following me!? This whole time!?',
  statementName: 'A Familiar Figure - s2r',
  speechType: 'Aggressive'
});
convoStatements['A Familiar Figure - s2r'] = new ConversationStatement({
  name: 'A Familiar Figure - s2r',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: 'What, did you think I was just going to let you run off into the desert after Dani and end up dead? Gods knew what you were thinking, although your clumsy trail was easy enough to follow. From now on it\'ll be me doing the exploring, and you doing the reading and counting and such. Less likely you\'ll get yourself killed that way.',
  leaderJoins: LEADER_TYPES.SAMANNOUD
});
convoResponses['A Familiar Figure - r1h'] = new ConversationResponse({
  name: 'A Familiar Figure - r1h',
  textIntro: 'My legs needed a good stretch.',
  text: 'My legs needed a good stetch, but your concern is endearing.',
  statementName: 'A Familiar Figure - s2h',
  speechType: 'Humorous'
});
convoStatements['A Familiar Figure - s2h'] = new ConversationStatement({
  name: 'A Familiar Figure - s2h',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: 'Oh, that\'s how you\'d like to play it? Your ripped clothes and sweat are giving you away, you know. From now on it\'ll be me doing the exploring, and you doing the reading and counting and such. Less likely you\'ll get yourself killed that way.',
  leaderJoins: LEADER_TYPES.SAMANNOUD
});
convoResponses['A Familiar Figure - r1z'] = new ConversationResponse({
  name: 'A Familiar Figure - r1z',
  textIntro: 'Want a bushel of blueberries?',
  text: 'Want a bushel of blueberries?',
  statementName: 'A Familiar Figure - s2z',
  cost: {specificity: RSP.EXACT, type: RTY.BLUEBERRY,
    quantity: 100}
});
convoStatements['A Familiar Figure - s2z'] = new ConversationStatement({
  name: 'A Familiar Figure - s2z',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: 'Yea.',
  leaderJoins: LEADER_TYPES.SAMANNOUD
});

export { conversations, convoStatements, convoResponses }
