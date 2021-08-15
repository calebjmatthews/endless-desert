import * as React from 'react';
import Svg from 'react-native-svg';

export default function SapphireSvgComponent(props: any) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <defs>
       <filter id="filter35457" colorInterpolationFilters="sRGB">
        <feColorMatrix result="color1" type="hueRotate" values="172"/>
        <feColorMatrix result="color2" type="saturate" values="1"/>
       </filter>
      </defs>
      <g filter="url(#filter35457)">
       <path d="m356.8 21.7-24.37 91.65-76.43 22.65-80.4-27.15-20.4-87.15c33.34-14.46 67.07-21.7 100.8-21.7s67.46 7.24 100.8 21.7z" fill="#ff9f40"/>
       <path d="m376 256-30 90-90 30-90-30-30-90 30-90 90-30 90 30z" fill="#fff159"/>
       <path d="m355.9 490.6c-31.5 13.499-65.102 21.4-99.901 21.4-35.099 0-69-7.901-100.8-21.7l20.4-57.15 80.4-57.15 79.95 57.3z" fill="#ff9f40"/>
       <path d="m356.8 21.7-24.37 91.65-76.43 22.65v-136c33.73 0 67.46 7.24 100.8 21.7z" fill="#ec801d"/>
       <path d="m346 346 30-90-30-90-90-30v240z" fill="#ffdf40"/>
       <path d="m355.9 490.6-19.949-57.301-79.952-57.299v136c34.799 0 68.401-7.901 99.901-21.4z" fill="#ec801d"/>
       <path d="m136 256-47.55 71.933-66.75 28.867c-13.801-31.8-21.7-65.701-21.7-100.8 0-35.101 7.899-69 21.7-100.8l57.15 20.4z" fill="#ff9f40"/>
       <path d="m155.2 490.3c-60.3-25.8-107.7-73.2-133.5-133.5l57.15-20.4 57.15 39.6 39.6 57.15z" fill="#ffdf40"/>
       <path d="m490.3 356.8c-26.1 60.6-73.801 108-134.4 133.8l-19.924-57.45 40.023-57.15 57.15-39.6z" fill="#ffbe40"/>
       <path d="m512 256c0 35.099-7.899 69-21.7 100.8l-57.15-20.4-57.15-80.4 57.15-80.4 57.15-20.4c13.801 31.8 21.7 65.699 21.7 100.8z" fill="#ec801d"/>
       <path d="m376 136 30 60-30 60-120-120 60-30z" fill="#ff9f40"/>
       <path d="m490.3 155.2-57.15 20.4-57.15-39.6-39.6-57.15 20.4-57.15c60.3 25.8 107.7 73.2 133.5 133.5z" fill="#ff9f40"/>
       <g fill="#ffdf40">
        <path d="m256 136-120 120-30-67.646 30-52.354 60-30z"/>
        <path d="m155.2 21.7 20.4 57.15-39.6 57.15-47.55 37.988-66.75-18.788c25.8-60.3 73.2-107.7 133.5-133.5z"/>
       </g>
       <path d="m376 256 30 64.049-30 55.951-60 30-60-30z" fill="#ffbe40"/>
       <path d="m256 376-60 30-60-30-30-60 30-60z" fill="#ffdf40"/>
       <g fill="#ffbe40">
        <path d="m256 136h-120l19.2-114.3z"/>
        <path d="m136 136v120l-114.3-100.8z"/>
        <path d="m256 376-100.8 114.3-19.2-114.3z"/>
        <path d="m136 256v120l-114.3-19.2z"/>
       </g>
       <path d="m490.3 356.8-114.3 19.2v-120z" fill="#ff9f40"/>
       <path d="m376 376-20.099 114.6-99.901-114.6z" fill="#ff9f40"/>
       <path d="m490.3 155.2-114.3 100.8v-120z" fill="#ffbe40"/>
       <path d="m376 136h-120l100.8-114.3z" fill="#ffbe40"/>
      </g>
    </Svg>
  );
}
