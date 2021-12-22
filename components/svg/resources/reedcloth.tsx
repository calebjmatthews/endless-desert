import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';

export default function ReedclothSvgComponent(props: any) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <G>
      <Polygon points="512 0 445.22 0 422.96 200.9 445.22 401.81 512 401.81" fill="#f9963b"/>
      <Polygon points="110.19 0 220.38 401.81 445.22 401.81 445.22 0" fill="#ffb824"/>
      <Path d="M0,110.191v291.617C0,462.665,49.335,512,110.191,512s110.191-49.335,110.191-110.191V110.191H0z" fill="#ffca4d"/>
      <Circle cx="110.19" cy="110.19" r="110.19" fill="#fedd90"/>
      <Path d="m110.19 143.58c-18.412 0-33.391-14.979-33.391-33.391s14.979-33.392 33.391-33.392 33.391 14.979 33.391 33.391-14.979 33.392-33.391 33.392z" fill="#593927"/>
      </G>
    </Svg>
  );
}
