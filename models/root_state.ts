import Vault from './vault';
import ResearchStatus from './research_status';
import Building from './building';

export default interface RootState {
  vault: Vault;
  researchStatus: ResearchStatus;
  rates: { productionRates: Rate, consumptionRates: Rate,
    netRates: Rate };
  buildings: { [id: string] : Building };
  ui: {modalDisplayed: string|null};
}

interface Rate { [resourceName: string] : number };
