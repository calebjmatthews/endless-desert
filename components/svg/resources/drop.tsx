import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';

export default function DropSvgComponent(props: any) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 511.88 511.88">
      <Path d="M284.6,26.939A42.794,42.794,0,0,0,256,16h0a42.794,42.794,0,0,0-28.6,10.939C187.107,63.133,64,183.567,64,304c0,106.039,85.961,192,192,192s192-85.961,192-192C448,183.567,324.893,63.133,284.6,26.939Z" fill={props.icon.shadow}/>
      <Path d="M160,400h0a96,96,0,0,0,96-96V16a42.794,42.794,0,0,0-28.6,10.939C187.106,63.133,64,183.566,64,304v.062A96,96,0,0,0,160,400Z" fill={props.icon.color}/>
      <Path d="m104 316.04a12 12 0 0 1-12-12v-0.473c0.147-44.874 21.345-97.874 61.3-153.31a625.74 625.74 0 0 1 54-64.68 12 12 0 0 1 17.4 16.535 601.48 601.48 0 0 0-51.924 62.179c-37.013 51.348-56.645 99.524-56.776 139.31v0.433a12 12 0 0 1-12 12.004z" fill={props.icon.secondaryColor}/>
    </Svg>
  );
}
