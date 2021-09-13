import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function BeerSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <Defs>
       <filter id="filter23951" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.27864 0 0 -0.158729 -0.139319 0 1.27864 0 -0.158729 -0.139319 0 0 1.27864 -0.158729 -0.139319 0 0 0 1 0"/>
       </filter>
       <filter id="filter23955" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.27864 0 0 -0.158729 -0.139319 0 1.27864 0 -0.158729 -0.139319 0 0 1.27864 -0.158729 -0.139319 0 0 0 1 0"/>
       </filter>
       <filter id="filter23959" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.27864 0 0 -0.158729 -0.139319 0 1.27864 0 -0.158729 -0.139319 0 0 1.27864 -0.158729 -0.139319 0 0 0 1 0"/>
       </filter>
       <filter id="filter23963" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.27864 0 0 -0.158729 -0.139319 0 1.27864 0 -0.158729 -0.139319 0 0 1.27864 -0.158729 -0.139319 0 0 0 1 0"/>
       </filter>
       <filter id="filter23967" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.27864 0 0 -0.158729 -0.139319 0 1.27864 0 -0.158729 -0.139319 0 0 1.27864 -0.158729 -0.139319 0 0 0 1 0"/>
       </filter>
      </Defs>
      <G filter="url(#filter23967)">
       <Path d="m391 421h-30c-8.291 0-15-6.709-15-15s6.709-15 15-15h30c24.814 0 45-20.186 45-45v-90c0-8.276-6.738-15-15-15h-60c-8.291 0-15-6.709-15-15s6.709-15 15-15h60c24.814 0 45 20.186 45 45v90c0 41.353-33.633 75-75 75z" fill="#fa3"/>
      </G>
      <Path d="m226 103.44h-150v363.56c0 24.814 20.186 45 45 45h210c24.814 0 45-20.186 45-45v-363.56z" fill="#ffea80" filter="url(#filter23963)"/>
      <Path d="m376 467v-363.56h-150v408.56h105c24.814 0 45-20.186 45-45z" fill="#ffd24d" filter="url(#filter23959)"/>
      <Path d="m361 60h-32.695c-6.504-17.944-23.496-30-42.305-30-11.133 0-19.834 4.233-25.195 7.778-8.198-14.298-20.556-24.549-34.805-30.868-9.327-4.136-19.314-6.91-30-6.91-35.566 0-66.475 25.239-73.506 60h-31.494c-24.814 0-45 21.186-45 46s20.186 45 45 45h75c16.553 0 30 13.462 30 30v15c0 16.538 13.447 30 30 30s30-13.462 30-30v-15c0-16.538 13.447-30 30-30h75c24.814 0 45-20.186 45-45s-20.186-46-45-46z" fill="#fff7cc" filter="url(#filter23955)"/>
      <Path d="m256 196v-15c0-16.538 13.447-30 30-30h75c24.814 0 45-20.186 45-45s-20.186-46-45-46h-32.695c-6.504-17.944-23.496-30-42.305-30-11.133 0-19.834 4.233-25.195 7.778-8.198-14.298-20.556-24.549-34.805-30.868v219.09c16.553 0 30-13.462 30-30z" fill="#ffe6b3" filter="url(#filter23951)"/>
    </Svg>
  );
}
