import { Conversation, ConversationStatement, ConversationResponse }
  from '../models/conversation';

let conversations: { [name: string] : Conversation } = {};
let convoStatements: { [name: string] : ConversationStatement } = {};
let convoResponses: { [name: string] : ConversationResponse } = {};

conversations['A Familiar Figure - 0'] = new Conversation({
  name: 'A Familiar Figure - 0',
  statementName: 'A Familiar Figure - s0',
  repeatable: false,
  weight: 100000,
  available: () => (true)
});
convoStatements['A Familiar Figure - s0'] = new ConversationStatement({
  name: 'A Familiar Figure - s0',
  text: 'High heavens, kid! Out into the desert, on your own, no supplies. Did you have a death wish?',
  responseNames: ['A Familiar Figure - r1c', 'A Familiar Figure - r1r',
    'A Familiar Figure - r1h']
});
convoResponses['A Familiar Figure - r1c'] = new ConversationResponse({
  name: 'A Familiar Figure - r1c',
  textIntro: 'Someone had to do something.',
  text: 'Someone had to do something. Dani has been gone far too long.',
  statementName: 'A Familiar Figure - s2c'
});
convoStatements['A Familiar Figure - s2c'] = new ConversationStatement({
  name: 'A Familiar Figure - s2c',
  text: 'And you couldn\'t be slowed down by anyone else, huh? If you want to help Dani, take care of yourself, you fool. From now on it\'ll be me doing the exploring, and you doing the reading and counting and such. Less likely you\'ll get yourself killed that way.'
});
convoResponses['A Familiar Figure - r1r'] = new ConversationResponse({
  name: 'A Familiar Figure - r1r',
  textIntro: 'You\'ve been following me!?',
  text: 'You\'ve been following me!? This whole time!?',
  statementName: 'A Familiar Figure - s2r'
});
convoStatements['A Familiar Figure - s2c'] = new ConversationStatement({
  name: 'A Familiar Figure - s2c',
  text: 'What, did you think I was just going to let you run off into the desert after Dani and end up dead? Gods knew what you were thinking, although your clumsy trail was easy enough to follow. From now on it\'ll be me doing the exploring, and you doing the reading and counting and such. Less likely you\'ll get yourself killed that way.'
});
convoResponses['A Familiar Figure - r1h'] = new ConversationResponse({
  name: 'A Familiar Figure - r1h',
  textIntro: 'My legs needed a good stetch',
  text: 'My legs needed a good stetch, but your concern is endearing.',
  statementName: 'A Familiar Figure - s2h'
});
convoStatements['A Familiar Figure - s2c'] = new ConversationStatement({
  name: 'A Familiar Figure - s2c',
  text: 'Oh, that\'s how you\'d like to play it? Your ripped clothes and sweat are giving you away, you know. From now on it\'ll be me doing the exploring, and you doing the reading and counting and such. Less likely you\'ll get yourself killed that way.'
});
