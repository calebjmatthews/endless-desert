import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function GrindingMillSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <Polygon points="377.48 145.96 256.5 61.281 135.53 145.96 101.34 512 411.66 512" fill="#ffd699"/>
      <Polygon points="256.35 512 411.66 512 377.48 145.96 256.5 61.281 256.35 61.385" fill="#ffc266"/>
      <Polygon points="377.48 145.96 256.5 61.281 135.53 145.96" fill="#D17E00"/>
      <Polygon points="256.35 145.96 377.48 145.96 256.5 61.281 256.35 61.385" fill="#AB5E00"/>
      <Rect x="222.16" y="390.2" width="68.682" height="121.81" fill="#804700"/>
      <Rect x="256.51" y="390.2" width="34.336" height="121.81" fill="#593200"/><G>
      <Polygon points="385.34 0 280.52 104.83 297.07 165.53 357.77 182.08 462.6 77.257" fill="#668cff"/>
      <Polygon points="297.07 165.53 357.77 182.08 462.6 77.257 423.23 37.885" fill="#486fe6"/>
      <Polygon points="48.887 77.773 153.72 182.6 214.42 166.05 230.97 105.34 126.14 0.517" fill="#9eb6ff"/>
      <Polygon points="214.42 166.05 230.97 105.34 126.14 0.517 86.774 39.888" fill="#668cff"/>
      <Polygon points="126.66 414.23 231.49 309.4 214.93 248.7 154.23 232.15 49.404 336.98" fill="#9eb6ff"/>
      </G><G fill="#668cff">
        <Polygon points="214.93 248.7 154.23 232.15 49.404 336.98 88.776 376.34"/>
        <Polygon points="463.12 336.46 358.29 231.63 297.59 248.18 281.03 308.89 385.86 413.71"/>
      </G>
      <Polygon points="297.59 248.18 281.03 308.89 385.86 413.71 425.23 374.34" fill="#486fe6"/>
      <Polygon points="434.1 49.716 412.88 28.5 256.5 184.88 99.121 27.499 77.904 48.716 235.29 206.1 76.672 364.71 97.888 385.93 256.5 227.32 414.61 385.42 435.83 364.21 277.72 206.1" fill="#804700"/>
      <Polygon points="434.1 49.716 412.88 28.5 256.5 184.88 256.5 227.32 414.61 385.42 435.83 364.21 277.72 206.1" fill="#593200"/>
    </Svg>
  );
}
