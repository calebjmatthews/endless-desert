import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function NeedleSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 460 460">
      <G id="XMLID_944_" transform="matrix(.8148 0 0 .8148 42.598 42.598)">
      	<Path id="XMLID_35_" d="m324.69 460.01c-1e-3 -3.062-0.148-306.4 0-331.11l29.999 0.18c-0.147 24.618-1e-3 327.86 0 330.92z" fill={props.icon.secondaryColor}/>
      	<Path id="XMLID_34_" d="m442.65 17.354-17.678 3.536-3.535 17.678c11.267 11.267 11.267 29.599 0 40.866s-29.6 11.267-40.867 0l-208.61 166.18-166.18 208.61c7.369 7.368 19.102 7.69 26.862 0.992l406.76-351.04c1.111-0.957 2.186-1.949 3.241-3.003 23.139-23.14 23.146-60.667 0-83.814z" fill={props.icon.shadow}/>
      	<Path id="XMLID_33_" d="m390.3 69.512c-8.78-8.779-19.103-15.338-30.683-19.494l10.134-28.236c15.778 5.662 29.829 14.584 41.762 26.518l-3.535 17.678z" fill={props.icon.secondaryColor}/>
      	<Path id="XMLID_32_" d="m380.57 38.567c11.267-11.267 29.599-11.266 40.866 0l21.213-21.213c-23.139-23.139-60.674-23.139-83.813 0-1.055 1.055-2.039 2.137-2.996 3.248l-351.04 406.76c-6.698 7.76-6.377 19.493 0.985 26.855l374.79-374.79c-11.266-11.267-11.267-29.599 1e-3 -40.867z" fill={props.icon.color}/>
      	<Path id="XMLID_3_" d="m444.69 341.82h-30v-212.83c0-22.627-8.661-43.748-24.388-59.475l21.213-21.213c21.393 21.392 33.175 50.047 33.175 80.688v212.83z" fill={props.icon.secondaryShadow}/>
      </G>
    </Svg>
  );
}
