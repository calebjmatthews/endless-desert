import * as React from 'react';
import Svg from 'react-native-svg';

export default function DiamondSvgComponent(props: any) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <polygon points="342.72 164.79 256 474.36 512 186.47" fill="#69D5FF"/>
      <polygon points="512 186.47 402.16 37.64 352.4 96.777 364.4 186.47" fill="#13B8FF"/>
      <g fill="#AEECFF">
        <polygon points="115.08 164.79 256 474.36 364.4 186.47"/>
        <polygon points="402.16 37.64 256 37.64 291.74 133.6 364.4 186.47"/>
      </g>
      <g fill="#DBF7FF">
        <polygon points="0 186.47 256 474.36 147.6 186.47 84.862 164.79"/>
        <polygon points="256 37.64 109.84 37.64 103.28 128.19 147.6 186.47 216.46 132.52"/>
      </g>
      <polygon points="364.4 186.47 256 37.64 147.6 186.47" fill="#69D5FF"/>
      <polygon points="109.84 37.64 0 186.47 147.6 186.47" fill="#AEECFF"/>
    </Svg>
  );
}
