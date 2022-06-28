import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';

export default function SugarCaneSvgComponent(props: any) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <G>
      <G transform="translate(-129.38 .014078)" fill="#67c567"><Polygon points="300.52 512 300.52 347.83 233.74 325.56 256 512"/><Polygon points="233.74 186.44 300.52 164.17 300.52 0 256 0"/></G><Polygon transform="translate(-129.38 .014078)" points="256 347.83 300.52 347.83 300.52 164.17 256 164.17 256 0 211.48 0 211.48 164.17 233.74 256 211.48 347.83 211.48 512 256 512" fill="#87df87"/><Rect x="82.096" y="164.19" width="44.522" height="183.65" fill="#b6ffb6"/></G><G transform="translate(132.78 .11677)" fill="#30752f"><Polygon points="256 512 300.52 512 300.52 347.83 233.74 325.56"/><Polygon points="256 0 233.74 186.44 300.52 164.17 300.52 0"/></G><G><Polygon transform="translate(132.78 .11677)" points="256 347.83 300.52 347.83 300.52 164.17 256 164.17 256 0 211.48 0 211.48 164.17 233.74 256 211.48 347.83 211.48 512 256 512" fill="#4a9c49"/><Rect x="344.26" y="164.29" width="44.522" height="183.65" fill="#67c567"/><Path d="m415.56 204.08c-32.008 32.008-73.149 49.308-115.03 51.922 2.615-41.885 19.915-83.026 51.922-115.03 32.008-32.008 73.149-49.308 115.03-51.922-2.614 41.884-19.914 83.026-51.922 115.03z" fill="#488947"/>
      <Path d="m96.444 371.03c32.008 32.008 73.149 49.308 115.03 51.922-2.615-41.885-19.915-83.026-51.922-115.03s-73.149-49.307-115.03-51.922c2.614 41.885 19.914 83.026 51.922 115.03z" fill="#99e899"/>
      </G><G fill="#4a9c49">
        <Polygon points="256 512 300.52 512 300.52 347.83 233.74 325.56"/>
        <Polygon points="256 0 233.74 186.44 300.52 164.17 300.52 0"/>
      </G>
      <Polygon points="300.52 164.17 256 164.17 256 0 211.48 0 211.48 164.17 233.74 256 211.48 347.83 211.48 512 256 512 256 347.83 300.52 347.83" fill="#67c567"/>
      <Rect x="211.48" y="164.17" width="44.522" height="183.65" fill="#8ae18a"/>
    </Svg>
  );
}
