import { SET_BUILDINGS, ADD_BUILDING, REPLACE_BUILDING, SELECT_BUILDING_RECIPE,
  PAY_BUILDING_UPGRADE_COST } from '../actions/buildings';
import Building from '../models/building';

import { buildingsStarting } from '../instances/buildings';

export default function (buildings: { [id: string] : Building } = buildingsStarting,
  action: any = null) {
	switch(action.type) {
    case SET_BUILDINGS:
    return Object.assign({}, action.buildings);

    case ADD_BUILDING:
    let newABuildings = Object.assign({}, buildings);
    newABuildings[action.building.id] = action.building;
    return newABuildings;

    case REPLACE_BUILDING:
    let newRBuildings = Object.assign({}, buildings);
    newRBuildings[action.building.id] = action.building;
    return newRBuildings;

    case SELECT_BUILDING_RECIPE:
    let newSBRBuildings = Object.assign({}, buildings);
    newSBRBuildings[action.building.id].recipeSelected = action.recipeIndex;
    return newSBRBuildings;

    case PAY_BUILDING_UPGRADE_COST:
    let newPBUCBuildings = Object.assign({}, buildings);
    newPBUCBuildings[action.building.id].paidUpgradeCosts[action.aCost.type] = true;
    newPBUCBuildings[action.building.id].paidUpgradeResources.push(action.aResource);
    return newPBUCBuildings;

		default:
		return buildings;
	}
};
