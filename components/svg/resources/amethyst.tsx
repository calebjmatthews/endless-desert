import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';

export default function AmethystSvgComponent(props: any) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <Path d="m213.58 436-137.58-137.58v-84.844l137.58-137.58h84.844l137.58 137.58v84.844l-137.58 137.58z" fill="#eabfff"/>
      <Path d="m256 76v360h42.422l137.58-137.58v-84.844l-137.58-137.58z" fill="#cb99ff"/>
      <G id="Gem_17_">
       <Path d="m226 406 12.45 53.5-47.249 51.599c-2.1-.599-4.2-1.8-5.7-3.6l-181-181c-1.8-1.5-3.001-3.6-3.6-5.7l52.599-47.249 52.5 12.45z" fill="#cb99ff"/>
       <Path d="m511.1 320.8c-0.599 2.1-1.8 4.2-3.6 5.7l-181 181c-1.5 1.8-3.6 3.001-5.7 3.6l-47.249-51.599 12.45-53.5 120-120 52.502-12.449z" fill="#b58dff"/>
       <Path d="m511.1 191.2-52.599 47.249-52.5-12.45-120-120-12.45-52.5 47.249-52.599c2.1 0.599 4.2 1.8 5.7 3.6l181 181c1.8 1.499 3.001 3.6 3.6 5.7z" fill="#b58dff"/>
       <Path d="m226 106-120 120-47.304 14.187-57.795-48.986c.599-2.1 1.8-4.2 3.6-5.7l181-181c1.5-1.8 3.6-3.001 5.7-3.6l48.957 57.709z" fill="#cb99ff"/>
      </G>
      <Path d="m106 226v60l-105.099 34.799c-.601-1.499-.901-3.299-.901-4.799v-120c0-1.5.3-3.3.901-4.799z" fill="#b58dff"/>
      <Path d="m320.799.901-34.799 105.099h-60l-34.799-105.099c1.499-.601 3.299-.901 4.799-.901h120c1.5 0 3.3.3 4.799.901z" fill="#b58dff"/>
      <Path d="m512 196v120c0 1.5-.3 3.3-.901 4.799l-105.099-34.799v-60l105.099-34.799c.601 1.499.901 3.299.901 4.799z" fill="#8a73ff"/>
      <Path d="m320.799 511.099c-1.499.601-3.299.901-4.799.901h-120c-1.5 0-3.3-.3-4.799-.901l34.799-105.099h60z" fill="#b58dff"/>
      <G fill="#8a73ff">
       <Path d="m256 406v106h60c1.5 0 3.3-0.3 4.799-0.901l-34.799-105.1z"/>
       <Path d="m256 0v106h30l34.799-105.099c-1.499-.601-3.299-.901-4.799-.901z"/>
      </G>
    </Svg>
  );
}
