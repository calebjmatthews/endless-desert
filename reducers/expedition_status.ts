import { SET_EXPEDITION_STATUS, UPSERT_EXPEDITION, SET_DESTINATIONS, UPDATE_SUB_TITLE, 
	UPSERT_DROMEDARIES, REMOVE_DROMEDARIES, UPSERT_RESOURCE, REMOVE_RESOURCE, UPDATE_ADVICE_AND_SUB_STATE, REMOVE_FROM_DESTINATIONS, REMOVE_DESTINATION }
	from '../actions/expedition_status';
import ExpeditionStatus from '../models/expedition_status';
import Expedition from '../models/expedition';
import { utils } from '../utils';

export default function (expeditionStatus: ExpeditionStatus = new ExpeditionStatus(null),
  action: any = null) {
	switch(action.type) {
    case SET_EXPEDITION_STATUS:
    return new ExpeditionStatus(action.expeditionStatus);

		case UPSERT_EXPEDITION:
		const aeExpeditionStatus = new ExpeditionStatus(expeditionStatus);
		aeExpeditionStatus.expeditions[action.expedition.id] = new Expedition(action.expedition);
		return aeExpeditionStatus;

		case SET_DESTINATIONS:
			const sdsExpeditionStatus = new ExpeditionStatus(expeditionStatus);
			const expedition = sdsExpeditionStatus.expeditions[action.expeditionId];
			if (action.embarkingDestinationIds) {
				expedition.embarkingDestinationIds = action.embarkingDestinationIds
			}
			if (action.mainDestinationId)	{
				expedition.mainDestinationId = action.mainDestinationId;
			}
			if (action.returningDestinationIds) {
				expedition.returningDestinationIds = action.returningDestinationIds;
			}
			if (action.currentDestinationId) {
				expedition.currentDestinationId = action.currentDestinationId;
			}
			if (action.targetCoordinates) {
				expedition.targetCoordinates = action.targetCoordinates;
			}
			if (action.customDestination) {
				expedition.customDestination = action.customDestination;
			}
			return sdsExpeditionStatus;

		case REMOVE_DESTINATION:
		const rdeExpeditionStatus = new ExpeditionStatus(expeditionStatus);
		if (action.position === 'embarking') {
			rdeExpeditionStatus.expeditions[action.expeditionId].embarkingDestinationIds = 
				utils.removeFromArray(rdeExpeditionStatus.expeditions[action.expeditionId].
				embarkingDestinationIds, action.destinationId);
		}
		if (action.position === 'returning') {
			rdeExpeditionStatus.expeditions[action.expeditionId].returningDestinationIds = 
				utils.removeFromArray(rdeExpeditionStatus.expeditions[action.expeditionId].
				returningDestinationIds, action.destinationId);
		}
		return rdeExpeditionStatus;

		case REMOVE_FROM_DESTINATIONS:
		const rfdExpeditionStatus = new ExpeditionStatus(expeditionStatus);
		rfdExpeditionStatus.expeditions[action.expeditionId].embarkingDestinationIds = 
			utils.removeFromArray(rfdExpeditionStatus.expeditions[action.expeditionId].embarkingDestinationIds,
			action.destinationId);
		rfdExpeditionStatus.expeditions[action.expeditionId].returningDestinationIds = 
			utils.removeFromArray(rfdExpeditionStatus.expeditions[action.expeditionId].returningDestinationIds,
			action.destinationId);
		return rfdExpeditionStatus;

		case UPDATE_SUB_TITLE:
		const snExpeditionStatus = new ExpeditionStatus(expeditionStatus);
		snExpeditionStatus.expeditions[action.expeditionId].subTitle = action.subTitle;
		snExpeditionStatus.expeditions[action.expeditionId].subTitleNoun = action.subTitleNoun;
		return snExpeditionStatus;

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

		case UPDATE_ADVICE_AND_SUB_STATE:
		const uaassExpeditionStatus = new ExpeditionStatus(expeditionStatus);
		uaassExpeditionStatus.expeditions[action.expeditionId].advice = action.advice;
		uaassExpeditionStatus.expeditions[action.expeditionId].subState = action.subState;
		return uaassExpeditionStatus;

		default:
		return expeditionStatus;
	}
};
