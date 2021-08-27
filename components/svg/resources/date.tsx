import * as React from 'react';
import Svg from 'react-native-svg';
import Icon from '../../../models/icon';

export default function DateSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <path d="m262.257 18.552-6.257-18.552h-.14c-8.22.08-14.86 6.77-14.86 15v7.88c-25.27 21.76-62.02 27.29-62.41 27.35-8.18 1.16-13.88 8.74-12.73 16.93 1.05 7.5 7.47 12.92 14.83 12.92 4.04 0 33.44-5.19 60.31-20.7v110.89c-19.17 40.47-64.19 56.15-65.02 56.43-7.85 2.61-12.11 11.08-9.52 18.93 2.6 7.87 11.08 12.15 18.95 9.55 1.71-.56 30.3-10.25 55.59-34.7v97.77c0 8.23 6.64 14.92 14.86 15h.14c2.236 0 4.35-.503 6.257-1.382z" fill="#c7e62e"/>
      <path d="m345.54 245.63c-2.08 6.31-7.95 10.31-14.25 10.31-8.2 0-38.78-14.67-60.29-35.46v97.77c0 8.28-6.72 15-15 15h-.14v-333.25h.14c8.28 0 15 6.72 15 15v7.89c25.41 21.91 61.99 27.28 62.38 27.33 8.2 1.16 13.92 8.74 12.76 16.94-1.05 7.5-7.47 12.92-14.83 12.92-.7 0-1.4-.05-2.11-.15-1.58-.22-30.3-4.44-58.2-20.55v110.89c19.38 40.97 64.52 56.27 64.99 56.42 7.86 2.6 12.14 11.08 9.55 18.94z" fill="#95cc29"/>
      <g fill="#995c5c">
       <path d="m191.06 314.67c-5.27 9.65-11.48 18.42-18.07 25.26-14.45 15.01-52.27 48.89-92 40.3-1.36-.16-3.02.55-4.19 1.2-11.678 6.455-24.691 4.919-33.19-3.58-8.58-8.58-9.99-21.61-3.59-33.2.65-1.17 1.37-2.83 1.2-4.2-5.83-27.06 8.09-59.83 38.27-90.01 13.51-13.5 36.11-26.1 57.59-32.1 20.68-5.77 40.95-1.29 54.24 11.99 15.301 15.313 22.654 42.301-.26 84.34z"/>
       <path d="m272.51 356.054-16.46-52.804h-.05c-18.79 0-36.29 11.16-46.83 29.87-10.95 19.43-18.02 44.32-18.02 63.42 0 42.68 13.33 75.7 36.58 90.71 1.09.85 1.75 2.53 2.12 3.81 3.67 12.72 13.88 20.94 26.02 20.94h.18l16.46-31.876z"/>
       <path d="m203.43 108.26c-5.646 20.986-17.403 42.259-30.44 55.81-14.45 15.01-52.27 48.89-92 40.3-1.36-.17-3.02.55-4.19 1.2-11.678 6.455-24.691 4.919-33.19-3.58-8.58-8.58-9.99-21.61-3.59-33.2.65-1.17 1.37-2.83 1.2-4.2-5.83-27.06 8.09-59.83 38.27-90.01 13.51-13.5 36.11-26.1 57.59-32.1 43.718-12.198 78.232 21.783 66.35 65.78z"/>
      </g>
      <g fill="#804040">
       <path d="m468.39 377.85c-8.423 8.423-21.414 10.09-33.19 3.58-1.17-.65-2.84-1.37-4.19-1.2-4.36.94-8.7 1.37-12.99 1.37-34.76 0-66.15-28.31-79.01-41.67-19.235-19.965-51.343-76.587-18.33-109.6 13.28-13.28 33.56-17.77 54.24-11.99 21.48 6 44.09 18.6 57.59 32.1 30.18 30.18 44.1 62.96 38.27 90.01-.17 1.37.55 3.03 1.2 4.2 6.4 11.59 4.99 24.62-3.59 33.2z"/>
       <path d="m468.39 201.99c-8.423 8.423-21.414 10.09-33.19 3.58-1.17-.65-2.84-1.37-4.19-1.2-39.72 8.59-77.55-25.29-92-40.3-13.18-13.69-24.85-35.07-30.44-55.81-11.879-43.986 22.632-77.999 66.35-65.78 21.48 6 44.09 18.6 57.59 32.1 30.18 30.18 44.1 62.95 38.27 90.01-.17 1.37.55 3.03 1.2 4.2 6.4 11.59 4.99 24.62-3.59 33.2z"/>
       <path d="m283.98 487.25c-1.08.85-1.74 2.53-2.11 3.81-3.65 12.66-13.78 20.86-25.82 20.94v-208.75c18.55.02 35.96 11.03 46.55 29.46 10.71 18.62 17.58 42 17.94 60.99.39 20.84-2.4 71.54-36.56 93.55z"/>
      </g>
    </Svg>
  );
}
