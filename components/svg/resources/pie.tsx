import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function PieSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 64 64">
      <Defs>
       <filter id="filter20194" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
       <filter id="filter20198" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
       <filter id="filter20202" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
       <filter id="filter20206" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
       <filter id="filter20210" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
       <filter id="filter20214" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
       <filter id="filter20218" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
       <filter id="filter20222" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
       <filter id="filter20226" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
       <filter id="filter20230" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
       <filter id="filter20234" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
       <filter id="filter20238" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
       <filter id="filter20242" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
       <filter id="filter20246" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
       <filter id="filter20250" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
       <filter id="filter20254" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
       <filter id="filter20258" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
       <filter id="filter20262" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
       <filter id="filter20266" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
       <filter id="filter20270" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
       <filter id="filter20274" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
       <filter id="filter20278" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
       <filter id="filter20282" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
       <filter id="filter20286" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
       <filter id="filter20290" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
       <filter id="filter20294" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
       <filter id="filter20298" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
       <filter id="filter20302" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
       <filter id="filter20306" colorInterpolationFilters="sRGB">
        <feColorMatrix values="1.155 0 0 -0.110085 -0.0775 0 1.155 0 -0.110085 -0.0775 0 0 1.155 -0.110085 -0.0775 0 0 0 1 0"/>
       </filter>
      </Defs>
      <Path d="m56.22 45.631c.04.141 0 .25-.05.33-.04.07-.11.16-.25.19-1.51.41-2.89 1.34-3.92 2.569v-4.72h3.99c.01.551.09 1.101.23 1.631z" fill="#efb381" filter="url(#filter20306)"/>
      <Path d="m59.09 36.001c-1.37-2.38-1.37-5.61 0-8 .101-.18.22-.37.34-.54.08-.11.08-.229.061-.31-.01-.08-.05-.19-.17-.28-2.13-1.49-3.41-4.24-3.33-6.87.01-.56.09-1.11.229-1.64.04-.141 0-.25-.05-.32-.04-.07-.11-.16-.25-.2-1.5-.399-2.88-1.34-3.92-2.56-1.05-1.24-1.76-2.79-1.9-4.38-.02-.23-.239-.391-.42-.391-.239.021-.439.03-.64.03-1.79 0-3.61-.7-5.04-1.83-.94-.75-1.73-1.68-2.21-2.729-.12-.261-.39-.28-.56-.2-.95.439-2.061.68-3.2.68-.69 0-1.37-.08-2.03-.25-1.43-.34-2.74-1.05-3.7-2.01-.2-.2-.399-.2-.6 0-.96.96-2.271 1.66-3.7 2-.66.17-1.34.26-2.03.26-1.14 0-2.239-.24-3.2-.689-.17-.08-.439-.051-.56.21-.49 1.05-1.27 1.979-2.22 2.71-1.601 1.279-3.681 2-5.63 1.819-.221 0-.44.16-.46.391-.141 1.59-.851 3.14-1.9 4.38-1.04 1.22-2.42 2.16-3.92 2.56-.14.03-.21.13-.26.2-.04.07-.08.18-.04.32.14.529.22 1.08.229 1.64.08 2.63-1.2 5.38-3.33 6.87-.12.09-.16.2-.17.28-.02.08-.02.199.061.319.12.17.229.351.34.53 1.37 2.38 1.37 5.62 0 8-.11.18-.22.36-.34.53-.08.109-.08.229-.061.319.01.08.05.19.17.271 2.13 1.5 3.42 4.25 3.33 6.88-.01.55-.09 1.1-.229 1.63-.04.141 0 .25.05.33.04.07.11.16.25.2 1.5.4 2.88 1.34 3.92 2.56 1.06 1.24 1.76 2.79 1.9 4.38.02.23.239.391.43.391.229-.021.43-.03.64-.03 1.78 0 3.59.69 5.021 1.83.95.74 1.729 1.68 2.22 2.73.12.26.4.279.57.199.95-.439 2.06-.68 3.2-.68.689 0 1.369.08 2.02.25 1.43.34 2.74 1.04 3.7 2 .2.2.399.2.6 0 .96-.96 2.271-1.66 3.7-2 .66-.17 1.34-.25 2.03-.25 1.14 0 2.239.23 3.2.68.17.08.439.061.56-.21.49-1.05 1.27-1.989 2.22-2.72 1.601-1.26 3.67-1.979 5.63-1.81.221 0 .44-.15.46-.391.141-1.58.841-3.12 1.9-4.37 1.03-1.229 2.41-2.159 3.92-2.569.14-.03.21-.12.25-.19.05-.08.09-.189.05-.33-.14-.53-.22-1.08-.229-1.63-.09-2.63 1.2-5.38 3.33-6.88.12-.08.16-.19.17-.28.02-.08.02-.2-.061-.31-.121-.17-.231-.35-.341-.53zm1.95-11.58c1.54 1.08 1.93 3.22.84 4.771-1.08 1.54-1.08 4.069 0 5.609 1.09 1.55.7 3.7-.84 4.78s-2.41 3.45-1.92 5.28c.49 1.819-.601 3.71-2.42 4.189-1.83.49-3.45 2.431-3.61 4.311-.17 1.87-1.84 3.279-3.72 3.109s-4.07 1.101-4.86 2.811c-.8 1.71-2.85 2.45-4.55 1.66-1.71-.801-4.2-.36-5.54.97-1.33 1.34-3.51 1.34-4.84 0-1.33-1.33-3.82-1.771-5.53-.97-1.71.8-3.76.05-4.56-1.66-.79-1.71-2.98-2.97-4.86-2.811-1.88.17-3.55-1.229-3.72-3.109-.16-1.88-1.78-3.82-3.61-4.311-1.819-.479-2.91-2.37-2.42-4.189.49-1.82-.38-4.2-1.92-5.28s-1.93-3.23-.84-4.78c1.08-1.54 1.08-4.069 0-5.609-1.09-1.551-.7-3.69.84-4.771 1.54-1.09 2.41-3.46 1.92-5.28-.49-1.819.601-3.71 2.42-4.199 1.83-.48 3.45-2.42 3.61-4.301.17-1.88 1.84-3.279 3.72-3.119 1.88.17 4.07-1.101 4.86-2.811.8-1.71 2.85-2.45 4.55-1.66 1.71.8 4.2.36 5.54-.97 1.33-1.33 3.51-1.33 4.85 0 1.33 1.34 3.82 1.78 5.53.98 1.7-.801 3.75-.051 4.55 1.659s2.98 2.971 4.86 2.811c1.88-.17 3.55 1.229 3.72 3.109.16 1.881 1.78 3.82 3.61 4.301 1.819.489 2.91 2.38 2.42 4.199-.49 1.821.38 4.201 1.92 5.281z" fill="#ffd2a6" filter="url(#filter20302)"/>
      <Path d="m59.49 27.151c.02.08.02.199-.061.31-.12.17-.239.36-.34.54h-7.089v-8h3.99c-.08 2.63 1.2 5.38 3.33 6.87.12.09.16.2.17.28z" fill={props.icon.color} filter="url(#filter20298)"/>
      <Path d="m59.43 36.531c.08.109.08.229.061.31-.01.09-.05.2-.17.28-2.13 1.5-3.42 4.25-3.33 6.88h-3.991v-8h7.09c.11.18.22.36.34.53z" fill={props.icon.color} filter="url(#filter20294)"/>
      <Path d="m52 28.001h7.09c-1.37 2.39-1.37 5.62 0 8h-7.09z" fill="#efb381" filter="url(#filter20290)"/>
      <Path d="m56.17 18.041c.05.07.09.18.05.32-.14.529-.22 1.08-.229 1.64h-3.991v-4.72c1.04 1.22 2.42 2.16 3.92 2.56.14.04.21.13.25.2z" fill="#efb381" filter="url(#filter20286)"/>
      <Path d="m50.1 10.901c.141 1.59.851 3.14 1.9 4.38v4.72 8 8 8 4.72c-1.06 1.25-1.76 2.79-1.9 4.37-.02.24-.239.391-.46.391-1.96-.17-4.029.55-5.63 1.81l-.01-.011v-3.28-8-8-8-8-8-3.29c1.43 1.13 3.25 1.83 5.04 1.83.2 0 .4-.01.64-.03.18 0 .4.16.42.39z" fill="#f7c292" filter="url(#filter20282)"/>
      <Path d="m44 55.281.01.01c-.95.73-1.729 1.67-2.22 2.72-.12.271-.39.29-.56.21-.961-.449-2.061-.68-3.2-.68-.69 0-1.37.08-2.03.25v-.01-5.78h8z" fill={props.icon.color} filter="url(#filter20278)"/>
      <Path d="m36 44.001h8v8h-8z" fill="#efb381" filter="url(#filter20274)"/>
      <Path d="m36 36.001h8v8h-8z" fill={props.icon.color} filter="url(#filter20270)"/>
      <Path d="m36 28.001h8v8h-8z" fill="#efb381" filter="url(#filter20266)"/>
      <Path d="m36 20.001h8v8h-8z" fill={props.icon.color} filter="url(#filter20262)"/>
      <Path d="m36 12.001h8v8h-8z" fill="#efb381" filter="url(#filter20258)"/>
      <Path d="m44 8.711v3.29h-8v-5.79c.66.17 1.34.25 2.03.25 1.14 0 2.25-.24 3.2-.68.17-.08.439-.061.56.2.48 1.05 1.27 1.98 2.21 2.73z" fill={props.icon.color} filter="url(#filter20254)"/>
      <Path d="m36 57.781v0.01c-1.43 0.34-2.74 1.04-3.7 2-0.2 0.2-0.399 0.2-0.6 0-0.96-0.96-2.271-1.66-3.7-2v-51.59c1.43-0.34 2.74-1.04 3.7-2 0.2-0.2 0.399-0.2 0.6 0 0.96 0.96 2.271 1.67 3.7 2.01v45.79z" fill="#f7c292" filter="url(#filter20250)"/>
      <Path d="m28 57.781v.01c-.65-.17-1.33-.25-2.02-.25-1.141 0-2.25.24-3.2.68-.17.08-.45.061-.57-.199-.49-1.051-1.27-1.99-2.22-2.73l.01-.01v-3.28h8z" fill={props.icon.color} filter="url(#filter20246)"/>
      <Path d="m20 44.001h8v8h-8z" fill="#efb381" filter="url(#filter20242)"/>
      <Path d="m20 36.001h8v8h-8z" fill={props.icon.color} filter="url(#filter20238)"/>
      <Path d="m20 28.001h8v8h-8z" fill="#efb381" filter="url(#filter20234)"/>
      <Path d="m20 20.001h8v8h-8z" fill={props.icon.color} filter="url(#filter20230)"/>
      <Path d="m20 12.001h8v8h-8z" fill="#efb381" filter="url(#filter20226)"/>
      <Path d="m28 6.211v5.79h-8v-3.3l-.01-.01c.95-.73 1.729-1.66 2.22-2.71.12-.261.39-.29.56-.21.961.449 2.061.689 3.2.689.69 0 1.37-.09 2.03-.26z" fill={props.icon.color} filter="url(#filter20222)"/>
      <Path d="m20 52.001v3.28l-.01.01c-1.431-1.14-3.24-1.83-5.021-1.83-.21 0-.41.01-.64.03-.19 0-.41-.16-.43-.391-.141-1.59-.841-3.14-1.9-4.38v-4.72-8-8-8-4.72c1.05-1.24 1.76-2.79 1.9-4.38.02-.23.239-.391.46-.391 1.949.181 4.029-.54 5.63-1.819l.011.011v3.3 8 8 8 8z" fill="#f7c292" filter="url(#filter20218)"/>
      <Path d="m12 44.001v4.72c-1.04-1.22-2.42-2.159-3.92-2.56-.14-.04-.21-.13-.25-.2-.05-.08-.09-.189-.05-.33.14-.53.22-1.08.229-1.63z" fill="#efb381" filter="url(#filter20214)"/>
      <Path d="m12 36.001v8h-3.99c.09-2.63-1.2-5.38-3.33-6.88-.12-.08-.16-.19-.17-.271-.02-.09-.02-.21.061-.319.12-.17.229-.351.34-.53z" fill={props.icon.color} filter="url(#filter20210)"/>
      <Path d="m12 28.001v8h-7.09c1.37-2.38 1.37-5.62 0-8z" fill="#efb381" filter="url(#filter20206)"/>
      <Path d="m12 20.001v8h-7.09c-.11-.18-.22-.36-.34-.53-.08-.12-.08-.239-.061-.319.01-.08.05-.19.17-.28 2.13-1.49 3.41-4.24 3.33-6.87h3.991z" fill={props.icon.color} filter="url(#filter20202)"/>
      <Path d="m12 15.281v4.72h-3.99c-.01-.56-.09-1.11-.229-1.64-.04-.141 0-.25.04-.32.05-.07.12-.17.26-.2 1.499-.4 2.879-1.34 3.919-2.56z" fill="#efb381" filter="url(#filter20198)"/>
      <Rect x="31.969" y=".2933" width="31.676" height="63.352" fill="#fff" fillOpacity=".22177" filter="url(#filter20194)" strokeWidth=".074035"/>
    </Svg>
  );
}
