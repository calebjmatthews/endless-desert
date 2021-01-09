import { SET_LEADERS, ADD_LEADER, REMOVE_LEADER, ASSIGN_TO_BUILDING, LIVE_AT_BUILDING }
  from '../actions/leaders';

import Leader from '../models/leader';

export default function (leaders: { [id: string] : Leader } = {},
  action: any = null) {
	switch(action.type) {
    case SET_LEADERS:
    return Object.assign({}, action.leaders);

    case ADD_LEADER:
    let newALeaders = Object.assign({}, leaders);
    newALeaders[action.leader.id] = action.leader;
    return newALeaders;

    case REMOVE_LEADER:
    let newRLeaders = Object.assign({}, leaders);
    delete newRLeaders[action.leader.id];
    return newRLeaders;

    case ASSIGN_TO_BUILDING:
    let newATBLeaders = Object.assign({}, leaders);
    newATBLeaders[action.leader.id].assignedTo = action.assignedTo;
    return newATBLeaders;

    case LIVE_AT_BUILDING:
    let newLABLeaders = Object.assign({}, leaders);
    newLABLeaders[action.leader.id].livingAt = action.livingAt;
    return newLABLeaders;

		default:
		return leaders;
	}
};
