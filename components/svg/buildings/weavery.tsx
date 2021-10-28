import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function WeaverySvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <G><G transform="matrix(.53465 0 0 .53465 70.723 47.54)" fill="#3ca5e6"><Path d="m70.621 88.277h52.965v79.445h-52.965z"/><Path d="m123.59 379.59v-158.89h-52.965v158.89z"/><Path d="m123.59 432.55v52.965c0 14.629-11.855 26.484-26.484 26.484-14.625 0-26.48-11.855-26.48-26.484v-52.965z"/><Path d="m176.55 326.62v158.89c0 14.629 11.859 26.484 26.484 26.484s26.48-11.855 26.48-26.484v-158.89z"/><Path d="m176.55 273.66v-185.38h52.965v185.38z"/><Path d="m282.48 88.277h52.965v79.445h-52.965z"/><Path d="m335.45 379.59v-158.89h-52.965v158.89z"/><Path d="m335.45 432.55v52.965c0 14.629-11.859 26.484-26.484 26.484s-26.48-11.855-26.48-26.484v-52.965z"/><Path d="m441.38 326.62v158.89c0 14.629-11.855 26.484-26.48 26.484-14.629 0-26.484-11.855-26.484-26.484v-158.89z"/><Path d="m388.41 273.66v-185.38h52.965v185.38z"/></G><G transform="matrix(.53465 0 0 .44554 -156.33 -269.65)" fill="#0074bb"><Path d="m866.05 967.18h44.137c14.629 0 26.484 11.859 26.484 26.484s-11.855 26.484-26.484 26.484h-44.137z"/><Path d="m654.19 967.18h158.9v52.969h-158.9z"/><Path d="m601.22 1020.2h-150.07c-14.629 0-26.484-11.859-26.484-26.484s11.855-26.484 26.484-26.484h150.07"/><Path d="m760.12 1073.1h150.07c14.629 0 26.484 11.856 26.484 26.48 0 14.629-11.855 26.484-26.484 26.484h-150.07z"/><Path d="m548.26 1126.1h158.9v-52.965h-158.9z"/><Path d="m495.29 1126.1h-44.137c-14.629 0-26.484-11.855-26.484-26.484 0-14.625 11.855-26.48 26.484-26.48h44.137z"/><Path d="m601.22 1179v52.965h-150.07c-14.629 0-26.484-11.855-26.484-26.48 0-14.629 11.855-26.484 26.484-26.484z"/><Path d="m866.05 1179h44.137c14.629 0 26.484 11.856 26.484 26.484 0 14.625-11.855 26.48-26.484 26.48h-44.137z"/><Path d="m813.08 1232h-158.9v-52.965h158.9z"/></G><G transform="matrix(.53465 0 0 .53465 70.83 212.55)" fill="#3ca5e6"><Path d="m70.418 123.88h52.965l0.20334 43.838h-52.965z"/><Path d="m123.59 379.59v-158.89h-52.965v158.89z"/><Path d="m123.59 432.55v52.965c0 14.629-11.855 26.484-26.484 26.484-14.625 0-26.48-11.855-26.48-26.484v-52.965z"/><Path d="m176.55 326.62v158.89c0 14.629 11.859 26.484 26.484 26.484s26.48-11.855 26.48-26.484v-158.89z"/><Path d="m176.55 273.66v-185.38h52.965v185.38z"/><Path d="m282.28 123.88h52.965l0.20334 43.838h-52.965z"/><Path d="m335.45 379.59v-158.89h-52.965v158.89z"/><Path d="m335.45 432.55v52.965c0 14.629-11.859 26.484-26.484 26.484s-26.48-11.855-26.48-26.484v-52.965z"/><Path d="m441.38 326.62v158.89c0 14.629-11.855 26.484-26.48 26.484-14.629 0-26.484-11.855-26.484-26.484v-158.89z"/><Path d="m388.41 273.66v-185.38h52.965v185.38z"/></G><G transform="matrix(.53465 0 0 .53465 -156.33 -379.89)" fill="#0074bb"><Path d="m866.25 1275.9h44.137c14.629 0 26.484 11.859 26.484 26.484s-11.856 26.484-26.484 26.484h-44.137z"/><Path d="m654.39 1275.9h158.9v52.969h-158.9z"/><Path d="m601.42 1328.8h-150.07c-14.629 0-26.484-11.859-26.484-26.484s11.855-26.484 26.484-26.484h150.07"/><Path d="m760.32 1381.8h150.07c14.629 0 26.484 11.856 26.484 26.48 0 14.629-11.855 26.484-26.484 26.484h-150.07z"/><Path d="m548.46 1434.7h158.9v-52.965h-158.9z"/><Path d="m495.49 1434.7h-44.137c-14.629 0-26.484-11.855-26.484-26.484 0-14.625 11.855-26.48 26.484-26.48h44.137z"/><Path d="m601.42 1487.7v52.965h-150.07c-14.629 0-26.484-11.855-26.484-26.48 0-14.629 11.855-26.484 26.484-26.484z"/><Path d="m866.25 1487.7h44.137c14.629 0 26.484 11.856 26.484 26.484 0 14.625-11.856 26.48-26.484 26.48h-44.137z"/><Path d="m813.29 1540.7h-158.9v-52.965h158.9z"/></G></G>
      <Path d="m496.16 146.91-41.397-127.7c-3.029-9.3446-10.752-15.535-19.38-15.535h-358.77c-8.628 0-16.352 6.19-19.38 15.535l-41.397 127.7c-4.014 12.382 1.41 26.185 12.113 30.826 10.704 4.6434 22.633-1.6299 26.647-14.01l2.725-8.4076h397.35l2.725 8.4076c3.116 9.613 11.003 15.542 19.383 15.542 2.415 0 4.871-0.4928 7.265-1.5304 10.703-4.6422 16.128-18.445 12.114-30.827z" fill="#d8145d" strokeWidth="1.0755"/><Rect x="283.59" y="257.04" width="151.79" height="230.43" fill="#a4c6ec" strokeWidth="1.0884"/><Path d="m435.38 232.52c-11.431 0-20.698 10.98-20.698 24.519v205.92h-110.39v-205.92c0-13.54-9.267-24.519-20.698-24.519s-20.698 10.98-20.698 24.519l-1e-3 205.92h-165.59v-205.92c0-13.54-9.267-24.519-20.698-24.519s-20.698 10.98-20.698 24.519v230.44c0 13.543 9.267 24.519 20.698 24.519h358.77c11.431 0 20.698-10.977 20.698-24.519v-230.44c0-13.54-9.267-24.519-20.698-24.519zm-172.49 230.44h-165.59 165.59z" fill="#1d3366" strokeWidth="1.0884"/><Path d="m496.16 171.02-41.397-149.2c-3.029-10.918-10.752-18.15-19.38-18.15h-179.38v177.17h198.68l2.725 9.8231c3.116 11.231 11.003 18.158 19.383 18.158 2.415 0 4.871-0.57577 7.265-1.7881 10.702-5.4238 16.127-21.551 12.113-36.018z" fill="#d8145d" strokeWidth="1.1626"/><G transform="matrix(1 0 0 1.2592 0 -118.22)" fill="#a90140">
        <Path d="m476.78 193.28h-441.56c-11.431 0-20.698 9.267-20.698 20.698v82.792c0 11.432 9.267 20.698 20.698 20.698h441.56c11.431 0 20.698-9.266 20.698-20.698v-82.792c0-11.431-9.268-20.698-20.699-20.698z"/>
        <Path d="m476.78 193.28h-220.78v124.19h220.78c11.431 0 20.698-9.266 20.698-20.698v-82.792c1e-3 -11.431-9.267-20.698-20.698-20.698z"/>
      </G><Circle cx="262.17" cy="186.26" r="76.918" fill="#a4c6ec" fillRule="evenodd"/><Path d="m328.15 172.61-9.4013-9.4013 6.8445-6.8445c1.7674-1.7673 1.7674-4.6333-3.3e-4 -6.401l-25.204-25.204c-1.7673-1.7674-4.6333-1.7674-6.4006 0l-6.8445 6.8445-9.4013-9.4013c-1.7674-1.7673-4.6336-1.7677-6.401-3.3e-4l-72.324 72.324c-1.7674 1.7674-1.7674 4.6333 3.3e-4 6.401l9.4013 9.4013-6.8445 6.8445c-1.7673 1.7673-1.7673 4.6333 0 6.4006l25.204 25.204c1.7673 1.7674 4.6336 1.7677 6.401 3.4e-4l6.8444-6.8444 9.4013 9.4013c1.7673 1.7674 4.6333 1.7674 6.4006 0l72.323-72.323c1.7674-1.7673 1.7677-4.6336 3.4e-4 -6.401zm-100.62 44.024c-0.0213-0.0991-0.0406-0.19762-0.0689-0.29644l-8.322-29.128 8.52-8.52 15.229 53.302zm7.4513-45.266 8.52-8.52 19.558 68.454-8.52 8.52zm35.401 52.612-2.5555-8.9442 8.6248 2.8749zm13.226-13.226-18.794-6.2646-3.4296-12.003 31.494 8.9981zm16.592-16.592-41.744-11.927-3.4325-12.015 53.76 15.36-8.5829 8.5829zm15.904-15.905-64.011-18.289-1.2696-4.4436 7.2417-7.2417 45.915 12.955 14.571 14.571-2.4474 2.4474zm-18.912-43.896 18.803 18.803-3.6438 3.6438-18.803-18.803zm-6.3956 13.694-25.279-7.2228 9.0283-9.0284zm-78.979 46.477 2.5555 8.9442-5.7498-5.7498zm18.166 44.644-18.803-18.803 3.6438-3.6438 18.803 18.803z" fill="#1d3366" strokeWidth=".47052"/><Rect x="-3.4887" y="-6.5565" width="266.07" height="518.48" fill="#fff" fillOpacity=".24597" fillRule="evenodd" strokeWidth=".92332"/>
    </Svg>
  );
}
