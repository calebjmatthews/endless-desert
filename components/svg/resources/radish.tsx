import * as React from 'react';
import Svg from 'react-native-svg';
import Icon from '../../../models/icon';

export default function RadishSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <path d="m347.99 225.18c25.118-14.417 51.16-33.832 72.364-59.557 23.424-28.419 19.375-70.446-9.044-93.87s-70.446-19.375-93.87 9.044c-1.999 2.425-3.935 4.893-5.81 7.397l-38.958 117.8z" fill="#2f9693"/>
      <path d="m164.01 225.18c-25.118-14.417-51.16-33.832-72.364-59.557-23.424-28.419-19.375-70.446 9.044-93.87s70.446-19.375 93.87 9.044c1.999 2.425 3.935 4.893 5.81 7.397l38.958 117.8z" fill="#49b2a3"/>
      <path d="m322.68 66.68c0 53.69-22 105.16-40.73 139.24l-25.95.03-26.67.04c-18.57-33.33-40.01-83.84-40.01-139.31 0-36.82 29.85-66.68 66.68-66.68s66.68 29.86 66.68 66.68z" fill="#6ad3ad"/>
      <path d="m281.95 205.92-25.95.03v-205.95c36.83 0 66.68 29.86 66.68 66.68 0 53.69-22 105.16-40.73 139.24z" fill="#49b2a3"/>
      <path d="m445.03 320.08c0 5.39-.39 10.75-1.16 16.05-3.22 22.14-13.09 43.34-29.01 62.05-18.59 21.85-44.66 39.45-75.41 50.91-27.25 10.15-52.22 27.49-72.2 50.15l-11.25 12.76-11.25-12.76c-19.98-22.66-44.95-40-72.2-50.15-30.75-11.46-56.82-29.06-75.41-50.91-2.48-2.92-4.82-5.9-7-8.93-6.87-9.53-12.26-19.58-16.09-30-4.68-12.64-7.08-25.81-7.08-39.17 0-39.23 20.26-75.81 57.03-103.01.01-.01.02-.01.03-.02h263.94c.01.01.02.01.03.02 32.37 23.95 51.95 55.17 56.17 89.06.57 4.61.86 9.26.86 13.95z" fill="#ff5252"/>
      <path d="m445.03 320.08c0 5.39-.39 10.75-1.16 16.05-3.22 22.14-13.09 43.34-29.01 62.05-18.59 21.85-44.66 39.45-75.41 50.91-27.25 10.15-52.22 27.49-72.2 50.15l-11.25 12.76v-294.95h131.97c.01.01.02.01.03.02 32.37 23.95 51.95 55.17 56.17 89.06.57 4.61.86 9.26.86 13.95z" fill="#ce3858"/>
      <path d="m388 217.07c-29.04 27.62-77.33 45.71-132 45.71s-102.97-18.09-132-45.71c.01-.01.02-.01.03-.02 35.43-26.19 82.3-40.61 131.97-40.61s96.54 14.42 131.97 40.61c.01.01.02.01.03.02z" fill="#e2eff7"/>
      <path d="m173.96 359.25v30h-83.82c-6.87-9.53-12.26-19.58-16.09-30z" fill="#ce3858"/>
      <path d="m445.03 320.08c0 5.39-.39 10.75-1.16 16.05h-84.2v-30h84.5c.57 4.61.86 9.26.86 13.95z" fill="#b22860"/>
      <path d="m388 217.07c-29.04 27.62-77.33 45.71-132 45.71v-86.34c49.67 0 96.54 14.42 131.97 40.61.01.01.02.01.03.02z" fill="#c3d9ea"/>
    </Svg>
  );
}