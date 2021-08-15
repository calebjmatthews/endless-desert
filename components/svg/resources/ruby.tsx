import * as React from 'react';
import Svg from 'react-native-svg';

export default function RubySvgComponent(props: any) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="-61 0 512 512">
      <defs>
       <filter id="filter3153" colorInterpolationFilters="sRGB">
        <feColorMatrix result="color1" type="hueRotate" values="17"/>
        <feColorMatrix result="color2" type="saturate" values="1"/>
       </filter>
       <filter id="filter3159" colorInterpolationFilters="sRGB">
        <feColorMatrix result="color1" type="hueRotate" values="17"/>
        <feColorMatrix result="color2" type="saturate" values="1"/>
       </filter>
       <filter id="filter3165" colorInterpolationFilters="sRGB">
        <feColorMatrix result="color1" type="hueRotate" values="17"/>
        <feColorMatrix result="color2" type="saturate" values="1"/>
       </filter>
       <filter id="filter3171" colorInterpolationFilters="sRGB">
        <feColorMatrix result="color1" type="hueRotate" values="17"/>
        <feColorMatrix result="color2" type="saturate" values="1"/>
       </filter>
       <filter id="filter3177" colorInterpolationFilters="sRGB">
        <feColorMatrix result="color1" type="hueRotate" values="17"/>
        <feColorMatrix result="color2" type="saturate" values="1"/>
       </filter>
       <filter id="filter3183" colorInterpolationFilters="sRGB">
        <feColorMatrix result="color1" type="hueRotate" values="17"/>
        <feColorMatrix result="color2" type="saturate" values="1"/>
       </filter>
      </defs>
      <g fill="#ff0059" filter="url(#filter3183)">
       <path d="m285 179.26 67.5-12.008 35.887-37.684c-1.1484-2.3906-2.793-4.5273-5.0664-6.0469l-180-121c-2.5195-1.6836-5.418-2.5273-8.3203-2.5273l-15 91.004 15 40.254 31.25 34.746z"/>
       <path d="m105 179.26-41.25-42.008-62.137-7.6836c-0.95703 1.9961-1.6133 4.1562-1.6133 6.4336v240c0 2.2812 0.65625 4.4414 1.6133 6.4375l69.637-8.9375 33.75-40.754 20-81.742z"/>
       <path d="m285 332.75-52.5 9.5078-37.5 38.492-15 62.504 15 68.75c2.9023 0 5.8008-0.83594 8.3203-2.5195l180-121c2.2734-1.5156 3.918-3.6523 5.0664-6.043l-43.387-41.434z"/>
      </g>
      <path d="m195 131.26v-131.26c-2.8984 0-5.8008 0.84375-8.3164 2.5273l-180 121c-2.2734 1.5195-3.918 3.6562-5.0664 6.0469l103.39 49.691z" fill="#ff5e95" filter="url(#filter3177)"/>
      <path d="m285 332.75 103.39 49.691c0.95703-1.9961 1.6133-4.1562 1.6133-6.4375v-240c0-2.2773-0.65625-4.4375-1.6133-6.4336l-103.39 49.691z" fill="#e50048" filter="url(#filter3171)"/>
      <path d="m105 332.75-103.39 49.691c1.1484 2.3906 2.793 4.5273 5.0664 6.0469l180 121c2.5195 1.6836 5.418 2.5195 8.3164 2.5195v-131.25z" fill="#ff5e95" filter="url(#filter3165)"/>
      <path d="m285 179.2v153.6l-90 48-89.996-48v-153.6l89.996-48z" fill="#ffa2c3" filter="url(#filter3159)"/>
      <path d="m285 179.2v153.6l-90 48v-249.6z" fill="#ff5e95" filter="url(#filter3153)"/>
    </Svg>
  );
}
