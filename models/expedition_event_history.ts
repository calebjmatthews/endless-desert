export default class ExpeditionEventHistory {
  id: string = '';
  occurredAt: number = new Date(Date.now()).valueOf();
  eventId: string = '';
  chosen: string = '';
  outcome: string = '';
}