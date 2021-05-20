import * as React from 'react';
import Svg from 'react-native-svg';
import Icon from '../../../models/icon';

export default function PowderSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
    	<path d="m302.2 73.539c-13.498-10.801-29.699-16.2-46.199-16.2-16.199 0-32.401 5.4-46.199 16.199-123.9 97.202-178.8 219.3-178.8 351.6 0 11.4 2.401 21 15 21h420c12.599 0 15-9.6 15-21 0-130.8-54-253.8-178.8-351.6z" fill={props.icon.color}/>
    	<path d="m466 446.14h-210v-388.8c16.5 0 32.701 5.4 46.199 16.199 124.8 97.8 178.8 220.8 178.8 351.6 0 11.399-2.401 21-15 21z" fill={props.icon.shadow}/>
    	<g transform="translate(0 57.24)" fill={props.icon.secondaryColor}>
    		<circle cx="136" cy="286.9" r="15"/>
    		<circle cx="196" cy="316.9" r="15"/>
    		<circle cx="196" cy="256.9" r="15"/>
    	</g>
    	<g transform="translate(0 57.24)" fill={props.icon.color}>
    		<circle cx="286" cy="106.9" r="15"/>
    		<circle cx="376" cy="256.9" r="15"/>
    		<circle cx="406" cy="316.9" r="15"/>
    	</g>
    </Svg>
  );
}
