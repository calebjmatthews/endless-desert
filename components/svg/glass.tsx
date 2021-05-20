import * as React from 'react';
import Svg from 'react-native-svg';
import Icon from '../../models/icon';

export default function GlassSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <defs>
       <filter id="filter2584" colorInterpolationFilters="sRGB">
        <feComponentTransfer in="blur" result="component">
         <feFuncR exponent="2" type="gamma"/>
         <feFuncG exponent="2" type="gamma"/>
         <feFuncB exponent="2" type="gamma"/>
        </feComponentTransfer>
       </filter>
       <filter id="filter2594" colorInterpolationFilters="sRGB">
        <feComponentTransfer in="blur" result="component">
         <feFuncR exponent="2" type="gamma"/>
         <feFuncG exponent="2" type="gamma"/>
         <feFuncB exponent="2" type="gamma"/>
        </feComponentTransfer>
       </filter>
      </defs>
      <path d="m511.58 512h-511.17l99.503-315.83h312.16z" fill="#b5ceff"/>
      <path d="m412.08 196.17h-51.425l99.503 315.83h51.425z" fill="#a4c2ff"/>
      <path d="m511.58 472.87h-511.17l99.503-315.83h312.16z" fill="#91a8dd"/>
      <path d="m412.08 157.04h-51.425l99.503 315.83h51.425z" fill="#7c96d1"/>
      <path d="m511.58 433.74h-511.17l99.503-315.83h312.16z" fill="#b5ceff"/>
      <path d="m412.08 117.91h-51.425l99.503 315.83h51.425z" fill="#a4c2ff"/>
      <path d="m511.58 394.62h-511.17l99.503-315.83h312.16z" fill="#91a8dd"/>
      <path d="m412.08 78.782h-51.425l99.503 315.83h51.425z" fill="#7c96d1"/>
      <path d="m511.58 355.49h-511.17l99.503-315.83h312.16z" fill="#b5ceff"/>
      <path d="m412.08 39.653h-51.425l99.503 315.83h51.425z" fill="#a4c2ff"/>
      <path d="m511.58 316.36h-511.17l99.503-316.36h312.16z" fill="#e9f2ff" filter="url(#filter2584)"/>
      <path d="m412.08 0h-51.425l99.503 316.36h51.425z" fill="#deebff" filter="url(#filter2594)"/>
    </Svg>
  );
}
