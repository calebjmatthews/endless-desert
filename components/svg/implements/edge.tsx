import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function EdgeSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <G>
        <Path d="m440.65 41.369s66.914 75.499 0 154.51c-66.914 79.007-328.33 251.07-328.33 251.07l-57.941-57.941z" fill="#f4ecec" strokeWidth="1.6933"/>
        <Path d="m83.497 418.12 28.823 28.823s261.41-172.07 328.33-251.07c33.835-39.95 33.448-78.999 24.8-107.85z" fill="#e2dada" strokeWidth="1.6933"/>
        <Path d="m54.38 389.01-28.431 24.791 56.369 58.817 30.001-25.668z" fill="#324a5e"/>
        <Path d="m54.125 443.2 28.192 29.414 30.001-25.668-28.82-28.823z" fill="#2b3b4e" />
      </G>
    </Svg>
  );
}
