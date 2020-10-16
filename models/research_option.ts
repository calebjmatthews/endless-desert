export default class ResearchOption {
  name: string = '';
  appliesTo: string = '';
  difficulty: number = 0;
  description: string = '';
  cost: {specificity: string, type: string, quantity: number}[]|null = null;

  constructor(researchOption: ResearchOption) {
    Object.assign(this, researchOption);
  }
}
