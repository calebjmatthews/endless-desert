import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';

export default function EchinaceaBindingSvgComponent(props: any) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <G>
        <Path d="m481.68 335.29c40.425 40.425 40.425 105.96 3e-3 146.39-40.425 40.425-105.97 40.425-146.39 0l-304.98-304.97c-40.425-40.425-40.425-105.96 0-146.39s105.96-40.425 146.39 0l304.97 304.97z" fill="#427a4e"/>
        <Path d="m176.71 481.68c-40.425 40.425-105.96 40.425-146.39 0s-40.425-105.96 0-146.39l304.97-304.97c40.425-40.425 105.96-40.425 146.39 0 40.425 40.421 40.425 105.96 0 146.39l-304.97 304.98z" fill="#50965f"/>
        <Path d="m481.68 30.321c-40.425-40.425-105.96-40.425-146.39 0l-304.97 304.97c-40.425 40.425-40.425 105.96 0 146.39l451.36-451.36z" fill="#5daa6e"/>
        <rect transform="matrix(-.7071 -.7071 .7071 -.7071 256 618.06)" x="152.49" y="152.5" width="207.02" height="207.02" fill="#428751"/>
        <Path id="XMLID_23_" d="m329.15 182.56-109.6 36.534-36.534 109.6c40.356 40.356 105.78 40.356 146.14 0 40.356-40.356 40.356-105.78 0-146.14z" fill="#b33078" strokeWidth="5.1667"/><Path id="XMLID_24_" d="m183.01 182.56c-40.356 40.356-40.356 105.78 0 146.14l146.14-146.14c-40.356-40.356-105.78-40.356-146.14 0z" fill="#e461a9" strokeWidth="5.1667"/><Path d="m301.69 211.37-67.737 22.579-22.579 67.737c24.941 24.941 65.375 24.941 90.316 0 24.941-24.941 24.941-65.375 0-90.316z" fill="#50965f" strokeWidth="3.1932"/><Path d="m211.37 211.37c-24.941 24.941-24.941 65.375 0 90.316l90.316-90.316c-24.941-24.941-65.375-24.941-90.316 0z" fill="#5daa6e" strokeWidth="3.1932"/>
      </G>
    </Svg>
  );
}