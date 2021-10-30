import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function CarpSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
    <G transform="matrix(-.79301 -.79301 -.79301 .79301 729.52 413.3)" fill="#ff7459">
      <Path d="m509.2 43.332c-15.446-23.168-39.055-38.136-66.479-42.147-27.25-3.978-54.968 3.701-75.945 21.092-7.098 5.886-8.087 16.413-2.196 23.511l82.249 71.984c4.272 0 8.544-1.631 11.804-4.892l48.479-48.484c5.632-5.624 6.501-14.445 2.088-21.064z"/>
      <Path d="m298.55 116.58c-9.217-1.272-17.565 5.087-18.858 14.212-7.978 56.81 20.945 101.76 70.327 109.31 6.697 1.031 13.591-2.14 17.065-8.299l31.348-55.549z"/>
      <Path d="m395.13 269.64c-2.435 0-4.847 0.533-7.054 1.565-58.772 27.408-84.5 97.076-57.347 155.31 3.891 8.365 13.825 11.977 22.185 8.076 27.707-12.918 49.033-35.755 61.065-64.533 21.902 21.375 50.783 33.146 81.326 33.146 9.217 0 16.696-7.473 16.696-16.696-1e-3 -64.438-52.425-116.87-116.87-116.87z"/>
    </G>
    <Path d="m189.93 345.73c9.1633-0.40524 16.679-7.3869 17.766-16.489 1.1824-9.8405 14.199-28.243 23.828-39.727 35.991-42.784 69.472-31.231 113.45-6.6692 36.195 20.214 81.25 45.375 126.41 0.21253 18.795-18.795 27.699-40.957 25.755-64.096-7.5757-90.09-176.1-156.28-278.28-54.094-42.927 42.927-60.898 104.98-48.081 166 1.8969 9.0388 10.072 15.262 19.147 14.863z" fill="#d9472b" strokeWidth="1.1215"/>
    </Svg>
  );
}
