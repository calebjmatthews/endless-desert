import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function LensSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 58 53">
      <G fill="none" fillRule="evenodd">
       <G id="008---Contact-Lens" transform="translate(-1)" fillRule="nonzero" strokeWidth="1.2602">
        <Path d="m9.7267 10.057c-5.5449 8.8567 0.017643 22.305 12.405 30.062 12.388 7.7565 26.918 6.8719 32.461-1.9848z" fill="#cdd7f7"/>
        <Ellipse id="Oval" transform="rotate(-57.995)" cx="-3.3599" cy="40.032" rx="6.301" ry="26.464" fill="#b2c1f6"/>
       </G>
      </G>
    </Svg>
  );
}
