import * as React from 'react';
import Svg, { G, Path, Ellipse, Polygon, Rect, Circle, Defs } from 'react-native-svg';

export default function WoolSvgComponent(props: any) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <Path d="m379.15 346.81s60.885 10.86 60.885 33.988c0 35.492-209.38 64.526-209.38 131.21h79.785s19.896-29.039 76.898-46.247 111.85-43.02 111.85-85.503c0-67.219-85.503-79.055-85.503-79.055l-32.977-13.702-1.557 59.312z" fill="#28549C"/>
      <G opacity=".29">
        <Path d="m412.76 301.2-32.977-13.702-1.558 59.312s12.92 2.307 26.857 7.053c7.362-12.98 19.209-32.305 31.762-46.445-13.611-4.764-24.084-6.218-24.084-6.218z"/>
      </G>
      <Circle cx="221.88" cy="209.06" r="209.06" fill="#4675CF"/>
      <Path d="m330.45 221.42c-104.35 97.622-228.04 124.29-262.21 130.03 20.725 22.271 46.259 39.993 74.937 51.56 114.46-38.608 165.05-120.95 187.27-181.59z" fill="#2A8FE7"/>
      <Path d="m90.023 240.37c15.521-121.9 131.86-167.82 131.86-167.82-34.969-23.029-65.267-14.927-65.267-14.927s-108.64 66.137-111.16 196.38l44.566-13.626z" fill="#28549C" opacity=".54"/>
      <Path d="m214.28 177.99c8.53-70.667 38.787-93.42 38.787-93.42v-21.474l-38.784-6.857-18.704 31.851s-42.286 55.9-38.97 127.06l12.247 18.24 61.797-24.323-16.373-31.076z" fill="#2A8FE7"/>
      <G fill="#28549C">
        <Path d="m337.47 137.91c-120.48 148.18-299.03 171.71-299.03 171.71l-20.057-52.429s155.66-9.959 276.14-158.13l42.948 38.849z"/>
        <Path d="m430.69 203.46c-101.08-198.5-291.69-186.45-291.69-186.45-21.597 9.311-41.311 22.152-58.413 37.806 0 0 229.57-28.487 344.6 197.41h1.107c2.922-13.926 4.469-28.358 4.469-43.153-1e-3 -1.876-0.028-3.746-0.077-5.61z"/>
        <Path d="m190.32 414.94c180.6-35.78 205.76-212.33 205.76-212.33-17.135-27.11-47.37-55.062-47.37-55.062s-11.395 189.78-204.83 254.75c0 0 16.656 6.713 26.008 8.509l15.179 3.273 5.249 0.855z" opacity=".55"/>
        <Path d="m244.34 346.64 22.572-20.959c-46.32 10.647-74.595-13.051-74.595-13.051-10.778 6.637-63.575 24.182-63.575 24.182s37.704 43.077 92.639 27.914l18.348-14.177c1.595-1.233 3.134-2.537 4.611-3.909z" opacity=".47"/>
      </G>
      <Path d="m346.84 41.439c26.027 34.859 41.439 78.108 41.439 124.96 0 115.46-93.602 209.07-209.07 209.07-46.849 0-90.099-15.412-124.96-41.439 38.12 51.054 99.014 84.111 167.63 84.111 115.46 0 209.07-93.602 209.07-209.07 0-68.617-33.056-129.51-84.11-167.63z" opacity=".29"/>
    </Svg>
  );
}
