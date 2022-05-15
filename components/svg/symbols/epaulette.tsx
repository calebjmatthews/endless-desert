import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function EpauletteSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 360 360">
      <G fill={props.icon.color}>
        <Path d="m12.167 1.0885v300.56c0 18.517 6.2399 35.713 16.494 45.456 5.586 5.3008 11.928 7.9797 18.291 7.9797 5.3124 0 10.641-1.8702 15.548-5.6356l118.69-91.143 118.68 91.139c10.782 8.2754 23.585 7.3919 33.841-2.3405 10.254-9.7359 16.494-26.935 16.494-45.456v-300.55z" strokeWidth="2.8741"/>
      </G>
    </Svg>
  );
}
