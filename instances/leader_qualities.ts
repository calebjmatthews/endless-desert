import LeaderQuality from '../models/leader_quality';
import Icon from '../models/icon';
import { LEADER_QUALITIES } from '../enums/leader_qualities';

let leaderQualities: { [name: string] : LeaderQuality } = {};

leaderQualities[LEADER_QUALITIES.HAPPINESS_TO_SPEED] = new LeaderQuality({
  name: LEADER_QUALITIES.HAPPINESS_TO_SPEED,
  icon: new Icon({provider: 'FontAwesome5', name: 'running', color: '#efbd03'})
});
leaderQualities[LEADER_QUALITIES.HAPPINESS_TO_QUALITY] = new LeaderQuality({
  name: LEADER_QUALITIES.HAPPINESS_TO_QUALITY,
  icon: new Icon({provider: 'FontAwesome5', name: 'certificate', color: '#efbd03'})
});
leaderQualities[LEADER_QUALITIES.HAPPINESS_TO_EFFICIENCY] = new LeaderQuality({
  name: LEADER_QUALITIES.HAPPINESS_TO_EFFICIENCY,
  icon: new Icon({provider: 'FontAwesome5', name: 'cog', color: '#efbd03'})
});
leaderQualities[LEADER_QUALITIES.HAPPINESS] = new LeaderQuality({
  name: LEADER_QUALITIES.HAPPINESS,
  icon: new Icon({provider: 'FontAwesome5', name: 'smile-beam', color: '#efbd03'})
});
leaderQualities[LEADER_QUALITIES.SPEED] = new LeaderQuality({
  name: LEADER_QUALITIES.SPEED,
  icon: new Icon({provider: 'FontAwesome5', name: 'running', color: '#6d6d6d'})
});
leaderQualities[LEADER_QUALITIES.QUALITY] = new LeaderQuality({
  name: LEADER_QUALITIES.QUALITY,
  icon: new Icon({provider: 'FontAwesome5', name: 'certificate', color: '#6d6d6d'})
});
leaderQualities[LEADER_QUALITIES.EFFICIENCY] = new LeaderQuality({
  name: LEADER_QUALITIES.EFFICIENCY,
  icon: new Icon({provider: 'FontAwesome5', name: 'cog', color: '#6d6d6d'})
});
leaderQualities[LEADER_QUALITIES.LIFE] = new LeaderQuality({
  name: LEADER_QUALITIES.LIFE,
  icon: new Icon({provider: 'FontAwesome5', name: 'heart', color: '#da031a'})
});
leaderQualities[LEADER_QUALITIES.AGILITY] = new LeaderQuality({
  name: LEADER_QUALITIES.AGILITY,
  icon: new Icon({provider: 'FontAwesome5', name: 'wind', color: '#3ea80c'})
});
leaderQualities[LEADER_QUALITIES.BOUNTY] = new LeaderQuality({
  name: LEADER_QUALITIES.BOUNTY,
  icon: new Icon({provider: 'FontAwesome5', name: 'gem', color: '#5000a6'})
});
leaderQualities[LEADER_QUALITIES.VISION] = new LeaderQuality({
  name: LEADER_QUALITIES.VISION,
  icon: new Icon({provider: 'FontAwesome', name: 'eye', color: '#ffd107'})
});
leaderQualities[LEADER_QUALITIES.PRECISION] = new LeaderQuality({
  name: LEADER_QUALITIES.PRECISION,
  icon: new Icon({provider: 'FontAwesome5', name: 'balance-scale', color: '#0715d0'})
});

export { leaderQualities };
