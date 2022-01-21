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

let sndConversations: { [name: string] : Conversation } = {};
let sndConvoStatements: { [name: string] : ConversationStatement } = {};
let sndConvoResponses: { [name: string] : ConversationResponse } = {};
let sndConvoNarrations: { [name: string] : ConversationNarration } = {};

sndConversations[CVS.SND_SAYING_HELLO] = new Conversation({
  name: CVS.SND_SAYING_HELLO,
  title: 'Saying Hello',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  statementName: CVS.SND_SAYING_HELLO + ' - s0',
  repeatable: true,
  daily: false,
  weight: 0,
  available: () => ( true )
});
sndConvoStatements[CVS.SND_SAYING_HELLO + ' - s0'] = new ConversationStatement({
  name: CVS.SND_SAYING_HELLO + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `Hey there, kid. Always good to see an old friend.`
});

sndConversations[FTU.FAMILIAR_FIGURE] = new Conversation({
  name: FTU.FAMILIAR_FIGURE,
  title: 'A Familiar Figure',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  narrationName: FTU.FAMILIAR_FIGURE + ' - n0',
  repeatable: false,
  daily: false,
  weight: 0,
  available: () => ( false )
});
sndConvoNarrations[FTU.FAMILIAR_FIGURE + ' - n0'] = new ConversationNarration({
  name: FTU.FAMILIAR_FIGURE + ' - n0',
  text: `You don't see how anyone could have followed your winding path, but there's a silhouette in the distance, and it's coming closer. And there's something about the swaggering walk that feels very familiar.`,
  statementName: FTU.FAMILIAR_FIGURE + ' - s0'
});
sndConvoStatements[FTU.FAMILIAR_FIGURE + ' - s0'] = new ConversationStatement({
  name: FTU.FAMILIAR_FIGURE + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `High heavens, kid! Out into the desert, on your own, no supplies. Did you have a death wish?`,
  responseNames: [FTU.FAMILIAR_FIGURE + ' - r0c', FTU.FAMILIAR_FIGURE + ' - r0a',
    FTU.FAMILIAR_FIGURE + ' - r0h']
});
sndConvoResponses[FTU.FAMILIAR_FIGURE + ' - r0c'] = new ConversationResponse({
  name: FTU.FAMILIAR_FIGURE + ' - r0c',
  textIntro: `Someone had to do something.`,
  text: `Someone had to do something. Dani has been gone far too long.`,
  statementName: FTU.FAMILIAR_FIGURE + ' - s1c',
  speechType: 'Calm'
});
sndConvoStatements[FTU.FAMILIAR_FIGURE + ' - s1c'] = new ConversationStatement({
  name: FTU.FAMILIAR_FIGURE + ' - s1c',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `And you couldn't be slowed down by anyone else, huh? If you want to help Dani, take care of yourself, you fool. From now on it'll be me doing the exploring, and you doing the reading and counting and such. Less likely you'll get yourself killed that way.`,
  leaderJoins: LEADER_TYPES.SAMANNOUD
});
sndConvoResponses[FTU.FAMILIAR_FIGURE + ' - r0a'] = new ConversationResponse({
  name: FTU.FAMILIAR_FIGURE + ' - r0a',
  textIntro: `You've been following me!?`,
  text: `You've been following me!? This whole time!?`,
  statementName: FTU.FAMILIAR_FIGURE + ' - s1a',
  speechType: 'Aggressive'
});
sndConvoStatements[FTU.FAMILIAR_FIGURE + ' - s1a'] = new ConversationStatement({
  name: FTU.FAMILIAR_FIGURE + ' - s1a',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `What, did you think I was just going to let you run off into the desert after Dani and end up dead? Gods knew what you were thinking, although your clumsy trail was easy enough to follow. From now on it'll be me doing the exploring, and you doing the reading and counting and such. Less likely you'll get yourself killed that way.`,
  leaderJoins: LEADER_TYPES.SAMANNOUD
});
sndConvoResponses[FTU.FAMILIAR_FIGURE + ' - r0h'] = new ConversationResponse({
  name: FTU.FAMILIAR_FIGURE + ' - r0h',
  textIntro: `My legs needed a good stretch.`,
  text: `My legs needed a good stetch, but your concern is endearing.`,
  statementName: FTU.FAMILIAR_FIGURE + ' - s1h',
  speechType: 'Humorous'
});
sndConvoStatements[FTU.FAMILIAR_FIGURE + ' - s1h'] = new ConversationStatement({
  name: FTU.FAMILIAR_FIGURE + ' - s1h',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `Oh, that's how you'd like to play it? Your ripped clothes and sweat are giving you away, you know. From now on it'll be me doing the exploring, and you doing the reading and counting and such. Less likely you'll get yourself killed that way.`,
  leaderJoins: LEADER_TYPES.SAMANNOUD
});

sndConversations[CVS.SND_THRICE_LOCKED_TOME] = new Conversation({
  name: CVS.SND_THRICE_LOCKED_TOME,
  title: 'A Thrice Locked Tome',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  statementName: CVS.SND_THRICE_LOCKED_TOME + ' - s0',
  repeatable: false,
  daily: false,
  weight: 100,
  available: (gState: GameState) => {
    if (gState.vault?.resources[`${RTY.THRICE_LOCKED_TOME}|0`]) {
      if (gState.vault?.resources[`${RTY.THRICE_LOCKED_TOME}|0`].quantity >= 1) {
        return true;
      }
    }
    return false;
  }
});
sndConvoStatements[CVS.SND_THRICE_LOCKED_TOME + ' - s0'] = new ConversationStatement({
  name: CVS.SND_THRICE_LOCKED_TOME + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `What's that you've got?`,
  responseNames: [CVS.SND_THRICE_LOCKED_TOME + ' - r0']
});
sndConvoResponses[CVS.SND_THRICE_LOCKED_TOME + ' - r0'] = new ConversationResponse({
  name: CVS.SND_THRICE_LOCKED_TOME + ' - r0',
  textIntro: `It's a locked book.`,
  text: `It's a locked book. A thoroughly locked book. Can you make anything of it?`,
  statementName: CVS.SND_THRICE_LOCKED_TOME + ' - s1',
  requirementIcon: new Icon({ provider: 'svg', name: SVGS.TOME }),
  requirementLabel: RTY.THRICE_LOCKED_TOME,
  available: () => ( true )
});
sndConvoStatements[CVS.SND_THRICE_LOCKED_TOME + ' - s1'] = new ConversationStatement({
  name: CVS.SND_THRICE_LOCKED_TOME + ' - s1',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `I'm not one for books. But the clasps look familiar... Yes, here we are. This key's broken to pieces, but the metal looks to be the same. I found it in the caverns beneath the town, is that where you found the book?`,
  responseNames: [CVS.SND_THRICE_LOCKED_TOME + ' - r1c', CVS.SND_THRICE_LOCKED_TOME + ' - r1a', CVS.SND_THRICE_LOCKED_TOME + ' - r1h']
});
sndConvoResponses[CVS.SND_THRICE_LOCKED_TOME + ' - r1c'] = new ConversationResponse({
  name: CVS.SND_THRICE_LOCKED_TOME + ' - r1c',
  textIntro: `Sure did.`,
  text: `Sure did.`,
  statementName: CVS.SND_THRICE_LOCKED_TOME + ' - s2c',
  speechType: 'Calm'
});
sndConvoStatements[CVS.SND_THRICE_LOCKED_TOME + ' - s2c'] = new ConversationStatement({
  name: CVS.SND_THRICE_LOCKED_TOME + ' - s2c',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `Don't give me that look. We're equals in all this, right? I didn't tell you about the key right away, but I'm telling you about it now. No one's being secretive, not on purpose.`,
  gainResources: [{ specificity: RSP.EXACT, type: RTY.BROKEN_RED_KEY, value: 10000 }]
});
sndConvoResponses[CVS.SND_THRICE_LOCKED_TOME + ' - r1a'] = new ConversationResponse({
  name: CVS.SND_THRICE_LOCKED_TOME + ' - r1a',
  textIntro: `You didn't tell me anything about this!`,
  text: `You didn't tell me anything about this!`,
  statementName: CVS.SND_THRICE_LOCKED_TOME + ' - s2a',
  speechType: 'Aggressive'
});
sndConvoStatements[CVS.SND_THRICE_LOCKED_TOME + ' - s2a'] = new ConversationStatement({
  name: CVS.SND_THRICE_LOCKED_TOME + ' - s2a',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `Ok, ok, I didn't, that's true. I've got reasons for digging into this town, things that I'm not going to talk about. You do too, don't you? Here, take the key, and let's not worry about it.`,
  gainResources: [{ specificity: RSP.EXACT, type: RTY.BROKEN_RED_KEY, value: 10000 }]
});
sndConvoResponses[CVS.SND_THRICE_LOCKED_TOME + ' - r1h'] = new ConversationResponse({
  name: CVS.SND_THRICE_LOCKED_TOME + ' - r1h',
  textIntro: `Yeah, underground caves have the best reading material.`,
  text: `Yeah, underground caves have the best reading material.`,
  statementName: CVS.SND_THRICE_LOCKED_TOME + ' - s2h',
  speechType: 'Humorous'
});
sndConvoStatements[CVS.SND_THRICE_LOCKED_TOME + ' - s2h'] = new ConversationStatement({
  name: CVS.SND_THRICE_LOCKED_TOME + ' - s2h',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `They seem a little too convenient, don't they? Cool, dry, incredibly spacious? Makes sense that we'd both be doing some investigating. Anyway, the key's yours. Let me know what you learn.`,
  gainResources: [{ specificity: RSP.EXACT, type: RTY.BROKEN_RED_KEY, value: 10000 }]
});

sndConversations[CVS.SND_A_WOUND] = new Conversation({
  name: CVS.SND_A_WOUND,
  title: 'A Wound',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  statementName: CVS.SND_A_WOUND + ' - s0',
  repeatable: true,
  daily: true,
  weight: 1,
  available: (gState: GameState, conversation: Conversation) => {
    return dailyConversationUsed(gState, conversation);
  }
});
sndConvoStatements[CVS.SND_A_WOUND + ' - s0'] = new ConversationStatement({
  name: CVS.SND_A_WOUND + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `Hey, check out at my arm.`,
  responseNames: [CVS.SND_A_WOUND + ' - r0g', CVS.SND_A_WOUND + ' - r0c']
});
sndConvoResponses[CVS.SND_A_WOUND + ' - r0g'] = new ConversationResponse({
  name: CVS.SND_A_WOUND + ' - r0g',
  textIntro: `Hells, that looks terrible!`,
  text: `Hells, that looks terrible!`,
  statementName: CVS.SND_A_WOUND + ' - s1g'
});
sndConvoStatements[CVS.SND_A_WOUND + ' - s1g'] = new ConversationStatement({
  name: CVS.SND_A_WOUND + ' - s1g',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `Ha ha ha! Calm down kid, I've had much worse. Worth it to see the look on your face, though!`,
  responseNames: [CVS.SND_A_WOUND + ' - r1']
});
sndConvoResponses[CVS.SND_A_WOUND + ' - r0c'] = new ConversationResponse({
  name: CVS.SND_A_WOUND + ' - r0c',
  textIntro: `Let me take a closer look...`,
  text: `Let me take a closer look... Hold still, I can fix that up.`,
  statementName: CVS.SND_A_WOUND + ' - s1c',
  speechType: 'Calm'
});
sndConvoStatements[CVS.SND_A_WOUND + ' - s1c'] = new ConversationStatement({
  name: CVS.SND_A_WOUND + ' - s1c',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `Look at that! I was thinking I'd scare you and have a good laugh, but you took care of me! When did you get so cool headed, kid?`,
  responseNames: [CVS.SND_A_WOUND + ' - r1']
});
sndConvoResponses[CVS.SND_A_WOUND + ' - r1'] = new ConversationResponse({
  name: CVS.SND_A_WOUND + ' - r1',
  textIntro: `How'd you get wounded, anyway?`,
  text: `How'd you get wounded, anyway?`,
  statementName: CVS.SND_A_WOUND + ' - s2',
});
sndConvoStatements[CVS.SND_A_WOUND + ' - s2'] = new ConversationStatement({
  name: CVS.SND_A_WOUND + ' - s2',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `Oh, you know, a lot can go wrong in the desert. Coyotes, bandits, rock slides, Eternal Beasts... Don't give me that look. I can handle anything.`
});

export { sndConversations, sndConvoStatements, sndConvoResponses, sndConvoNarrations }
