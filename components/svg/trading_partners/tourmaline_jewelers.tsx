import * as React from 'react';
import Svg from 'react-native-svg';
import Icon from '../../../models/icon';

export default function TourmalineJewelersSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <g fill={props.icon.color}>
        <polygon points="393.06 130.05 393.06 36.854 293.87 36.854"/>
        <polygon points="141.81 149.73 370.19 149.73 256 42.436"/>
        <polygon points="385.13 179.73 126.87 179.73 256 475.15"/>
        <polygon points="118.94 130.05 218.13 36.854 118.94 36.854"/>
        <polygon points="88.938 149.73 88.938 59.447 3.25 149.73"/>
        <polygon points="423.06 149.73 508.75 149.73 423.06 59.447"/>
        <polygon points="417.88 179.73 312.55 420.67 512 179.73"/>
        <polygon points="94.125 179.73 0 179.73 199.45 420.67"/>
      </g>
    </Svg>
  );
}
