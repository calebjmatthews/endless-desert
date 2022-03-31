import ResearchOption from './research_option';

import { researches } from '../instances/researches';
import { researchOptions } from '../instances/research_options';
import { utils } from '../utils';
import { RESEARCH_OPTIONS } from '../enums/research_options';

export default class ResearchOptionDeck {
  researchName: string = '';
  stepsCompleted: number = 0;
  stepsNeeded: number = 0;
  optionSlots: number = 1;
  preferredOptions: { [name: string] : boolean } = {};
  generalOptions: { [name: string] : boolean } = {};
  secondaryOptions: { [name: string] : boolean } = {};
  viewedOptions: { [name: string] : boolean } = {};
  currentOptions: string[] = [];
  paidCosts: { [optionName: string] : string[] } = {};

  constructor(researchOptionDeck: DBResearchOptionDeck) {
    Object.assign(this, researchOptionDeck);
    this.setOptions();
  }

  setOptions() {
    let research = researches[this.researchName];
    Object.keys(researchOptions).map((roName) => {
      let researchOption = researchOptions[roName];
      if (researchOption.difficulty == research.difficulty
        && researchOption.appliesTo == research.name) {
        this.preferredOptions[roName] = true;
      }
      else if (researchOption.difficulty == research.difficulty
        && researchOption.appliesTo == research.category) {
        this.generalOptions[roName] = true;
      }
      else if (researchOption.difficulty == research.difficulty
        && researchOption.appliesTo === RESEARCH_OPTIONS.SECONDARY) {
        this.secondaryOptions[roName] = true;
      }
    });
  }

  drawAllOptions(optionCount: number) {
    for (let loop = 0; loop < optionCount; loop++) {
      const newOption = this.drawOption((loop == 0) ?
        { alreadyTried: false, firstOption: true } : undefined);
      this.currentOptions.push(newOption.name);
      this.viewedOptions[newOption.name] = true;
    }
  }

  replaceOption(optionName: string) {
    let index = this.currentOptions.indexOf(optionName);
    const newOption = this.drawOption((index == 0) ?
      { alreadyTried: false, firstOption: true } : undefined);
    this.currentOptions[index] = newOption.name;
    this.viewedOptions[newOption.name] = true;
  }

  drawOption({ alreadyTried, firstOption }:
    { alreadyTried: boolean, firstOption: boolean } =
    { alreadyTried: false, firstOption: false }): ResearchOption {
    let research = researches[this.researchName];
    let preferredPool: ResearchOption[] = [];
    let generalPool: ResearchOption[] = [];
    // This pool is chosen from, if at all populated
    Object.keys(this.preferredOptions).map((roName) => {
      if (!this.viewedOptions[roName]) {
        preferredPool.push(researchOptions[roName]);
      }
    });
    // This is chosen from if the preffered pool is empty
    Object.keys(this.generalOptions).map((roName) => {
      if (!this.viewedOptions[roName]) {
        generalPool.push(researchOptions[roName]);
      }
    });
    // This is added to the general pool if not the first option
    Object.keys(this.secondaryOptions).map((roName) => {
      if (!this.viewedOptions[roName] && !firstOption) {
        generalPool.push(researchOptions[roName]);
      }
    });
    // If both pools are empty, reset the viewed options and start over
    if (preferredPool.length == 0 && generalPool.length == 0 && !alreadyTried) {
      this.viewedOptions = {};
      return this.drawOption({ alreadyTried: true, firstOption });
    }

    if ((this.stepsNeeded - this.stepsCompleted) <= preferredPool.length) {
      return utils.randomWeightedSelect(preferredPool);
      return preferredPool[Math.floor(utils.random() * preferredPool.length)];
    }
    return utils.randomWeightedSelect([...preferredPool, ...generalPool]);
  }

  discardOptions() {
    this.currentOptions = [];
    this.drawAllOptions(this.optionSlots);
  }

  costPaid(typeQuality: string, optionName: string) {
    if (!this.paidCosts[optionName]) {
      this.paidCosts[optionName] = [];
    }
    this.paidCosts[optionName].push(typeQuality);
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

  finishOption(optionName: string) {
    this.currentOptions = this.currentOptions.filter((option) => {
      if (option != optionName) { return option; }
    });
    this.paidCosts = {};
  }

  completeStep() {
    this.stepsCompleted++;
    if (this.stepsCompleted >= this.stepsNeeded) {
      return 'step completed';
    }
    return 'step in progress';
  }

  retractStep() {
    if (this.stepsCompleted > 0) {
      this.stepsCompleted--;
    }
  }

  increaseOptionSlots() {
    this.optionSlots++;
    this.drawOption();
  }

  decreaseOptionSlots() {
    const optionName = utils.randomSelect(Object.keys(this.currentOptions));
    delete this.currentOptions[optionName];
    this.optionSlots--;
  }

  export() {
    const exportROD: DBResearchOptionDeck = {
      researchName: this.researchName,
      stepsCompleted: this.stepsCompleted,
      stepsNeeded: this.stepsNeeded,
      optionSlots: this.optionSlots
    };
    if (Object.keys(this.preferredOptions).length > 0) {
      exportROD.preferredOptions = this.preferredOptions;
    }
    if (Object.keys(this.generalOptions).length > 0) {
      exportROD.generalOptions = this.generalOptions;
    }
    if (Object.keys(this.viewedOptions).length > 0) {
      exportROD.viewedOptions = this.viewedOptions;
    }
    if (Object.keys(this.paidCosts).length > 0) {
      exportROD.paidCosts = this.paidCosts;
    }
    return exportROD;
  }
}

function chooseFromArray(anArray: any[]) {
  return anArray[Math.floor(utils.random() * anArray.length)];
}

export interface DBResearchOptionDeck {
  researchName: string;
  stepsCompleted: number;
  stepsNeeded: number;
  optionSlots: number;
  preferredOptions?: { [name: string] : boolean };
  generalOptions?: { [name: string] : boolean };
  viewedOptions?: { [name: string] : boolean };
  currentOptions?: string[];
  paidCosts?: { [optionName: string] : string[] };
}
