import ResearchStatus from '../models/research_status';
import { researches } from './researches';
import { RESEARCHES } from '../enums/researches';

let researchStatusStarting = new ResearchStatus({ status: {} });
researchStatusStarting.init(researches);

export { researchStatusStarting };
