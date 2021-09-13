import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function WoodenPoleSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <Path d="m402.56 133.35-376.62 375.07-22.367-21.431 373.84-379.63 13.247 13.977z" fill="#af5d5b" strokeWidth="1.1229"/>
      <Path d="m25.947 508.42-11.387-10.915 376.1-376.17 11.902 12.012z" fill="#974c4e" strokeWidth="1.1229"/>
      <G strokeWidth="1.1229">
       <Path d="m497.1 86.309-9.4305 9.4349-44.126-22.909 20.212 46.819-37.722 37.722-35.366-36.038-35.704-36.038 37.389-37.051 44.797 22.567-20.887-46.481 9.4348-9.4305c19.536-19.874 51.868-19.874 71.404 0 19.874 19.536 19.874 51.534 0 71.404z" fill="#616161"/>
       <Path d="m497.1 86.309-9.4305 9.4349-44.126-22.909 20.212 46.819-37.722 37.722-35.366-36.038 106.43-106.43c19.874 19.536 19.874 51.534 0 71.404z" fill="#4a4a4a"/>
       <Path d="m487.66 95.744-23.914 23.91-71.404-71.404 23.91-23.914z" fill="#404040"/>
       <Path d="m428.03 83.936 23.91-23.91 35.704 35.7-23.914 23.914z" fill="#292929"/>
      </G>
    </Svg>
  );
}
