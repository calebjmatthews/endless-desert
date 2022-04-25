import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function SlabSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 460 460">
      <G id="XMLID_14_">
      	<Path id="XMLID_15_" d="M230,0c127.03,0,230,102.97,230,230S357.03,460,230,460l-50-230L230,0z" fill="#c96e2c"/>
      	<Path id="XMLID_16_" d="m230 30c110.46 0 200 89.54 200 200s-89.54 200-200 200l-30-200 30-200z" fill="#4d4d4d"/>
      	<Path id="XMLID_17_" d="M230,460C102.97,460,0,357.03,0,230S102.97,0,230,0V460z" fill="#d98a65"/>
      	<Path id="XMLID_18_" d="M230,30v400c-110.46,0-200-89.54-200-200S119.54,30,230,30z" fill="#666"/>
      	<Path id="XMLID_19_" d="m230 155-30 75 30 75c41.355 0 75-33.645 75-75s-33.645-75-75-75z" fill="#804215"/>
      	<Path id="XMLID_20_" d="m155 230c0 41.355 33.645 75 75 75v-150c-41.355 0-75 33.645-75 75z" fill="#c96e2c"/>
      	<Path id="XMLID_21_" d="m230 185-30 45 30 45c24.853 0 45-20.147 45-45s-20.147-45-45-45z" fill="#c96e2c"/>
      	<Path id="XMLID_22_" d="m185 230c0 24.853 20.147 45 45 45v-90c-24.853 0-45 20.147-45 45z" fill="#d98a65"/>
      	<Path id="XMLID_23_" d="m230 60-10 20 10 20c11.046 0 20-8.954 20-20s-8.954-20-20-20z" fill="#ce6112"/><G fill="#d98a65">
      	<Path id="XMLID_24_" d="m210 80c0 11.046 8.954 20 20 20v-40c-11.046 0-20 8.954-20 20z"/>
      	<Circle id="XMLID_25_" cx="155" cy="100.1" r="20"/>
      	<Circle id="XMLID_26_" cx="100.1" cy="155" r="20"/>
      	<Circle id="XMLID_27_" cx="80" cy="230" r="20"/>
      	<Circle id="XMLID_28_" cx="100.1" cy="305" r="20"/>
      	<Circle id="XMLID_29_" cx="155" cy="359.9" r="20"/>
      	</G><Path id="XMLID_30_" d="m230 360-10 20 10 20c11.046 0 20-8.954 20-20s-8.954-20-20-20z" fill="#ce6112"/>
      	<Path id="XMLID_31_" d="m210 380c0 11.046 8.954 20 20 20v-40c-11.046 0-20 8.954-20 20z" fill="#d98a65"/><G fill="#ce6112">
      	<Circle id="XMLID_71_" cx="305" cy="359.9" r="20"/>
      	<Circle id="XMLID_85_" cx="359.9" cy="305" r="20"/>
      	<Circle id="XMLID_86_" cx="380" cy="230" r="20"/>
      	<Circle id="XMLID_87_" cx="359.9" cy="155" r="20"/>
      	<Circle id="XMLID_88_" cx="305" cy="100.1" r="20"/>
      </G></G>
    </Svg>
  );
}
