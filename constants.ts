import { RESOURCE_CATEGORIES } from './enums/resource_categories';
import { RESOURCE_TAGS } from './enums/resource_tags';
import { LEADER_QUALITIES } from './enums/leader_qualities';
import { RESOURCE_TYPES } from './enums/resource_types';
import { SVGS } from './enums/svgs';
import Resource from './models/resource';

export const SAVE_INTERVAL = 60000;
export const CHECK_INTERVAL = 60000;
export const HOURGLASS_INTERVAL = 100;
export const FORTUITY_BASE = 600000;
export const FADE_IN_DELAY = 400;
export const FADE_CHAR_DELAY = 30;
export const FADE_CHAR_MULT = 8;
export const PULSE_DURATION = 1200;
export const DROMEDARY_ICON_SPEED = 800;
export const MAX_QUANTITY_GUESS = 1000000000000;

// export const BASE_URL = 'http://localhost:8080/';
export const BASE_URL = 'https://endlessdesert.app/';
export const STORAGE_GET_URL = `${BASE_URL}api/storage_get/`;
export const STORAGE_UPSERT_URL = `${BASE_URL}api/storage_upsert/`;
export const SESSION_URL = `${BASE_URL}api/session_check/`;
export const SIGNUP_URL = `${BASE_URL}api/signup/`;
export const LOGIN_URL = `${BASE_URL}api/login/`;

export const QUALITY_VALUES = [1, 4, 16];
export const CHANGE_MULTIPLIERS = {
  [LEADER_QUALITIES.SPEED] : 1,
  [LEADER_QUALITIES.HAPPINESS_TO_SPEED] : 1,
  [LEADER_QUALITIES.EFFICIENCY] : 0.5,
  [LEADER_QUALITIES.HAPPINESS_TO_EFFICIENCY] : 0.5,
  [LEADER_QUALITIES.QUALITY] : 0.25,
  [LEADER_QUALITIES.HAPPINESS_TO_QUALITY] : 0.25,
  [LEADER_QUALITIES.HAPPINESS] : 1
}
export const DEFAULT_DISH_COST = 20;
export const DEFAULT_SPICE_COST = 4;
export const STUDY_CATEGORY_BLACKLIST = [RESOURCE_CATEGORIES.SPECIAL];
export const STUDY_TAG_BLACKLIST = [RESOURCE_TAGS.MIND, RESOURCE_TAGS.ONE_OF_A_KIND];

export const EQUIPMENT_TIER_DATA: { label: string, headingColor: string, color?: string, 
  altColor?: string, iconName?: string }[] = [
  { label: 'Basic', headingColor: '#555555', color: '#111', altColor: '#fff' },
  { label: 'Notable', headingColor: '#a02c75', color: '#e9358b', iconName: SVGS.STAR },
  { label: 'Eminent', headingColor: '#ad6924', color: '#ff9812', iconName: SVGS.STARS_TWO },
  { label: 'Superior', headingColor: '#35654b', color: '#64c37d', iconName: SVGS.STARS_THREE },
  { label: 'Peerless', headingColor: '#448d9c', color: '#00d7df', iconName: SVGS.STARS_FOUR },
  { label: 'Transcendent', headingColor: '#6c319a', color: '#933ec5', iconName: SVGS.STARS_FIVE }
];

export const ANALYSIS_TREASURES_KNOWLEDGE = [
  { typeName: RESOURCE_TYPES.TECHNIQUES_FOR_WEIGHTY_EXAMINATION, multiplier: 1.5,
    cost: new Resource({ type: RESOURCE_TYPES.PAPYRUS, quality: 0, quantity: 5 }) },
  { typeName: RESOURCE_TYPES.TECHNIQUES_FOR_POTENT_EXAMINATION, multiplier: 1.5,
    cost: new Resource({ type: RESOURCE_TYPES.GEARWORK, quality: 0, quantity: 0.1 }) },
  { typeName: RESOURCE_TYPES.TECHNIQUES_FOR_VISIONARY_EXAMINATION, multiplier: 1.5,
    cost: new Resource({ type: RESOURCE_TYPES.PRECISE_GEARWORK, quality: 0, quantity: 0.03 }) }
];

export const ANALYSIS_TREASURES_SPEED = [
  { typeName: RESOURCE_TYPES.TECHNIQUES_FOR_SWIFT_EXAMINATION, multiplier: 0.5,
    cost: new Resource({ type: RESOURCE_TYPES.INK_HIBRI, quality: 0, quantity: 0.3 }) },
  { typeName: RESOURCE_TYPES.TECHNIQUES_FOR_MERCURIAL_EXAMINATION, multiplier: 0.5,
    cost: new Resource({ type: RESOURCE_TYPES.LENS, quality: 0, quantity: 0.25 }) },
  { typeName: RESOURCE_TYPES.TECHNIQUES_FOR_ALACRITOUS_EXAMINATION, multiplier: 0.5,
    cost: new Resource({ type: RESOURCE_TYPES.LENS_COMPOUND, quality: 0, quantity: 0.05 }) }
];