import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';

export default function NotesDialecticComponent(props: any) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <G>
       <Path d="m144 480h-64c-8.284 0-15-6.716-15-15v-420c0-24.813 20.187-45 45-45h34c8.284 0 15 6.716 15 15v450c0 8.284-6.716 15-15 15z" fill="#e09562"/>
       <Path d="m432 0h-303v433c0 8.28 6.72 15 15 15h288c8.28 0 15-6.72 15-15v-418c0-8.28-6.72-15-15-15z" fill="#f0a878"/>
       <Path d="m447 15v418c0 8.28-6.72 15-15 15h-144v-448h144c8.28 0 15 6.72 15 15z" fill="#e09562"/>
      </G>
      <Path d="m432 433v64h-320c-17.67 0-32-14.33-32-32 0-17.62 14.28-32 32-32z" fill="#f6f9f9"/>
      <Path d="m288 433h144v64h-144z" fill="#e2dff4"/>
      <G>
       <Path d="m180.37 93.642h237.15v237.15h-237.15z" fill="#ffcdab" strokeWidth="1.4822"/>
       <Path d="m389.53 71.41h-209.15c-12.272 0-22.233 9.9602-22.233 22.233v237.15c0 12.272 9.9602 22.233 22.233 22.233h211.7c12.272 0 22.364-9.9609 22.233-22.233l-2.545-237.15c-0.1317-12.272-9.9602-22.233-22.233-22.233zm5.7629 237.15h-192.68v-192.68h192.68z" fill="#e09562" strokeWidth="1.4822"/>
       <Path d="m447 497c0 8.28-6.72 15-15 15h-320c-25.92 0-47-21.08-47-47s21.08-47 47-47h320c8.28 0 15 6.72 15 15s-6.72 15-15 15h-320c-9.37 0-17 7.63-17 17s7.63 17 17 17h320c8.28 0 15 6.72 15 15z" fill="#e09562"/>
       <G fill="#c27a49">
        <Path d="m447 497c0 8.28-6.72 15-15 15h-144v-30h144c8.28 0 15 6.72 15 15z"/>
        <Path d="m432 448h-144v-30h144c8.28 0 15 6.72 15 15s-6.72 15-15 15z"/>
       </G>
       <Path d="m417.52 93.642v237.15c0 12.272-9.1766 22.233-20.484 22.233h-109.25v-44.465h88.762v-192.68h-88.762v-44.465h109.25c11.307 0 20.484 9.9602 20.484 22.233z" fill="#c27a49" strokeWidth="1.4227"/>
       <G transform="matrix(.30051 0 0 .30051 215.7 147.1)" fill="#a16034">
        <G fill="#a16034">
         <Polygon points="241.9 306.47 484.01 189.84 484.01 179.19 241.9 62.561 0 179.08 0 189.95"/>
         <Path d="m83.808 251.57v69.7l145.84 70.25h24.506l145.44-70.057c0.14-0.307 0.271-0.613 0.402-0.922v-68.972l-158.09 76.152z"/>
         <Polygon points="439.36 358.2 426.88 396.2 445.74 421.44 452.12 421.44 470.98 396.2 458.51 358.2 458.51 222.6 439.36 232.26"/>
        </G>
       </G>
       <Rect x="287.79" y="115.87" width="88.762" height="192.68" fill="#9f4200" opacity=".31511"/>
      </G>
    </Svg>
  );
}
