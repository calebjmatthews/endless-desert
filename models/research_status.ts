import Research from './research';
import Vault from './vault';
import Resource from './resource';
import { researches } from '../instances/researches';
import { resourceTypes } from '../instances/resource_types';
import { RESEARCHES } from '../enums/researches';

export default class ResearchStatus implements ResearchStatusInterface {
  // Each research and whether it is "completed", "visible" or "hidden"
  status: { [name: string] : string } = {};
  actions: { [category: string] : string[] } = {};
  resourcesStudied: { [resourceName: string] : boolean } = {};

  constructor(researchStatus: ResearchStatusInterface) {
    Object.assign(this, researchStatus);
  }

  // Set the research status map on new file creation, based on the research
  //  prerequisites and the researches that begin as completed
  init() {
    Object.keys(researches).map((name) => {
      let research = researches[name];
      if (research.beginsCompleted == true) {
        this.status[name] = 'completed';
      }
      else {
        this.status[name] = 'hidden';
      }
    });
    this.checkAndSetVisible();
  }

  // Set the visibility of researches based on whether all of their prerequisites
  //  have been completed
  checkAndSetVisible() {
    Object.keys(researches).map((name) => {
      let research = researches[name];
      if (research.prereq == null) {
        if (this.status[name] != 'completed') {
          this.status[name] = 'visible';
        }
      }
      else {
        let allCompleted = true;
        research.prereq.map((prereqName) => {
          if (this.status[prereqName] != 'completed') {
            allCompleted = false;
          }
        });
        if (allCompleted == true) {
          if (this.status[name] != 'completed') {
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
    this.status[researchName] = 'completed';
    this.checkAndSetVisible();
    this.setResearchedActions();
  }

  setResearchedActions() {
    this.actions = {};
    let actionRelated: { [researchName : string] : string } = {};
    actionRelated[RESEARCHES.STUDY] = 'Researches';
    actionRelated[RESEARCHES.ANALYSIS] = 'Researches';

    Object.keys(this.status).map((name) => {
      if (this.status[name] == 'completed') {
        let category = actionRelated[name];
        if (category) {
          if (!this.actions[category]) { this.actions[category] = []; }
          this.actions[category].push(name);
        }
      }
    });
  }

  studyResource(resourceName: string) {
    this.resourcesStudied[resourceName] = true;
  }

  getResourcesToStudy(vault: Vault) {
    let rts: Resource[] = [];
    Object.keys(vault.resources).map((resourceName) => {
      let resource = vault.resources[resourceName];
      let resourceType = resourceTypes[resourceName];
      if (resource.quantity >= 1 && !this.resourcesStudied[resourceName]
        && resourceType.value != null) {
        rts.push(resource);
      }
    });
    return rts;
  }
}

interface ResearchStatusInterface {
  status: { [name: string] : string };
  actions: { [category: string] : string[] };
  resourcesStudied: { [resourceName: string] : boolean };
}
