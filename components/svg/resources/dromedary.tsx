import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';

export default function DromedarySvgComponent(props: any) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <Path d="m66.783 353.09v134.14h33.391v-127.96c40.662 0 75.218-26.057 87.938-62.376l-122.44-46.471c0 25.877 1.113 84.592 1.113 102.66z" fill={props.icon.secondaryColor}/>
      <G fill={props.icon.secondaryShadow}>
        <Path d="m343.93 264.9-15.559 32.001v190.33h33.391v-190.33c0 1e-3 -5.588-11.966-17.832-32.001z"/>
        <Path d="m259.54 105.5c-12.166-21.66-35.35-36.296-61.963-36.296l-28.394 82.175c21.905-1e-3 72.348-27.827 90.357-45.879z"/>
      </G>
      <Path d="m197.58 69.198c-26.613 0-49.798 14.637-61.963 36.296 11.309 26.957 40.058 58.122 61.963 58.122v-94.418z" fill={props.icon.secondaryColor}/>
      <Path d="m197.58 117.47c-21.905 0-42.819-4.252-61.963-11.976-5.766 10.262-9.049 22.105-9.049 34.716l-40.86 72.38c0 10.797 22.261 55.652 35.625 84.314h76.247l59.537-94.332-59.537-85.102z" fill={props.icon.color}/>
      <G fill={props.icon.shadow}>
        <Path d="m478.61 40.905v-16.141h-33.391c-14.537 0-26.899 9.294-31.484 22.261h-24.169c0 12.243 10.019 22.261 22.261 22.261v112.91c0 14.156-11.517 25.671-25.672 25.671h-32.792c-14.464-35.101-46.277-61.224-84.774-67.651 0-12.611-3.283-24.454-9.049-34.716-19.144 7.725-40.058 11.976-61.963 11.976v45.869l16.129 16.972-16.128 16.419v100.17h64.012v190.33h33.391v-190.33h91.174c50.98 0 92.455-41.474 92.455-92.454v-110c7.357-2.484 13.333-7.958 16.485-14.979l16.906-5.179v-33.391h-33.391v-1e-3z"/>
        <Path d="m121.33 296.9c3.377-9.643 5.235-20 5.235-30.797v-125.9c-4.956 0.827-9.803 1.981-14.515 3.438-45.557 14.089-78.658 56.537-78.658 106.72v46.536 28.985h-33.392v161.35h33.391v-127.96c11.772 0 23.022-2.205 33.391-6.189 25.449-9.774 45.511-30.382 54.548-56.187z"/>
      </G>
      <G fill={props.icon.secondaryShadow}>
        <rect x="230.97" y="230.12" width="33.391" height="33.391"/>
        <rect x="197.58" y="163.34" width="33.391" height="33.391"/>
      </G>
    </Svg>
  );
}
