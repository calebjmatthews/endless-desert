import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function SandstoneEdificersSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 520 520">
      <Path d="m501.28 414.37-74.47-53.197-147.92-295.82c-4.344-8.687-13.218-14.148-22.895-14.148-0.247 0-0.503 0-0.759 9e-3 -9.958 0.29-18.85 6.34-22.775 15.505l-76.886 179.4-10.726-9.387c-4.702-4.113-10.701-6.332-16.853-6.332-1.408 0-2.825 0.119-4.241 0.35-7.578 1.271-14.174 5.879-17.988 12.544l-102.4 179.2c-4.523 7.927-4.497 17.655 0.085 25.549 4.582 7.902 13.022 12.757 22.144 12.757h460.8c11.128 0 20.983-7.194 24.38-17.784 3.395-10.605-0.445-22.177-9.499-28.645zm-245.28-337.57 51.831 103.66-46.857 31.249-19.123-38.238c-2.176-4.335-6.605-7.074-11.452-7.074h-12.8l38.401-89.6zm-49.374 115.2h15.872l22.05 44.126c1.647 3.285 4.625 5.7 8.175 6.647 1.075 0.29 2.176 0.427 3.277 0.427 2.5 0 4.975-0.734 7.1-2.15l56.269-37.513 62.916 125.83-60.203-43c-4.48-3.2-9.694-4.77-14.874-4.77-6.596 0-13.15 2.543-18.108 7.501l-39.381 39.381-73.873-64.64 30.78-71.842zm173.12 167.01-21.342 10.675-45.474-22.741c-2.748-1.365-5.854-1.698-8.823-0.964l-47.582 11.896 50.679-50.68 72.542 51.814zm-251.74-103.01 43.887 38.4h-18.287c-3.396 0-6.647 1.348-9.054 3.746l-42.146 42.155-14.361-14.362 39.961-69.939zm-102.4 179.2 49.271-86.229 18.475 18.475c2.5 2.5 5.777 3.755 9.054 3.755s6.554-1.246 9.054-3.746l47.454-47.454h42.24l30.421 26.624-88.576 88.576h-117.39zm153.6 0 42.146-42.146 84.352-21.086 46.976 23.484c1.801 0.896 3.772 1.348 5.726 1.348s3.925-0.452 5.726-1.348l39.194-19.593 83.081 59.341h-307.2z" fill={props.icon.color}/>
    </Svg>
  );
}
