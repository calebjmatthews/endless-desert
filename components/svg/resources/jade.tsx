import * as React from 'react';
import Svg from 'react-native-svg';

export default function JadeSvgComponent(props: any) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <defs>
       <filter id="filter2254" colorInterpolationFilters="sRGB">
        <feColorMatrix result="color1" type="hueRotate" values="132"/>
        <feColorMatrix result="color2" type="saturate" values="0.547904"/>
       </filter>
      </defs>
      <g filter="url(#filter2254)">
       <path d="m131.02 256 124.98-208.32 124.98 208.32-124.98 208.32z" fill="#ff5400"/>
       <path d="m380.98 256-124.98-208.32v416.63z" fill="#ee4713"/>
       <g fill="#f25a3c">
        <path d="m451 256c0 140.7-87.599 256-195 256l-30-47.685 30-58.315 90-150 40.5-30z"/>
        <path d="m256 0 30 47.685-30 58.315-90 150-34.981 30-70.019-30c0-140.7 87.599-256 195-256z"/>
       </g>
       <g fill="#e63a3a">
        <path d="m451 256h-105l-90-150v-106c107.4 0 195 115.3 195 256z"/>
        <path d="m256 406v106c-107.4 0-195-115.3-195-256h105z"/>
       </g>
      </g>
    </Svg>
  );
}
