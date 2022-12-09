export default class ExpeditionHistory {
  destination: string = '';
  visited: number = 0;
  treasuresFound: { [typeQuality: string] : boolean } = {};
}