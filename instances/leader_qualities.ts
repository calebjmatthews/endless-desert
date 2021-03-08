import LeaderQuality from '../models/leader_quality';
import { LEADER_QUALITIES } from '../enums/leader_qualities';

let leaderQualities: { [name: string] : LeaderQuality } = {};

leaderQualities[LEADER_QUALITIES.HAPPINESS_TO_SPEED] = new LeaderQuality({
  name: LEADER_QUALITIES.HAPPINESS_TO_SPEED,
  icon: {provider: 'FontAwesome5', name: 'running'},
  foregroundColor: '#efbd03',
  backgroundColor: '#fff'
});
leaderQualities[LEADER_QUALITIES.HAPPINESS_TO_QUALITY] = new LeaderQuality({
  name: LEADER_QUALITIES.HAPPINESS_TO_QUALITY,
  icon: {provider: 'FontAwesome5', name: 'certificate'},
  foregroundColor: '#efbd03',
  backgroundColor: '#fff'
});
leaderQualities[LEADER_QUALITIES.HAPPINESS_TO_EFFICIENCY] = new LeaderQuality({
  name: LEADER_QUALITIES.HAPPINESS_TO_EFFICIENCY,
  icon: {provider: 'FontAwesome5', name: 'cog'},
  foregroundColor: '#efbd03',
  backgroundColor: '#fff'
});
leaderQualities[LEADER_QUALITIES.HAPPINESS] = new LeaderQuality({
  name: LEADER_QUALITIES.HAPPINESS,
  icon: {provider: 'FontAwesome5', name: 'smile-beam'},
  foregroundColor: '#efbd03',
  backgroundColor: '#fff'
});
leaderQualities[LEADER_QUALITIES.SPEED] = new LeaderQuality({
  name: LEADER_QUALITIES.SPEED,
  icon: {provider: 'FontAwesome5', name: 'running'},
  foregroundColor: '#6d6d6d',
  backgroundColor: '#fff'
});
leaderQualities[LEADER_QUALITIES.QUALITY] = new LeaderQuality({
  name: LEADER_QUALITIES.QUALITY,
  icon: {provider: 'FontAwesome5', name: 'certificate'},
  foregroundColor: '#6d6d6d',
  backgroundColor: '#fff'
});
leaderQualities[LEADER_QUALITIES.EFFICIENCY] = new LeaderQuality({
  name: LEADER_QUALITIES.EFFICIENCY,
  icon: {provider: 'FontAwesome5', name: 'cog'},
  foregroundColor: '#6d6d6d',
  backgroundColor: '#fff'
});

export { leaderQualities };
