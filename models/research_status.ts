import Vault from './vault';
import Resource from './resource';
import ResearchBranch from './research_branch';
import { researches } from '../instances/researches';
import { RESOURCE_TYPES } from '../enums/resource_types';

export default class ResearchStatus implements ResearchStatusInterface {
  // Each research and whether it is "completed", "visible" or "hidden"
  status: { [name: string] : 'completed'|'visible'|'hidden'|'repeatable' } = {};
  actions: { [category: string] : string[] } = {};
  resourcesStudied: { [typeQuality: string] : boolean } = {};
  buildingsAvailable: { [buildingName: string] : boolean } = {};
  upgradesAvailable: { [buildingName: string] : boolean } = {};
  destinationsAvailable: { [destinationName: string] : boolean } = {};

  constructor(researchStatus: ResearchStatusInterface|null) {
    if (researchStatus) { Object.assign(this, researchStatus); }
  }

  // Set the research status map on new file creation, based on the research
  //  prerequisites and the researches that begin as completed
  init() {
    Object.keys(researches).map((name) => {
      let research = researches[name];
      if (research.beginsCompleted === true) {
        this.status[name] = 'completed';
      }
      else {
        this.status[name] = 'hidden';
      }
    });
    this.checkAndSetVisible();
    this.setResearchedActions();
    this.setBuildingsAndDestinationsAvailable();
  }

  // Set the visibility of researches based on whether all of their prerequisites
  //  have been completed
  checkAndSetVisible() {
    Object.keys(researches).map((name) => {
      let research = researches[name];
      if (research.prereq === null) {
        if (this.status[name] !== 'completed' && this.status[name] !== 'repeatable') {
          this.status[name] = 'visible';
        }
      }
      else {
        let allCompleted = true;
        research.prereq.map((prereqName) => {
          if ((this.status[prereqName] !== 'completed' && this.status[prereqName] !== 'repeatable')
            && prereqName !== 'No prerequisite') {
            allCompleted = false;
          }
        });
        if (allCompleted === true) {
          if (this.status[name] !== 'completed' && this.status[name] !== 'repeatable') {
            this.status[name] = 'visible';
          }
        }
        else {
          this.status[name] = 'hidden';
        }
      }
    });
  }

  setCompleted(researchName: string) {
    const research = researches[researchName];
    if (research.repeatable) {
      this.status[researchName] = 'repeatable';
    }
    else {
      this.status[researchName] = 'completed';
    }
    
    this.checkAndSetVisible();
    this.setResearchedActions();
    this.setBuildingsAndDestinationsAvailable();
  }

  setResearchedActions() {
    this.actions = {};

    Object.keys(this.status).map((name) => {
      if (this.status[name] === 'completed') {
        const research = researches[name];
        if (research.actionCategory) {
          if (!this.actions[research.actionCategory]) {
            this.actions[research.actionCategory] = [];
          }
          this.actions[research.actionCategory].push(name);
        }
      }
    });
  }

  studyResource(typeQuality: string) {
    this.resourcesStudied[typeQuality] = true;
  }

  getResourcesToStudy(vault: Vault) {
    let rts: Resource[] = vault.getStudyableResources();
    rts = rts.filter((resource) => {
      const typeQuality = (resource.type.split('-')[0] + '|' + resource.quality);
      if (this.resourcesStudied[typeQuality] !== true) {
        return resource;
      }
    });
    return rts;
  }

  setBuildingsAndDestinationsAvailable() {
    Object.keys(this.status).forEach((researchName) => {
      let research = researches[researchName];
      if (!research) {
        console.log(`Missing research instance: ${researchName}`); return;
      }
      if (this.status[researchName] === 'completed') {
        (research.unlocksBuilding || []).forEach((buildingName) => {
          this.buildingsAvailable[buildingName] = true;
        });
        (research.unlocksUpgrade || []).forEach((buildingName) => {
          this.upgradesAvailable[buildingName] = true;
        });
        if (research.unlocksDestination) {
          this.destinationsAvailable[research.unlocksDestination] = true;
        }
      }
    });
  }

  getResearchTree(showCompleted: boolean) {
    let researchTree: { [rName: string] : ResearchBranch } = {};
    Object.keys(researches).map((rName) => {
      const research = researches[rName];
      if (research.isCategory) {
        researchTree[rName] = new ResearchBranch({ type: 'category', name: rName,
          status: '', children: [] });
        if (((this.status[rName] === 'visible' || this.status[rName] === 'completed'))
          && (showCompleted || this.status[rName] !== 'completed')) {
          researchTree[rName].children.push(new ResearchBranch({ type: 'research',
            name: rName, status: this.status[rName], children: [] }));
        }
      }
      else {
        if (((this.status[rName] === 'visible' || this.status[rName] === 'repeatable' 
            || this.status[rName] === 'completed'))
          && (showCompleted || this.status[rName] !== 'completed')) {
          researchTree[research.category].children.push({ type: 'research',
            name: rName, status: this.status[rName], children: [] });
        }
      }
    });
    return researchTree;
  }

  getAnalysisMax(treasuresDisplayed: { [name: string] : number }) {
    const base = 100;
    if (treasuresDisplayed[RESOURCE_TYPES.MEMORANDA_ON_A_GROWING_PANOPLY]) {
      return base + Object.keys(this.resourcesStudied).length;
    }
    return base;
  }
}

interface ResearchStatusInterface {
  status: { [name: string] : string };
  actions: { [category: string] : string[] };
  resourcesStudied: { [typeQuality: string] : boolean };
  buildingsAvailable: { [buildingName: string] : boolean };
}
