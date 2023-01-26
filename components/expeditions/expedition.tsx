import React, { useEffect } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

import ExpeditionPreparationComponent from "./expedition_preparation";
import ExpeditionProgressComponent from './expedition_progress';
import { updateAdviceAndSubState, updateSubTitle } from "../../actions/expedition_status";

import { resourceTypes } from "../../instances/resource_types";
import { destinations } from '../../instances/destinations';
import { explorations } from '../../instances/explorations';
import { explorationChallenges } from '../../instances/exploration_challenges';
import { implementTypes } from '../../instances/implement_types';
import { resourceTags } from '../../instances/resource_tags';

export default function ExpeditionComponent(props: { expeditionId: string  }) {
  const { expeditionId } = props;
  const dispatch = useDispatch();
  const expedition = useTypedSelector(state => state.expeditionStatus.expeditions[expeditionId]);
  const expeditionHistory = useTypedSelector(state => state.expeditionStatus
    .expeditionHistories[expedition.mainDestinationId || '']);
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
    if (expedition.state === 'preparing' && (advice.map((anAdvice) => anAdvice.text).join()
      !== expedition.advice.map((anAdvice) => anAdvice.text).join()
      || subState !== expedition.subState)) {
      dispatch(updateAdviceAndSubState({
        expeditionId: expedition.id,
        advice,
        subState
      }));
    }
  }, [expedition.leader, JSON.stringify(expedition.dromedaries), JSON.stringify(expedition.resources)]);

  // Todo: Only trigger this when main destination or leader changes, not on load
  useEffect(() => {
    const { subTitle, subTitleNoun } = expedition.calcSubTitle({ leaders });
    dispatch(updateSubTitle({
      expeditionId: expedition.id,
      subTitle,
      subTitleNoun
    }))
  }, [expedition.mainDestinationId, expedition.leader]);
  
  if (expedition.state === 'preparing') {
    return <ExpeditionPreparationComponent expeditionId={expedition.id} />;
  }
  else if (expedition.state === 'embarking' || expedition.state === 'returning') {
    return <ExpeditionProgressComponent expeditionId={expedition.id} />;
  }

  return null;
}