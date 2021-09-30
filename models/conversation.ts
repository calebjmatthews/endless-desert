import Icon from '../models/icon';
import { GameState } from './game_state';
import { utils } from '../utils';

export class Conversation implements ConversationInterface {
  name: string = '';
  statementName: string = '';
  repeatable: boolean = false;
  weight: number = 100;

  constructor(conversation: ConversationInterface) {
    Object.assign(this, conversation);
  }

  available(gState: GameState) {
    console.log('Conversation available function not properly set');
    return false;
  }
}

interface ConversationInterface {
  name: string;
  statementName: string;
  repeatable: boolean;
  weight: number;

  available?: (gState: GameState) => boolean;
}

export class ConversationStatement {
  name: string = '';
  partnerKind: string = '';
  partnerType: string = '';
  text: string = '';
  responseNames?: string[];
  gainResources?: {specificity: string, type: string, value: number}[];
  leaderJoins?: string;

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
  statementName: string = '';
  speechType?: string;
  requirementIcon?: Icon;
  requirementLabel?: string;
  cost?: {specificity: string, type: string, quantity: number};

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
  statementName: string;
  speechType?: string;
  requirementIcon?: Icon;
  requirementLabel?: string;
  cost?: {specificity: string, type: string, quantity: number};

  available?: (gState: GameState) => boolean;
}
