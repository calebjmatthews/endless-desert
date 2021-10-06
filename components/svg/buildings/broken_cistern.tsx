import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function BrokenCisternSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <Path d="m377 432h-242c-8.284 0-15-6.716-15-15v-340c0-8.284 6.716-15 15-15h242c8.284 0 15 6.716 15 15v340c0 8.284-6.716 15-15 15z" fill="#3aafff"/>
      <Path d="m377 62h-121v370h121c8.284 0 15-6.716 15-15v-340c0-8.284-6.716-15-15-15z" fill="#008adf"/>
      <Path d="m331 62v94.576c0 8.077-6.207 15.027-14.275 15.407-8.614.406-15.725-6.458-15.725-14.983v-95z" fill="#0068a7"/>
      <Path d="m316 262c-8.284 0-15-6.716-15-15v-30c0-8.284 6.716-15 15-15s15 6.716 15 15v30c0 8.284-6.716 15-15 15z" fill="#0068a7"/>
      <Path d="m256 212c-8.284 0-15-6.716-15-15v-60c0-8.284 6.716-15 15-15s15 6.716 15 15v60c0 8.284-6.716 15-15 15z" fill="#008adf"/>
      <Path d="m196 166c-8.284 0-15-6.716-15-15v-60c0-8.284 6.716-15 15-15s15 6.716 15 15v60c0 8.284-6.716 15-15 15z" fill="#008adf"/>
      <Path d="m271 197v-60c0-8.284-6.716-15-15-15v90c8.284 0 15-6.716 15-15z" fill="#0068a7"/>
      <Path d="m317.81 344.88c-8.284 0-15-6.716-15-15v-30c0-8.284 6.716-15 15-15s15 6.716 15 15v30c0 8.284-6.716 15-15 15z" fill="#0068a7"/>
      <Path d="m194.79 354.67c-8.284 0-15-6.716-15-15v-60c0-8.284 6.716-15 15-15s15 6.716 15 15v60c0 8.284-6.716 15-15 15z" fill="#008adf"/>
      <Path d="m255.8 389.3c-8.284 0-15-6.716-15-15v-60c0-8.284 6.716-15 15-15s15 6.716 15 15v60c0 8.284-6.716 15-15 15z" fill="#008adf"/>
      <Path d="m270.8 374.3v-60c0-8.284-6.716-15-15-15v90c8.284 0 15-6.716 15-15z" fill="#0068a7"/>
      <Path d="m497 432h-120c-8.284 0-15-6.716-15-15v-382c0-19.299 15.701-35 35-35h80c19.299 0 35 15.701 35 35v382c0 8.284-6.716 15-15 15z" fill="#a8895d"/>
      <Path d="m135 432h-120c-8.284 0-15-6.716-15-15v-382c0-19.299 15.701-35 35-35h80c19.299 0 35 15.701 35 35v382c0 8.284-6.716 15-15 15z" fill="#c9bb9f"/>
      <G fillRule="evenodd">
       <Rect x="-1.5425" y="401.31" width="516.41" height="109.74" fill="#0068a7" strokeWidth="1.1783"/>
       <Rect x="-1.5425" y="401.31" width="257.54" height="109.74" fill="#008adf" strokeWidth="1.1976"/>
      </G>
    </Svg>
  );
}
