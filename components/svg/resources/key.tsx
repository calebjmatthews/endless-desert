import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function KeySvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 489.36 489.36">
      <G transform="matrix(1.0627 1.0627 -1.0627 1.0627 249.73 -290.43)" fill="#cf2a0e">
        <Rect x="234.6" y="176.6" width="27.4" height="267.5"/>
        <Path d="m265 243.5c0 2.9-1 5.3-4.9 5.3-4 0-7.2-2.4-7.2-5.3s3.2-5.3 7.2-5.3 4.9 2.4 4.9 5.3z"/>
        <Path d="m265 252.7c0 2.9-1 5.3-4.9 5.3-4 0-7.2-2.4-7.2-5.3s3.2-5.3 7.2-5.3 4.9 2.4 4.9 5.3z"/>
        <Path d="m248.1 128.9c-21.2 0-38.4-17.2-38.4-38.4s17.2-38.4 38.4-38.4 38.4 17.2 38.4 38.4-17.2 38.4-38.4 38.4zm0-60.3c-12.1 0-21.9 9.8-21.9 22 0 12.1 9.8 21.9 21.9 21.9s22-9.8 22-21.9c0-12.2-9.9-22-22-22z"/>
        <Path d="m308.6 189.4c-21.2 0-38.4-17.2-38.4-38.4s17.2-38.4 38.4-38.4 38.4 17.2 38.4 38.4-17.2 38.4-38.4 38.4zm0-60.4c-12.1 0-22 9.8-22 21.9s9.8 22 22 22c12.1 0 22-9.8 22-22-0.1-12-9.9-21.9-22-21.9z"/>
        <Path d="m187.6 189.4c-21.2 0-38.4-17.2-38.4-38.4s17.2-38.4 38.4-38.4 38.4 17.2 38.4 38.4-17.2 38.4-38.4 38.4zm0-60.4c-12.1 0-21.9 9.8-21.9 21.9s9.8 22 21.9 22 22-9.8 22-22c0-12-9.9-21.9-22-21.9z"/>

          <Rect transform="matrix(-.7071 -.7071 .7071 -.7071 277.37 337.86)" x="200.41" y="95.935" width="16.5" height="31.1"/>

          <Rect transform="matrix(-.7071 -.7071 .7071 -.7071 235.33 506.29)" x="186.62" y="196.16" width="71.799" height="16.5"/>
        <Polygon points="245.2 221.3 293 173.5 304.6 185.1 256.8 232.9"/>

          <Rect transform="matrix(-.7072 -.707 .707 -.7072 411.87 392.93)" x="271.6" y="102.93" width="31.4" height="16.5"/>
        <Path d="m248.1 188.6c-2.1 0-4.2-0.8-5.8-2.4l-29.4-29.4c-1.5-1.5-2.4-3.6-2.4-5.8s0.9-4.3 2.4-5.8l29.4-29.4c3.2-3.2 8.4-3.2 11.6 0l29.4 29.4c3.2 3.2 3.2 8.4 0 11.6l-29.4 29.4c-1.6 1.6-3.7 2.4-5.8 2.4zm-17.7-37.6 17.7 17.7 17.7-17.7-17.7-17.7z"/>
        <Rect x="261" y="363.8" width="54.3" height="8"/>
        <Rect x="275" y="376.8" width="22.1" height="8"/>
        <Rect x="307.1" y="363.8" width="8" height="23.5"/>
        <Rect x="275" y="364.2" width="8" height="20.6"/>
        <Rect x="261" y="410.5" width="54.3" height="8"/>
        <Rect x="275" y="397.5" width="22.1" height="8"/>
        <Rect x="307.1" y="395" width="8" height="23.5"/>
        <Rect x="275" y="397.6" width="8" height="20.6"/>
      </G>
      <Path d="m439.74 45.385 17.535-17.535c-22.636-21.785-58.661-21.679-80.978 0.63763-2.763 2.763-5.101 5.7386-7.2264 8.7141l-32.412 0.10625c-2.0191-3.0819-4.4633-5.9511-7.2264-8.7141-22.529-22.529-59.086-22.529-81.616 0-22.529 22.529-22.529 59.086 1e-5 81.616 2.763 2.763 5.7386 5.101 8.7142 7.2264l-2e-5 83.953-10.84 10.84c-3.4006-2.1254-6.3762-0.63762-9.0329 2.0191-2.1254 2.1254-3.5069 4.3571-2.8693 6.9076-2.5505-0.63763-4.7822 0.74388-6.9076 2.8693-2.6568 2.6567-4.1445 5.6323-2.0191 9.0329l-197.77 197.77 13.603 13.603 293.31-293.31-2e-5 -36.344h36.344l22.848-22.848c-12.115-12.965-12.008-33.263 0.63765-45.909 12.752-12.54 32.944-12.752 45.909-0.63762zm-174.5 47.397c-12.859-12.859-12.859-33.688 0.10625-46.653 12.859-12.859 33.688-12.859 46.546 0 12.859 12.859 12.965 33.794 0.10626 46.653-12.859 12.859-33.9 12.859-46.759 0zm44.102 55.792-27.949 27.949-0.10626-49.841c9.458 1.169 19.022 0.10626 27.949-3.2944zm53.985-58.449-20.829-1.4e-5c3.4006-8.9267 4.5696-18.597 3.2944-27.949h14.028c-1.0627 9.3518 0.10625 19.022 3.5069 27.949z" fill="#931500" strokeWidth="1.5029"/>
    </Svg>
  );
}