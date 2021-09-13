import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function BeadsSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 489.36 489.36">
      <G>
       <Path d="m4.6797 484.68c-6.2383-6.2383-6.2383-16.383 0-22.625l457.38-457.38c6.2422-6.2383 16.387-6.2383 22.625 0 6.2422 6.2422 6.2422 16.383 0 22.625l-457.38 457.38c-6.2578 6.2422-16.383 6.2422-22.625 0z" fill="#55728e"/>
       <Path d="m403.03 63.688-339.34 339.34c6.5781 8.4648 14.176 16.047 22.625 22.625l339.36-339.34c-6.5938-8.4492-14.176-16.047-22.641-22.625z" fill="#12375c"/>
       <Path d="m260.68 324.68c0 53.02-42.98 96-96 96-53.02 0-96-42.98-96-96 0-53.02 42.98-96 96-96 53.02 0 96 42.98 96 96z" fill="#5e99d7"/>
       <Path d="m420.68 164.68c0 53.02-42.98 96-96 96-53.02 0-96-42.98-96-96 0-53.02 42.98-96 96-96 53.02 0 96 42.98 96 96z" fill="#d5e3f3"/>
       <Path d="m164.68 388.68c-47.473 0-86.895-34.672-94.559-80-0.88281 5.2148-1.4414 10.543-1.4414 16 0 52.945 43.055 96 96 96 52.945 0 96-43.055 96-96 0-5.457-0.55859-10.785-1.4414-16-7.6641 45.328-47.086 80-94.559 80z" fill="#3c86cf"/>
       <Path d="m324.68 228.68c-47.473 0-86.895-34.672-94.559-80-0.88281 5.2148-1.4414 10.543-1.4414 16 0 52.945 43.055 96 96 96 52.945 0 96-43.055 96-96 0-5.457-0.55859-10.785-1.4414-16-7.6641 45.328-47.086 80-94.559 80z" fill="#b3ceec"/>
      </G>
      <Circle cx="193.95" cy="295.25" r="16.81" fill="#fff" opacity=".99" strokeWidth=".75"/>
      <Circle cx="357.69" cy="132.85" r="16.81" fill="#fff" opacity=".99" strokeWidth=".75"/>
    </Svg>
  );
}
