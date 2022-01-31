import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';

export default function JuiceBlueberrySvgComponent(props: any) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <Path d="M358.724,512H120.244L88.851,83.591h301.266L358.724,512z" fill="#EDEDEE"/>
      <Path d="M358.724,512h-119.24V83.591h150.633L358.724,512z" fill="#DDDCDF"/>
      <Polygon points="273.44 264.1 241.03 256.07 311.23 0 423.15 40.058 411.9 71.488 333.9 43.57" fill="#E3744E"/>
      <Polygon points="100.58 243.67 120.24 512 358.72 512 378.39 243.67" fill="#888fe6"/>
      <Polygon points="239.48 243.67 239.48 512 358.72 512 378.39 243.67" fill="#6e6ed9"/><G strokeWidth=".69771">
      <Circle cx="92.481" cy="85.041" r="73.26" fill="#99a9ff"/><Path d="m165.74 85.041c0-40.391-32.868-73.26-73.26-73.26v146.52c40.391 0 73.26-32.868 73.26-73.26z" fill="#888fe6"/><Path d="m107.28 85.041 7.3992-7.3992c4.0879-4.0879 4.0879-10.711 0-14.799-4.0879-4.0879-10.711-4.0879-14.799 0l-7.3992 7.3992-7.3992-7.3992c-4.0879-4.0879-10.711-4.0879-14.799 0-4.0879 4.0879-4.0879 10.711 0 14.799l7.3992 7.3992-7.3992 7.3992c-4.0879 4.0879-4.0879 10.711 0 14.799 4.0879 4.0879 10.711 4.0879 14.799 0l7.3992-7.3992 7.3992 7.3992c4.0879 4.0879 10.711 4.0879 14.799 0 4.0879-4.0879 4.0879-10.711 0-14.799z" fill="#888fe6"/><Path d="m114.68 107.24c4.0879-4.0879 4.0879-10.711 0-14.799l-7.3992-7.3992 7.3992-7.3992c4.0879-4.0879 4.0879-10.711 0-14.799-4.0879-4.0879-10.711-4.0879-14.799 0l-7.3992 7.3992v29.598l7.3992 7.3992c4.0886 4.0886 10.711 4.0886 14.799 0z" fill="#6e6ed9"/></G>
    </Svg>
  );
}
