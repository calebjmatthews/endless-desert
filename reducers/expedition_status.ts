import { SET_EXPEDITION_STATUS, UPSERT_EXPEDITION, SET_DESTINATION, UPSERT_DROMEDARIES,
	REMOVE_DROMEDARIES } from '../actions/expedition_status';
import ExpeditionStatus from '../models/expedition_status';
import Expedition from '../models/expedition';

export default function (expeditionStatus: ExpeditionStatus = new ExpeditionStatus(null),
  action: any = null) {
	switch(action.type) {
    case SET_EXPEDITION_STATUS:
    return new ExpeditionStatus(action.expeditionStatus);

		case UPSERT_EXPEDITION:
		const aeExpeditionStatus = new ExpeditionStatus(expeditionStatus);
		aeExpeditionStatus.expeditions[action.expedition.id] = new Expedition(action.expedition);
		return aeExpeditionStatus;

		case SET_DESTINATION:
		const sdExpeditionStatus = new ExpeditionStatus(expeditionStatus);
		if (action.destinationId) {
			sdExpeditionStatus.expeditions[action.expeditionId].destinationId = action.destinationId;
		}
		if (action.endCoordinates) {
			sdExpeditionStatus.expeditions[action.expeditionId].endCoordinates = action.endCoordinates;
		}
		if (action.customDestination) {
			sdExpeditionStatus.expeditions[action.expeditionId].customDestination = action.customDestination;
		}
		return sdExpeditionStatus;

		case UPSERT_DROMEDARIES:
		const adExpeditionStatus = new ExpeditionStatus(expeditionStatus);
		if (!adExpeditionStatus.expeditions[action.expeditionId].dromedaries) {
			adExpeditionStatus.expeditions[action.expeditionId].dromedaries = {};
		}
		const dro = action.dromedaries;
		adExpeditionStatus.expeditions[action.expeditionId].dromedaries[`${dro.type}|${dro.quality}`] =
			action.dromedaries;
		return adExpeditionStatus;

		case REMOVE_DROMEDARIES:
		const rdExpeditionStatus = new ExpeditionStatus(expeditionStatus);
		delete rdExpeditionStatus.expeditions[action.expeditionId].dromedaries[action.dromedariesTypeQuality];
		return rdExpeditionStatus;

		default:
		return expeditionStatus;
	}
};
