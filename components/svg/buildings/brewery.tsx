import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function BrewerySvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 510 510">
      <G>
       <G fill="#475a60">
        <Path d="m119.38 0v75h15v-45h240v195h14.5l10-112.5-10-112.5h-269.5z" fill="#475a60"/>
       </G>
       <G fill="#3b4a51">
        <Path d="m404.38 0h-15.5v225h15.5v-225z" fill="#3b4a51"/>
       </G>
      </G>
      <Path d="m344.38 210v90h44.5l10-45-10-45h-44.5z" fill="#e68a44"/>
      <Path d="m434.38 210h-45.5v90h45.5v-90z" fill="#b56d3c"/>
      <Path d="m74.625 60v90h44.5l10-45-10-45h-44.5z" fill="#e68a44"/>
      <Path d="m164.62 60h-45.5v90h45.5v-90z" fill="#b56d3c"/>
      <Path d="m29.625 120v90h89.5l10-45-10-45h-89.5z" fill="#b56d3c"/>
      <Path d="m209.62 120h-90.5v90h90.5v-90z" fill="#8f4813"/>
      <Path d="m209.62 510h30v-97.791l-15-7.209-15 31.209z" fill="#b56d3c"/>
      <Path d="m30.625 510h-30v-97.851l15-7.149 15 31.474z" fill="#e68a44"/>
      <Path d="m104.62 510h-30v-37.851l15-7.149 15 15z" fill="#e68a44"/>
      <Path d="m134.62 510h30v-37.791l-15-7.209-15 15z" fill="#b56d3c"/>
      <Path d="m0.625 180v232.15c9.309 7.548 74.465 60.378 83.683 67.851h34.817l10-150-10-150h-118.5z" fill="#fef8c9"/>
      <Path d="m239.62 412.21v-232.21h-120.5v300h35.762c10.084-8.067 74.617-59.694 84.738-67.791z" fill="#ffe1ba"/>
      <G>
       <Path d="m59.625 330c0 32.867 26.596 59.716 59.5 59.987l10-59.987-10-59.987c-32.865.271-59.5 27.082-59.5 59.987z" fill="#475a60"/>
       <Path d="m179.62 330c0-32.214-25.836-59.987-60.5-59.987v119.98c34.675-1e-3 60.5-27.784 60.5-59.988z" fill="#3b4a51"/>
      </G>
      <Path d="m89.625 330c0 16.489 13.304 29.72 29.5 29.987l10-29.987-10-29.987c-16.232.267-29.5 13.534-29.5 29.987z" fill="#fa686c"/>
      <Path d="m149.625 330c0-16.863-13.994-30.373-30.5-29.987v59.975c16.346.382 30.5-12.971 30.5-29.988z" fill="#e40c57"/>
      <G transform="matrix(.49629 0 0 .49629 261.88 260.09)">
       <Path d="m256 303.8 39.88 64.27-39.88 80.2-53 38.89-56.07-38.89-78.57-68.03 63.64-92.37 48.32-28.59z" fill="#c8885e"/>
       <Path d="m256 63.73 40.6 74.59-40.6 69.88-81.08 44.6-42.92-28.67-63.64-67.45 78.57-92.95 57.15-31.865z" fill="#c8885e"/>
       <Path d="m380 287.87 55.2 85.89-70.13 74.51-50.83 41.05-58.24-41.05v-144.47l83.66-39.12z" fill="#a97450"/>
       <Path d="m146.93 448.27-29.25 33.49-66.35-33.49c-9.59-21.27-14.93-44.88-14.93-69.73v-90.67l48.21-28.59 47.39 28.59v90.67c0 24.85 5.34 48.45 14.93 69.73z" fill="#a97450"/>
       <Path d="m475.6 287.87v90.67c0 24.85-5.34 48.46-14.93 69.73l-55.71 33.49-39.89-33.49c9.59-21.28 14.93-44.88 14.93-69.73v-90.67l50.88-38.31z" fill="#885142"/>
       <Path d="m423.32 137.24-43.32 86.89-48.48 34.07-75.52-50v-144.47l59.32-34.582 49.75 34.582z" fill="#a97450"/>
       <Path d="m146.93 63.73c-9.59 21.28-14.93 44.88-14.93 69.73v90.67l-47.39 35.15-48.21-35.15v-90.67c0-24.85 5.34-48.46 14.93-69.73l54.47-30.17z" fill="#a97450"/>
       <Path d="m475.6 133.46v90.67l-44.72 25.43-50.88-25.43v-90.67c0-24.85-5.34-48.45-14.93-69.73l42.05-34.582 53.55 34.582c9.59 21.27 14.93 44.88 14.93 69.73z" fill="#885142"/>
       <Path d="m475.6 224.13v63.74h-183.98l-33.9-28.95 33.9-34.79z" fill="#c29578"/>
       <Path d="m248.96 259.6-28.58 28.27h-183.98v-63.74h183.98z" fill="#e6c897"/>
       <Path d="m208.2 256c0 26.399 21.401 47.8 47.8 47.8l25.84-47.8-25.84-47.8c-26.399 0-47.8 21.401-47.8 47.8z" fill="#a97450"/>
       <Path d="m256 208.2v95.6c26.399 0 47.8-21.401 47.8-47.8s-21.401-47.8-47.8-47.8z" fill="#885142"/>
       <Path d="M 101.16,0 C 79.82,16.83 62.62,38.66 51.33,63.73 H 256 L 282.92,33.56 256,0 Z" fill="#475a60"/>
       <Path d="m410.84 0h-154.84v63.73h204.67c-11.29-25.07-28.49-46.9-49.83-63.73z" fill="#3b4a51"/>
       <Path d="m51.33 448.27c11.29 25.07 28.49 46.9 49.83 63.73h154.84l32.32-25.92-32.32-37.81z" fill="#475a60"/>
       <Path d="m256 512h154.84c21.34-16.83 38.54-38.66 49.83-63.73h-204.67z" fill="#3b4a51"/>
      </G>
    </Svg>
  );
}
