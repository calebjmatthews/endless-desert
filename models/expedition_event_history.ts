export default class ExpeditionEventHistory {
  index: number = 0;
  occurredAt: number = new Date(Date.now()).valueOf();
  eventId: string = '';
  description: string = '';
  chosen: string[] = [];
  outcome: string[] = [];

  constructor(eeh: ExpeditionEventHistoryInterface) {
    this.index = eeh.index;
    this.eventId = eeh.eventId;
    this.description = eeh.description;
    if (eeh.occurredAt) { this.occurredAt = eeh.occurredAt; }
    if (eeh.chosen) { this.chosen = eeh.chosen; }
    if (eeh.outcome) { this.outcome = eeh.outcome; }
  }
}

interface ExpeditionEventHistoryInterface {
  index: number;
  occurredAt?: number;
  eventId: string;
  description: string;
  chosen?: string[];
  outcome?: string[];
}