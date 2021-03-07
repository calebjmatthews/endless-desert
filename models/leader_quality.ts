export default class LeaderQuality {
  name: string = '';
  icon: {provider: string, name: string} = { provider: '', name: ''};
  foregroundColor: string = '';
  backgroundColor: string = '';

  constructor(leaderQuality: LeaderQuality) {
    Object.assign(this, leaderQuality);
  }
}
