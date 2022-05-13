import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function AtelierSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 460 460">
      <G id="XMLID_1036_"><G fill="#606060">
        <Rect id="XMLID_1037_" x="170" y="190" width="60" height="30"/>
        <Rect id="XMLID_1038_" x="110" y="190" width="30" height="30"/>
        <Path id="XMLID_1039_" d="M230,160V50H110v110H230z M140,80h75v50h-75V80z"/></G><G fill="#404040">
        <Rect id="XMLID_1042_" x="230" y="190" width="60" height="30"/>
        <Rect id="XMLID_1043_" x="320" y="190" width="30" height="30"/>
        <Path id="XMLID_1044_" d="M350,160V50H230v110H350z M245,80h75v50h-75V80z"/>
        </G><Rect id="XMLID_1047_" x="110" y="160" width="30" height="30" fill="#E8E8E8"/>
        <Rect id="XMLID_1048_" x="170" y="160" width="60" height="30" fill="#E8E8E8"/>
        <Rect id="XMLID_1049_" x="230" y="160" width="60" height="30" fill="#BFBFBF"/>
        <Rect id="XMLID_1050_" x="320" y="160" width="30" height="30" fill="#BFBFBF"/>
        <Path id="XMLID_1051_" d="M80,50H25C11.193,50,0,61.193,0,75v305h80V50z" fill="#FFCA2B"/>
        <Path id="XMLID_1052_" d="m435 50h-55v330h80v-305c0-13.807-11.193-25-25-25z" fill="#FFAA19"/>
        <Rect id="XMLID_1053_" x="80" y="260" width="30" height="150" fill="#8F8F8F"/>
        <Rect id="XMLID_1054_" x="80" y="50" width="30" height="180" fill="#8F8F8F"/>
        <Rect id="XMLID_1055_" x="350" y="50" width="30" height="180" fill="#606060"/>
        <Rect id="XMLID_1056_" x="350" y="260" width="30" height="150" fill="#606060"/>
        <Rect id="XMLID_1057_" x="140" y="320" width="30" height="60" fill="#BFBFBF"/>
        <circle id="XMLID_1058_" cx="155" cy="395" r="15" fill="#606060"/>
        <Rect id="XMLID_1059_" x="290" y="320" width="30" height="60" fill="#A3A3A3"/><G fill="#404040">
        <circle id="XMLID_1060_" cx="305" cy="395" r="15"/>
        <Rect id="XMLID_1061_" x="80" y="230" width="30" height="30"/>
        <Rect id="XMLID_1062_" x="350" y="230" width="30" height="30"/>
        <Rect id="XMLID_1063_" x="140" y="160" width="30" height="60"/>
        </G><Rect id="XMLID_1064_" x="290" y="160" width="30" height="60" fill="#606060"/>
        <Polygon id="XMLID_1065_" points="350 220 110 220 110 320 320 320 320 290 350 290" fill="#E8E8E8"/>
        <Polygon id="XMLID_1066_" points="320 320 350 290 320 290" fill="#BFBFBF"/>
        <Rect id="XMLID_1067_" x="245" y="80" width="75" height="50" fill="#E8E8E8"/>
        <Rect id="XMLID_1068_" x="140" y="80" width="75" height="50" fill="#fff"/>
        <Rect id="XMLID_1069_" y="380" width="80" height="30" fill="#FFAA19"/>
        <Rect id="XMLID_1070_" x="380" y="380" width="80" height="30" fill="#FF6A00"/>
      </G>
    </Svg>
  );
}
