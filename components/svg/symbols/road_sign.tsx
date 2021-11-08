import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function RoadSignSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <Polygon points="187.74 146.59 187.74 348.16 187.74 512 266.42 512 266.42 348.16 266.42 146.59" fill="#C06100"/>
      <G fill="#FF9B00">
        <Polygon points="351.07 201.57 84.194 201.57 84.194 364.33 348.51 364.33 427.8 285.04"/>
        <Polygon points="351.07 0 84.194 0 84.194 162.76 348.51 162.76 427.8 83.469"/>
      </G>
      <Rect x="227.08" y="146.59" width="39.343" height="365.41" fill="#723700"/>
      <G fill="#C06100">
        <Polygon points="427.81 285.04 348.5 364.33 227.08 364.33 227.08 201.57 351.07 201.57"/>
        <Polygon points="427.81 83.472 348.5 162.76 227.08 162.76 227.08 0 351.07 0"/>
      </G>
    </Svg>
  );
}
