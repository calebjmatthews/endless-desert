import { ADD_TIMER, REMOVE_TIMER } from '../actions/timers';
import Timer from '../models/building';

let timersStarting: { [name: string] : Timer } = {};
export default function (timers = timersStarting, action: any = null) {
	switch(action.type) {
    case ADD_TIMER:
    let newATimers = Object.assign({}, timers);
    newATimers[action.timer.name] = action.timer;
    return newATimers;

    case REMOVE_TIMER:
    let newRTimers = Object.assign({}, timers);
    delete newRTimers[action.timer.name];
    return newRTimers;

		default:
		return timers;
	}
};
