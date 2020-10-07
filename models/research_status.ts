import Research from './research';

export default class ResearchStatus implements ResearchStatusInterface {
  // Each research and whether it is "completed", "visible" or "hidden"
  status: { [name: string] : string } = {};

  constructor(researchStatus: ResearchStatusInterface) {
    Object.assign(this, researchStatus);
  }

  // Set the research status map on new file creation, based on the research
  //  prerequisites and the researches that begin as completed
  init(researches: { [name : string] : Research }) {
    Object.keys(researches).map((name) => {
      let research = researches[name];
      if (research.beginsCompleted == true) {
        this.status[name] = 'completed';
      }
      else {
        this.status[name] = 'hidden';
      }
    });
    this.checkAndSetVisible(researches);
  }

  // Set the visibility of researches based on whether all of their prerequisites
  //  have been completed
  checkAndSetVisible(researches: { [name : string] : Research }) {
    Object.keys(researches).map((name) => {
      let research = researches[name];
      if (this.status[name] != 'completed') {
        if (research.prereq == null) {
          this.status[name] = 'visible';
        }
        else {
          let allCompleted = true;
          research.prereq.map((prereqName) => {
            if (this.status[prereqName] != 'completed') {
              allCompleted = false;
            }
          });
          if (allCompleted == true) {
            this.status[name] = 'visible';
          }
        }
      }
    });
  }
}

interface ResearchStatusInterface {
  status: { [name: string] : string };
  allVisible?: string[];
}
