import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function ChilliPepperSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <Path d="m511.91 221.04c-0.58 15.81-2.65 30.819-6.06 45.019-34.299 143.21-204.2 204.49-350.66 176.46-85.677-16.44-164.94-74.318-154.22-122.17 0.07-0.38 0.16-0.75 0.26-1.13 7.98-31.399 48.939-27.119 81.508-25.209 119.65 6.99 144.29-11.44 203.4-92.827 13.04-17.949 25.669-35.349 39.779-49.339 0.33-0.33 0.66-0.65 0.99-0.96 11.06-10.81 23.029-19.509 36.819-24.719 37.529-14.19 81.978-9.06 111.59 12.14 1.39 0.99 2.74 2.02 4.04 3.08 23.858 19.268 33.678 48.647 32.548 79.646z" fill="#FF475A"/>
      <Path d="m511.91 221.04c-0.58 15.81-2.65 30.819-6.06 45.019-34.299 143.21-204.2 204.49-350.66 176.46-85.677-16.44-164.94-74.318-154.22-122.17 317.95 169.42 474.35-182.04 474.35-182.04 1.39 0.99 2.74 2.02 4.04 3.08 23.859 19.269 33.679 48.648 32.549 79.647z" fill="#E5104D"/>
      <Path d="m474.64 157.04-18.919-23.28c21.636-17.583 26.299-57.095 26.27-70.836l29.999-0.064c6e-3 2.602-0.291 64.064-37.35 94.18z" fill="#0F9887"/>
      <Path d="m511.91 221.04c-0.58 15.81-2.65 30.819-6.06 45.019-20.589-5.3-53.288 3.09-63.898 6.76l-19.589 6.76c-0.88-10.61 0.38-25.259-4.07-48.629-0.09-0.46-0.18-0.92-0.27-1.39-1.07-5.45-2.45-11.36-4.24-17.799-26.779-2.4-62.008 5.64-67.238 6.5-2.11-8.48 1.36-24.339-19.629-67.368 11.06-10.81 23.029-19.509 36.819-24.719 37.529-14.19 81.978-9.06 111.59 12.14 1.39 0.99 2.74 2.02 4.04 3.08 23.858 19.268 33.678 48.647 32.548 79.646z" fill="#11A892"/>
      <Path d="m511.91 221.04c-0.58 15.81-2.65 30.819-6.06 45.019-20.589-5.3-53.288 3.09-63.898 6.76l-19.589 6.76c-0.88-10.61 0.38-25.259-4.07-48.629-0.09-0.46-0.18-0.92-0.27-1.39 38.279-48.489 57.298-91.247 57.298-91.247 1.39 0.99 2.74 2.02 4.04 3.08 23.859 19.269 33.679 48.648 32.549 79.647z" fill="#0F9887"/>
    </Svg>
  );
}
