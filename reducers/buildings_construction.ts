import { SET_BUILDINGS_CONSTRUCTION, ADD_BUILDING_CONSTRUCTION,
  REMOVE_BUILDING_CONSTRUCTION, PAY_BUILDING_COST }
  from '../actions/buildings_construction';
import Building from '../models/building';

export default function (buildingsConstruction: { [typeName: string] : Building } = {},
  action: any = null) {
	switch(action.type) {
    case SET_BUILDINGS_CONSTRUCTION:
    return Object.assign({}, action.buildings);

    case ADD_BUILDING_CONSTRUCTION:
    let newABuildings = Object.assign({}, buildingsConstruction);
    newABuildings[action.building.buildingType] = action.building;
    return newABuildings;

    case REMOVE_BUILDING_CONSTRUCTION:
    let newRBuildings = Object.assign({}, buildingsConstruction);
    delete newRBuildings[action.building.buildingType];
    return newRBuildings;

    case PAY_BUILDING_COST:
    let newPBCBuildings = Object.assign({}, buildingsConstruction);
    newPBCBuildings[action.building.buildingType].paidCosts[action.aCost.type] = true;
    newPBCBuildings[action.building.buildingType].paidResources.push(action.aResource);
    return newPBCBuildings;


		default:
		return buildingsConstruction;
	}
};
