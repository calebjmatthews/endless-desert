import * as React from 'react';
import Svg from 'react-native-svg';
import Icon from '../../../models/icon';

export default function HutSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <g transform="matrix(.87258 0 0 .87258 32.621 32.621)">
       <path d="m448.8 479.87h-128.53c-8.284 0-15-6.716-15-15v-81.4h-98.533v81.4c0 8.284-6.716 15-15 15h-128.53c-8.284 0-15-6.716-15-15v-112.47c0-8.284 6.716-15 15-15h58.053l59.874-59.873c2.813-2.813 6.628-4.394 10.606-4.394h128.53c3.978 0 7.793 1.581 10.606 4.394l59.874 59.873h58.054c8.284 0 15 6.716 15 15v112.47c0 8.284-6.716 15-15 15z" fill="#b45a1e"/>
       <path d="m305.27 464.87c0 8.284 6.716 15 15 15h128.53c8.284 0 15-6.716 15-15v-112.47c0-8.284-6.716-15-15-15h-58.053l-59.874-59.873c-2.813-2.813-6.628-4.394-10.606-4.394h-64.267v110.33h49.267z" fill="#964614"/>
       <path d="m320.27 479.87h-128.53c-8.284 0-15-6.716-15-15v-96.4c0-8.284 6.716-15 15-15h128.53c8.284 0 15 6.716 15 15v96.4c1e-3 8.284-6.715 15-14.999 15z" fill="#78320a"/>
       <path d="m335.27 464.87v-96.4c0-8.284-6.716-15-15-15h-64.267v126.4h64.267c8.284 0 15-6.716 15-15z" fill="#5a1e00"/>
       <path d="m497 367.4h-112.47c-3.978 0-7.793-1.581-10.606-4.394l-59.874-59.873h-116.11l-59.874 59.873c-2.813 2.813-6.628 4.394-10.606 4.394h-112.47c-5.749 0-10.992-3.286-13.499-8.458-2.507-5.173-1.837-11.324 1.725-15.836l241-305.27c2.845-3.603 7.183-5.705 11.773-5.705s8.929 2.102 11.773 5.705l241 305.27c3.562 4.512 4.232 10.663 1.725 15.836-2.505 5.172-7.749 8.458-13.497 8.458z" fill="#ffe37f"/>
       <path d="m373.93 363.01c2.813 2.813 6.628 4.394 10.606 4.394h112.47c5.749 0 10.992-3.286 13.499-8.458 2.507-5.173 1.837-11.324-1.725-15.836l-241-305.27c-2.845-3.603-7.183-5.705-11.773-5.705v271h58.053z" fill="#ffc63f"/>
      </g>
    </Svg>
  );
}
