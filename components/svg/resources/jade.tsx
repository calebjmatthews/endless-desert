import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';

export default function JadeSvgComponent(props: any) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <G transform="matrix(.81305 0 0 .81305 47.86 47.86)">
       <Path d="M 131.02,256 256,47.68 380.98,256 256,464.32 Z" fill="#258c68"/>
       <Path d="m380.98 256-124.98-208.32 0.31925 208.24z" fill="#0c9263"/>
       <Path d="m380.98 255.83-124.98 208.32 0.31925-208.24z" fill="#11694b"/>
       <Path d="m131.66 256 124.98-208.32-0.31925 208.24z" fill="#1e805d"/>
       <G fill="#0c9263">
        <Path d="m451 256c0 140.7-87.599 256-195 256l-30-47.685 30-58.315 90-150 40.5-30z"/>
        <Path d="m256 0 30 47.685-30 58.315-90 150-34.981 30-70.019-30c0-140.7 87.599-256 195-256z"/>
       </G>
       <Path d="m451 256h-105l-90-150v-106c107.4 0 195 115.3 195 256z" fill="#11694b"/>
       <Path d="m256 406v106c-107.4 0-195-115.3-195-256h105z" fill="#1dac7b"/>
      </G>
    </Svg>
  );
}
