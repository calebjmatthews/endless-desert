import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function NotesSkySvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <Path d="m144 480h-64c-8.284 0-15-6.716-15-15v-420c0-24.813 20.187-45 45-45h34c8.284 0 15 6.716 15 15v450c0 8.284-6.716 15-15 15z" fill="#91beff"/>
      <Path d="m432 0h-303v433c0 8.28 6.72 15 15 15h288c8.28 0 15-6.72 15-15v-418c0-8.28-6.72-15-15-15z" fill="#acceff"/>
      <Path d="m447 15v418c0 8.28-6.72 15-15 15h-144v-448h144c8.28 0 15 6.72 15 15z" fill="#91beff"/>
      <Path d="m432 433v64h-320c-17.67 0-32-14.33-32-32 0-17.62 14.28-32 32-32z" fill="#f6f9f9"/>
      <Path d="m288 433h144v64h-144z" fill="#e2dff4"/>
      <Path d="m180.37 93.642h237.15v237.15h-237.15z" fill="#5e8fdc" strokeWidth="1.4822"/>
      <Path d="m389.53 71.41h-209.15c-12.272 0-22.233 9.9602-22.233 22.233v237.15c0 12.272 9.9602 22.233 22.233 22.233h211.7c12.272 0 22.364-9.9609 22.233-22.233l-2.545-237.15c-0.1317-12.272-9.9602-22.233-22.233-22.233zm5.7629 237.15h-192.68v-192.68h192.68z" fill="#91beff" strokeWidth="1.4822"/>
      <Path d="m447 497c0 8.28-6.72 15-15 15h-320c-25.92 0-47-21.08-47-47s21.08-47 47-47h320c8.28 0 15 6.72 15 15s-6.72 15-15 15h-320c-9.37 0-17 7.63-17 17s7.63 17 17 17h320c8.28 0 15 6.72 15 15z" fill="#91beff"/>
      <G fill="#7cadf5">
       <Path d="m447 497c0 8.28-6.72 15-15 15h-144v-30h144c8.28 0 15 6.72 15 15z"/>
       <Path d="m432 448h-144v-30h144c8.28 0 15 6.72 15 15s-6.72 15-15 15z"/>
      </G>
      <Path d="m417.52 93.642v237.15c0 12.272-9.1766 22.233-20.484 22.233h-109.25v-44.465h88.762v-192.68h-88.762v-44.465h109.25c11.307 0 20.484 9.9602 20.484 22.233z" fill="#7cadf5" strokeWidth="1.4227"/>
      <G transform="matrix(.29863 -.29863 .29863 .29863 169.14 214.71)" fill="#fff">
       <Path d="m384 112c-35.297 0-64 28.711-64 64 0 8.836 7.156 16 16 16s16-7.164 16-16c0-17.649 14.359-32 32-32s32 14.351 32 32-14.359 32-32 32h-366.73c-8.844 0-16 7.164-16 16s7.156 16 16 16h366.73c35.297 0 64-28.711 64-64s-28.703-64-64-64z"/>
       <Path d="m224 48c-35.297 0-64 28.711-64 64 0 8.836 7.156 16 16 16s16-7.164 16-16c0-17.649 14.359-32 32-32s32 14.351 32 32-14.359 32-32 32h-208c-8.844 0-16 7.164-16 16s7.156 16 16 16h208c35.297 0 64-28.711 64-64s-28.703-64-64-64z"/>
       <Path d="m224 272h-208c-8.844 0-16 7.164-16 16s7.156 16 16 16h208c17.641 0 32 14.351 32 32s-14.359 32-32 32-32-14.351-32-32c0-8.836-7.156-16-16-16s-16 7.164-16 16c0 35.289 28.703 64 64 64s64-28.711 64-64-28.703-64-64-64z"/>
      </G>
      <Rect x="287.79" y="115.88" width="88.762" height="192.68" fill="#0063ff" opacity=".11897"/>
    </Svg>
  );
}
