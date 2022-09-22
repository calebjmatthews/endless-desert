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
import { QUESTS } from '../../enums/quests';
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
  text: `You don't see how anyone you know could have followed your winding path, but there's a silhouette in the distance, and it's coming closer. And there's something about the swaggering walk that feels very familiar.`,
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

sndConversations[CVS.SND_A_STRANDED_STRANGER] = new Conversation({
  name: CVS.SND_A_STRANDED_STRANGER,
  title: 'A Stranded Stranger',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  statementName: CVS.SND_A_STRANDED_STRANGER + ' - s0',
  repeatable: false,
  daily: false,
  weight: 1000,
  available: (gState: GameState, conversation: Conversation) => {
    return ((gState.vault?.resources[`${RTY.KNOWLEDGE}|0`].quantity || 0) > 5000);
  }
});
sndConvoStatements[CVS.SND_A_STRANDED_STRANGER + ' - s0'] = new ConversationStatement({
  name: CVS.SND_A_STRANDED_STRANGER + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `I saw something out to the west this morning: a trail of smoke from what must have been a stunted campfire. It's not easy country there, even a half-day's travel from our walls. What do you think kid, should I go check it out?`,
  responseNames: [CVS.SND_A_STRANDED_STRANGER + ' - r0c',
    CVS.SND_A_STRANDED_STRANGER + ' - r0a', CVS.SND_A_STRANDED_STRANGER + ' - r0h']
});
sndConvoResponses[CVS.SND_A_STRANDED_STRANGER + ' - r0c'] = new ConversationResponse({
  name: CVS.SND_A_STRANDED_STRANGER + ' - r0c',
  textIntro: `Absolutely, we can't leave a stranger to die.`,
  text: `Absolutely, we can't leave a stranger to die when there's something we could do to help.`,
  statementName: CVS.SND_A_STRANDED_STRANGER + ' - s1c',
  speechType: 'Calm'
});
sndConvoStatements[CVS.SND_A_STRANDED_STRANGER + ' - s1c'] = new ConversationStatement({
  name: CVS.SND_A_STRANDED_STRANGER + ' - s1c',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `Couldn't have said it better.`,
  responseNames: [CVS.SND_A_STRANDED_STRANGER + ' - r1c']
});
sndConvoResponses[CVS.SND_A_STRANDED_STRANGER + ' - r1c'] = new ConversationResponse({
  name: CVS.SND_A_STRANDED_STRANGER + ' - r1c',
  textIntro: `What do you need to save them?`,
  text: `What do you need to save them?`,
  statementName: CVS.SND_A_STRANDED_STRANGER + ' - s2'
});
sndConvoResponses[CVS.SND_A_STRANDED_STRANGER + ' - r0a'] = new ConversationResponse({
  name: CVS.SND_A_STRANDED_STRANGER + ' - r0a',
  textIntro: `Go if you'd like, you don't need my permission.`,
  text: `Go if you'd like, you don't need my permission.`,
  statementName: CVS.SND_A_STRANDED_STRANGER + ' - s1a',
  speechType: 'Aggressive'
});
sndConvoStatements[CVS.SND_A_STRANDED_STRANGER + ' - s1a'] = new ConversationStatement({
  name: CVS.SND_A_STRANDED_STRANGER + ' - s1a',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `I will go. And you'll help.`,
  responseNames: [CVS.SND_A_STRANDED_STRANGER + ' - r1a']
});
sndConvoResponses[CVS.SND_A_STRANDED_STRANGER + ' - r1a'] = new ConversationResponse({
  name: CVS.SND_A_STRANDED_STRANGER + ' - r1a',
  textIntro: `Is that so? How kind of me.`,
  text: `Is that so? How kind of me.`,
  statementName: CVS.SND_A_STRANDED_STRANGER + ' - s2'
});
sndConvoResponses[CVS.SND_A_STRANDED_STRANGER + ' - r0h'] = new ConversationResponse({
  name: CVS.SND_A_STRANDED_STRANGER + ' - r0h',
  textIntro: `Samannoud, are you getting soft?`,
  text: `Samannoud, are you getting soft?`,
  statementName: CVS.SND_A_STRANDED_STRANGER + ' - s1h',
  speechType: 'Humorous'
});
sndConvoStatements[CVS.SND_A_STRANDED_STRANGER + ' - s1h'] = new ConversationStatement({
  name: CVS.SND_A_STRANDED_STRANGER + ' - s1h',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `Maybe so. Maybe it was seeing a certain defenseless childhood friend almost kill themselves by wandering into the desert.`,
  responseNames: [CVS.SND_A_STRANDED_STRANGER + ' - r1h']
});
sndConvoResponses[CVS.SND_A_STRANDED_STRANGER + ' - r1h'] = new ConversationResponse({
  name: CVS.SND_A_STRANDED_STRANGER + ' - r1h',
  textIntro: `Alright, point taken. What do you need?`,
  text: `Alright, point taken. What do you need?`,
  statementName: CVS.SND_A_STRANDED_STRANGER + ' - s2'
});
sndConvoStatements[CVS.SND_A_STRANDED_STRANGER + ' - s2'] = new ConversationStatement({
  name: CVS.SND_A_STRANDED_STRANGER + ' - s2',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `I have plenty of gear for myself, but I'll need provisions. Water, and some salt-dried food that won't spoil in the heat. Let me know when you have them gathered and I'll leave at once.`,
  questsBegin: [QUESTS.OPPORTUNITY_A_STRANDED_STRANGER]
});

sndConversations[CVS.SND_GETTING_SERIOUS] = new Conversation({
  name: CVS.SND_GETTING_SERIOUS,
  title: 'Getting Serious',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  statementName: CVS.SND_GETTING_SERIOUS + ' - s0',
  repeatable: false,
  daily: false,
  weight: 1000,
  available: (gState: GameState, conversation: Conversation) => {
    return (gState.questStatus?.questsCompleted?.[QUESTS.EARLY_DAYS_MARK_EQUIPMENT]
      !== undefined);
  }
});
sndConvoStatements[CVS.SND_GETTING_SERIOUS + ' - s0'] = new ConversationStatement({
  name: CVS.SND_GETTING_SERIOUS + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `Alright kid, it's time we had a heart-to-heart. I don't mean to question your resolve here. You dashed off into the desert like you had a death wish, after all. But if you're serious about finding your brother, we'll need supplies. Provisions, maps, cutting tools, rope...`,
  responseNames: [CVS.SND_GETTING_SERIOUS + ' - r0c',
    CVS.SND_GETTING_SERIOUS + ' - r0a', CVS.SND_GETTING_SERIOUS + ' - r0h']
});
sndConvoResponses[CVS.SND_GETTING_SERIOUS + ' - r0c'] = new ConversationResponse({
  name: CVS.SND_GETTING_SERIOUS + ' - r0c',
  textIntro: `How are we going to get all that?`,
  text: `How are we going to get all that?`,
  statementName: CVS.SND_GETTING_SERIOUS + ' - s1c',
  speechType: 'Calm'
});
sndConvoStatements[CVS.SND_GETTING_SERIOUS + ' - s1c'] = new ConversationStatement({
  name: CVS.SND_GETTING_SERIOUS + ' - s1c',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `If I still had access to your father's wealth and connections, I could pull it together in a day. But that time is behind both of us, eh? So it's up to you.

We'll need fuel for smelting metal, and plenty of it. Not Reeds, those burn as fast as breathing. Decent fuel. Let's start there.`,
  questsBegin: [QUESTS.ASTRONOMY_POTENT_FUEL]
});
sndConvoResponses[CVS.SND_GETTING_SERIOUS + ' - r0a'] = new ConversationResponse({
  name: CVS.SND_GETTING_SERIOUS + ' - r0a',
  textIntro: `Leave it to me.`,
  text: `Leave it to me. I'll make this town can produce everything we need.`,
  statementName: CVS.SND_GETTING_SERIOUS + ' - s1a',
  speechType: 'Aggressive'
});
sndConvoStatements[CVS.SND_GETTING_SERIOUS + ' - s1a'] = new ConversationStatement({
  name: CVS.SND_GETTING_SERIOUS + ' - s1a',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `If I still had access to your father's wealth and connections, I could pull it together in a day. But that time is behind both of us, eh? So as you say, it's up to you.

We'll need fuel for smelting metal, and plenty of it. Not Reeds, those burn as fast as breathing. Decent fuel. Let's start there.`,
  questsBegin: [QUESTS.ASTRONOMY_POTENT_FUEL]
});
sndConvoResponses[CVS.SND_GETTING_SERIOUS + ' - r0h'] = new ConversationResponse({
  name: CVS.SND_GETTING_SERIOUS + ' - r0h',
  textIntro: `I think I know where you're going with this...`,
  text: `I think I know where you're going with this, and I suspect it involves a lot of work. For me.`,
  statementName: CVS.SND_GETTING_SERIOUS + ' - s1h',
  speechType: 'Humorous'
});
sndConvoStatements[CVS.SND_GETTING_SERIOUS + ' - s1h'] = new ConversationStatement({
  name: CVS.SND_GETTING_SERIOUS + ' - s1h',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `If I still had access to your father's wealth and connections, I could pull it together in a day. But that time is behind both of us, eh? So as you say, you've got a lot of work ahead of you.

We'll need fuel for smelting metal, and plenty of it. Not Reeds, those burn as fast as breathing. Decent fuel. Let's start there.`,
  questsBegin: [QUESTS.ASTRONOMY_POTENT_FUEL]
});

sndConversations[CVS.SND_THE_GRINDING_MILL] = new Conversation({
  name: CVS.SND_THE_GRINDING_MILL,
  title: 'The Grinding Mill',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  statementName: CVS.SND_THE_GRINDING_MILL + ' - s0',
  repeatable: false,
  daily: false,
  weight: 1000,
  available: (gState: GameState, conversation: Conversation) => {
    const qs = gState.questStatus;
    return (qs?.questsCompleted[QUESTS.ASTRONOMY_POTENT_FUEL] !== undefined
      && qs?.questsCompleted[QUESTS.ASTRONOMY_THE_GRINDING_MILL] === undefined
      && qs?.quests[QUESTS.ASTRONOMY_THE_GRINDING_MILL] === undefined);
  }
});
sndConvoStatements[CVS.SND_THE_GRINDING_MILL + ' - s0'] = new ConversationStatement({
  name: CVS.SND_THE_GRINDING_MILL + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `Charcoal, check?`,
  responseNames: [CVS.SND_THE_GRINDING_MILL + ' - r0']
});
sndConvoResponses[CVS.SND_THE_GRINDING_MILL + ' - r0'] = new ConversationResponse({
  name: CVS.SND_THE_GRINDING_MILL + ' - r0',
  textIntro: `Charcoal, check.`,
  text: `Charcoal, check.`,
  statementName: CVS.SND_THE_GRINDING_MILL + ' - s1'
});
sndConvoStatements[CVS.SND_THE_GRINDING_MILL + ' - s1'] = new ConversationStatement({
  name: CVS.SND_THE_GRINDING_MILL + ' - s1',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `Good, good. Melting metal ore will be shoddy work until we have a Grinding Mill, so let's do that next. You'll need ten Crude Iron to make the mill, but try not to smelt any more than that directly from the ore.`,
  questsBegin: [QUESTS.ASTRONOMY_THE_GRINDING_MILL]
});

sndConversations[CVS.SND_IMPLEMENTS_FOR_EXPLORATION] = new Conversation({
  name: CVS.SND_IMPLEMENTS_FOR_EXPLORATION,
  title: 'Implements for Exploration',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  statementName: CVS.SND_IMPLEMENTS_FOR_EXPLORATION + ' - s0',
  repeatable: false,
  daily: false,
  weight: 1000,
  available: (gState: GameState, conversation: Conversation) => {
    const qs = gState.questStatus;
    return (qs?.questsCompleted[QUESTS.ASTRONOMY_THE_GRINDING_MILL] !== undefined
      && qs?.questsCompleted[QUESTS.ASTRONOMY_IMPLEMENTS_FOR_EXPLORATION] === undefined
      && qs?.quests[QUESTS.ASTRONOMY_IMPLEMENTS_FOR_EXPLORATION] === undefined);
  }
});
sndConvoStatements[CVS.SND_IMPLEMENTS_FOR_EXPLORATION + ' - s0'] =
new ConversationStatement({
  name: CVS.SND_IMPLEMENTS_FOR_EXPLORATION + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `Metal grinding, check?`,
  responseNames: [CVS.SND_IMPLEMENTS_FOR_EXPLORATION + ' - r0']
});
sndConvoResponses[CVS.SND_IMPLEMENTS_FOR_EXPLORATION + ' - r0'] =
new ConversationResponse({
  name: CVS.SND_IMPLEMENTS_FOR_EXPLORATION + ' - r0',
  textIntro: `Metal grinding, check.`,
  text: `Metal grinding, check.`,
  statementName: CVS.SND_IMPLEMENTS_FOR_EXPLORATION + ' - s1'
});
sndConvoStatements[CVS.SND_IMPLEMENTS_FOR_EXPLORATION + ' - s1'] =
new ConversationStatement({
  name: CVS.SND_IMPLEMENTS_FOR_EXPLORATION + ' - s1',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `Ok, good. That one was a big step; now the town can make the tools we'll need to scour the desert. We'll need a variety, and in quantity. Might as well get those made now.`,
  questsBegin: [QUESTS.ASTRONOMY_IMPLEMENTS_FOR_EXPLORATION]
});

sndConversations[CVS.SND_REPAIRING_THE_DOME] = new Conversation({
  name: CVS.SND_REPAIRING_THE_DOME,
  title: 'Repairing the Dome',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  statementName: CVS.SND_REPAIRING_THE_DOME + ' - s0',
  repeatable: false,
  daily: false,
  weight: 1000,
  available: (gState: GameState, conversation: Conversation) => {
    const qs = gState.questStatus;
    return (qs?.questsCompleted[QUESTS.ASTRONOMY_IMPLEMENTS_FOR_EXPLORATION]
        !== undefined
      && qs?.questsCompleted[QUESTS.ASTRONOMY_REPAIRING_THE_DOME] === undefined
      && qs?.quests[QUESTS.ASTRONOMY_REPAIRING_THE_DOME] === undefined);
  }
});
sndConvoStatements[CVS.SND_REPAIRING_THE_DOME + ' - s0'] =
new ConversationStatement({
  name: CVS.SND_REPAIRING_THE_DOME + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `Tools, ch--`,
  responseNames: [CVS.SND_REPAIRING_THE_DOME + ' - r0']
});
sndConvoResponses[CVS.SND_REPAIRING_THE_DOME + ' - r0'] =
new ConversationResponse({
  name: CVS.SND_REPAIRING_THE_DOME + ' - r0',
  textIntro: `Tools, check!`,
  text: `Tools, check!`,
  statementName: CVS.SND_REPAIRING_THE_DOME + ' - s1'
});
sndConvoStatements[CVS.SND_REPAIRING_THE_DOME + ' - s1'] =
new ConversationStatement({
  name: CVS.SND_REPAIRING_THE_DOME + ' - s1',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `Ha ha, yes. You've made torches, blades, rope, the whole set.

The next part, though, won't be easy. By now you've guessed what that beat up dome-shaped building was for, am I right? With that Observatory repaired you'll be able to draw up starcharts. No other way to tell where you're going in the deep desert.`,
  questsBegin: [QUESTS.ASTRONOMY_REPAIRING_THE_DOME]
});

sndConversations[CVS.SND_BEASTS_OF_BURDEN] = new Conversation({
  name: CVS.SND_BEASTS_OF_BURDEN,
  title: 'Beasts of Burden',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  statementName: CVS.SND_BEASTS_OF_BURDEN + ' - s0',
  repeatable: false,
  daily: false,
  weight: 1000,
  available: (gState: GameState, conversation: Conversation) => {
    const qs = gState.questStatus;

    return (qs?.questsCompleted[QUESTS.ASTRONOMY_REPAIRING_THE_DOME] !== undefined);
  }
});
sndConvoStatements[CVS.SND_BEASTS_OF_BURDEN + ' - s0'] =
new ConversationStatement({
  name: CVS.SND_BEASTS_OF_BURDEN + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `You've repaired the busted Observatory?`,
  responseNames: [CVS.SND_BEASTS_OF_BURDEN + ' - r0']
});
sndConvoResponses[CVS.SND_BEASTS_OF_BURDEN + ' - r0'] =
new ConversationResponse({
  name: CVS.SND_BEASTS_OF_BURDEN + ' - r0',
  textIntro: `It's good as new.`,
  text: `It's good as new.`,
  statementName: CVS.SND_BEASTS_OF_BURDEN + ' - s1'
});
sndConvoStatements[CVS.SND_BEASTS_OF_BURDEN + ' - s1'] =
new ConversationStatement({
  name: CVS.SND_BEASTS_OF_BURDEN + ' - s1',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `Beautiful. You'll want to start using it to chart out potential locations. No, don't know the details myself, but you're a smart kid. I'm sure you'll figure it out.

We're only missing one final thing, but it's the most important. We need a ride; beasts to carry us through the desert! There's one group of Dromedary breeders that has cornerned the market, so we have no choice but to go through them. You can imagine what that means for the price. I'll send them a message, and you'll see them soon.`
});

sndConversations[CVS.SND_THE_FIRST_EXPEDITION] = new Conversation({
  name: CVS.SND_THE_FIRST_EXPEDITION,
  title: 'The First Expedition',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  statementName: CVS.SND_THE_FIRST_EXPEDITION + ' - s0',
  repeatable: false,
  daily: false,
  weight: 1000,
  available: (gState: GameState, conversation: Conversation) => {
    return ((gState.vault?.getSubcategoryQuantity(RSC.DROMEDARY, 0, 2) || 0) > 0);
  }
});
sndConvoStatements[CVS.SND_THE_FIRST_EXPEDITION + ' - s0'] =
new ConversationStatement({
  name: CVS.SND_THE_FIRST_EXPEDITION + ' - s0',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `You've got a set of Dromedaries? We'll need 'em for desert travel, unless you're prepared to carry a literal barrel of water on your back.`,
  responseNames: [CVS.SND_THE_FIRST_EXPEDITION + ' - r0']
});
sndConvoResponses[CVS.SND_THE_FIRST_EXPEDITION + ' - r0'] =
new ConversationResponse({
  name: CVS.SND_THE_FIRST_EXPEDITION + ' - r0',
  textIntro: `We've got them, and they were expensive!`,
  text: `We've got them, and they were expensive!`,
  statementName: CVS.SND_THE_FIRST_EXPEDITION + ' - s1'
});
sndConvoStatements[CVS.SND_THE_FIRST_EXPEDITION + ' - s1'] =
new ConversationStatement({
  name: CVS.SND_THE_FIRST_EXPEDITION + ' - s1',
  partnerKind: 'leader', partnerType: LEADER_TYPES.SAMANNOUD,
  text: `Do you know what this means? It's time to load up our gear, fasten our belts, and scour the desert until we bring your brother back safe and sound. It's been a long time, at this point, but I hope you haven't lost hope. He's resourceful, and survivor, like you.

Well, why are you waiting? Let's get started!`,
  questsBegin: [QUESTS.ASTRONOMY_THE_FIRST_EXPEDITION]
});

export { sndConversations, sndConvoStatements, sndConvoResponses, sndConvoNarrations }
