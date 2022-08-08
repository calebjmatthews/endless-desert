import * as React from 'react';
import Svg, { G, Path, Polygon, Rect } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function OpenBookQuillSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 460 460">
      <G id="XMLID_1208_">
        <Polygon id="XMLID_1211_" transform="matrix(1.2305 0 0 1.2305 -55.895 -8.7822)" points="393 131.86 373 131.86 230 353.28 87 131.86 67 131.86 67 362.24 209.42 362.24 219.97 371.13 240.03 371.13 250.58 362.24 393 362.24" fill={props.icon.tertiaryColor}/><G><G strokeWidth="1.2305">
        <Path id="XMLID_1212_" d="m51.162 153.48s170.52 264.26 175.97 272.46v21.966h-12.343l-12.987-10.942h-175.25v-283.48z" fill={props.icon.secondaryShadow}/>
        <Path id="XMLID_1213_" d="m240.15 375.43-13.025 25.892-13.025-25.892-162.94 12.305v24.611h150.64c10.572 0 19.882 5.3959 25.331 13.586 5.4488-8.1904 14.759-13.586 25.331-13.586h150.64v-24.611z" fill={props.icon.secondaryShadow}/>
        <Path id="XMLID_1214_" d="m227.13 401.33v24.611c-5.4488-8.1904-14.759-13.586-25.331-13.586h-150.64v-24.611h150.64c10.572 0 19.882 5.3959 25.331 13.586z" fill={props.icon.secondaryColor}/>
        <Path id="XMLID_1215_" d="m201.8 100.58h-150.63v287.16h150.63c10.572 0 19.885 5.3984 25.333 13.586l12.305-143.57-12.305-143.57c-5.4451-8.1941-14.757-13.599-25.332-13.599z" fill={props.icon.color}/>
        <Path id="XMLID_1216_" d="m252.46 100.58h150.63v287.16h-150.63c-10.572 0-19.885 5.3984-25.333 13.586v-287.15c5.4464-8.1941 14.757-13.599 25.333-13.599z" fill={props.icon.shadow}/>
      </G><Path d="m354.86 171.81 48.061-26.035c29.773-49.706 37.756-95.372 16.137-116.99-30.72-30.721-109.97-1.7116-180.41 64.741l-15.432 51.126-26.532-5.208c-48.659 62.24-40.309 152.02-40.309 152.02s116.78-0.82522 189.32-73.364c6.9099-6.9091 13.453-13.929 19.62-21.003z" fill={props.icon.shadow} strokeWidth=".87324"/><Path d="m354.86 171.81 48.061-26.035c29.773-49.706 37.756-95.372 16.137-116.99l-262.68 262.68s116.78-0.82522 189.32-73.364c6.9099-6.9091 13.453-13.929 19.62-21.003z" fill={props.icon.secondaryColor} strokeWidth=".87324"/></G><Rect transform="rotate(225)" x="-331.25" y="-171.14" width="29.157" height="254.21" fill="#818181" strokeWidth=".87323"/><Rect transform="rotate(135)" x="-83.079" y="-331.25" width="254.21" height="14.444" fill="#595959" strokeWidth=".87323"/></G>
    </Svg>
  );
}
