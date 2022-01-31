import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';

export default function JuiceTomatoSvgComponent(props: any) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <Path d="M358.724,512H120.244L88.851,83.591h301.266L358.724,512z" fill="#EDEDEE"/>
      <Path d="M358.724,512h-119.24V83.591h150.633L358.724,512z" fill="#DDDCDF"/>
      <Polygon points="273.44 264.1 241.03 256.07 311.23 0 423.15 40.058 411.9 71.488 333.9 43.57" fill="#E3744E"/>
      <Polygon points="100.58 243.67 120.24 512 358.72 512 378.39 243.67" fill="#ff4800"/>
      <Polygon points="239.48 243.67 239.48 512 358.72 512 378.39 243.67" fill="#c92b00"/><G strokeWidth=".33474">
      <Path d="m126.62 7.1103c-41.775 0-75.882 34.718-75.882 77.845 0 42.855 33.843 77.845 75.882 77.845" fill="#c92b00"/><Path d="m126.62 23.113c-33.314 0-60.282 27.666-60.282 61.842 0 34.176 26.968 61.842 60.282 61.842" fill="#ef683f"/><Path d="m126.62 35.319c-26.704 0-48.384 22.241-48.384 49.636 0 27.395 21.68 49.636 48.384 49.636" fill="#a00000"/><Path d="m126.62 65.969c-10.311 0-18.508 8.6796-18.508 18.987 0 10.578 8.1963 18.987 18.508 18.987" fill="#ef683f"/></G>
    </Svg>
  );
}
