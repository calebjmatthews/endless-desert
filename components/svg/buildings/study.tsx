import * as React from 'react';
import Svg from 'react-native-svg';
import Icon from '../../../models/icon';

export default function StudySvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <path d="m441.22 185.13v300h-390v-300c0-8.28 6.72-15 15-15h360c8.28 0 15 6.72 15 15z" fill="#ffe6b3"/>
      <path d="m441.22 185.13v300h-195v-315h180c8.28 0 15 6.72 15 15z" fill="#ffca80"/>
      <path d="m111.22 182.92h269v300h-269z" fill="#fff7cc"/>
      <path d="m246.22 182.92h134v300h-134z" fill="#ffe6b3"/>
      <path d="m246.22 290.13c41.421 0 75 33.579 75 75v120h-150v-120c0-41.421 33.579-75 75-75z" fill="#613d5c"/>
      <path d="m321.22 365.13v120h-75v-195c41.35 0 75 33.65 75 75z" fill="#4b2746"/>
      <path d="m471.22 95.126v90c0 8.29-6.72 15-15 15h-420c-8.28 0-15-6.71-15-15v-90c0-8.28 6.72-15 15-15h420c8.28 0 15 6.72 15 15z" fill="#ff641a"/>
      <path d="m471.22 95.126v90c0 8.29-6.72 15-15 15h-210v-120h210c8.28 0 15 6.72 15 15z" fill="#f03800"/>
      <g transform="translate(0 7.6942)">
       <path d="m291.22 237.43c0 8.29-6.72 15-15 15h-60c-8.28 0-15-6.71-15-15 0-8.28 6.72-15 15-15h60c8.28 0 15 6.72 15 15z" fill="#613d5c"/>
      </g>
      <path d="m291.22 245.13c0 8.29-6.72 15-15 15h-30v-30h30c8.28 0 15 6.72 15 15z" fill="#4b2746"/>
      <path d="m316.83 24.526c-19.33-19.33-48.7-21.85-70.61-8.38-21.89-13.46-51.26-10.97-70.61 8.38-2.81 2.81-4.39 6.63-4.39 10.6v90c0 13.32 16.17 20.05 25.61 10.61 10.71-10.72 28.06-10.72 38.78 0 0.03 0.02 0.05 0.04 0.08 0.07 0.34 0.33 0.68 0.65 1.05 0.95 2.76 2.25 6.12 3.37 9.48 3.37 3.81 0 7.61-1.44 10.52-4.31 0.02-0.03 0.06-0.05 0.09-0.08 10.71-10.72 28.06-10.72 38.78 0 9.42 9.42 25.61 2.74 25.61-10.61v-90c0-3.97-1.58-7.79-4.39-10.6z" fill="#fff7cc"/>
      <path d="m321.22 35.126v90c0 13.35-16.19 20.03-25.61 10.61-10.72-10.72-28.07-10.72-38.78 0-0.03 0.03-0.07 0.05-0.09 0.08-2.91 2.87-6.71 4.31-10.52 4.31v-123.98c21.91-13.47 51.28-10.95 70.61 8.38 2.81 2.81 4.39 6.63 4.39 10.6z" fill="#ffe6b3"/>
    </Svg>
  );
}