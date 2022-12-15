import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import DestinationsComponent from "./destinations";
import ExpeditionPreparationComponent from "./expedition_preparation";

import { updateAdviceAndSubState } from "../../actions/expedition_status";

import Expedition from "../../models/expedition";
import { dromedaryTypes } from "../../instances/dromedary_types";
import { resourceTypes } from "../../instances/resource_types";

export default function ExpeditionComponent(props: { expedition: Expedition, firstPreparing: string,
  destinationsOpen: boolean, setDestinationsOpen: (destinationsOpen: boolean) => void }) {
  const { expedition, firstPreparing, destinationsOpen, setDestinationsOpen } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    const { advice, subState } = expedition.calcSubStateAndAdvice({ resourceTypes, dromedaryTypes });
    console.log(`{ advice, subState }`, { advice, subState })
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

  if (destinationsOpen && firstPreparing === expedition.id) {
    return <DestinationsComponent expedition={expedition} setDestinationsOpen={setDestinationsOpen} />;
  }
  
  if (expedition.state === 'preparing') {
    return <ExpeditionPreparationComponent expeditionId={expedition.id} />;
  }

  return null;
}