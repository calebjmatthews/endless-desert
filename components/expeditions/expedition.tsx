import React, { useEffect } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

import DestinationsComponent from "./destinations";
import ExpeditionPreparationComponent from "./expedition_preparation";
import { updateAdviceAndSubState, updateSubTitle } from "../../actions/expedition_status";

import { resourceTypes } from "../../instances/resource_types";
import { destinations } from '../../instances/destinations';
import { explorations } from '../../instances/explorations';
import { explorationChallenges } from '../../instances/exploration_challenges';
import { implementTypes } from '../../instances/implement_types';
import { resourceTags } from '../../instances/resource_tags';

export default function ExpeditionComponent(props: { expeditionId: string, firstPreparing: string,
  destinationsOpen: boolean, setDestinationsOpen: (destinationsOpen: boolean) => void }) {
  const { expeditionId, firstPreparing, destinationsOpen, setDestinationsOpen } = props;
  const dispatch = useDispatch();
  const expedition = useTypedSelector(state => state.expeditionStatus.expeditions[expeditionId]);
  const expeditionHistory = useTypedSelector(state => state.expeditionStatus
    .expeditionHistories[expedition.destinationId || '']);
  const leaders = useTypedSelector(state => state.leaders);

  useEffect(() => {
    const { advice, subState } = expedition.calcSubStateAndAdvice({
      resourceTypes,
      destinations,
      explorations,
      explorationChallenges,
      implementTypes,
      resourceTags,
      expeditionHistory
    });
    if (advice.map((anAdvice) => anAdvice.text).join()
      !== expedition.advice.map((anAdvice) => anAdvice.text).join()
      || subState !== expedition.subState) {
      dispatch(updateAdviceAndSubState({
        expeditionId: expedition.id,
        advice,
        subState
      }));
    }
  }, [expedition.leader, JSON.stringify(expedition.dromedaries), JSON.stringify(expedition.resources)]);

  useEffect(() => {
    const subTitle = expedition.calcSubTitle({leaders, destinations});
    dispatch(updateSubTitle({
      expeditionId: expedition.id,
      subTitle
    }))
  }, [expedition.destinationId, expedition.leader])

  if (destinationsOpen && firstPreparing === expedition.id) {
    return <DestinationsComponent expedition={expedition} setDestinationsOpen={setDestinationsOpen} />;
  }
  
  if (expedition.state === 'preparing') {
    return <ExpeditionPreparationComponent expeditionId={expedition.id} />;
  }

  return null;
}