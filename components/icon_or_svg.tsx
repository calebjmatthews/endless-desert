import React from "react";

import IconComponent from "./icon";
import SvgComponent from "./svg";
import Icon from "../models/icon";

export default function IconOrSvg(props: {icon: Icon}) {
  const { icon } = props;

  switch(icon.provider) {
    case 'svg':
    return <SvgComponent icon={icon} />;

    default:
    return <IconComponent {...icon} />;
  }
}