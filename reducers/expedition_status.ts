import { SET_EXPEDITION_STATUS, UPSERT_EXPEDITION, SET_DESTINATION, UPSERT_DROMEDARIES,
	REMOVE_DROMEDARIES, UPSERT_RESOURCE, REMOVE_RESOURCE } from '../actions/expedition_status';
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
		const udExpeditionStatus = new ExpeditionStatus(expeditionStatus);
		if (!udExpeditionStatus.expeditions[action.expeditionId].dromedaries) {
			udExpeditionStatus.expeditions[action.expeditionId].dromedaries = {};
		}
		const dro = action.dromedaries;
		udExpeditionStatus.expeditions[action.expeditionId].dromedaries[`${dro.type}|${dro.quality}`] =
			action.dromedaries;
		return udExpeditionStatus;

		case REMOVE_DROMEDARIES:
		const rdExpeditionStatus = new ExpeditionStatus(expeditionStatus);
		delete rdExpeditionStatus.expeditions[action.expeditionId].dromedaries[action.dromedariesTypeQuality];
		return rdExpeditionStatus;

		case UPSERT_RESOURCE:
		const urExpeditionStatus = new ExpeditionStatus(expeditionStatus);
		if (!urExpeditionStatus.expeditions[action.expeditionId].resources) {
			urExpeditionStatus.expeditions[action.expeditionId].resources = {};
		}
		const res = action.resource;
		urExpeditionStatus.expeditions[action.expeditionId].resources[`${res.type}|${res.quality}`] =
			action.resource;
		return urExpeditionStatus;

		case REMOVE_RESOURCE:
		const rrExpeditionStatus = new ExpeditionStatus(expeditionStatus);
		delete rrExpeditionStatus.expeditions[action.expeditionId].resources[action.typeQuality];
		return rrExpeditionStatus;

		default:
		return expeditionStatus;
	}
};
