import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function SandCascadeSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <G>
       <Path d="m157.9 63.972h203.26v142.51h-203.26z" fill="#e6a960"/>
       <Path d="m255.53 63.972h101.63v142.51h-101.63z" fill="#c17b28"/>
       <Path d="m146.58 38.54h-147.66l1.084 187.71 220.2-19.766v-94.322c0-40.595-33.027-73.622-73.622-73.622z" fill="#504541"/>
       <Path d="m362.49 38.54c-40.596 0-73.622 33.027-73.622 73.622v94.322l223.13 19.766 7.0269-187.71z" fill="#3d3532"/>
      </G>
      <Path d="m154.37 139.17h203.26v142.51h-203.26z" fill="#f3d98f"/>
      <Path d="m256 139.17h101.63v142.51h-101.63z" fill="#e6a960"/>
      <Path d="m121.04 113.74h-121.04v167.94h194.67v-94.322c0-40.595-33.027-73.622-73.622-73.622z" fill="#725d57"/>
      <Path d="m390.96 113.74c-40.596 0-73.622 33.027-73.622 73.622v94.322h194.67v-167.94z" fill="#725d57"/>
      <Path d="m390.96 113.74c-40.596 0-73.622 33.027-73.622 73.622v94.322h194.67v-167.94z" fill="#504541"/>
      <Path d="m124.37 251.68h263.27v214.57h-263.27z" fill="#fff3d2"/>
      <Path d="m256 251.68h131.63v214.57h-131.63z" fill="#f3d98f"/>
      <Path d="m91.043 226.25h-91.043v240h164.66v-166.38c0-40.596-33.027-73.623-73.622-73.623z" fill="#504541"/>
      <Path d="m420.96 226.25c-40.596 0-73.622 33.027-73.622 73.622v166.38h164.66v-240z" fill="#504541"/>
      <Path d="m420.96 226.25c-40.596 0-73.622 33.027-73.622 73.622v166.38h164.66v-240z" fill="#3d3532"/>
      <G>
       <Path d="m0 436.25h512v150.01h-512z" fill="#fffdf8"/>
       <Path d="m256 436.25h256v150.01h-256z" fill="#fff3d2"/>
       <Path d="m438.67 458.26h73.329v30h-73.329z" fill="#f3d98f"/>
       <Path d="m0 458.26h43.327v30h-43.327z" fill="#fff3d2"/>
       <Path d="m91.332 458.26h300.67v30h-300.67z" fill="#fff3d2"/>
      </G>
      <G transform="translate(0,40)" fill="#76e2f8" fillOpacity="0">
       <Path d="m201 273.69h30v57.567h-30z"/>
       <Path d="m281 326.69h30v44.566h-30z"/>
       <Path d="m438.67 456.26h73.329v30h-73.329z"/>
      </G>
      <G>
       <Path d="m281 366.69h30v44.566h-30z" fill="#e6a960"/>
       <Path d="m256 458.26h136v30h-136z" fill="#f3d98f"/>
       <Path d="m194.67 281.68h30v44.566h-30z" fill="#f3d98f"/>
       <Path d="m256 458.26v30h-44.566v-30z" fill="#fffdf8"/>
      </G>
    </Svg>
  );
}
