import Expedition from './expedition';
import ExpeditionHistory from './expedition_history';

export default class ExpeditionStatus {
  expeditions: { [id: string] : Expedition } = {};
  expeditionHistories: { [id: string] : ExpeditionHistory } = {};
  lastTimestamp: number = new Date(Date.now()).valueOf();

  constructor(expeditionStatus: ExpeditionStatusInterface|null) {
    if (expeditionStatus) {
      Object.keys(expeditionStatus.expeditions).forEach((id) => {
        this.expeditions[id] = new Expedition({...expeditionStatus.expeditions[id]});
      });
      Object.keys(expeditionStatus.expeditionHistories).forEach((id) => {
        this.expeditionHistories[id] = expeditionStatus.expeditionHistories[id];
      });
    }
  }

  getExpeditionsArray() {
    const expeditionsArray = Object.keys(this.expeditions).map((id) => this.expeditions[id]);
    return expeditionsArray.sort((a, b) => ((a.beganAt || 0) - (b.beganAt || 0)));
  }
}

interface ExpeditionStatusInterface {
  expeditions: { [id: string] : Expedition };
  expeditionHistories: { [id: string] : ExpeditionHistory };
  lastTimestamp: number;
}