import React from "react";
import DestinationsComponent from "./destinations";
import ExpeditionPreparationComponent from "./expedition_preparation";

import Expedition from "../../models/expedition";

export default function ExpeditionComponent(props: { expedition: Expedition, firstPreparing: string,
  destinationsOpen: boolean, setDestinationsOpen: (destinationsOpen: boolean) => void }) {
  const { expedition, firstPreparing, destinationsOpen, setDestinationsOpen } = props;
  if (destinationsOpen && firstPreparing === expedition.id) {
    return <DestinationsComponent expedition={expedition} setDestinationsOpen={setDestinationsOpen} />;
  }
  
  if (expedition.state === 'preparing') {
    return <ExpeditionPreparationComponent expedition={expedition} />;
  }

  return null;
}