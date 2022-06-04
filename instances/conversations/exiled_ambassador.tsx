import { Conversation, ConversationStatement, ConversationResponse,
  ConversationNarration, dailyConversationUsed } from '../../models/conversation';
import Icon from '../../models/icon';
import { GameState } from '../../models/game_state';
import { CONVERSATIONS } from '../../enums/conversations';
import { FORTUITIES } from '../../enums/fortuities';
const FTU = FORTUITIES;
import { LEADER_TYPES } from '../../enums/leader_types';
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

let exaConversations: { [name: string] : Conversation } = {};
let exaConvoStatements: { [name: string] : ConversationStatement } = {};
let exaConvoResponses: { [name: string] : ConversationResponse } = {};
let exaConvoNarrations: { [name: string] : ConversationNarration } = {};

exaConversations[FTU.BELLIGERENT_FIGURE] = new Conversation({
  name: FTU.BELLIGERENT_FIGURE,
  title: 'A Belligerent Figure',
  partnerKind: 'leader', partnerType: LEADER_TYPES.EXILED_AMBASSADOR,
  statementName: FTU.BELLIGERENT_FIGURE + ' - s0',
  repeatable: false,
  daily: false,
  weight: 0,
  available: () => ( false )
});
exaConvoStatements[FTU.BELLIGERENT_FIGURE + ' - s0'] = new ConversationStatement({
  name: FTU.BELLIGERENT_FIGURE + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `I found the stranded person, but it's worse than I could have imagined.`,
  responseNames: [FTU.BELLIGERENT_FIGURE + ' - r0']
});
exaConvoResponses[FTU.BELLIGERENT_FIGURE + ' - r0'] = new ConversationResponse({
  name: FTU.BELLIGERENT_FIGURE + ' - r0',
  textIntro: `Worse than you could have imagined?`,
  text: `Worse than you could have imagined? Better get this over with, then.`,
  narrationName: FTU.BELLIGERENT_FIGURE + ' - n1'
});
exaConvoNarrations[FTU.BELLIGERENT_FIGURE + ' - n1'] = new ConversationNarration({
  name: FTU.BELLIGERENT_FIGURE + ' - n1',
  text: `As Samannoud walks away, head shaking, you see someone else walking in your direction from a moderate distance away. It's someone you know... Unfortunately, it's someone you certainly know.`,
  statementName: FTU.BELLIGERENT_FIGURE + ' - s1'
});
exaConvoStatements[FTU.BELLIGERENT_FIGURE + ' - s1'] = new ConversationStatement({
  name: FTU.BELLIGERENT_FIGURE + ' - s1',
  partnerKind: 'leader', partnerType: LEADER_TYPES.EXILED_AMBASSADOR,
  text: `You? It's you? Isn't that just a twist of fate. I don't know why you sent your person - your guard, or guide, or whatever they are - to "rescue" me.

I have nothing to be rescued from except my banishment from Alabaster, and who's supposed to help me with that? A runaway youngest child playing lord over a collection of filty huts? How is rotting here any better than wandering eternally through the desert?`,
  responseNames: [FTU.BELLIGERENT_FIGURE + ' - r1c', FTU.BELLIGERENT_FIGURE + ' - r1a', FTU.BELLIGERENT_FIGURE + ' - r1h']
});

exaConvoResponses[FTU.BELLIGERENT_FIGURE + ' - r1c'] = new ConversationResponse({
  name: FTU.BELLIGERENT_FIGURE + ' - r1c',
  textIntro: `Your situation in the city can't be that hopeless.`,
  text: `Your situation in the city can't be that hopeless.`,
  statementName: FTU.BELLIGERENT_FIGURE + ' - s2c',
  speechType: 'Calm'
});
exaConvoStatements[FTU.BELLIGERENT_FIGURE + ' - s2c'] = new ConversationStatement({
  name: FTU.BELLIGERENT_FIGURE + ' - s2c',
  partnerKind: 'leader', partnerType: LEADER_TYPES.EXILED_AMBASSADOR,
  text: `Oh, but it is. I had a... Tryst with the heir to the Sultanate of Candles. I thought it was understood to be a frivolous, simple thing. But she very obviously disagreed, and now I wallow in dirt.`,
  responseNames: [FTU.BELLIGERENT_FIGURE + ' - r2c']
});

exaConvoResponses[FTU.BELLIGERENT_FIGURE + ' - r1a'] = new ConversationResponse({
  name: FTU.BELLIGERENT_FIGURE + ' - r1a',
  textIntro: `You would have died out there.`,
  text: `You would have died out there.`,
  statementName: FTU.BELLIGERENT_FIGURE + ' - s2a',
  speechType: 'Aggressive'
});
exaConvoStatements[FTU.BELLIGERENT_FIGURE + ' - s2a'] = new ConversationStatement({
  name: FTU.BELLIGERENT_FIGURE + ' - s2a',
  partnerKind: 'leader', partnerType: LEADER_TYPES.EXILED_AMBASSADOR,
  text: `And what an improvement that would have been. Do you know what has happened to me? I had a... Tryst with the heir to the Sultanate of Candles. I thought it was understood to be a frivolous, simple thing. But she very obviously disagreed, and now I wallow in dirt.`,
  responseNames: [FTU.BELLIGERENT_FIGURE + ' - r2a']
});

exaConvoResponses[FTU.BELLIGERENT_FIGURE + ' - r1h'] = new ConversationResponse({
  name: FTU.BELLIGERENT_FIGURE + ' - r1h',
  textIntro: `Say what you want, I don't see you leaving.`,
  text: `Say what you want, I don't see you leaving.`,
  statementName: FTU.BELLIGERENT_FIGURE + ' - s2h',
  speechType: 'Humorous'
});
exaConvoStatements[FTU.BELLIGERENT_FIGURE + ' - s2h'] = new ConversationStatement({
  name: FTU.BELLIGERENT_FIGURE + ' - s2h',
  partnerKind: 'leader', partnerType: LEADER_TYPES.EXILED_AMBASSADOR,
  text: `Only because I no longer have the drive to move in any direction. Do you know what has happened to me? I had a... Tryst with the heir to the Sultanate of Candles. I thought it was understood to be a frivolous, simple thing. But she very obviously disagreed, and now I wallow in dirt.`,
  responseNames: [FTU.BELLIGERENT_FIGURE + ' - r2h']
});

exaConvoResponses[FTU.BELLIGERENT_FIGURE + ' - r2c'] = new ConversationResponse({
  name: FTU.BELLIGERENT_FIGURE + ' - r2c',
  textIntro: `Don't be so dramatic. I could use someone like you...`,
  text: `Don't be so dramatic. I could use someone like you, someone to form connections in Alabaster.`,
  statementName: FTU.BELLIGERENT_FIGURE + ' - s3c'
});
exaConvoStatements[FTU.BELLIGERENT_FIGURE + ' - s3c'] = new ConversationStatement({
  name: FTU.BELLIGERENT_FIGURE + ' - s3c',
  partnerKind: 'leader', partnerType: LEADER_TYPES.EXILED_AMBASSADOR,
  text: `Is that how low you yourself have reached? So exiled that you have to use another exile as an ambassador?

The folly my life has become.`,
  leaderJoins: LEADER_TYPES.EXILED_AMBASSADOR
});

exaConvoResponses[FTU.BELLIGERENT_FIGURE + ' - r2a'] = new ConversationResponse({
  name: FTU.BELLIGERENT_FIGURE + ' - r2a',
  textIntro: `How pathetic. You're giving up?`,
  text: `How pathetic. You're giving up on the entirety of your life, without any fight at all?`,
  statementName: FTU.BELLIGERENT_FIGURE + ' - s3a'
});
exaConvoStatements[FTU.BELLIGERENT_FIGURE + ' - s3a'] = new ConversationStatement({
  name: FTU.BELLIGERENT_FIGURE + ' - s3a',
  partnerKind: 'leader', partnerType: LEADER_TYPES.EXILED_AMBASSADOR,
  text: `Oh yes, fight. That's how it's done out here in the deep sands, is it? Should I take a saber and charge the gleaming gates of Alabaster, demanding to have my birthright reinstated? No, I will wallow.

And since you brought me here, I suppose you're responsible for that.`,
  leaderJoins: LEADER_TYPES.EXILED_AMBASSADOR
});

exaConvoResponses[FTU.BELLIGERENT_FIGURE + ' - r2h'] = new ConversationResponse({
  name: FTU.BELLIGERENT_FIGURE + ' - r2h',
  textIntro: `Wallow here, and you can use mud rather than dirt.`,
  text: `Wallow here, and you can use mud rather than dirt. The desert is awfully dry.`,
  statementName: FTU.BELLIGERENT_FIGURE + ' - s3h'
});
exaConvoStatements[FTU.BELLIGERENT_FIGURE + ' - s3h'] = new ConversationStatement({
  name: FTU.BELLIGERENT_FIGURE + ' - s3h',
  partnerKind: 'leader', partnerType: LEADER_TYPES.EXILED_AMBASSADOR,
  text: `And what a magnificant consolation that is. No, no, I understand your crude point. Die in the desert, or live here in squalor.

Wallow in mud, indeed. The folly my life has become.`,
  leaderJoins: LEADER_TYPES.EXILED_AMBASSADOR
});

export { exaConversations, exaConvoStatements, exaConvoResponses, exaConvoNarrations }
