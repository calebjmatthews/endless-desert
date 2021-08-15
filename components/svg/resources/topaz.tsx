import * as React from 'react';
import Svg from 'react-native-svg';

export default function TopazSvgComponent(props: any) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <g transform="matrix(.90141 0 0 .90141 25.239 25.239)">
       <path d="m406 256-36 96-114 54-114-54-36-96 43.608-103.61 106.39-46.392 106.39 46.392z" fill="#fff159"/>
       <path d="m370 352 36-96-43.608-103.61-106.39-46.392v300z" fill="#ffdf40"/>
       <g id="Gem_4_">
        <path d="M 256,406 141.744,496.399 0,512 23.996,349.867 106,256 Z" fill="#ffdf40"/>
        <path d="M 512,0 496.324,141.928 406,256 256,106 353.5,23.5 Z" fill="#ffbe40"/>
        <path d="M 256,106 106,256 22.5,158.5 0,0 158.5,23.5 Z" fill="#ffdf40"/>
        <path d="m512 512-165.88-25.54-90.118-80.46 150-150 82.5 97.5z" fill="#ffbe40"/>
       </g>
       <path d="M 106,256 0,512 V 0 Z" fill="#ffbe40"/>
       <path d="M 512,0 256,106 0,0 Z" fill="#ffbe40"/>
       <path d="m512 0v512l-106-256z" fill="#ff9f40"/>
       <path d="m512 512h-512l256-106z" fill="#ffbe40"/>
       <g fill="#ff9f40">
        <path d="m512 512-256-106v106z"/>
        <path d="m256 106 256-106h-256z"/>
       </g>
      </g>
    </Svg>
  );
}
