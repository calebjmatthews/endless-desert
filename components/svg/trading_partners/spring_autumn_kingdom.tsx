import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function SpringAutumnKingdomSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="-4 0 512 512">
      <G fill={props.icon.color}>
       <Path d="m490.3 281.17h-94.113v-50.336h94.113c4.4141 0 8.6016-1.9414 11.449-5.3086 2.8516-3.3672 4.0742-7.8203 3.3438-12.172-8.7812-52.336-33.887-100.73-71.355-138.27-0.03125-0.03125-0.050781-0.0625-0.082031-0.089844-0.027344-0.03125-0.0625-0.054688-0.09375-0.085938-4.7227-4.7188-9.6289-9.2773-14.734-13.641-46.25-39.508-105.27-61.27-166.18-61.27-60.91 0-119.93 21.762-166.18 61.27-5.1094 4.3633-10.016 8.9258-14.738 13.645-0.03125 0.03125-0.0625 0.054688-0.089844 0.082032-0.027343 0.027344-0.046875 0.054687-0.074219 0.082031-37.473 37.535-62.582 85.934-71.363 138.27-0.73047 4.3516 0.49219 8.8047 3.3438 12.172 2.8516 3.3672 7.0391 5.3086 11.449 5.3086h94.117v50.336h-94.117c-4.4102 0-8.6016 1.9414-11.449 5.3086-2.8516 3.3711-4.0742 7.8203-3.3438 12.172 8.7812 52.344 33.895 100.74 71.367 138.28 0.023437 0.023438 0.046875 0.054688 0.070312 0.078125 0.027344 0.027344 0.058594 0.050782 0.082031 0.074219 4.7266 4.7266 9.6367 9.2852 14.746 13.652 46.25 39.508 105.27 61.27 166.18 61.27 60.91 0 119.93-21.762 166.18-61.27 5.1055-4.3633 10.016-8.9219 14.734-13.641 0.03125-0.03125 0.066406-0.058594 0.09375-0.085938 0.03125-0.027344 0.050781-0.0625 0.082031-0.089844 37.469-37.531 62.574-85.93 71.355-138.27 0.73047-4.3516-0.49219-8.8047-3.3438-12.172-2.8477-3.3672-7.0352-5.3086-11.449-5.3086zm-182.48-80.336v-96.91c19.926 7.2305 38.242 18.344 53.891 32.645h-14.668c-8.2812 0-15 6.7148-15 15s6.7188 15 15 15h48.199c5.6523 0 10.828-3.1797 13.383-8.2227 2.5547-5.043 2.0586-11.094-1.2891-15.652-2.8398-3.8711-5.8203-7.6133-8.9219-11.238l24.484-24.484c23.035 26.336 40.105 58.25 48.977 93.867h-164.05zm-225.41-93.863 24.484 24.484c-3.1016 3.625-6.082 7.3672-8.9219 11.238-3.3438 4.5586-3.8438 10.609-1.2891 15.652 2.5547 5.043 7.7305 8.2227 13.383 8.2227h48.199c8.2852 0 15-6.7148 15-15s-6.7148-15-15-15h-14.668c15.648-14.301 33.965-25.414 53.891-32.645v96.91h-164.05c8.8633-35.613 25.938-67.527 48.973-93.863zm115.08 204.2v96.91c-19.926-7.2305-38.242-18.344-53.895-32.645h14.672c8.2852 0 15-6.7148 15-15s-6.7148-15-15-15h-48.203c-5.6523 0-10.824 3.1797-13.379 8.2227-2.5547 5.043-2.0586 11.094 1.2852 15.648 2.8438 3.875 5.8242 7.6172 8.9258 11.246l-24.48 24.48c-23.039-26.336-40.109-58.25-48.977-93.867h164.05zm-93.859 115.07 24.48-24.48c23.215 19.852 50.949 34.016 80.984 40.996 1.1211 0.26172 2.2617 0.38672 3.3945 0.38672 3.3555 0 6.6484-1.125 9.3281-3.2539 3.582-2.8438 5.6719-7.168 5.6719-11.746v-131.98c0-8.2852-6.7148-15-15-15h-73.363v-50.336h73.363c8.2852 0 15-6.7148 15-15v-131.98c0-4.5781-2.0859-8.9023-5.668-11.746-3.5859-2.8477-8.2734-3.9062-12.727-2.8672-30.035 6.9844-57.773 21.148-80.984 40.996l-24.484-24.48c39.961-34.957 92.25-55.758 149.03-55.758s109.07 20.801 149.03 55.758l-24.484 24.48c-23.215-19.848-50.949-34.012-80.98-40.992-4.457-1.0391-9.1445 0.019531-12.727 2.8633s-5.6719 7.1719-5.6719 11.746v131.98c0 8.2852 6.7148 15 15 15h73.367v50.336h-73.367c-8.2852 0-15.004 6.7148-15.004 15v131.98c0 4.5781 2.0898 8.9023 5.6719 11.746 2.6797 2.1289 5.9766 3.2539 9.332 3.2539 1.1289 0 2.2695-0.125 3.3945-0.38672 30.035-6.9805 57.773-21.145 80.984-40.996l24.484 24.48c-39.961 34.957-92.25 55.758-149.03 55.758s-109.07-20.801-149.03-55.758zm319.27-21.211-24.484-24.48c3.1016-3.6289 6.082-7.3711 8.9219-11.242 3.3477-4.5586 3.8438-10.609 1.2891-15.652-2.5547-5.043-7.7305-8.2227-13.383-8.2227h-48.199c-8.2812 0-15 6.7148-15 15s6.7188 15 15 15h14.668c-15.648 14.301-33.965 25.414-53.895 32.648v-96.914h164.06c-8.8711 35.613-25.941 67.527-48.977 93.863z" fill={props.icon.color} />
      </G>
    </Svg>
  );
}
