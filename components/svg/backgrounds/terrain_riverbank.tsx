import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs, Pattern }
  from 'react-native-svg';
import Icon from '../../../models/icon';

export default function TerrainRiverbankSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 104 104">
      <Defs>
        <Pattern id="riverbankPattern" patternUnits="userSpaceOnUse" x="0" y="0" width="52" height="26" viewBox="0 0 52 26" >
          <G fillRule="evenodd">
            <G fill={props.icon.color}>
              <Path d="M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.4128-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z" />
            </G>
          </G>
        </Pattern>
      </Defs>
      <Rect width="104px" height="104px" fill={props.icon.shadow} />
      <Rect width="104px" height="104px" fill="url(#riverbankPattern)" />
    </Svg>
  );
}
