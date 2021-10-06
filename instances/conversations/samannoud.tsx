import { Conversation, ConversationStatement, ConversationResponse }
  from '../../models/conversation';
import Icon from '../../models/icon';
import { GameState } from '../../models/game_state';
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

let sndConversations: { [name: string] : Conversation } = {};
let sndConvoStatements: { [name: string] : ConversationStatement } = {};
let sndConvoResponses: { [name: string] : ConversationResponse } = {};

sndConversations['A Familiar Figure - 0'] = new Conversation({
  name: 'A Familiar Figure - 0',
  statementName: 'A Familiar Figure - s0',
  repeatable: false,
  weight: 0,
  available: () => ( false )
});
sndConvoStatements['A Familiar Figure - s0'] = new ConversationStatement({
  name: 'A Familiar Figure - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `High heavens, kid! Out into the desert, on your own, no supplies. Did you have a death wish?`,
  responseNames: ['A Familiar Figure - r0c', 'A Familiar Figure - r0a',
    'A Familiar Figure - r0h']
});
sndConvoResponses['A Familiar Figure - r0c'] = new ConversationResponse({
  name: 'A Familiar Figure - r0c',
  textIntro: `Someone had to do something.`,
  text: `Someone had to do something. Dani has been gone far too long.`,
  statementName: 'A Familiar Figure - s1c',
  speechType: 'Calm'
});
sndConvoStatements['A Familiar Figure - s1c'] = new ConversationStatement({
  name: 'A Familiar Figure - s1c',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `And you couldn't be slowed down by anyone else, huh? If you want to help Dani, take care of yourself, you fool. From now on it'll be me doing the exploring, and you doing the reading and counting and such. Less likely you'll get yourself killed that way.`,
  leaderJoins: LEADER_TYPES.SAMANNOUD
});
sndConvoResponses['A Familiar Figure - r0a'] = new ConversationResponse({
  name: 'A Familiar Figure - r0a',
  textIntro: `You've been following me!?`,
  text: `You've been following me!? This whole time!?`,
  statementName: 'A Familiar Figure - s1a',
  speechType: 'Aggressive'
});
sndConvoStatements['A Familiar Figure - s1a'] = new ConversationStatement({
  name: 'A Familiar Figure - s1a',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `What, did you think I was just going to let you run off into the desert after Dani and end up dead? Gods knew what you were thinking, although your clumsy trail was easy enough to follow. From now on it'll be me doing the exploring, and you doing the reading and counting and such. Less likely you'll get yourself killed that way.`,
  leaderJoins: LEADER_TYPES.SAMANNOUD
});
sndConvoResponses['A Familiar Figure - r0h'] = new ConversationResponse({
  name: 'A Familiar Figure - r0h',
  textIntro: `My legs needed a good stretch.`,
  text: `My legs needed a good stetch, but your concern is endearing.`,
  statementName: 'A Familiar Figure - s1h',
  speechType: 'Humorous'
});
sndConvoStatements['A Familiar Figure - s1h'] = new ConversationStatement({
  name: 'A Familiar Figure - s1h',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `Oh, that's how you'd like to play it? Your ripped clothes and sweat are giving you away, you know. From now on it'll be me doing the exploring, and you doing the reading and counting and such. Less likely you'll get yourself killed that way.`,
  leaderJoins: LEADER_TYPES.SAMANNOUD
});
sndConvoResponses['A Familiar Figure - r0z'] = new ConversationResponse({
  name: 'A Familiar Figure - r0z',
  textIntro: `Want a bushel of blueberries?`,
  text: `Want a bushel of blueberries?`,
  statementName: 'A Familiar Figure - s1z',
  cost: {specificity: RSP.EXACT, type: RTY.BLUEBERRY,
    quantity: 100}
});
sndConvoStatements['A Familiar Figure - s1z'] = new ConversationStatement({
  name: 'A Familiar Figure - s1z',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `Yea.`,
  leaderJoins: LEADER_TYPES.SAMANNOUD
});

sndConversations['A Thrice Locked Book - 0'] = new Conversation({
  name: 'A Thrice Locked Book - 0',
  statementName: 'A Thrice Locked Book - s0',
  repeatable: false,
  weight: 100,
  available: (gState: GameState) => {
    if (gState.vault?.resources[RTY.THRICE_LOCKED_BOOK]) {
      if (gState.vault?.resources[RTY.THRICE_LOCKED_BOOK].quantity >= 1) {
        return true;
      }
    }
    return false;
  }
});
sndConvoStatements['A Thrice Locked Book - s0'] = new ConversationStatement({
  name: 'A Thrice Locked Book - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `What's that you've got?`,
  responseNames: ['A Thrice Locked Book - r0']
});
sndConvoResponses['A Thrice Locked Book - r0'] = new ConversationResponse({
  name: 'A Thrice Locked Book - r0',
  textIntro: `It's a locked book.`,
  text: `It's a locked book. A thoroughly locked book. Can you make anything of it?`,
  statementName: 'A Thrice Locked Book - s1',
  requirementIcon: new Icon({ provider: 'svg', name: SVGS.TOME }),
  requirementLabel: RTY.THRICE_LOCKED_BOOK,
  available: () => ( true )
});
sndConvoStatements['A Thrice Locked Book - s1'] = new ConversationStatement({
  name: 'A Thrice Locked Book - s1',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `I'm not one for books. But the clasps look familiar... Yes, here we are. This key's broken to pieces, but the metal looks to be the same. I found it in the caverns beneath the town, is that where you found the book?`,
  responseNames: ['A Thrice Locked Book - r1c', 'A Thrice Locked Book - r1a', 'A Thrice Locked Book - r1h']
});
sndConvoResponses['A Thrice Locked Book - r1c'] = new ConversationResponse({
  name: 'A Thrice Locked Book - r1c',
  textIntro: `Sure did.`,
  text: `Sure did.`,
  statementName: 'A Thrice Locked Book - s2c',
  speechType: 'Calm'
});
sndConvoStatements['A Thrice Locked Book - s2c'] = new ConversationStatement({
  name: 'A Thrice Locked Book - s2c',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `Don't give me that look. We're equals in all this, right? I didn't tell you about the key right away, but I'm telling you about it now. No one's being secretive, not on purpose.`,
  gainResources: [{ specificity: RSP.EXACT, type: RTY.BROKEN_RED_KEY, value: 10000 }]
});
sndConvoResponses['A Thrice Locked Book - r1a'] = new ConversationResponse({
  name: 'A Thrice Locked Book - r1a',
  textIntro: `You didn't tell me anything about this!`,
  text: `You didn't tell me anything about this!`,
  statementName: 'A Thrice Locked Book - s2a',
  speechType: 'Aggressive'
});
sndConvoStatements['A Thrice Locked Book - s2a'] = new ConversationStatement({
  name: 'A Thrice Locked Book - s2a',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `Ok, ok, I didn't, that's true. I've got reasons for digging into this town, things that I'm not going to talk about. You do too, don't you? Here, take the key, and let's not worry about it.`,
  gainResources: [{ specificity: RSP.EXACT, type: RTY.BROKEN_RED_KEY, value: 10000 }]
});
sndConvoResponses['A Thrice Locked Book - r1h'] = new ConversationResponse({
  name: 'A Thrice Locked Book - r1h',
  textIntro: `Yeah, underground caves have the best reading material.`,
  text: `Yeah, underground caves have the best reading material.`,
  statementName: 'A Thrice Locked Book - s2h',
  speechType: 'Humorous'
});
sndConvoStatements['A Thrice Locked Book - s2h'] = new ConversationStatement({
  name: 'A Thrice Locked Book - s2h',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `They seem a little too convenient, don't they? Cool, dry, incredibly spacious? Makes sense that we'd both be doing some investigating. Anyway, the key's yours. Let me know what you learn.`,
  gainResources: [{ specificity: RSP.EXACT, type: RTY.BROKEN_RED_KEY, value: 10000 }]
});

export { sndConversations, sndConvoStatements, sndConvoResponses }
