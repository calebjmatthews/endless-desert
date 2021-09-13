import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';

export default function OnyxSvgComponent(props: any) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <Defs>
       <filter id="filter6915" colorInterpolationFilters="sRGB">
        <feColorMatrix result="color1" type="hueRotate" values="15"/>
        <feColorMatrix result="fbSourceGraphic" type="saturate" values="0.254491"/>
        <feColorMatrix in="fbSourceGraphic" result="fbSourceGraphicAlpha" values="0 0 0 -1 0 0 0 0 -1 0 0 0 0 -1 0 0 0 0 1 0"/>
        <feColorMatrix in="fbSourceGraphic" values="0.767802 0 0 -0.41869 0.116099 0 0.767802 0 -0.41869 0.116099 0 0 0.767802 -0.41869 0.116099 0 0 0 1 0"/>
       </filter>
      </Defs>
      <G filter="url(#filter6915)">
       <Path d="m346 345.1-3.021 61.2-86.979 105.7-87.059-105.85-2.941-61.05 90-30z" fill="#6cf"/>
       <Path d="m512 255.7-82.9 74.7-83.1 14.7-30-89.4 30-89.401 83.1 14.701z" fill="#59abff"/>
       <Path d="m166 166.3 30 89.401-30 89.4-83.099-14.7-82.901-74.7 82.901-74.7z" fill="#6cf"/>
       <Path d="m346 166.3-90 30-90-30 15-83.4 75-82.9 75 82.9z" fill="#6cf"/>
       <G id="Magna_1_">
        <Path d="m166 345.1v0.6l22.115 54.259-39.815 67.541-73.499-30.6-30.601-74.1 60.9-38.85z" fill="#6cf"/>
        <Path d="m467.2 364.3-30 72.6-73.499 30.3-37.823-53.7 20.122-67.8v-0.6l60.6-20.4z" fill="#59abff"/>
        <Path d="m467.8 148.9-61.2 38.742-60.6-21.343v-0.599l-20.122-67.801 37.823-53.698 73.499 30.298z" fill="#59abff"/>
        <Path d="m166 165.7v0.599l-60.9 21-60.9-38.999 30.601-73.801 73.499-30.298 37.823 53.698z" fill="#6cf"/>
        <Path d="m166 166.3h180v178.8h-180z" fill="#73e7ff"/>
       </G>
       <Path d="m166 166.3-166 89.401 44.2-107.4z" fill="#59abff"/>
       <Path d="m512 255.7-166-89.401 121.8-17.399z" fill="#4d87ff"/>
       <Path d="m512 255.7-44.8 108.6-121.2-19.2z" fill="#4d87ff"/>
       <Path d="m166 345.1-121.8 17.7-44.2-107.1z" fill="#59abff"/>
       <Path d="m342.98 406.3 3.021-61.199-90-30v196.9z" fill="#59abff"/>
       <Path d="m346 166.3-15-83.401-75-82.899v196.3z" fill="#59abff"/>
       <Path d="m256 166.3h90v178.8h-90z" fill="#6cf"/>
       <Path d="m363.7 467.2-107.7 44.799 90-166.9v0.6z" fill="#4d87ff"/>
       <Path d="m256 512-107.7-44.499 17.7-121.8v-.6z" fill="#59abff"/>
       <Path d="m166 166.3v-0.599l-17.7-121.5 107.7-44.202z" fill="#59abff"/>
       <Path d="m363.7 44.202-17.701 121.5v0.599l-90-166.3z" fill="#4d87ff"/>
      </G>
    </Svg>
  );
}
