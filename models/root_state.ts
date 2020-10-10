import Vault from './vault';
import ResearchStatus from './research_status';

export default interface RootState {
  vault: Vault;
  researchStatus: ResearchStatus;
  rates: { productionRates: Rate, consumptionRates: Rate,
    netRates: Rate }
}

interface Rate { [resourceName: string] : number };
