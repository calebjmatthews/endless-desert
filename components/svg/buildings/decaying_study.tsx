import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function DecayingStudySvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
    <G><G stroke-width=".92162">
    <Path d="m320.97 163.75c-16.312-16.312-27.923-38.614-33.454-61.009l-18.249-72.716c-1.6589-6.0836-7.4633-9.4014-13.27-9.4014s-11.611 3.3178-13.27 9.4005l-18.249 72.716c-5.5297 22.395-17.142 44.698-33.454 61.01-4.1482 3.8708-5.2532 9.6779-3.0423 14.931 2.2128 5.2532 7.1886 8.571 12.719 8.571h110.59c5.5297 0 10.506-3.3178 12.719-8.571 2.2091-5.2532 1.1041-11.059-3.0441-14.931z" fill="#a98e83"/>
    <Path d="m311.3 187.25h-55.297v-166.63c5.8071 0 11.611 3.3178 13.27 9.4014l18.249 72.716c5.5297 22.395 17.142 44.698 33.454 61.01 4.1482 3.8708 5.2532 9.6779 3.0423 14.931-2.2119 5.2523-7.1886 8.5701-12.718 8.5701z" fill="#967b70"/>
    <Path d="m311.3 159.6h-110.59c-22.949 0-41.473 18.524-41.473 41.473v27.649c0 7.7407 6.0818 13.824 13.824 13.824h165.89c7.7425 0 13.824-6.0836 13.824-13.824v-27.649c0-22.948-18.524-41.473-41.473-41.473z" fill="#b8a69f"/>
    <Path d="m338.95 242.54h-82.946v-82.946h55.297c22.949 0 41.473 18.524 41.473 41.473v27.649c0 7.7407-6.0818 13.824-13.824 13.824z" fill="#a98e83"/>
    <Path d="m435.72 380.79v69.121c0 7.7407-6.0818 13.824-13.824 13.824h-331.78c-7.7425 0-13.824-6.0836-13.824-13.824v-69.121l27.649-27.649h304.13z" fill="#bfb8ae"/>
    <Path d="m435.72 380.79v69.121c0 7.7407-6.0818 13.824-13.824 13.824h-165.89v-110.59h152.07z" fill="#aca49e"/>
    <Path d="m435.72 311.67v69.121h-359.43v-69.121c0-53.362 43.408-96.77 96.77-96.77h165.89c53.362 0 96.77 43.409 96.77 96.77z" fill="#cac6c1"/>
    <Path d="m435.72 311.67v69.121h-179.72v-165.89h82.946c53.362 0 96.77 43.409 96.77 96.77z" fill="#bfb8ae"/>
    <Path d="m291.39 299.78-25.715-25.438c-2.4874-2.7648-6.0818-4.1473-9.6761-4.1473s-7.1886 1.3824-9.6761 4.1464l-25.715 25.438c-21.841 21.842-33.73 50.873-33.73 81.562v68.569c0 7.7407 6.0818 13.824 13.824 13.824h110.59c7.7425 0 13.824-6.0836 13.824-13.824v-68.569c0-30.689-11.889-59.72-33.73-81.561z" fill="#714c2f"/>
    <Path d="m325.12 381.34v68.569c0 7.7407-6.0818 13.824-13.824 13.824h-55.297v-193.54c3.5943 0 7.1886 1.3824 9.6761 4.1464l25.715 25.438c21.841 21.842 33.73 50.873 33.73 81.562z" fill="#523522"/>
    <Path d="m450.46 436.08h-125.34l-13.824 27.649 41.473 27.649h125.34c7.6347 0 13.824-6.1896 13.824-13.824 0-22.905-18.568-41.473-41.473-41.473z" fill="#967b70"/>
    <Path d="m61.539 436.08c-22.905 0-41.473 18.568-41.473 41.473 0 7.6347 6.1896 13.824 13.824 13.824h125.34l41.487-27.675-13.838-27.622z" fill="#a98e83"/>
    </G><Polygon transform="matrix(.92162 0 0 .92162 20.066 20.066)" points="151 511.4 181 451.4 331 451.4 361 511.4" fill="#cac6c1"/>
    <Polygon transform="matrix(.92162 0 0 .92162 20.066 20.066)" points="256 511.4 256 451.4 331 451.4 361 511.4" fill="#bfb8ae"/>
    </G>
    </Svg>
  );
}
