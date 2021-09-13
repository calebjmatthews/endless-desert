import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function WeaverySvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <G>
       <Path d="m25.861 166.12h269.98v343.46h-269.98z" fill="#cc7152" strokeWidth="1.4086"/>
       <Path d="m160.45 166.12h135.4v343.46h-135.4z" fill="#b34a36" strokeWidth="1.4086"/>
       <Path d="m315.87 165.71h-310.03c76.813-88.778 77.985-89.862 154.88-165.32 81.505 76.898 83.24 78.64 155.15 165.32z" fill="#ffdf80" strokeWidth=".9337"/>
       <G transform="matrix(1 0 0 1.3316 -95.147 -72.003)" fill="#ffbf40">
        <Path d="m411.02 178.51c-75.99-67.659-76.391-66.683-155.15-124.15l-0.26953 124.15z" fill="#ffbf40" strokeWidth=".80912"/>
       </G>
       <Path d="m72.853 324.86c-11.23 0-20.332-18.059-20.332-40.343v-48.946c0-22.284 9.1016-40.343 20.332-40.343 11.23 0 20.332 18.067 20.332 40.343v48.946c0 22.284-9.1016 40.343-20.332 40.343z" fill="#cfd6e6" strokeWidth="1.4086"/>
       <Path d="m248.85 324.86c-11.23 0-20.332-18.059-20.332-40.343v-48.946c0-22.284 9.1016-40.343 20.332-40.343s20.332 18.067 20.332 40.343v48.946c0 22.284-9.1016 40.343-20.332 40.343z" fill="#a3b1cc" strokeWidth="1.4086"/>
      </G>
      <G transform="matrix(.75007 0 0 .75007 510.64 412.23)">
       <Path d="m-541.88-31.13h150v160.92h-150z" fill="#345866" strokeWidth="1.0358"/>
       <Path d="m-466.88-31.13h75v160.92h-75z" fill="#26334d" strokeWidth="1.0358"/>
       <G transform="matrix(.51222 0 0 .51222 -490.89 -729.89)">
        <G transform="translate(424.67 799.46)" fill="#3ca5e6">
         <Path d="m70.621 88.277h52.965v79.445h-52.965z"/>
         <Path d="m123.59 379.59v-158.89h-52.965v158.89z"/>
         <Path d="m123.59 432.55v52.965c0 14.629-11.855 26.484-26.484 26.484-14.625 0-26.48-11.855-26.48-26.484v-52.965z"/>
         <Path d="m176.55 326.62v158.89c0 14.629 11.859 26.484 26.484 26.484s26.48-11.855 26.48-26.484v-158.89z"/>
         <Path d="m176.55 273.66v-185.38h52.965v185.38z"/>
         <Path d="m282.48 88.277h52.965v79.445h-52.965z"/>
         <Path d="m335.45 379.59v-158.89h-52.965v158.89z"/>
         <Path d="m335.45 432.55v52.965c0 14.629-11.859 26.484-26.484 26.484s-26.48-11.855-26.48-26.484v-52.965z"/>
         <Path d="m441.38 326.62v158.89c0 14.629-11.855 26.484-26.48 26.484-14.629 0-26.484-11.855-26.484-26.484v-158.89z"/>
         <Path d="m388.41 273.66v-185.38h52.965v185.38z"/>
        </G>
        <G fill="#0074bb">
         <Path d="m866.05 967.18h44.137c14.629 0 26.484 11.859 26.484 26.484 0 14.625-11.855 26.484-26.484 26.484h-44.137z"/>
         <Path d="m654.19 967.18h158.9v52.969h-158.9z"/>
         <Path d="m601.22 1020.2h-150.07c-14.629 0-26.484-11.859-26.484-26.484 0-14.625 11.855-26.484 26.484-26.484h150.07"/>
         <Path d="m760.12 1073.1h150.07c14.629 0 26.484 11.856 26.484 26.48 0 14.629-11.855 26.484-26.484 26.484h-150.07z"/>
         <Path d="m548.26 1126.1h158.9v-52.965h-158.9z"/>
         <Path d="m495.29 1126.1h-44.137c-14.629 0-26.484-11.855-26.484-26.484 0-14.625 11.855-26.48 26.484-26.48h44.137z"/>
         <Path d="m601.22 1179v52.965h-150.07c-14.629 0-26.484-11.855-26.484-26.48 0-14.629 11.855-26.484 26.484-26.484z"/>
         <Path d="m866.05 1179h44.137c14.629 0 26.484 11.856 26.484 26.484 0 14.625-11.855 26.48-26.484 26.48h-44.137z"/>
         <Path d="m813.08 1232h-158.9v-52.965h158.9z"/>
        </G>
        <Path d="m375.8 799.46h530.27c16.899 0 30.595 11.855 30.595 26.484v35.309c0 14.625-13.695 26.484-30.595 26.484h-530.27c-16.899 0-30.595-11.859-30.595-26.484v-35.309c0-14.629 13.695-26.484 30.595-26.484z" fill="#cb9080" strokeWidth="1.0748"/>
        <G fill="#b34a36" strokeWidth="1.0748">
         <Path d="m936.67 834.77v17.656h-224.35c-5.6316 0-10.198-3.9531-10.198-8.8281s4.5667-8.8281 10.198-8.8281z"/>
         <Path d="m640.94 852.43h-152.96c-5.6316 0-10.198-3.9531-10.198-8.8281s4.5667-8.8281 10.198-8.8281h152.96c5.6316 0 10.198 3.9531 10.198 8.8281s-4.5666 8.8281-10.198 8.8281z"/>
         <Path d="m426.79 843.6c0 4.875-4.5666 8.8281-10.198 8.8281h-71.383v-17.656h71.383c5.6316 0 10.198 3.9531 10.198 8.8281z"/>
        </G>
        <G transform="translate(424.87 1108.1)" fill="#3ca5e6">
         <Path d="m70.418 123.88h52.965l0.20334 43.838h-52.965z"/>
         <Path d="m123.59 379.59v-158.89h-52.965v158.89z"/>
         <Path d="m123.59 432.55v52.965c0 14.629-11.855 26.484-26.484 26.484-14.625 0-26.48-11.855-26.48-26.484v-52.965z"/>
         <Path d="m176.55 326.62v158.89c0 14.629 11.859 26.484 26.484 26.484s26.48-11.855 26.48-26.484v-158.89z"/>
         <Path d="m176.55 273.66v-185.38h52.965v185.38z"/>
         <Path d="m282.28 123.88h52.965l0.20334 43.838h-52.965z"/>
         <Path d="m335.45 379.59v-158.89h-52.965v158.89z"/>
         <Path d="m335.45 432.55v52.965c0 14.629-11.859 26.484-26.484 26.484s-26.48-11.855-26.48-26.484v-52.965z"/>
         <Path d="m441.38 326.62v158.89c0 14.629-11.855 26.484-26.48 26.484-14.629 0-26.484-11.855-26.484-26.484v-158.89z"/>
         <Path d="m388.41 273.66v-185.38h52.965v185.38z"/>
        </G>
        <G fill="#0074bb">
         <Path d="m866.25 1275.9h44.137c14.629 0 26.484 11.859 26.484 26.484s-11.856 26.484-26.484 26.484h-44.137z"/>
         <Path d="m654.39 1275.9h158.9v52.969h-158.9z"/>
         <Path d="m601.42 1328.8h-150.07c-14.629 0-26.484-11.859-26.484-26.484s11.855-26.484 26.484-26.484h150.07"/>
         <Path d="m760.32 1381.8h150.07c14.629 0 26.484 11.856 26.484 26.48 0 14.629-11.855 26.484-26.484 26.484h-150.07z"/>
         <Path d="m548.46 1434.7h158.9v-52.965h-158.9z"/>
         <Path d="m495.49 1434.7h-44.137c-14.629 0-26.484-11.855-26.484-26.484 0-14.625 11.855-26.48 26.484-26.48h44.137z"/>
         <Path d="m601.42 1487.7v52.965h-150.07c-14.629 0-26.484-11.855-26.484-26.48 0-14.629 11.855-26.484 26.484-26.484z"/>
         <Path d="m866.25 1487.7h44.137c14.629 0 26.484 11.856 26.484 26.484 0 14.625-11.856 26.48-26.484 26.48h-44.137z"/>
         <Path d="m813.29 1540.7h-158.9v-52.965h158.9z"/>
        </G>
       </G>
      </G>
      <Path d="m160.16 324.85c-11.23 0-20.332-18.059-20.332-40.343v-48.946c0-22.284 9.1016-40.343 20.332-40.343 11.23 0 20.332 18.067 20.332 40.343v48.946c0 22.284-9.1016 40.343-20.332 40.343z" fill="#cfd6e6" strokeWidth="1.4086"/>
      <Path d="m159.79 324.99c0.45377-41.431-0.51307-97.968 0-129.63 11.23 0 20.332 18.067 20.332 40.343v48.946c0 22.284-9.1016 40.343-20.332 40.343z" fill="#a3b1cc" strokeWidth="1.4086"/>
    </Svg>
  );
}
