import * as React from 'react';
import Svg from 'react-native-svg';
import Icon from '../../../models/icon';

export default function FigSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <path d="m180.96 47.005-11.796-46.895-34.795-0.11c-6.545-0.03-12.341 4.199-14.339 10.438-3.513 11.064-8.244 28.694-22.034 48.3-19.643 27.921-68.297 57.28-88.026 109.67-25.746 68.249-2.727 145.49 81.83 172.87 24.613 7.989 51.371 10.878 77.363 10.878l11.796-43.754v-261.39z" fill="#aa80ff"/>
      <path d="m199.033 350.771c-9.533.94-19.586 1.4-29.868 1.38v-352.041l35.094.12c6.535.03 12.311 4.289 14.25 10.528 3.589 11.501 8.167 28.861 21.734 48.471 19.416 28.051 67.842 57.692 87.246 110.218z" fill="#8066ff"/>
      <path d="m343.45 502.18c-0.48 0.01-0.959 0.01-1.449 0.01-174.38-1.7-171.22-155.45-135.58-187.57 63.573-57.289 101.29-133.35 101.29-133.35h71.508s37.712 76.065 101.29 133.35c35.714 32.204 38.832 186.72-137.05 187.56z" fill="#f2f2e6"/>
      <path d="m343.45 502.18v-320.92h35.764s37.712 76.065 101.29 133.35c35.714 32.203 38.832 186.72-137.05 187.56z" fill="#e6e6cf"/>
      <path d="m343.477 240.093h-.03c-4.926.01-9.473 2.649-11.931 6.909-12.784 22.159-23.727 32.212-39.411 47.441-15.075 14.651-36.614 34.954-43.288 54.959-6.975 18.716-9.013 45.461 6.166 64.577 19.266 24.285 58.607 29.384 88.225 29.384h.24l27.056-94.591z" fill="#ff8066"/>
      <path d="m343.45 482c-38.732 0-91.123-7.499-119.47-43.231-22.027-27.742-23.666-65.416-11.202-99.49 10.452-28.004 31.667-48.61 54.141-70.436 16.403-15.941 25.937-24.555 37.772-45.161 6.186-10.788 11.162-22.105 14.809-33.653l0.02-0.08h23.932l14.813-18.266-14.813-11.728h-34.924c-6.545 0-12.331 4.249-14.3 10.488-3.873 12.301-6.794 23.065-15.529 38.302-9.768 16.977-17.268 23.628-32.666 38.582-21.052 20.446-50.361 48.354-62.065 83.483-16.348 45.651-10.163 92.982 16.528 126.62 33.008 41.576 91.265 54.733 142.96 54.569l14.813-18.483z" fill="#bfb3ff"/>
      <path d="m486.44 457.43c-15.978 20.126-38.392 34.913-66.621 43.951-21.994 7.049-47.595 10.618-76.074 10.618h-0.3v-29.994h0.3c38.732 0 90.864-7.499 119.21-43.231 12.601-15.867 19.056-35.963 19.056-57.499 0-13.647-2.588-27.874-7.854-41.982-10.452-28.014-31.667-48.62-54.14-70.446-5.226-5.079-10.632-10.328-15.879-15.667-7.784-7.918-15.349-18.116-21.874-29.504-6.185-10.768-11.172-22.096-14.819-33.643l-0.02-0.08h-23.982v-29.994h34.964c6.535 0 12.321 4.239 14.29 10.478l3.338 10.568c2.998 9.498 7.105 18.826 12.231 27.744 5.196 9.058 11.322 17.367 17.237 23.396 5.016 5.099 10.293 10.228 15.399 15.187 23.863 23.175 48.535 47.131 61.335 81.464 17.276 46.311 11.37 94.391-15.8 128.63z" fill="#aa80ff"/>
      <path d="m431.953 413.978c-9.643 12.148-24.352 19.486-40.41 23.795-15.958 4.299-33.236 5.579-48.095 5.589v-203.27h.03c2.468 0 4.847.66 6.905 1.85 2.068 1.2 3.817 2.939 5.056 5.069 12.021 20.846 22.074 30.614 37.293 45.401l2.059 1.989c19.216 18.676 35.794 34.783 43.228 54.759 7.034 18.787 9.122 45.692-6.066 64.818z" fill="#ff4d4d"/>
      <ellipse cx="313.5" cy="378.76" rx="14.989" ry="14.997" fill="#f2f2e6"/>
      <ellipse cx="373.46" cy="378.76" rx="14.989" ry="14.997" fill="#e6e6cf"/>
      <path d="m349.167 335.979-5.69-17.202h-.03c-8.264.02-14.959 6.719-14.959 14.997 0 8.268 6.695 14.977 14.959 14.997h.03z" fill="#f2f2e6"/>
      <path d="m358.47 333.77c0 8.278-6.715 14.997-14.989 14.997h-0.03v-29.994h0.03c8.274 0 14.989 6.709 14.989 14.997z" fill="#e6e6cf"/>
    </Svg>
  );
}