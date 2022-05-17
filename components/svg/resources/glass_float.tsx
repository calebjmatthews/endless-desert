import * as React from 'react';
import Svg, { G, Polygon, Rect, Polyline } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function AbrasiveSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 464 464">
      <G>
        <Polygon transform="matrix(1.1452 0 0 1.2359 -33.687 35.951)" points="416 239.2 48 239.2 118.4 39.2 345.6 39.2" fill="#e9edff"/>
        <Polyline transform="matrix(1.1452 0 0 1.2359 -33.687 35.951)" points="120 39.2 345.6 39.2 413.6 232.8" fill="#dbe2ff"/>
        <Polygon transform="matrix(1.1452 0 0 1.2359 -33.687 35.951)" points="344 239.2 120 239.2 162.4 39.2 301.6 39.2" fill="#f4f7ff"/>
        <Polyline transform="matrix(1.1452 0 0 1.2359 -33.687 35.951)" points="160 39.2 301.6 39.2 343.2 233.6" fill="#e6ebff"/>
        <Polygon transform="matrix(1.1452 0 0 1.2359 -33.687 35.951)" points="280 239.2 184 239.2 202.4 39.2 261.6 39.2" fill="#fdfeff"/>
        <Polyline transform="matrix(1.1452 0 0 1.2359 -33.687 35.951)" points="200 39.2 261.6 39.2 280 236" fill="#eff3ff"/>
        <Rect x="21.283" y="331.57" width="421.43" height="49.434" fill="#cdd7ff" strokeWidth="1.1897"/>
      </G>
    </Svg>
  );
}
