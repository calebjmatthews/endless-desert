import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function HammersSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 36 36">
      <G fill="#D67909">
       <Path d="M6.814 33.279c-1.166 1.166-3.021 1.221-4.121.121c-1.1-1.1-1.045-2.955.121-4.121L26.079 6.014c1.167-1.167 3.021-1.221 4.121-.121c1.101 1.1 1.046 2.955-.121 4.121L6.814 33.279z"/>
       <Path d="m32.585 7.657a2 2 0 0 0 0-2.829l-1.414-1.414a2 2 0 0 0-2.828 2.829l1.414 1.414a2 2 0 0 0 2.828 0z"/>
       <Path d="m32.585 7.657a2 2 0 0 0 0-2.829l-1.414-1.414a2 2 0 0 0-2.828 2.829l1.414 1.414a2 2 0 0 0 2.828 0z"/>
      </G>
      <Path d="m35.789 13.424c-0.252-1.765-0.375-4.354-3.204-7.182l-0.707-0.708-4.949-4.95a2 2 0 0 0-2.828 0l-3.536 3.536a2 2 0 0 0 0 2.829l9.899 9.899c1.027 1.027 3.314 3.315 4.718 1.911 0.773-0.772 0.961-2.86 0.607-5.335z" fill="#485862"/>
      <Path d="M29.185 33.279c1.166 1.166 3.022 1.221 4.121.121c1.1-1.1 1.045-2.955-.121-4.121L9.921 6.014C8.754 4.847 6.899 4.792 5.8 5.893c-1.101 1.1-1.046 2.955.121 4.121l23.264 23.265z" fill="#F4900C"/>
      <Path d="M3.415 7.657a2 2 0 0 1 0-2.829l1.414-1.414a2 2 0 0 1 2.828 2.829L6.243 7.657a2 2 0 0 1-2.828 0z" fill="#F4900C"/>
      <Path d="M4.122 15.436c.78.78 2.047.78 2.828 0l8.485-8.485a2 2 0 0 0 0-2.829L11.899.587a2 2 0 0 0-2.828 0L.586 9.071a2 2 0 0 0 0 2.828l3.536 3.537z" fill="#66757F"/>
    </Svg>
  );
}
