import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function CandleSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <G>
      <Path id="XMLID_23_" d="m256.45 5.3902-49.996 99.992 49.996 99.992c55.225 0 99.992-44.766 99.992-99.992 0-55.225-44.766-99.992-99.992-99.992z" fill="#e28389" strokeWidth="4.9996"/><Path id="XMLID_24_" d="m156.46 105.38c0 55.225 44.766 99.992 99.992 99.992v-199.98c-55.225 0-99.992 44.766-99.992 99.992z" fill={props.icon.tertiaryShadow} strokeWidth="4.9996"/><G strokeWidth="1.4647"><Rect x="188.53" y="197.05" width="137.51" height="239.39" fill="#e28389"/>
      <Rect x="256.46" y="197.05" width="69.593" height="239.37" fill={props.icon.color}/>
      <Path d="m204.42 117.66c0-29.224 52.865-79.373 52.865-79.373s52.865 50.148 52.865 79.373c0 29.234-23.672 52.927-52.865 52.927-29.199-1e-3 -52.865-23.696-52.865-52.927z" fill="#fff"/>
      <Path d="m257.29 38.285s-0.31344 0.29733-0.84073 0.80998v131.45c0.28268 4e-3 0.55804 0.0425 0.84073 0.0425 29.194 0 52.865-23.691 52.865-52.927 0-29.224-52.865-79.372-52.865-79.372z" fill={props.icon.tertiaryShadow}/>
      <Path d="m339.78 298.67c0 15.19-12.312 27.503-27.497 27.503-7.8874 0-14.981-3.341-19.996-8.6651 0.6635 2.7829 1.0282 5.6786 1.0282 8.6651 0 20.2-16.128 36.585-36.021 36.585-19.895 0-36.021-16.384-36.021-36.585 0-2.9821 0.35885-5.8778 1.0253-8.6578-5.0151 5.3256-12.107 8.6607-19.99 8.6607-15.186 0-27.495-12.312-27.495-27.503v-110.01h164.97v110h-3e-3z" fill={props.icon.secondaryColor}/>
      <Path d="m256.45 188.67v174.05c0.28268 8e-3 0.55511 0.0425 0.8378 0.0425 19.895 0 36.021-16.384 36.021-36.585 0-2.9865-0.36325-5.8807-1.0282-8.6651 5.0151 5.3256 12.107 8.6651 19.996 8.6651 15.186 0 27.497-12.312 27.497-27.503v-110l-83.323 1e-3z" fill={props.icon.secondaryShadow}/>
      <Path d="m76.753 431.4c28.808 45.713 98.777 77.979 180.54 77.979s151.73-32.264 180.54-77.979z" fill={props.icon.color} />
      <Path d="m256.45 431.4v77.968c0.27975 0 0.55804 0.01 0.84073 0.01 81.759 0 151.73-32.264 180.54-77.979z" fill={props.icon.shadow} />
      </G></G>
    </Svg>
  );
}
