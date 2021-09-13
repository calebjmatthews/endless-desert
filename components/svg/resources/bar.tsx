import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function BarSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 56.592 56.592">
    	<Polygon points="50.453 8.359 18.303 37.431 5.482 31.921 39.744 2.507" fill={props.icon.color}/>
    	<Polygon points="18.931 54.086 0 44.146 5.482 31.921 18.303 37.431" fill={props.icon.shadow}/>
    	<Polygon points="56.592 18.698 18.931 54.086 18.303 37.431 50.453 8.359" fill={props.icon.secondaryColor}/>
    </Svg>
  );
}
