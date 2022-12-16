import ExplorationChallenge from "../models/exploration_challenge";
import Icon from "../models/icon";
import { EXPLORATION_CHALLENGES } from "../enums/exploration_challenges";
import { RESOURCE_TAGS } from "../enums/resource_tags";
const RTA = RESOURCE_TAGS;
import { utils } from '../utils';

const getDifficultyLabel = (difficulty?: number, difficultyTerms?: string[]) => {
  if (difficulty === undefined) { return undefined; }
  if (difficulty <= 4) { return difficultyTerms?.[0] || 'simple'; }
  if (difficulty <= 8) { return difficultyTerms?.[1] || 'tough'; }
  if (difficulty <= 12) { return difficultyTerms?.[2] || 'difficult'; }
  return difficultyTerms?.[3] || 'insurmountable';
};
const getFrequencyLabel = (frequency?: number, frequencyTerms?: string[]) => {
  if (frequency === undefined) { return undefined; }
  if (frequency <= 10) { return frequencyTerms?.[0] || 'few'; }
  if (frequency <= 20) { return frequencyTerms?.[1] || 'frequent'; }
  if (frequency <= 50) { return frequencyTerms?.[2] || 'countless'; }
  return frequencyTerms?.[3] || 'ubiquitous';
}
const defaultGetLabels = (props: {type: string, difficulty?: number, frequency?: number,
    difficultyTerms?: string[], frequencyTerms?: string[]}) => {
  const {type, difficulty, frequency, difficultyTerms, frequencyTerms} = props;
  const difficultyLabel = getDifficultyLabel(difficulty, difficultyTerms);
  const frequencyLabel = getFrequencyLabel(frequency, frequencyTerms);
  if (!difficultyLabel && !frequencyLabel) {
    return type;
  }
  if (!difficultyLabel || !frequencyLabel) {
    return `${difficultyLabel || frequencyLabel} ${type.toLowerCase()}`;
  }
  if (Math.abs(((difficulty || 0) * 4) - (frequency || 0)) > 10) {
    return `${frequencyLabel} yet ${difficultyLabel} ${type.toLowerCase()}`;
  }
  return `${frequencyLabel} and ${difficultyLabel} ${type.toLowerCase()}`;
}

const explorationChallenges: { [name: string] : ExplorationChallenge } = {
  [EXPLORATION_CHALLENGES.DARKNESS]: new ExplorationChallenge({
    name: EXPLORATION_CHALLENGES.DARKNESS,
    mitigatedBy: [RTA.ACTION_SEEK],
    precedingText: `You'll be walking through`,
    icon: new Icon({ provider: 'FontAwesome5', name: 'cloud-moon' }),
    getLabels: (challenge) => {
      const { difficulty, type } = challenge;
      const getDifficultyLabel = (difficulty?: number) => {
        if (difficulty === undefined) { return undefined; }
        if (difficulty === 1) { return ''; }
        if (difficulty === 2) { return 'deep '; }
        return 'unnatural ';
      };
      return `${getDifficultyLabel(difficulty)}${type.toLowerCase()}`;
    }
  }),
  [EXPLORATION_CHALLENGES.OBSTACLES]: new ExplorationChallenge({
    name: EXPLORATION_CHALLENGES.OBSTACLES,
    mitigatedBy: [RTA.ACTION_BREAK],
    precedingText: `Your path will be blocked by`,
    icon: new Icon({ provider: 'MaterialCommunityIcons', name: 'wall' }),
    getLabels: (challenge) => defaultGetLabels({ ...challenge,
      difficultyTerms: ['minor', 'solid', 'stalwart', 'invincible'] })
  }),
  [EXPLORATION_CHALLENGES.TRAPS]: new ExplorationChallenge({
    name: EXPLORATION_CHALLENGES.TRAPS,
    mitigatedBy: [RTA.ACTION_LOOSE],
    precedingText: `You could be caught in`,
    icon: new Icon({ provider: 'FontAwesome5', name: 'link' }),
    getLabels: (challenge) => defaultGetLabels({ ...challenge,
      difficultyTerms: ['basic', 'cunning', 'ingenious', 'devilish']})
  }),
  [EXPLORATION_CHALLENGES.HAZARDS]: new ExplorationChallenge({
    name: EXPLORATION_CHALLENGES.HAZARDS,
    mitigatedBy: [RTA.ACTION_LOOSE, RTA.ACTION_HEAL],
    precedingText: `You might be wounded by`,
    icon: new Icon({ provider: 'MaterialCommunityIcons', name: 'star-three-points-outline' }),
    getLabels: (challenge) => defaultGetLabels({ ...challenge,
      difficultyTerms: ['relatively harmless', 'dangerous', 'grave', 'deadly'] })
  }),
  [EXPLORATION_CHALLENGES.HARRIERS]: new ExplorationChallenge({
    name: EXPLORATION_CHALLENGES.HARRIERS,
    mitigatedBy: [RTA.ACTION_LOOSE, RTA.ACTION_TRAP],
    precedingText: `You'll face harassment from`,
    icon: new Icon({ provider: 'FontAwesome5', name: 'mask' }),
    getLabels: (challenge) => defaultGetLabels({ ...challenge,
      difficultyTerms: ['mild', 'stubborn', 'relentless', 'inexorable'] })
  }),
  [EXPLORATION_CHALLENGES.AGGRESSORS]: new ExplorationChallenge({
    name: EXPLORATION_CHALLENGES.AGGRESSORS,
    mitigatedBy: [RTA.ACTION_TRAP, RTA.ACTION_HEAL],
    precedingText: `You'll be threatened by violence from`,
    icon: new Icon({ provider: 'MaterialCommunityIcons', name: 'sword-cross' }),
    getLabels: (challenge) => defaultGetLabels({ ...challenge,
      difficultyTerms: ['mostly placid', 'brazen', 'hateful', 'ravaging'] })
  }),
};



export { explorationChallenges };