import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function BindingSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <Path d="m481.68 335.29c40.425 40.425 40.425 105.96 3e-3 146.39-40.425 40.425-105.97 40.425-146.39 0l-304.98-304.97c-40.425-40.425-40.425-105.96 0-146.39s105.96-40.425 146.39 0l304.97 304.97z" fill="#82c35f"/>
      <Path d="m176.71 481.68c-40.425 40.425-105.96 40.425-146.39 0s-40.425-105.96 0-146.39l304.97-304.97c40.425-40.425 105.96-40.425 146.39 0 40.425 40.421 40.425 105.96 0 146.39l-304.97 304.98z" fill="#8aca67"/>
      <Path d="m481.68 30.321c-40.425-40.425-105.96-40.425-146.39 0l-304.97 304.97c-40.425 40.425-40.425 105.96 0 146.39l451.36-451.36z" fill="#a9e08c"/>
      <Rect transform="matrix(-.7071 -.7071 .7071 -.7071 256 618.06)" x="152.49" y="152.5" width="207.02" height="207.02" fill="#61a73a"/>
      <G fill="#4c9225">
        <Circle cx="256" cy="195.62" r="25.876"/>
        <Circle cx="316.39" cy="256" r="25.878"/>
        <Circle cx="195.62" cy="256" r="25.878"/>
        <Circle cx="256" cy="316.39" r="25.876"/>
      </G>
    </Svg>
  );
}
