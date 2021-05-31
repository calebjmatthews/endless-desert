export default class ResearchBranch {
  type: string = '';
  name: string = '';
  status: string = '';
  children: ResearchBranch[] = [];

  constructor(researchBranch: ResearchBranch) {
    Object.assign(this, researchBranch);
  }
}
