import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function QuailMeatSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <Path d="m496.28 124.4c-16.104 16.104-40.464 19.898-60.393 10.858l-99.404 99.404-59.139-59.139 99.404-99.404c-9.04-19.929-5.246-44.289 10.858-60.393 20.974-20.963 55.084-20.963 76.058 0 5.727 5.727 10.001 12.509 12.645 19.971 7.462 2.644 14.244 6.918 19.971 12.645 20.964 20.974 20.964 55.084 0 76.058z" fill="#DFCCBE"/>
      <Path d="m496.28 124.4c-16.104 16.104-40.464 19.898-60.393 10.858l-99.404 99.404-29.564-29.564 169.39-169.4c7.462 2.644 14.244 6.918 19.971 12.645 20.964 20.973 20.964 55.083 0 76.057z" fill="#C9AD91"/>
      <Path d="m371.69 225.52-11.088 11.077c-3.532 3.532-10.45 17.076-18.319 43.62-6.124 20.619-9.949 39.304-10.231 42.732-0.031 0.366-0.042 1.766-0.063 2.884-0.157 11.38-0.585 41.603-12.478 74.898-15.258 42.7-43.202 74.448-83.07 94.388-22.489 11.244-46.169 16.877-70.278 16.877-20.817 0-41.948-4.201-62.901-12.614-33.608-13.491-54.979-33.128-55.868-33.953l-0.826-0.826c-0.826-0.888-20.462-22.259-33.953-55.868-18.162-45.228-16.678-91.283 4.264-133.18 19.939-39.868 51.688-67.812 94.388-83.07 33.295-11.893 63.517-12.321 74.898-12.478 1.118-0.021 2.519-0.031 2.926-0.063 3.386-0.282 22.071-4.107 42.69-10.231 26.544-7.869 40.088-14.787 43.62-18.319l11.077-11.088 42.606 42.606 42.606 42.607z" fill="#9A4C00"/>
      <G fill="#fff">
      		<Rect transform="matrix(.7071 .7071 -.7071 .7071 285.2 51.548)" x="67.311" y="356.97" width="26.126" height="26.126"/>
      		<Rect transform="matrix(.7071 .7071 -.7071 .7071 279.96 2.6102)" x="123.76" y="326.18" width="26.126" height="26.126"/>
      		<Rect transform="matrix(.7071 .7071 -.7071 .7071 247.56 30.003)" x="74.502" y="300.78" width="26.126" height="26.126"/>
      </G>
      <Path d="m371.69 225.52-11.088 11.077c-3.532 3.532-10.45 17.076-18.319 43.62-6.124 20.619-9.949 39.304-10.231 42.732-0.031 0.366-0.042 1.766-0.063 2.884-0.157 11.38-0.585 41.603-12.478 74.898-15.258 42.7-43.202 74.448-83.07 94.388-22.489 11.244-46.169 16.877-70.278 16.877-20.817 0-41.948-4.201-62.901-12.614-33.608-13.491-54.979-33.128-55.868-33.953l-0.408-0.408 282.1-282.11 42.607 42.607z" fill="#723700"/>
    </Svg>
  );
}