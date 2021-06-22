import * as React from 'react';
import Svg from 'react-native-svg';
import Icon from '../../../models/icon';

export default function SkySvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
    <path d="m302.64 0 54.355 152.02-54.355 249.64h-301.14v-401.66z" fill="#cbe5fd" strokeWidth="1.212"/>
    <path d="m512 9.03v392.91l-256-0.27638v-401.66h246.97c4.98 0 9.03 4.05 9.03 9.03z" fill="#a6d3fc"/>
    <circle cx="368.6" cy="146.86" r="94.813" fill="#ffb555"/>
    <path d="m256 121.05 18.424 98.49-18.424 71.47h-27.65c-32.58 0-59.08-26.5-59.08-59.07 0-29.22 21.32-53.55 49.21-58.26 4.22-22.52 18.27-41.61 37.52-52.63z" fill="#e1f1fd"/>
    <path d="m458.76 231.94c0 32.57-26.51 59.07-59.08 59.07h-143.68v-169.96c11.24-6.44 24.25-10.12 38.1-10.12 37.29 0 68.47 26.67 75.46 61.93h30.12c32.57 0 59.08 26.5 59.08 59.08z" fill="#cbe5fd"/>
    <rect y="399.69" width="257.2" height="112.3" fill="#ffb555"/>
    <rect x="256" y="399.69" width="256" height="112.3" fill="#ff7c48"/>
    </Svg>
  );
}
