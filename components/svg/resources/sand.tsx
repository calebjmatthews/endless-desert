import * as React from 'react';
import Svg from 'react-native-svg';
import Icon from '../../../models/icon';

export default function SandSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <g transform="matrix(1.3866 0 0 1.3866 -91.781 -234.05)">
       <path d="m28.276 464.42c84.571 0 115.49-103.04 136.91-147.03 9.603-19.723 25.019-35.691 43.684-45.986l138.17 106.57c18.101 43.6-17.691 85.754-17.691 85.754z" fill="#e6a960"/>
       <path d="m474.38 464.42c-84.571 0-106.06-103.04-127.48-147.03-16.917-34.746-51.875-57.839-90.859-58.784-16.855 0.409-32.955 4.962-47.171 12.805-9.78 5.396-16.015 15.682-16.054 26.852v0.197c0 30.65 24.847 55.497 55.497 55.497 34.726 0 77.603 75.95 81.034 109.77 75.759 1.3261 23.872 0.68958 106.89 0.68958z" fill="#f3d98f"/>
      </g>
    </Svg>
  );
}
