import * as React from 'react';
import Svg, { G, Path, Polygon } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function MapSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 460 460">
      <Polygon transform="matrix(1.4295 0 0 1.1936 -95.888 -18.582)" points="154.25 126.64 162.6 226.17 78.5 195.2 78.5 104.31" fill={props.icon.color}/>
      <Polygon transform="matrix(1.4295 0 0 1.1936 -95.888 -18.582)" points="78.5 195.2 154.25 217.53 162.6 317.06 78.5 286.09" fill={props.icon.secondaryColor}/>
      <Polygon transform="matrix(1.4295 0 0 1.1936 -95.888 -18.582)" points="78.5 286.09 154.25 308.42 174.25 357.5 154.25 399.31 78.5 376.98" fill={props.icon.color}/>
      <Polygon transform="matrix(1.4295 0 0 1.1936 -95.888 -18.582)" points="154.25 217.53 154.25 126.64 230 104.31 238.34 203.85" fill={props.icon.shadow}/>
      <Polygon transform="matrix(1.4295 0 0 1.1936 -95.888 -18.582)" points="154.25 217.53 230 195.2 238.34 294.74 154.25 308.42" fill={props.icon.secondaryShadow}/>
      <Polygon transform="matrix(1.4295 0 0 1.1936 -95.888 -18.582)" points="154.25 308.42 230 286.09 230 376.98 154.25 399.31" fill={props.icon.shadow}/>
      <Polygon transform="matrix(1.4295 0 0 1.1936 -95.888 -18.582)" points="305.76 126.64 314.1 226.17 230 195.2 230 104.31" fill={props.icon.color}/>
      <Polygon transform="matrix(1.4295 0 0 1.1936 -95.888 -18.582)" points="230 195.2 305.76 217.53 314.1 317.06 230 286.09" fill={props.icon.secondaryColor}/>
      <Polygon transform="matrix(1.4295 0 0 1.1936 -95.888 -18.582)" points="230 286.09 305.76 308.42 325.76 354.67 305.76 399.31 230 376.98" fill={props.icon.color}/>
      <Polygon transform="matrix(1.4295 0 0 1.1936 -95.888 -18.582)" points="305.76 217.53 305.76 126.64 381.5 104.31 381.5 195.2 343.63 223.94" fill={props.icon.shadow}/>
      <Polygon transform="matrix(1.4295 0 0 1.1936 -95.888 -18.582)" points="305.76 308.42 305.76 217.53 381.5 195.2 381.5 286.09 343.63 314.04" fill={props.icon.secondaryShadow}/>
      <Polygon transform="matrix(1.4295 0 0 1.1936 -95.888 -18.582)" points="305.76 399.31 305.76 308.42 381.5 286.09 381.5 376.98" fill={props.icon.shadow}/><G strokeWidth="1.145">
      <Path d="m340.99 5.2895c-43.985 0-79.641 38.742-79.641 86.534 0 21.169 6.9996 40.56 18.617 55.598l61.024 79.01 25.031-110.57z" fill={props.icon.tertiaryColor}/>
      <Path d="m340.99 5.2895v221.14l61.024-79.01c11.618-15.038 18.617-34.428 18.617-55.598 0-47.792-35.656-86.534-79.641-86.534z" fill={props.icon.tertiaryShadow}/>
      <Path d="m340.99 50.072c21.223 0 38.425 18.69 38.425 41.749 0 23.059-17.202 41.758-38.425 41.758l-16.248-41.758z" fill="#e0e0e0"/>
      </G><Path d="m340.99 50.072v83.507c-21.223 0-38.43-18.698-38.43-41.758 0-23.06 17.207-41.749 38.43-41.749z" fill="#fff" strokeWidth="1.145"/>
    </Svg>
  );
}
