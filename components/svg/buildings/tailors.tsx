import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function TailorsSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 64 64">
      <Path d="m4 58v-31h14.138a5.182 5.182 0 0 1 3.294 1.241 16.735 16.735 0 0 0 21.136 0 5.182 5.182 0 0 1 3.294-1.241h14.138v31z" fill="#78a0d4"/><Path d="m4 55h52v-28h-10.138a5.182 5.182 0 0 0 -3.294 1.241 16.735 16.735 0 0 1 -21.136 0 5.182 5.182 0 0 0 -3.294-1.241h-14.138z" fill="#93bbe5"/><Path d="m62 17h-7.347a8.07 8.07 0 0 1 -7.586-5.059 15.979 15.979 0 0 0 -15.067-9.941 15.979 15.979 0 0 0 -15.067 9.941 8.07 8.07 0 0 1 -7.586 5.059h-7.347v10h16.138a5.182 5.182 0 0 1 3.294 1.241 16.735 16.735 0 0 0 21.136 0 5.182 5.182 0 0 1 3.294-1.241h16.138z" fill="#3b5892"/><Path d="m47.067 11.941a15.979 15.979 0 0 0 -15.067-9.941 15.979 15.979 0 0 0 -15.067 9.941 8.07 8.07 0 0 1 -7.586 5.059h-7.347v6h16.138a5.182 5.182 0 0 1 3.294 1.241 16.735 16.735 0 0 0 21.136 0 5.182 5.182 0 0 1 3.294-1.241h16.138v-6h-7.347a8.07 8.07 0 0 1 -7.586-5.059z" fill="#4a6ba0"/><Path d="m2 58h60v4h-60z" fill="#3b5892"/><Path d="m38 16h4v-5h-7a3 3 0 0 1 -6 0h-7v5h4v9h12z" fill="#f0ae42"/><Path d="m26 58v-22h30v22" fill="#e2e7f6"/><Path d="m26 36h27v19h-27z" fill="#f2f2f2"/><Path d="m39 50-1-5v-3h-4v3l-1 5z" fill="#5e87ca"/><Path d="m35 39h2v3h-2z" fill="#ccc"/><Path d="m35 50h2v8h-2z" fill="#ccc"/><Path d="m49 50-1-5v-3h-4v3l-1 5z" fill="#5e87ca"/><Path d="m45 39h2v3h-2z" fill="#ccc"/><Path d="m45 50h2v8h-2z" fill="#ccc"/><Path d="m8 58v-26h12v26" fill="#e2e7f6"/><Path d="m17 54v-22h-9v23h8a1 1 0 0 0 1-1z" fill="#f2f2f2"/><G fill="#213d68"><Path d="m5 20h2v2h-2z"/><Path d="m9 20h2v2h-2z"/><Path d="m13 20h2v2h-2z"/><Path d="m49 20h2v2h-2z"/><Path d="m53 20h2v2h-2z"/><Path d="m57 20h2v2h-2z"/></G><Path d="m34 21.81a2 2 0 0 0 2-2v-8.81h-1a3 3 0 0 1 -6 0h-7v5h4v5.81z" fill="#f9d266"/>
    </Svg>
  );
}
