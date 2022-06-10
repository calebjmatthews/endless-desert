import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function SaltfishSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <G>
        <G strokeWidth=".98131">
          <Path d="m162.3 361.56-109 38.55c-10.473 3.7042-15.102 16.793-8.3333 23.562l55.223 55.223c6.769 6.769 19.858 2.1394 23.562-8.3333z" fill="#623520"/>
          <Path d="m151.67 372.19c75.775 29.021 174.07 5.4622 245.55-66.019 71.481-71.481 95.041-169.78 66.02-245.55-50.294-19.26-110.5-15.369-166.2 10.332-52.257 24.091-97.063 65.999-125.11 115.67-34.396 60.834-41.785 129.39-20.268 185.58z" fill="#a94719"/>
          <Path d="m171.94 186.62c18.625-32.986 44.649-62.557 75.419-85.808l175.7 175.7c-69.445 91.898-183.84 129.22-271.39 95.683-21.518-56.188-14.128-124.74 20.267-185.57z" fill="#804529"/>
        </G>
        <G transform="matrix(-.76302 .76302 .63103 .63103 276.25 -126.37)" fill="#623520">
          <Path d="m233.34 308.39-65.536 37.837v-99.809l65.536 37.837c9.29 5.364 9.29 18.772 0 24.135z"/>
          <Path d="m273.46 87.337v78.009c-50.825-17.1-107.65-14.882-157.78 7.48l135.75-96.832c9.223-6.581 22.026 0.013 22.026 11.343z"/>
        </G>
      </G>
    </Svg>
  );
}