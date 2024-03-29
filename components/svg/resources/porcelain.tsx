import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function PorcelainSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <G>
       <Path d="m256 0h-114.27c7.37 15.482 18.142 34.649 26.818 61l38.705 15h99.373l36.858-15c8.619-26.27 19.543-45.767 26.79-61z" fill="#f3f1eb"/>
       <Path d="m343.48 61c8.619-26.27 19.543-45.767 26.79-61h-114.27v76h50.624z" fill="#e9e5d7"/>
       <Path d="m388.82 151c-12.598 0-35.361-2.666-46.377-20.479-6.044-9.774-7.85-23.273-5.912-39.521l-28.965-15h-96.094l-35.916 15c1.987 16.34 0.201 29.892-5.847 39.683-10.386 16.787-31.025 20.317-46.523 20.317h-32.183v61l27.188 15h275.16l27.656-15v-61z" fill="#f3f1eb"/>
       <Path d="m421 212v-61h-32.183c-12.598 0-35.361-2.666-46.377-20.479-6.044-9.774-7.85-23.273-5.912-39.521l-28.965-15h-51.563v151h137.34z" fill="#e9e5d7"/>
       <Path d="m345.06 437h-175.78l-38.718 15c27.42 38.58 59.291 58.237 60.895 60h129.08c1.573-1.729 34.492-20.53 62.232-60z" fill="#f3f1eb"/>
       <Path d="m382.77 452-37.711-15h-89.062v75h64.541c1.573-1.729 34.492-20.53 62.232-60z" fill="#e9e5d7"/>
       <Path d="m400.28 287h-282.09l-27.188 15v26.836c0 1.089 0.141 2.084 0.157 3.164l31.36 15.5-28.726 14.5c3.532 22.581 10.285 42.625 18.885 60l36.448 15h222.19l28.969-15c8.271-17.249 14.742-37.229 18.089-60l-28.801-14.533 31.278-15.467c0.015-1.082 0.152-2.071 0.152-3.164v-26.836z" fill="#3e5dbf"/>
       <Path d="m400.282 422c8.271-17.249 14.742-37.229 18.089-60l-28.801-14.533 31.278-15.467c.015-1.082.152-2.071.152-3.164v-26.836l-20.718-15h-144.282v150h115.313z" fill="#193aa2"/>
       <Path d="m391 227h-270l-30 15v30l30 15h270l30-15v-30z" fill="#f3f1eb"/>
       <Path d="m421 272v-30l-30-15h-135v60h135z" fill="#e9e5d7"/>
       <Path d="m256 61h-87.455c3.571 10.845 5.896 20.865 7.007 30h160.98c1.089-9.137 3.397-19.155 6.954-30z" fill="#3e5dbf"/>
       <Path d="m343.48 61h-87.482v30h80.528c1.089-9.137 3.397-19.155 6.954-30z" fill="#193aa2"/>
       <G fill="#e9e5d7">
        <Path d="m112.68 422c5.451 11.01 11.521 21.046 17.888 30h252.21c6.264-8.914 12.197-18.922 17.509-30h-144.28z"/>
        <Path d="m256 272h-165v30h330v-30z"/>
        <Path d="m331 362h-30v-30h-90v30h-30v-30h-89.843c0.152 10.503 1.137 20.442 2.633 30h57.21v30h90v-30h30v30h90v-30h57.371c1.401-9.532 2.335-19.459 2.477-30h-89.848z"/>
       </G>
      </G>
      <G fill="#c4c1bb">
       <Path d="m256 272h165v30h-165z"/>
       <Path d="m400.28 422h-144.28v30h126.77c6.264-8.914 12.197-18.922 17.509-30z"/>
       <Path d="m271 392h90v-30h57.371c1.401-9.532 2.335-19.459 2.477-30h-89.848v30h-30v-30h-45v30h15z"/>
      </G>
      <Path d="m256 212h-165v30h330v-30z" fill="#3e5dbf"/>
      <Path d="m256 212h165v30h-165z" fill="#193aa2"/>
    </Svg>
  );
}
