import * as React from 'react';
import Svg from 'react-native-svg';
import Icon from '../../models/icon';

export default function CharcoalSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 310 310">
    	<path d="m309.26 225.28-46.604-142.96c-0.56-1.717-1.432-3.285-2.531-4.669-1.512-1.902-3.465-3.443-5.742-4.436l-121.58-52.941c-2.719-1.184-5.676-1.514-8.506-1.032-2.162 0.368-4.252 1.209-6.105 2.512l-111.82 78.559c-3.997 2.808-6.377 7.387-6.377 12.273v122.39c0 6.253 3.879 11.85 9.733 14.045l109.3 40.988c0.623 0.233 1.261 0.409 1.903 0.558 1.105 0.255 2.232 0.397 3.363 0.397 1.312 0 2.625-0.172 3.905-0.518l170.7-46.035c3.972-1.07 7.328-3.725 9.286-7.342 1.959-3.617 2.346-7.879 1.072-11.789z" fill="#222224"/>
    	<path d="m254.38 73.219-121.58-52.942c-2.719-1.184-5.676-1.514-8.506-1.032l27.667 144.03 108.16-85.62c-1.512-1.902-3.465-3.443-5.742-4.435z" fill="#403F44"/>
    	<path d="m309.26 225.28-46.604-142.96c-0.56-1.717-1.432-3.285-2.531-4.669l-108.16 85.62-31.036 127.3c1.105 0.255 2.232 0.397 3.363 0.397 1.312 0 2.625-0.172 3.905-0.518l170.7-46.035c3.972-1.07 7.328-3.725 9.286-7.342 1.958-3.616 2.345-7.878 1.071-11.788z" fill="#313133"/>
    </Svg>

  );
}
