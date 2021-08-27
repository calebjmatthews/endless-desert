import * as React from 'react';
import Svg from 'react-native-svg';
import Icon from '../../../models/icon';

export default function SquashSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <rect x="241" width="30" height="45" fill="#707741"/>
      <path d="m343.5 192v-59.5c0-48.325-34.782-87.5-87.5-87.5l-50 211 50 241c11.494 0 22.135-2.236 31.75-6.332 9.615 4.096 20.256 6.332 31.75 6.332 52.718 0 87.5-47.01 87.5-105 0-100-63.5-100-63.5-200z" fill="#EB7330"/>
      <path d="m168.5 132.5v59.5c0 100-63.5 100-63.5 200 0 57.99 34.782 105 87.5 105 11.494 0 22.135-2.236 31.75-6.332 9.615 4.096 20.256 6.332 31.75 6.332v-452c-52.718 0-87.5 39.175-87.5 87.5z" fill="#F9963B"/>
      <path d="M319.5,512c-11.054,0-21.705-1.768-31.75-5.261C277.705,510.232,267.054,512,256,512  c-8.284,0-15-6.716-15-15s6.716-15,15-15c9.173,0,17.877-1.727,25.871-5.132l5.879-2.505l5.879,2.505  c7.994,3.405,16.698,5.132,25.871,5.132c42.009,0,72.5-37.851,72.5-90c0-45.64-14.287-68.139-29.413-91.959  C346.609,274.879,328.5,246.36,328.5,192v-59.5c0-42.01-30.491-72.5-72.5-72.5c-8.284,0-15-6.716-15-15s6.716-15,15-15  c29.115,0,55.505,10.729,74.311,30.21c18.178,18.831,28.189,44.504,28.189,72.29V192c0,45.64,14.287,68.139,29.413,91.959  C403.891,309.121,422,337.64,422,392c0,32.063-9.693,61.77-27.293,83.648C375.85,499.09,349.141,512,319.5,512z" fill="#FCBA66"/>
      <path d="M256,512c-11.054,0-21.705-1.768-31.75-5.261C214.205,510.232,203.554,512,192.5,512  c-29.641,0-56.35-12.91-75.207-36.352C99.693,453.77,90,424.063,90,392c0-54.36,18.109-82.879,34.087-108.041  C139.213,260.139,153.5,237.64,153.5,192v-59.5c0-27.786,10.011-53.459,28.189-72.29C200.495,40.729,226.885,30,256,30v30  c-42.009,0-72.5,30.49-72.5,72.5V192c0,54.36-18.109,82.879-34.087,108.041C134.287,323.861,120,346.36,120,392  c0,52.149,30.491,90,72.5,90c9.173,0,17.877-1.727,25.871-5.132l5.879-2.505l5.879,2.505C238.123,480.273,246.827,482,256,482V512z" fill="#FEDD90"/>
      <path d="m255.5 287-30 75 30 75c41.355 0 75-33.645 75-75s-33.645-75-75-75z" fill="#D95D27"/>
      <path d="m180.5 362c0 41.355 33.645 75 75 75v-150c-41.355 0-75 33.645-75 75z" fill="#EB7330"/>
    </Svg>
  );
}
