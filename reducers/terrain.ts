import { SET_TERRAIN } from '../actions/terrain';
import Terrain from '../models/terrain';

export default function (terrain: Terrain = new Terrain(null), action: any = null) {
	switch(action.type) {
    case SET_TERRAIN:
    return new Terrain(action.terrain);

		default:
		return terrain;
	}
};
