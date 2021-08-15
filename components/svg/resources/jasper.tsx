import * as React from 'react';
import Svg from 'react-native-svg';

export default function JasperSvgComponent(props: any) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <g transform="matrix(1,0,0,-1,0,512)">
       <g>
        <path d="m100.14 421-31.553-47.329 154.01-282.67h66.797l154.01 282.67-31.552 47.329z" fill="#ffb54b"/>
        <path d="m256 91v330h155.86l31.552-47.329-154.01-282.67z" fill="#ff9f40"/>
        <path d="m512 376.9-67.899 104.1-53.989-44.699 5.688-45.301 12.601-18.9 46.199-27.889z" fill="#f06b2a"/>
       </g>
       <g fill="#ff9f40">
        <path d="m116.2 391 11.04 35.55-59.041 54.45h-0.3l-67.9-104.1 62.92-32.94 40.68 28.141z"/>
        <path d="m325 31 3.3 75-56.699 15h-31.201l-56.7-15 3.301-75z"/>
       </g>
       <g>
        <path d="m444.1 481h-375.9l48.001-90h279.6z" fill="#ffa940"/>
        <path d="m256 481h188.1l-48.301-90h-139.8z" fill="#ff8805"/>
        <path d="m256 31v90h15.601l56.7-15-3.301-75z" fill="#f06b2a"/>
        <path d="m240.4 121-136.8 251.1-103.6 4.799 187-345.9z" fill="#ff8805"/>
        <path d="m512 376.9-103.6-4.799-136.8-251.1 53.399-90z" fill="#ff7f40"/>
       </g>
      </g>
    </Svg>
  );
}
