import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function BrickSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
    <G
       id="g1799"
       transform="matrix(0.8994939,0,0,0.8994939,26.424956,26.329041)">
    	<Polygon
       fill={props.icon.shadow}
       points="0,379.586 0,203.034 512,132.414 512,308.966 185.379,476.69 "
       id="polygon1785" />
    	<Polygon
       fill={props.icon.color}
       points="0,203.034 185.379,300.138 185.379,476.69 0,379.586 "
       id="polygon1787" />
    	<Polygon
       fill={props.icon.secondaryColor}
       points="326.621,35.31 512,132.414 185.379,300.138 0,203.034 "
       id="polygon1789" />
    	<G
       id="g1797">
    		<Ellipse
       fill={props.icon.color}
       cx="167.724"
       cy="216.276"
       rx="44.138"
       ry="22.069"
       id="ellipse1791" />
    		<Ellipse
       fill={props.icon.color}
       cx="260.414"
       cy="167.724"
       rx="44.138"
       ry="22.069"
       id="ellipse1793" />
    		<Ellipse
       fill={props.icon.color}
       cx="353.103"
       cy="119.172"
       rx="44.138"
       ry="22.069"
       id="ellipse1795" />
    	</G>
    </G>
    <G
       id="g1801"
       transform="matrix(0.8994939,0,0,0.8994939,26.424956,26.329041)">
    </G>
    <G
       id="g1803"
       transform="matrix(0.8994939,0,0,0.8994939,26.424956,26.329041)">
    </G>
    <G
       id="g1805"
       transform="matrix(0.8994939,0,0,0.8994939,26.424956,26.329041)">
    </G>
    <G
       id="g1807"
       transform="matrix(0.8994939,0,0,0.8994939,26.424956,26.329041)">
    </G>
    <G
       id="g1809"
       transform="matrix(0.8994939,0,0,0.8994939,26.424956,26.329041)">
    </G>
    <G
       id="g1811"
       transform="matrix(0.8994939,0,0,0.8994939,26.424956,26.329041)">
    </G>
    <G
       id="g1813"
       transform="matrix(0.8994939,0,0,0.8994939,26.424956,26.329041)">
    </G>
    <G
       id="g1815"
       transform="matrix(0.8994939,0,0,0.8994939,26.424956,26.329041)">
    </G>
    <G
       id="g1817"
       transform="matrix(0.8994939,0,0,0.8994939,26.424956,26.329041)">
    </G>
    <G
       id="g1819"
       transform="matrix(0.8994939,0,0,0.8994939,26.424956,26.329041)">
    </G>
    <G
       id="g1821"
       transform="matrix(0.8994939,0,0,0.8994939,26.424956,26.329041)">
    </G>
    <G
       id="g1823"
       transform="matrix(0.8994939,0,0,0.8994939,26.424956,26.329041)">
    </G>
    <G
       id="g1825"
       transform="matrix(0.8994939,0,0,0.8994939,26.424956,26.329041)">
    </G>
    <G
       id="g1827"
       transform="matrix(0.8994939,0,0,0.8994939,26.424956,26.329041)">
    </G>
    <G
       id="g1829"
       transform="matrix(0.8994939,0,0,0.8994939,26.424956,26.329041)">
    </G>
    </Svg>
  );
}
