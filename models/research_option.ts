import { RESEARCH_OPTION_ACTIONS } from '../enums/research_option_actions';

export default class ResearchOption {
  name: string = '';
  appliesTo?: string = '';
  difficulty: number = 0;
  description: string = '';
  cost: {specificity: string, type: string, quantity: number}[] = [];
  gain: {specificity: string, type: string, quantity: number}[] = [];
  actions: string[] = [ RESEARCH_OPTION_ACTIONS.COMPLETE_STEP ];
  weight: number = 100;

  constructor(researchOption: ResearchOptionInterface) {
    Object.assign(this, researchOption);
  }
}

interface ResearchOptionInterface {
  name: string;
  appliesTo?: string;
  difficulty: number;
  description: string;
  cost: {specificity: string, type: string, quantity: number}[];
  gain?: {specificity: string, type: string, quantity: number}[];
  actions?: string[];
  weight?: number;
}
