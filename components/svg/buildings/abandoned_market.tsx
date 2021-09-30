import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function AbandonedMarketSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <G>
      <Polygon points="196 347 256 512 482 512 482 407" fill="#c3b296"/>
      <Polygon points="462 322 256 322 196 407 462 407" fill="#391f20"/>
      <Rect x="50" y="322" width="206" height="85" fill="#613b34"/></G><G>
      <Rect x="30" y="407" width="226" height="105" fill="#cbc1b2"/>
      <Polygon points="256 302 226 317 256 332 482 332 482 302" fill="#c0a987"/>
      <Rect x="30" y="302" width="226" height="30" fill="#c3b296"/>
      <Rect x="452" y="156.85" width="30" height="250.15" fill="#c0a987"/>
      </G><G>
        <Rect x="30" y="156.85" width="30" height="250.15" fill="#c3b296"/>
        <Rect x="241" y="302" width="30" height="105" fill="#c0a987"/>
      <Rect x="241" y="302" width="15" height="105" fill="#c3b296" stroke-width=".70711"/></G>
      <G fill="#707741">
        <Rect x="381.67" y="362" width="30" height="45"/>
        <Rect x="311.33" y="362" width="30" height="45"/>
      </G>
      <G fill="#A59D4D">
        <Rect x="170.67" y="362" width="30" height="45"/>
        <Rect x="100.33" y="362" width="30" height="45"/>
      </G><G>
      <Path d="M0,120v11c0,35.346,28.654,64,64,64s64-28.654,64-64v-11L64,90L0,120z" fill="#b5b090"/>
      <Polygon points="128 0 0 0 0 120 128 120 188 61.898" fill="#cec9ac"/>
      <Path d="m128 120v11c0 35.346 28.654 64 64 64s64-28.654 64-64v-11l-64-30-64 30z" fill="#8d8a6c"/>
      <G fill="#9e9875">
        <Polygon points="256 0 128 0 128 120 256 120 316 61.898"/>
        <Path d="m256 120v11c0 35.346 28.654 64 64 64s64-28.654 64-64v-11l-64-30-64 30z"/>
      </G>
      <Polygon points="384 0 256 0 256 120 384 120 444 61.898" fill="#c7bb9e"/>
      <Path d="m384 120v11c0 35.346 28.654 64 64 64s64-28.654 64-64v-11l-64-30-64 30z" fill="#7c7c63"/>
      <Rect x="384" width="128" height="120" fill="#8d8a6c"/>
      <Polygon points="512 422 256 422 226 407 256 392 512 392" fill="#c0a987"/>
      <Rect y="392" width="256" height="30" fill="#c3b296"/>
      </G>
    </Svg>
  );
}
