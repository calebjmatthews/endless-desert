import Icon from './icon';

export default class ExplorationChallenge {
  name: string = '';
  mitigatedBy: string[] = [];
  icon: Icon = new Icon({ provider: '', name: '' });
  precedingText: string = '';

  getLabels: (challenge: {type: string, difficulty?: number, frequency?: number}) => string = () => '';

  constructor(expeditionChallenge: ExplorationChallenge) {
    Object.assign(this, expeditionChallenge);
  }
}