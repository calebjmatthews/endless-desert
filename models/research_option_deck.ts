import ResearchOption from './research_option';

import { researches } from '../instances/researches';
import { researchOptions } from '../instances/research_options';
import { utils } from '../utils';

export default class ResearchOptionDeck implements ResearchOptionDeckInterface {
  researchName: string = '';
  stepsCompleted: number = 0;
  stepsNeeded: number = 0;
  preferredOptions: { [name: string] : boolean } = {};
  generalOptions: { [name: string] : boolean } = {};
  viewedOptions: { [name: string] : boolean } = {};
  currentOptions: { [name: string] : boolean } = {};
  paidCosts: { [optionName: string] : string[] } = {};

  constructor(researchOptionDeck: ResearchOptionDeckInterface) {
    Object.assign(this, researchOptionDeck);
    this.setOptions();
  }

  setOptions() {
    let research = researches[this.researchName];
    Object.keys(researchOptions).map((roName) => {
      let researchOption = researchOptions[roName];
      if (researchOption.appliesTo == research.name) {
        this.preferredOptions[roName] = true;
      }
      else if (researchOption.difficulty == research.difficulty
        && researchOption.appliesTo == research.category) {
        this.generalOptions[roName] = true;
      }
    });
  }

  beginStep(optionCount: number) {
    for (let loop = 0; loop < optionCount; loop++) {
      let newOption = this.drawOption();
      this.currentOptions[newOption.name] = true;
      this.viewedOptions[newOption.name] = true;
    }
  }

  drawOption(alreadyTried: boolean = false): ResearchOption {
    let research = researches[this.researchName];
    let preferredPool: ResearchOption[] = [];
    let generalPool: ResearchOption[] = [];
    Object.keys(this.preferredOptions).map((roName) => {
      if (!this.viewedOptions[roName]) {
        preferredPool.push(researchOptions[roName]);
      }
    });
    Object.keys(this.generalOptions).map((roName) => {
      if (!this.viewedOptions[roName]) {
        generalPool.push(researchOptions[roName]);
      }
    });
    // If both pools are empty, reset the viewed options and start over
    if (preferredPool.length == 0 && generalPool.length == 0 && !alreadyTried) {
      this.viewedOptions = {};
      return this.drawOption(true);
    }

    if ((this.stepsNeeded - this.stepsCompleted) <= preferredPool.length) {
      return preferredPool[Math.floor(utils.random() * preferredPool.length)];
    }
    let combinedPool = [...preferredPool, ...generalPool];
    return combinedPool[Math.floor(utils.random() * combinedPool.length)];
  }

  costPaid(resourceName: string, optionName: string) {
    if (!this.paidCosts[optionName]) {
      this.paidCosts[optionName] = [];
    }
    this.paidCosts[optionName].push(resourceName);
    const cost = researchOptions[optionName].cost;
    let allCostsPaid = true;
    cost.map((aCost) => {
      if (!this.paidCosts[optionName].includes(aCost.type)) {
        allCostsPaid = false;
      }
    });
    if (allCostsPaid) {
      return 'option completed';
    }
    return 'option in progress';
  }

  completeStep() {
    this.stepsCompleted++;
    if (this.stepsCompleted >= this.stepsNeeded) {
      return 'step completed';
    }
    this.currentOptions = {};
    return 'step in progress';
  }
}

function chooseFromArray(anArray: any[]) {
  return anArray[Math.floor(utils.random() * anArray.length)];
}

interface ResearchOptionDeckInterface {
  researchName: string;
  stepsCompleted: number;
  stepsNeeded: number;
  preferredOptions: { [name: string] : boolean };
  generalOptions: { [name: string] : boolean };
  viewedOptions: { [name: string] : boolean };
  currentOptions: { [name: string] : boolean };
  paidCosts: { [optionName: string] : string[] };
}
