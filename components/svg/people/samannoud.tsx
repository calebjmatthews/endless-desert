import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function SamannoudSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <G transform="matrix(1.0832 0 0 1.0107 -12.404 -5.3481)" fill="#5e8b5e">
       <Path d="m163.63 358.04c-7.386 2.36-16.079 3.4105-25.068 5.6235-47.93 11.792-107.56 27.484-107.56 133.33 0 8.291 6.709 15 15 15h135z" fill="#5e8b5e"/>
      </G>
      <Path d="m133.63 226.45c-5.859-5.859-5.859-15.352 0-21.211l30-30c5.859-5.859 15.352-5.859 21.211 0s5.859 15.352 0 21.211l-30 30c-5.86 5.86-15.352 5.86-21.211 0z" fill="#ffb64c"/>
      <G transform="matrix(-1.0832 0 0 1.0107 539.79 -4.3779)" fill="#70a370">
       <Path d="m407.59 373.42c-22.485-8.5954-35.095-12.236-58.589-16.508-6.584-2.102-12.654-4.343-17.997-7.04l-15 19.592-4.8022 120.84-10.307 20.4 113.54 1.2108c-0.0603-29.883 0.27447-115.47-6.8479-138.49z" fill="#70a370"/>
      </G>
      <G transform="matrix(1.0832 0 0 1.0107 -28.404 -4.8404)" fill="#437b43">
       <Path d="m373.44 363.67c-8.989-2.214-17.053-4.387-24.439-6.747l-17.998 155.08h135c8.291 0 15-6.709 15-15 0-105.85-59.634-121.54-107.56-133.33z" fill="#437b43"/>
      </G>
      <G fill="#f0e0ce">
       <Path d="m301 307.66h-90c-3.788 22.407-14.094 34.184-30 42.213l20.608 162.38 104.16-0.20004 25.235-162.18c-15.906-8.029-26.212-19.806-30-42.213z" fill="#f0e0ce"/>
      </G>
      <Path d="m256 307.66h-45v68.335c0 24.853 20.147 45 45 45s45-20.147 45-45v-68.335z" fill="#a34f3e"/>
      <Path d="m353.34 127.12h-194.69c-4.832 12.052-7.657 25.122-7.657 38.877v60c0 57.891 47.109 105 105 105s105-47.109 105-105v-60c0-13.755-2.825-26.825-7.657-38.877z" fill="#c86e59"/>
      <Path d="m286.06 6.0532c-10.362 0-20.334 1.392-30 3.591-60.388 13.736-105 68.688-105 132.41l1.0502 33.022 71.269-45.737 32.571-0.097 29.659-7.6316c4.506 3.726 73.689 125.6 78.929 123.13 5.274-2.461 11.597-6.221 11.732-12.034l2.4066-103.28c0.56266-24.147-18.172-123.37-92.615-123.37z" fill="#575f64"/>
      <G transform="matrix(1.0832 0 0 1.0107 -30.723 -5.3156)" fill="#5e8b5e">
       <Path d="m407.59 373.42c-22.485-8.5954-35.095-12.236-58.589-16.508-6.584-2.102-12.654-4.343-17.997-7.04l-15 19.592-4.8022 120.84-10.307 20.4 113.54 1.2108c-0.0603-29.883 0.27447-115.47-6.8479-138.49z" fill="#5e8b5e"/>
      </G>
      <Path d="m331 349.88c-15.906-8.029-26.212-19.807-30-42.213l-45.464 56.122 0.46382 148.22h54.128z" fill="#e3caae"/>
      <Path d="m301 376v-68.335h-45v113.34c24.853 0 45-20.147 45-45z" fill="#873f2e"/>
      <Path d="m361 226v-60c0-13.755-2.825-26.825-7.657-38.877h-97.343v203.88c57.891 0 105-47.109 105-105z" fill="#a34f3e"/>
      <G transform="translate(-.55223 5.2779)" fillRule="evenodd">
       <Rect x="151.67" y="140.57" width="215.78" height="16.05" fill="#ffb64c"/>
       <Rect x="256.51" y="140.57" width="85.697" height="16.03" fill="#e9a440" strokeWidth=".99505"/>
      </G>
      <Path d="m368.02 273.88c3.3456-1.7835 5.2153-6.8303 5.9278-12.56l13.889-111.69c9.1211-73.351-37.165-143.58-104.6-143.58-9.3869 0-18.421 1.392-27.177 3.591l-0.0586 119.61c56.683 8.3678 17.381 118.32 107.5 147.1z" fill="#32393f" strokeWidth=".95179"/>
    </Svg>
  );
}
