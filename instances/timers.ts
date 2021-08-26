import Timer from '../models/timer';
import { TRADING_PARTNERS } from '../enums/trading_partners';

let timersStarting: { [name: string] : Timer } = {};

timersStarting[('Trading' + 0)] = new Timer({
  name: ('Trading' + 0),
  startedAt: new Date(Date.now()).valueOf(),
  endsAt: (new Date(Date.now()).valueOf() + 300000),
  progress: 0,
  remainingLabel: '1m',
  tradingPartnerToArrive: TRADING_PARTNERS.TREFOIL_ISLANDS,
  messageToDisplay: 'A trader is waiting outside the gate.',
  iconToDisplay: {provider: 'FontAwesome5', name: 'question'}
});

export { timersStarting };
