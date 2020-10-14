import { ADD_BUILDING } from '../actions/buildings';
import Building from '../models/building';

import { buildingsStarting } from '../instances/buildings';

export default function (buildings: { [id: string] : Building } = buildingsStarting,
  action: any = null) {
	switch(action.type) {
    case ADD_BUILDING:
    let newBuildings = Object.assign({}, buildings);
    newBuildings[action.building.id] = action.building;
    return newBuildings;
    break;

		default:
		return buildings;
	}
};
