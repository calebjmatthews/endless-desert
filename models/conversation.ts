import Icon from '../models/icon';
import Leader from './leader';
import { GameState } from './game_state';
import { utils } from '../utils';

export class Conversation implements ConversationInterface {
  name: string = '';
  title: string = '';
  statementName?: string;
  narrationName?: string;
  partnerKind?: string;
  partnerType?: string;
  repeatable: boolean = false;
  daily: boolean = false;
  weight: number = 100;

  constructor(conversation: ConversationInterface|null) {
    if (conversation) { Object.assign(this, conversation); }
  }

  available(gState: GameState, conversation: Conversation) {
    console.log('Conversation available function not properly set');
    return false;
  }
}

interface ConversationInterface {
  name: string;
  title: string;
  statementName?: string;
  narrationName?: string;
  partnerKind?: string;
  partnerType?: string;
  repeatable: boolean;
  daily: boolean;
  weight: number;

  available?: (gState: GameState, conversation: Conversation) => boolean;
}

export class ConversationStatement {
  name: string = '';
  partnerKind: string = '';
  partnerType: string = '';
  text: string = '';
  responseNames?: string[];
  narrationName?: string;
  gainResources?: {specificity: string, type: string, value: number}[];
  leaderJoins?: string;
  questsBegin?: string[];
  completeResearch?: string[];

  constructor(statement: ConversationStatement|null) {
    if (statement) {
      Object.assign(this, statement);
    }
  }
}

export class ConversationResponse implements ConversationResponseInterface {
  name: string = '';
  textIntro?: string;
  text: string = '';
  statementName?: string = '';
  narrationName?: string;
  speechType?: string;
  requirementIcon?: Icon;
  requirementLabel?: string;
  cost?: {specificity: string, type: string, quantity: number}[];

  constructor(conversation: ConversationResponseInterface) {
    Object.assign(this, conversation);
  }

  available(fState?: GameState) {
    return true;
  }
}

interface ConversationResponseInterface {
  name: string;
  textIntro?: string;
  text: string;
  statementName?: string;
  narrationName?: string;
  speechType?: string;
  requirementIcon?: Icon;
  requirementLabel?: string;
  cost?: {specificity: string, type: string, quantity: number}[];

  available?: (gState: GameState) => boolean;
}

export class ConversationNarration {
  name: string = '';
  text: string = '';
  statementName?: string = '';
  responseName?: string = '';

  constructor(narration: ConversationNarration) {
    Object.assign(this, narration);
  }
}

export function dailyConversationUsed(gState: GameState, conversation: Conversation) {
  if (!gState.leaders || !gState.conversationStatus) { return false; }
  for (let index = 0; index < Object.keys(gState.leaders).length; index++) {
    const leader = gState.leaders[Object.keys(gState.leaders)[index]];
    if (leader.name == conversation.partnerType) {
      let lastDailyConvo = gState.conversationStatus.lastDailyConvo[leader.id];
      if (!lastDailyConvo) { lastDailyConvo = 0; }
      if ((new Date(Date.now()).valueOf() - lastDailyConvo)
        > (1000 * 60 * 60 * 24)) {
        return true;
      }
    }
  }
  return false;
}
