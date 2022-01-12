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

let auwConversations: { [name: string] : Conversation } = {};
let auwConvoStatements: { [name: string] : ConversationStatement } = {};
let auwConvoResponses: { [name: string] : ConversationResponse } = {};
let auwConvoNarrations: { [name: string] : ConversationNarration } = {};

auwConversations[CVS.AUW_SAYING_HELLO] = new Conversation({
  name: CVS.AUW_SAYING_HELLO,
  title: 'Saying Hello',
  partnerKind: 'leader', partnerType: LEADER_TYPES.AUSPICIOUS_WAIF,
  statementName: CVS.AUW_SAYING_HELLO + ' - s0',
  repeatable: true,
  daily: false,
  weight: 0,
  available: () => ( true )
});
auwConvoStatements[CVS.AUW_SAYING_HELLO + ' - s0'] = new ConversationStatement({
  name: CVS.AUW_SAYING_HELLO + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.AUSPICIOUS_WAIF,
  text: `How's it going, boss? Staying productive? The ink on your fingers says yes.`
});

auwConversations[FTU.SLIGHT_FIGURE] = new Conversation({
  name: FTU.SLIGHT_FIGURE,
  title: 'A Slight Figure',
  partnerKind: 'leader', partnerType: LEADER_TYPES.AUSPICIOUS_WAIF,
  statementName: FTU.SLIGHT_FIGURE + ' - s0',
  repeatable: false,
  daily: false,
  weight: 0,
  available: () => ( false )
});
auwConvoStatements[FTU.SLIGHT_FIGURE + ' - s0'] = new ConversationStatement({
  name: FTU.SLIGHT_FIGURE + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.AUSPICIOUS_WAIF,
  text: `Hey, boss. Just wanting to say I appreciate the educating. Never thought I had any use for book learning, but I can't keep from rolling around all of it in my head. Had some thoughts about that, er, algebra proof you showed us. Mind taking a look?`,
  responseNames: [FTU.SLIGHT_FIGURE + ' - r0c', FTU.SLIGHT_FIGURE + ' - r0a',
    FTU.SLIGHT_FIGURE + ' - r0h']
});
auwConvoResponses[FTU.SLIGHT_FIGURE + ' - r0c'] = new ConversationResponse({
  name: FTU.SLIGHT_FIGURE + ' - r0c',
  textIntro: `This is excellent work!`,
  text: `This is excellent work! You should be proud.`,
  statementName: FTU.SLIGHT_FIGURE + ' - s1c',
  speechType: 'Calm'
});
auwConvoStatements[FTU.SLIGHT_FIGURE + ' - s1c'] = new ConversationStatement({
  name: FTU.SLIGHT_FIGURE + ' - s1c',
  partnerKind: 'leader', partnerType: LEADER_TYPES.AUSPICIOUS_WAIF,
  text: `I don't know about all that... Kind of you to say, but I'm new to all this. New, but getting better.

Speaking of which, I've been talking these things over with some of the young folk from the trading caravans. I'm getting a crew of my own going. Assuming that'd be alright with you, boss.`,
  leaderJoins: LEADER_TYPES.AUSPICIOUS_WAIF
});
auwConvoResponses[FTU.SLIGHT_FIGURE + ' - r0a'] = new ConversationResponse({
  name: FTU.SLIGHT_FIGURE + ' - r0a',
  textIntro: `You're doing algebra for fun?`,
  text: `You're doing algebra for fun?`,
  statementName: FTU.SLIGHT_FIGURE + ' - s1a',
  speechType: 'Aggressive'
});
auwConvoStatements[FTU.SLIGHT_FIGURE + ' - s1a'] = new ConversationStatement({
  name: FTU.SLIGHT_FIGURE + ' - s1a',
  partnerKind: 'leader', partnerType: LEADER_TYPES.AUSPICIOUS_WAIF,
  text: `I'm as surprised as you are. And it's not fun, exactly... It's like I can't help it. I need to know what I'm capable of.

Speaking of which, I've been talking these things over with some of the young folk from the trading caravans. I'm getting a crew of my own going. Assuming that'd be alright with you, boss.`,
  leaderJoins: LEADER_TYPES.AUSPICIOUS_WAIF
});
auwConvoResponses[FTU.SLIGHT_FIGURE + ' - r0h'] = new ConversationResponse({
  name: FTU.SLIGHT_FIGURE + ' - r0h',
  textIntro: `Nicely done, but... Where'd you get the parchment?`,
  text: `Nicely done, but... Where'd you get the parchment?`,
  statementName: FTU.SLIGHT_FIGURE + ' - s1h',
  speechType: 'Humorous'
});
auwConvoStatements[FTU.SLIGHT_FIGURE + ' - s1h'] = new ConversationStatement({
  name: FTU.SLIGHT_FIGURE + ' - s1h',
  partnerKind: 'leader', partnerType: LEADER_TYPES.AUSPICIOUS_WAIF,
  text: `Haha, you got me there. It came from an oasis town, before I arrived here. An... Unwitting donation to the next generation.

Speaking of which, I've been talking things over with some of the young folk from the trading caravans. I'm getting a crew of my own going. Assuming that'd be alright with you, boss.`,
  leaderJoins: LEADER_TYPES.AUSPICIOUS_WAIF
});

auwConversations[CVS.AUW_A_BROKEN_KEY] = new Conversation({
  name: CVS.AUW_A_BROKEN_KEY,
  title: 'A Broken Key',
  partnerKind: 'leader', partnerType: LEADER_TYPES.AUSPICIOUS_WAIF,
  statementName: CVS.AUW_A_BROKEN_KEY + ' - s0',
  repeatable: false,
  daily: false,
  weight: 1000,
  available: (gState: GameState) => {
    if (gState.vault?.resources[`${RTY.RED_KEY}|0`]) {
      if (gState.vault?.resources[`${RTY.RED_KEY}|0`].quantity >= 1) {
        return true;
      }
    }
    return false;
  }
});
auwConvoStatements[CVS.AUW_A_BROKEN_KEY + ' - s0'] = new ConversationStatement({
  name: CVS.AUW_A_BROKEN_KEY + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.AUSPICIOUS_WAIF,
  text: `Great timing, boss. Got something to tell you.`,
  responseNames: [CVS.AUW_A_BROKEN_KEY + ' - r0']
});
auwConvoResponses[CVS.AUW_A_BROKEN_KEY + ' - r0'] = new ConversationResponse({
  name: CVS.AUW_A_BROKEN_KEY + ' - r0',
  textIntro: `What's that?`,
  text: `What's that?`,
  statementName: CVS.AUW_A_BROKEN_KEY + ' - s1',
});
auwConvoStatements[CVS.AUW_A_BROKEN_KEY + ' - s1'] = new ConversationStatement({
  name: CVS.AUW_A_BROKEN_KEY + ' - s1',
  partnerKind: 'leader', partnerType: LEADER_TYPES.AUSPICIOUS_WAIF,
  text: `Well, me and some of my crew were taking a crate of supplies down to the storage caverns when I happened upon something strange. Looked like a locket made of a funny red metal, but on the inside wasn't a picture or a piece of hair, but this key. I didn't break it though, it looked like this when I took it out, swear on my mum.`,
  responseNames: [CVS.AUW_A_BROKEN_KEY + ' - r1c', CVS.AUW_A_BROKEN_KEY + ' - r1a',
    CVS.AUW_A_BROKEN_KEY + ' - r1h']
});
auwConvoResponses[CVS.AUW_A_BROKEN_KEY + ' - r1c'] = new ConversationResponse({
  name: CVS.AUW_A_BROKEN_KEY + ' - r1c',
  textIntro: `I believe you.`,
  text: `I believe you. Of course you didn't break it.`,
  statementName: CVS.AUW_A_BROKEN_KEY + ' - s2c',
  speechType: 'Calm'
});
auwConvoResponses[CVS.AUW_A_BROKEN_KEY + ' - r1a'] = new ConversationResponse({
  name: CVS.AUW_A_BROKEN_KEY + ' - r1a',
  textIntro: `Hand it over.`,
  text: `Hand it over, then.`,
  statementName: CVS.AUW_A_BROKEN_KEY + ' - s2',
  speechType: 'Aggressive'
});
auwConvoResponses[CVS.AUW_A_BROKEN_KEY + ' - r1h'] = new ConversationResponse({
  name: CVS.AUW_A_BROKEN_KEY + ' - r1h',
  textIntro: `These keys do seem awfully breakable.`,
  text: `These keys do seem awfully breakable. I wouldn't worry about it.`,
  statementName: CVS.AUW_A_BROKEN_KEY + ' - s2c',
  speechType: 'Humorous'
});
auwConvoStatements[CVS.AUW_A_BROKEN_KEY + ' - s2c'] = new ConversationStatement({
  name: CVS.AUW_A_BROKEN_KEY + ' - s2c',
  partnerKind: 'leader', partnerType: LEADER_TYPES.AUSPICIOUS_WAIF,
  text: `Thank you for saying so, boss. Only... I wish you would take it. Having it in my pocket gives me the queerest feeling, like it's sitting in there, dreaming.`,
  gainResources: [{ specificity: RSP.EXACT, type: RTY.BROKEN_RED_KEY, value: 10000 }]
});
auwConvoStatements[CVS.AUW_A_BROKEN_KEY + ' - s2a'] = new ConversationStatement({
  name: CVS.AUW_A_BROKEN_KEY + ' - s2a',
  partnerKind: 'leader', partnerType: LEADER_TYPES.AUSPICIOUS_WAIF,
  text: `Alright boss, its yours. To tell true, I'm glad you're taking it. Having it in my pocket gives me the queerest feeling, like it's sitting in there, dreaming.`,
  gainResources: [{ specificity: RSP.EXACT, type: RTY.BROKEN_RED_KEY, value: 10000 }]
});

export { auwConversations, auwConvoStatements, auwConvoResponses, auwConvoNarrations }
