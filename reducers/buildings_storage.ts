import { SET_BUILDINGS_STORAGE, ADD_BUILDING_TO_STORAGE, REMOVE_BUILDING_FROM_STORAGE }
  from '../actions/buildings_storage';
import Building from '../models/building';

export default function (buildingsStorage: { [typeName: string] : Building } = {},
  action: any = null) {
	switch(action.type) {
    case SET_BUILDINGS_STORAGE:
    return Object.assign({}, action.buildings);

    case ADD_BUILDING_TO_STORAGE:
    let newABuildings = Object.assign({}, buildingsStorage);
    newABuildings[action.building.id] = action.building;
    return newABuildings;

    case REMOVE_BUILDING_FROM_STORAGE:
    let newRBuildings = Object.assign({}, buildingsStorage);
    delete newRBuildings[action.building.id];
    return newRBuildings;

		default:
		return buildingsStorage;
	}
};
