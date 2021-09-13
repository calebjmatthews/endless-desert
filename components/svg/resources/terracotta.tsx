import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function TerracottaSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 460 460">
      <G id="XMLID_478_">
      	<Polygon id="XMLID_479_" points="340 20 340 94.43 230 124.43 200 20" fill="#6b4939"/>
      	<Polygon id="XMLID_481_" points="230 20 230 124.43 120 94.43 120 20" fill="#967151"/>
      	<Path id="XMLID_482_" d="m230 255-30-80.285 30-80.285h110c60 29.05 100 81.13 100 140.57l-210 20z" fill="#967151"/>
      	<Path id="XMLID_483_" d="m230 94.43v160.57l-210-20c0-59.44 40-111.52 100-140.57h110z" fill="#CB9851"/>
      	<Path id="XMLID_486_" d="M230,235h210c0,14.19-2.28,27.96-6.57,41.1l-60,183.9H230l-30-112.5L230,235z" fill="#6b4939"/>
      	<Path id="XMLID_487_" d="M230,235v225H86.57l-60-183.9C22.28,262.96,20,249.19,20,235H230z" fill="#967151"/>
      	<Polygon id="XMLID_491_" points="360 0 360 30 230 30 210 15 230 0" fill="#3C261B"/>
      	<Rect id="XMLID_493_" x="100" width="130" height="30" fill="#624950"/>
      </G>
    </Svg>
  );
}
