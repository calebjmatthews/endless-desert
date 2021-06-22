import Icon from './icon';

export default class LeaderQuality {
  name: string = '';
  icon: Icon = new Icon({ provider: '', name: ''});

  constructor(leaderQuality: LeaderQuality) {
    Object.assign(this, leaderQuality);
  }
}
