import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function BrokenKeySvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <G transform="matrix(1.0627 1.0627 -1.0627 1.0627 249.73 -290.43)"><G fill="#931500"><G>
      <Path d="m251.51 127.5c-21.2 0-38.4-17.2-38.4-38.4 1e-5 -21.2 17.2-38.4 38.4-38.4 21.2-7e-6 38.4 17.2 38.4 38.4 0 21.2-17.2 38.4-38.4 38.4zm0-60.3c-12.1 0-21.9 9.8-21.9 22-1e-5 12.1 9.8 21.9 21.9 21.9 12.1 0 22-9.8 22-21.9 0-12.2-9.9-22-22-22z"/>
        <Path d="m312.01 188c-21.2 0-38.4-17.2-38.4-38.4 1e-5 -21.2 17.2-38.4 38.4-38.4s38.4 17.2 38.4 38.4c0 21.2-17.2 38.4-38.4 38.4zm0-60.4c-12.1 0-22 9.8-22 21.9-1e-5 12.1 9.8 22 22 22 12.1 0 22-9.8 22-22-0.1-12-9.9-21.9-22-21.9z"/>
        <Path d="m191.01 188c-21.2 0-38.4-17.2-38.4-38.4 1e-5 -21.2 17.2-38.4 38.4-38.4s38.4 17.2 38.4 38.4c0 21.2-17.2 38.4-38.4 38.4zm0-60.4c-12.1 0-21.9 9.8-21.9 21.9s9.8 22 21.9 22c12.1 0 22-9.8 22-22 0-12-9.9-21.9-22-21.9z"/>
          <Rect transform="rotate(225)" x="-236.04" y="56.559" width="16.5" height="31.1" strokeWidth=".99999"/>
        <Polygon transform="translate(3.4061 -1.3993)" points="293 173.5 304.6 185.1 256.8 232.9 245.2 221.3"/>
          <Path d="m245.48 234.23-50.769-50.769 11.667-11.667 44.849 44.849 8.977 14.861z" strokeWidth=".99999"/><Rect transform="rotate(224.99)" x="-298.9" y="119.64" width="31.4" height="16.5" strokeWidth=".99999"/>
        <Path d="m251.51 187.2c-2.1 0-4.2-0.8-5.8-2.4l-29.4-29.4c-1.5-1.5-2.4-3.6-2.4-5.8s0.9-4.3 2.4-5.8l29.4-29.4c3.2-3.2 8.4-3.2 11.6 0l29.4 29.4c3.2 3.2 3.2 8.4 0 11.6l-29.4 29.4c-1.6 1.6-3.7 2.4-5.8 2.4zm-17.7-37.6 17.7 17.7 17.7-17.7-17.7-17.7z"/>
        <Rect x="264.41" y="362.4" width="54.3" height="8"/>
        <Rect x="278.41" y="375.4" width="22.1" height="8"/>
        <Rect x="310.51" y="362.4" width="8" height="23.5"/>
        <Rect x="278.41" y="362.8" width="8" height="20.6"/>
        <Rect x="264.41" y="409.1" width="54.3" height="8"/>
        <Rect x="278.41" y="396.1" width="22.1" height="8"/>
        <Rect x="310.51" y="393.6" width="8" height="23.5"/>
        <Rect x="278.41" y="396.2" width="8" height="20.6"/>
      </G><Rect x="240.75" y="254.99" width="20.864" height="97.802" fillOpacity=".98" fillRule="evenodd" strokeWidth=".66539"/></G><Rect x="250.9" y="46.359" width="108.27" height="375.02" fill="#fff" fillOpacity=".98" fillRule="evenodd" opacity=".50804" strokeWidth=".62671"/></G>
    </Svg>
  );
}
