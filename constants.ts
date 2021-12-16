import { RESOURCE_CATEGORIES } from './enums/resource_categories';
import { RESOURCE_TAGS } from './enums/resource_tags';

export const SAVE_INTERVAL = 60000;
export const CHECK_INTERVAL = 60000;
export const FADE_IN_DELAY = 400;
export const FADE_CHAR_DELAY = 30;
export const FADE_CHAR_MULT = 8;

// export const STORAGE_BASE_URL = 'http://localhost:8080/';
export const BASE_URL = 'https://endlessdesert.app/';
export const STORAGE_GET_URL = `${BASE_URL}api/storage_get/`;
export const STORAGE_UPSERT_URL = `${BASE_URL}api/storage_upsert/`;
export const SESSION_URL = `${BASE_URL}api/session_check/`;
export const SIGNUP_URL = `${BASE_URL}api/signup/`;
export const LOGIN_URL = `${BASE_URL}api/login/`;

export const QUALITY_VALUES = [1, 4, 16];
export const DEFAULT_DISH_COST = 20;
export const DEFAULT_SPICE_COST = 4;
export const STUDY_CATEGORY_BLACKLIST = [RESOURCE_CATEGORIES.SPECIAL];
export const STUDY_TAG_BLACKLIST = [RESOURCE_TAGS.MIND];
