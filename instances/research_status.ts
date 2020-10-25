import ResearchStatus from '../models/research_status';

let researchStatusStarting = new ResearchStatus({ status: {}, actions: {},
  resourcesStudied: {} });
researchStatusStarting.init();

export { researchStatusStarting };
