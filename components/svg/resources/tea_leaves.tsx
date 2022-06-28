import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';

export default function TeaLeavesSvgComponent(props: any) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <G>
      <Path d="m337.43 122.58c-37.908-63.026-101.7-105.17-166.49-110-10.698-0.79446-20.732 5.2411-25.043 15.062-26.109 59.491-18.779 135.6 19.129 198.63 37.907 63.027 101.7 105.17 166.49 110 2.7462 0.20337 5.4477-0.0417 8.0204-0.68569 7.4514-1.8663 13.82-7.0757 17.024-14.377 26.108-59.492 18.777-135.6-19.131-198.63z" fill={props.icon.color}/><Path d="m356.56 321.21c26.109-59.491 18.779-135.6-19.129-198.63-37.908-63.026-101.7-105.17-166.49-110-5.463-0.40587-10.747 0.97855-15.192 3.7287 26.467 43.58 116.06 191.18 191.28 316.02 4.1109-2.6322 7.4786-6.4394 9.5358-11.124z" fill={props.icon.shadow}/><Path d="m266.25 201.17c-64.342-35.628-140.66-40.232-199.18-12.013-9.662 4.661-15.334 14.905-14.157 25.566 7.134 64.575 51.537 126.82 115.88 162.45 64.342 35.63 140.66 40.232 199.18 12.014 2.48-1.197 4.697-2.76 6.603-4.604 5.52-5.342 8.431-13.038 7.555-20.963-7.136-64.575-51.54-126.82-115.88-162.45z" fill={props.icon.color}/>
      <Path d="m382.13 363.62c-7.134-64.575-51.537-126.82-115.88-162.45-64.342-35.628-140.66-40.232-199.18-12.013-4.934 2.38-8.818 6.221-11.292 10.825 44.711 24.508 196.1 107.54 323.66 178.04 2.244-4.335 3.257-9.316 2.696-14.402z" fill={props.icon.shadow}/>
      <Path d="m458.94 179.45c-3.704-73.455-40.082-140.71-94.938-175.52-9.059-5.747-20.753-5.156-29.188 1.471-51.079 40.146-80.51 110.72-76.806 184.17 3.703 73.455 40.081 140.71 94.938 175.52 2.325 1.475 4.823 2.533 7.395 3.178 7.451 1.869 15.523 0.278 21.792-4.648 51.078-40.146 80.51-110.72 76.807-184.17z" fill={props.icon.color}/>
      <Path d="m382.13 363.62c51.079-40.146 80.51-110.72 76.806-184.17-3.704-73.455-40.082-140.71-94.938-175.52-4.626-2.935-9.939-4.206-15.154-3.875 2.786 50.911 12.18 223.32 19.633 368.88 4.864-0.38 9.631-2.15 13.653-5.311z" fill={props.icon.shadow}/>
      </G><Path d="m363.56 389.45c-0.269 0-0.539-7e-3 -0.811-0.02-9.273-0.442-16.433-8.315-15.993-17.588 0.37-7.766 0.191-78.549-0.019-124.45-0.043-9.285 7.449-16.555 16.732-16.555h0.078c9.248 0 16.765 7.144 16.808 16.402 0.054 11.778 0.511 115.23-0.019 126.37-0.427 9-7.86 15.845-16.776 15.845z" fill="#2A5637"/>
      <Path d="m425.74 512c-9.283 0-16.81-7.526-16.81-16.81v-27.019c0-34.666-20.483-66.131-52.184-80.162-0.363-0.161-0.722-0.335-1.072-0.521l-102.04-54.11c-8.202-4.349-11.325-14.523-6.976-22.725s14.525-11.325 22.725-6.976l101.53 53.841c43.538 19.533 71.631 62.896 71.631 110.65v27.019c3e-3 9.286-7.523 16.811-16.807 16.811z" fill="#4E7F4B"/>
    </Svg>
  );
}
