import Vault from './vault';
import ResearchStatus from './research_status';

export default interface RootState {
  vault: Vault;
  researchStatus: ResearchStatus;
}
