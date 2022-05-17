import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function SturdyOverallsSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <G transform="matrix(.90199 0 0 1 25.092 0)">
        <G transform="matrix(.93911 0 0 .94544 15.589 13.967)" fill="#3c743b">
          <Path d="m402.73 442.37-91.735-87.652c-12.187-11.641-3.915-32.275 12.94-32.275h91.735c10.345 0 18.732 8.387 18.732 18.732v87.652c0 16.558-19.861 24.832-31.672 13.543z"/>
          <Path d="m390.69 183.96h-66.762c-10.345 0-18.732-8.387-18.732-18.732v-146.5c0-10.345 8.387-18.732 18.732-18.732h66.762c10.345 0 18.732 8.387 18.732 18.732v146.5c0 10.344-8.387 18.731-18.732 18.731z"/>
        </G>
        <G transform="matrix(.93911 0 0 .94544 15.589 13.967)" fill="#338e32">
          <Path d="m188.07 183.96h-66.764c-10.345 0-18.732-8.387-18.732-18.732v-146.5c1e-3 -10.345 8.388-18.732 18.733-18.732h66.762c10.345 0 18.732 8.387 18.732 18.732v146.5c1e-3 10.344-8.386 18.731-18.731 18.731z"/>
          <Path d="m77.599 428.83v-87.652c0-10.345 8.387-18.732 18.732-18.732h91.735c16.854 0 25.128 20.632 12.94 32.275l-91.735 87.652c-11.817 11.295-31.672 3.039-31.672-13.543z"/>
        </G>
        <Path d="m405.95 498.03h-116.38c-6.7757 0-12.95-3.9188-15.872-10.075l-17.692-37.277-17.691 37.277c-2.9216 6.1558-9.0952 10.075-15.873 10.075h-116.38c-9.7151 0-17.591-7.9294-17.591-17.71v-60.921c0-4.8369 1.9656-9.4629 5.4393-12.804l54.428-52.357h-42.276c-9.7151 0-17.591-7.9294-17.591-17.71v-104.14c0-2.148 0.38785-4.2772 1.1448-6.2843l23.455-62.207c2.5929-6.8771 9.1394-11.425 16.447-11.425h252.98c7.3063 0 13.854 4.5476 16.446 11.425l23.455 62.207c0.75786 2.0072 1.1457 4.1372 1.1457 6.2843v104.14c0 9.7806-7.8763 17.71-17.591 17.71h-42.275l54.427 52.357c3.4738 3.3412 5.4393 7.9672 5.4393 12.804v60.92c-9.3e-4 9.7806-7.8772 17.71-17.592 17.71z" fill="#4da04c" strokeWidth=".94227"/>
        <Path d="m423.54 336.53v-104.14c0-2.148-0.38786-4.2772-1.1457-6.2843l-23.455-62.207c-2.5929-6.8771-9.1394-11.425-16.446-11.425h-126.49v298.21l17.692 37.277c2.9216 6.1548 9.0962 10.074 15.872 10.074h116.38c9.7151 0 17.591-7.9294 17.591-17.71v-60.921c0-4.8369-1.9656-9.4629-5.4393-12.804l-54.427-52.357h42.275c9.7151 9.4e-4 17.591-7.9285 17.591-17.709z" fill="#338e32" strokeWidth=".94227"/>
        <Polygon transform="matrix(.93911 0 0 .94544 15.589 13.967)" points="141.35 359.91 141.34 359.91 370.66 359.91 370.65 359.91 434.4 359.91 434.4 322.45 77.599 322.45 77.599 359.91" fill="#3c743b"/>
        <Ellipse cx="160.86" cy="221.12" rx="13.04" ry="13.128" fill="#308c2f" strokeWidth=".94227"/>
        <Polygon transform="matrix(.93911 0 0 .94544 15.589 13.967)" points="256 359.91 370.66 359.91 370.65 359.91 434.4 359.91 434.4 322.45 256 322.45" fill="#305f30"/>
        <Ellipse cx="351.14" cy="221.12" rx="13.04" ry="13.128" fill="#3c743b" strokeWidth=".94227"/>
      </G>
    </Svg>
  );
}
