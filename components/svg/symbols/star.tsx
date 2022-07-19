import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function StarSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 488.02 488.02">
      <G transform="matrix(.71671 0 0 .71671 69.127 68.99)" fill={props.icon.color}>
        <Path d="m471.56 173.78-145.5-20.8-64.4-132c-8-15.4-30-12.2-35.3 0l-64.4 132-145.6 20.8c-16.4 1-21.6 20.9-10.4 33.2l105 102.9-25 144.5c-2.9 17.8 16.7 27.8 28.1 20.8l129.9-68.6 129.9 67.6c13.6 7 29.8-2.8 28.1-19.7l-25-144.6 105-102.9c12.7-13.5 3.6-31.5-10.4-33.2z"/>
      </G>
      <G transform="matrix(.7698 0 0 .7698 56.172 55.579)" fill={props.icon.secondaryColor}><Path d="m471.56 173.78-145.5-20.8-64.4-132c-8-15.4-30-12.2-35.3 0l-64.4 132-145.6 20.8c-16.4 1-21.6 20.9-10.4 33.2l105 102.9-25 144.5c-2.9 17.8 16.7 27.8 28.1 20.8l129.9-68.6 129.9 67.6c13.6 7 29.8-2.8 28.1-19.7l-25-144.6 105-102.9c12.7-13.5 3.6-31.5-10.4-33.2zm-128.9 114.3c-4.2 5.2-6.2 11.4-5.2 17.7l19.7 116.4-103.9-55.1c-6.7-2.8-13-2.8-18.7 0l-103.9 55.1 19.7-116.4c1-7.3-1-13.5-5.2-17.7l-84.1-82.1 116.4-16.6c6.2-1 11.4-4.2 14.6-10.4l52-105 52 105c3.1 5.2 8.3 9.4 14.6 10.4l116.2 16.6z"/></G>
    </Svg>
  );
}
