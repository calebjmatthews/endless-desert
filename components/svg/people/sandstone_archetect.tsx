import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function SandstoneArchetectSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <G strokeWidth="1.1139">
        <Path d="m380.8 364.78c-37.386-8.994-64.393-17.498-72.918-58.118h-115.77c-8.5238 40.62-35.532 49.124-72.918 58.118-47.755 11.501-106.62 25.953-110.74 121.6l31.372 5.806 326.93-95.814 36.677-25.748c-7.6491-2.188-15.273-4.068-22.63-5.839z" fill="#a34f3e"/>
        <Path d="m403.43 370.62c-7.6491-2.188-15.273-4.069-22.63-5.839-37.386-8.994-64.393-17.498-72.918-58.118h-57.886v123.92l116.76-34.219z" fill="#873f2e"/>
        <Path d="m446.99 389.77-47.137-6.641-353.41 103.57-16.528 25.298h443.41c10.287 0 18.611-6.709 18.611-15 0-58.991-19.295-89.601-44.951-107.23z" fill="#ffc856"/>
        <Path d="m491.94 497c0-58.991-19.295-89.601-44.951-107.23l-47.137-6.641-149.86 43.917v84.954h223.33c10.287 0 18.611-6.709 18.611-15z" fill="#f3b940"/>
        <Path d="m403.43 370.62-394.98 115.76c-0.15137 3.514-0.39952 6.885-0.39952 10.622 0 8.291 8.3241 15 18.611 15h3.2532l220.08-64.499 196.99-57.731c-13.397-9.209-28.521-14.848-43.558-19.148z" fill="#f2f2fc"/>
        <Path d="m403.43 370.62-153.43 44.967v31.912l196.99-57.731c-13.397-9.209-28.521-14.848-43.558-19.148z" fill="#e2d9fb"/>
      </G>
      <G>
        <Path d="m441.8 91.194c20.323-19.16 33.195-46.13 33.195-76.194 0-8.291-6.709-15-15-15-57.891 0-105 47.109-105 105 0 41.353 33.647 75 75 75h60c8.291 0 15-6.709 15-15 0-37.31-27.468-68.097-63.195-73.806z" fill="#ffc856"/>
        <G transform="translate(24)" fill="#db413f">
        <Path d="m106 270c-24.814 0-45-20.186-45-45s20.186-45 45-45 45 20.186 45 45-20.186 45-45 45z" fill="#db413f"/>
        </G>
        <G transform="translate(24)" fill="#ca2422">
        <Path d="m346 270c-24.814 0-45-20.186-45-45s20.186-45 45-45 45 20.186 45 45-20.186 45-45 45z" fill="#ca2422"/>
        </G>
      </G>
      <circle cx="250" cy="135" r="135" fill="#ffc856"/>
      <Path d="m385 135c0-74.443-60.557-135-135-135v270c74.443 0 135-60.557 135-135z" fill="#f3b940"/>
      <Path d="m250 60c-57.99 0-105 47.01-105 105v60c0 57.99 47.01 105 105 105s105-47.01 105-105v-60c0-57.99-47.01-105-105-105z" fill="#c86e59"/>
      <Path d="m355 225v-60c0-57.99-47.01-105-105-105v270c57.99 0 105-47.01 105-105z" fill="#a34f3e"/>
      <Path d="m265 60c-5.209 0-10.177 0.72594-15 1.7631-25.807 5.5517-45 24.823-45 47.902 0 6.0873 3.091 11.931 6.372 18.103 7.69 14.526 11.382 24.129-1.978 35.199-4.292 3.5527-5.581 8.8876-3.252 13.532 2.314 4.6437 7.793 7.6633 13.857 7.6633 10.836 0 20.66-1.0231 30-2.4965 47.324-7.463 75-33.045 75-72.001 1e-3 -27.391-26.908-49.665-59.999-49.665z" fill="#474f54" strokeWidth=".90981"/>
      <Path d="m325 109.67c0-27.391-26.909-49.665-60-49.665-5.209 0-10.177 0.72594-15 1.7631v119.9c47.324-7.4638 75-33.045 75-72.002z" fill="#32393f" strokeWidth=".90981"/>
    </Svg>
  );
}
