import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function CottagesSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 460 460">
      <G>
        <Polygon transform="matrix(1.1711 0 0 1.1711 -39.351 -37.98)" points="391.28 195.75 230 58 230 226 365 226" fill="#ffbf40"/>
        <Path transform="matrix(1.2974 0 0 1.1711 -68.406 -37.98)" d="m80.45 197.91 14.55 28.086 135 2e-5v-168z" fill="#ffdf80"/><Polygon transform="matrix(1.2974 0 0 1.2974 -68.406 -66.53)" points="95 256 240 266 230 196 95 196" fill="#b34a36"/>
        <Polygon transform="matrix(1.2974 0 0 1.2974 -68.406 -66.53)" points="95 316 230 326 230 256 95 256" fill="#cc7152"/>
        <Polygon transform="matrix(1.2974 0 0 1.2974 -68.406 -66.53)" points="95 376 180 376 230 316 95 316" fill="#b34a36"/><G strokeWidth="1.2974">
        <Circle cx="54.848" cy="226.69" r="38.923" fill="#cc7152"/>
        <Circle cx="54.848" cy="226.69" r="12.974" fill="#b34a36"/>
        <Circle cx="54.848" cy="304.53" r="38.923" fill="#d6927b"/>
        <Circle cx="54.848" cy="304.53" r="12.974" fill="#cc7152"/>
        <Circle cx="54.848" cy="382.38" r="38.923" fill="#cc7152"/>
        <Circle cx="54.848" cy="382.38" r="12.974" fill="#b34a36"/>
        </G><Polygon transform="matrix(1.2974 0 0 1.2974 -68.406 -66.53)" points="230 266 365 256 365 196 230 196" fill="#992d2d"/>
        <Polygon transform="matrix(1.2974 0 0 1.2974 -68.406 -66.53)" points="230 326 365 316 365 256 230 256" fill="#b34a36"/>
        <Polygon transform="matrix(1.2974 0 0 1.2974 -68.406 -66.53)" points="280 376 365 376 365 316 230 316" fill="#992d2d"/><G strokeWidth="1.2974">
        <Circle cx="405.15" cy="226.69" r="38.923" fill="#b34a36"/>
        <Circle cx="405.15" cy="226.69" r="12.974" fill="#992d2d"/>
        <Circle cx="405.15" cy="304.53" r="38.923" fill="#cc7152"/>
        <Circle cx="405.15" cy="304.53" r="12.974" fill="#b34a36"/>
        <Circle cx="405.15" cy="382.38" r="38.923" fill="#b34a36"/>
        <Circle cx="405.15" cy="382.38" r="12.974" fill="#992d2d"/>
        </G><Polygon transform="matrix(1.2974 0 0 1.2974 -68.406 -66.53)" points="230 256 240 316 230 376 180 376 180 256" fill="#345866"/>
        <Rect x="230" y="265.61" width="64.871" height="155.69" fill="#26334d" strokeWidth="1.2974"/>
      </G>
    </Svg>
  );
}
