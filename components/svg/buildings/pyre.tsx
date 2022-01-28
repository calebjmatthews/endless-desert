import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function PyreSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 460 460">
      <G id="XMLID_1058_">
        <Path id="XMLID_1059_" d="m336.91 143.09-106.91-143.09-20 200 20 200c82.713 0 149.77-67.054 149.77-149.77v-123.89l-42.853 16.75z" fill="#F0651F"/>
        <Path id="XMLID_1060_" d="m123.09 143.09-42.853-16.749v123.89c0 82.712 67.054 149.77 149.77 149.77v-400l-106.91 143.09z" fill="#F58330"/>
        <Polygon id="XMLID_1061_" points="383.51 460 230 460 210 430 230 400 383.51 400" fill="#624950"/>
        <Polygon id="XMLID_1062_" points="230 400 230 460 136.49 460 116.49 430 136.49 400" fill="#967151"/>
        <Rect id="XMLID_1063_" x="76.489" y="400" width="60" height="60" fill="#CB9851"/>
        <Path id="XMLID_1064_" d="m297.16 226.57c10.753 14.429 16.448 31.674 16.448 49.822 0 46.104-37.508 83.611-83.611 83.611l-20-111.66 20-111.66 67.163 89.879z" fill="#FFC052"/>
        <Path id="XMLID_1065_" d="M230,136.688V360c-46.103,0-83.611-37.507-83.611-83.611   c0-18.148,5.695-35.393,16.49-49.875L230,136.688z" fill="#F9D4A0"/>
      </G>
    </Svg>
  );
}
