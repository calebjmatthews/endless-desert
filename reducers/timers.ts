import { SET_TIMERS, ADD_TIMER, REMOVE_TIMER, UPDATE_TIMERS } from '../actions/timers';
import Timer from '../models/timer';
import { timersStarting } from '../instances/timers';

export default function (timers = timersStarting, action: any = null) {
	switch(action.type) {
		case SET_TIMERS:
		return Object.assign({}, action.timers);

    case ADD_TIMER:
    let newATimers = Object.assign({}, timers);
    newATimers[action.timer.name] = action.timer;
    return newATimers;

    case REMOVE_TIMER:
    let newRTimers = Object.assign({}, timers);
    delete newRTimers[action.timer.name];
    return newRTimers;

		case UPDATE_TIMERS:
		let newULTimers: { [name: string] : Timer } = {};
		Object.keys(timers).map((timerName) => {
			newULTimers[timerName] = new Timer(timers[timerName]);
		});
		return newULTimers;

		default:
		return timers;
	}
};
