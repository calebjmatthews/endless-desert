import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function ShatteredDomeSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <G>
       <Path d="m438.28 126.84-53.24-53.24c-2.813-2.813-6.628-4.394-10.606-4.394s-7.793 1.58-10.606 4.394l-118.49 118.49c-5.858 5.857-5.858 15.355 0 21.213 5.857 5.857-1.91 70.598 3.947 64.74l32.681-12.766c-5.858 5.857 10.755-4.591 16.613 1.266 2.929 2.929 6.768 4.394 10.606 4.394s7.678-1.465 10.606-4.394l118.49-118.49c5.857-5.857 5.857-15.355-1e-3 -21.213z" fill="#898f95"/>
       <Path d="m507.49 110.88-106.48-106.48c-5.857-5.857-15.355-5.857-21.213 0l-42.592 42.593c-5.858 5.857-5.858 15.355 0 21.213l106.48 106.48c2.929 2.929 6.768 4.394 10.606 4.394s7.678-1.465 10.606-4.394l42.593-42.593c5.859-5.857 5.859-15.355 1e-3 -21.213z" fill="#767c84"/>
       <Path d="m481.76 255.941v60.24c0 8.279-6.72 15-15 15h-421.64c-8.28 0-15-6.721-15-15 0-39.129-.059-61.375-.007-75.25 0 0 9.757-12.148 9.87-16.054.162-5.602-8.773-13.947-8.773-13.947.003-.036.007-.073.01-.109 3.131-31.749 12.824-61.553 27.706-88.04 0 0 11.723-3.379 14.439-7.542 2.767-4.241 2.014-17.646 2.014-17.646 15.356-20.401 34.094-38.108 55.385-52.295 0 0 14.574 5.217 19.76 2.324 3.597-2.007 6.38-17.322 6.38-17.322 29.894-14.586 63.499-22.769 99.035-22.769 8.28 0 15 6.72 15 15v169.66l-19.362 13.856 19.362 34.894h195.82c8.281 0 15.001 6.72 15.001 15z" fill="#363d4d"/>
       <Path d="m481.76 255.94v60.24c0 8.279-6.72 15-15 15h-195.82v-90.24h195.82c8.28 0 15 6.72 15 15z" fill="#232a3b"/>
       <Path d="m270.94 192.19v48.74h-240.83c0-9.359-0.13-17.469 1.097-30.001l186.26 1e-3 -158.54-88.15s3.692-6.473 7.804-12.729c4.14-6.299 8.65-12.459 8.65-12.459l151.61 84.308-96.225-136.6 26.14-14.999z" fill="#464c59"/>
       <Path d="m511.88 316.18v180.7c0 8.29-6.71 15-15 15h-45.23l-48.33-35.03-56.97 35.03h-331.35c-8.29 0-15-6.71-15-15v-180.7c0-8.29 6.71-15 15-15h481.88c8.29 0 15 6.71 15 15z" fill="#464c59"/>
       <Path d="m511.88 316.18v180.7c0 8.29-6.71 15-15 15h-45.23l-48.33-35.03-56.97 35.03h-75.41v-210.7h225.94c8.29 0 15 6.71 15 15z" fill="#363d4d"/>
       <G fill="#898f95">
        <Path d="m451.65 376.41v135.47h-105.3v-135.47c0-8.279 6.72-15 15-15h75.3c8.28 0 15 6.72 15 15z"/>
        <Path d="m90.234 391.41h-22.588c-8.284 0-15-6.716-15-15s6.716-15 15-15h22.588c8.284 0 15 6.716 15 15s-6.716 15-15 15z"/>
        <Path d="m90.234 451.65h-22.588c-8.284 0-15-6.716-15-15s6.716-15 15-15h22.588c8.284 0 15 6.716 15 15s-6.716 15-15 15z"/>
        <Path d="m173.06 391.41h-22.588c-8.284 0-15-6.716-15-15s6.716-15 15-15h22.588c8.284 0 15 6.716 15 15s-6.716 15-15 15z"/>
        <Path d="m173.31 451.39h-22.588c-8.284 0-15-6.716-15-15s6.716-15 15-15h22.588c8.284 0 15 6.716 15 15s-6.716 15-15 15z"/>
        <Path d="m256.14 391.16h-22.588c-8.284 0-15-6.716-15-15s6.716-15 15-15h22.588c8.284 0 15 6.716 15 15s-6.716 15-15 15z"/>
        <Path d="m256.14 451.39h-22.588c-8.284 0-15-6.716-15-15s6.716-15 15-15h22.588c8.284 0 15 6.716 15 15s-6.716 15-15 15z"/>
       </G>
      </G>
    </Svg>
  );
}