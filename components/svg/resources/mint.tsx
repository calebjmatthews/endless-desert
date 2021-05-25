import * as React from 'react';
import Svg from 'react-native-svg';
import Icon from '../../../models/icon';

export default function MintSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
    <defs>
     <filter id="filter14192" colorInterpolationFilters="sRGB">
      <feColorMatrix result="color1" type="hueRotate" values="9"/>
      <feColorMatrix result="color2" type="saturate" values="1"/>
     </filter>
    </defs>
    <g filter="url(#filter14192)">
     <path d="m135.341 204.606c.748-.748 1.743-1.16 2.802-1.16 1.105 0 2.128.443 2.88 1.247 4.774 5.109 9.234 10.611 13.256 16.353 1.125 1.605 2.961 2.564 4.912 2.564 1.579 0 3.065-.617 4.186-1.738l9.846-9.845c.748-.749 1.744-1.161 2.804-1.161 1.104 0 2.124.442 2.873 1.245 8.448 9.054 15.71 19.164 21.586 30.047 1.033 1.913 3.032 3.102 5.217 3.102 1.587 0 3.08-.62 4.205-1.746l4.65-4.65c.75-.749 1.746-1.162 2.807-1.162 1.104 0 2.121.442 2.866 1.246 18.207 19.629 30.235 44.584 34.784 72.167h1.973c4.549-27.583 16.577-52.538 34.784-72.167.745-.803 1.763-1.246 2.866-1.246 1.061 0 2.057.413 2.807 1.162l4.65 4.65c1.125 1.125 2.618 1.746 4.205 1.746 2.185 0 4.184-1.188 5.217-3.102 5.876-10.883 13.138-20.993 21.586-30.047.749-.803 1.77-1.245 2.873-1.245 1.06 0 2.056.412 2.804 1.161l9.846 9.845c1.12 1.121 2.606 1.738 4.186 1.738 1.951 0 3.788-.959 4.912-2.564 4.021-5.742 8.481-11.244 13.256-16.353.752-.804 1.774-1.247 2.88-1.247 1.059 0 2.054.412 2.802 1.16l.544.544c2.791-10.032 4.454-20.441 4.856-31.126.105-2.793-2.157-5.107-4.952-5.107h-6.576c-3.3 0-5.69-3.173-4.745-6.335 3.511-11.749 5.584-24.061 6.024-36.762.097-2.793-2.159-5.109-4.954-5.109h-13.924c-3.093 0-5.4-2.799-4.864-5.844 1.209-6.866 1.961-13.902 2.204-21.076.095-2.795-2.158-5.113-4.955-5.113h-16.993c-2.451 0-4.517-1.797-4.888-4.22-5.899-38.537-31.696-69.97-65.817-81.983-1.046-.368-2.194-.368-3.239 0-34.121 12.013-59.918 43.446-65.817 81.983-.371 2.423-2.437 4.22-4.888 4.22h-16.993c-2.797 0-5.05 2.318-4.955 5.113.243 7.174.995 14.21 2.204 21.076.536 3.046-1.771 5.844-4.864 5.844h-13.924c-2.795 0-5.051 2.315-4.954 5.109.44 12.7 2.514 25.013 6.024 36.762.945 3.162-1.445 6.335-4.745 6.335h-6.576c-2.795 0-5.057 2.315-4.952 5.107.402 10.685 2.065 21.094 4.856 31.126z" fill="#02905d"/>
     <path d="m135.341 204.606c.748-.748 1.743-1.16 2.802-1.16 1.105 0 2.128.443 2.88 1.247 4.774 5.109 9.234 10.611 13.256 16.353 1.125 1.605 2.961 2.564 4.912 2.564 1.579 0 3.065-.617 4.186-1.738l9.846-9.845c.748-.749 1.744-1.161 2.804-1.161 1.104 0 2.124.442 2.873 1.245.507.543.995 1.102 1.493 1.652-4.431-12.641-7.044-25.962-7.562-39.74-.105-2.793 2.157-5.107 4.952-5.107h6.576c3.3 0 5.69-3.173 4.745-6.335-3.511-11.749-5.584-24.061-6.024-36.762-.097-2.793 2.159-5.109 4.954-5.109h13.924c3.093 0 5.4-2.799 4.864-5.844-1.209-6.866-1.961-13.902-2.204-21.076-.095-2.795 2.158-5.113 4.955-5.113h16.993c2.451 0 4.517-1.797 4.888-4.22 4.69-30.638 21.965-56.774 45.993-72.243-6.194-3.988-12.831-7.278-19.824-9.74-1.046-.368-2.194-.368-3.239 0-34.121 12.013-59.918 43.446-65.817 81.983-.371 2.423-2.437 4.22-4.888 4.22h-16.993c-2.797 0-5.05 2.318-4.955 5.113.243 7.174.995 14.21 2.204 21.076.536 3.045-1.771 5.844-4.864 5.844h-13.924c-2.795 0-5.051 2.315-4.954 5.109.44 12.7 2.514 25.013 6.024 36.762.945 3.162-1.445 6.335-4.745 6.335h-6.576c-2.795 0-5.057 2.314-4.952 5.107.402 10.685 2.065 21.094 4.856 31.126z" fill="#017b4e"/>
     <path d="m248.5 218.96v66.892c2.889 8.104 5.077 16.554 6.514 25.267h1.973c1.437-8.714 3.625-17.163 6.514-25.267v-115.32c23.574-3.622 41.686-24.043 41.686-48.615 0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5c0 16.273-11.433 29.918-26.686 33.347v-91.487c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v48.513c-11.772-3.286-20.437-14.099-20.437-26.905 0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5c0 21.116 15.327 38.707 35.437 42.267v76.21c-24.379-3.32-43.141-22.566-43.141-45.742 0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5c-1e-3 31.405 25.466 57.354 58.14 60.839z" fill="#026841"/>
     <path d="m256.53 314.395c-4.017-28.341-15.79-54.804-35.568-76.127-1.901-2.049-5.137-2.086-7.113-.11l-4.65 4.65c-2.334 2.334-6.267 1.78-7.835-1.124-5.825-10.79-13.065-20.963-21.735-30.254-1.907-2.044-5.139-2.086-7.115-.109l-9.845 9.846c-2.187 2.187-5.798 1.839-7.572-.694-4-5.71-8.443-11.217-13.344-16.462-1.909-2.043-5.142-2.089-7.119-.112l-12.016 12.016c-1.733 1.733-4.465 1.923-6.44.472-31.421-23.078-71.889-27.064-104.511-11.431-1 .479-1.812 1.291-2.291 2.291-15.633 32.622-11.648 73.09 11.431 104.511 1.451 1.975 1.26 4.707-.472 6.44l-12.016 12.015c-1.977 1.977-1.932 5.21.112 7.119 5.245 4.901 10.752 9.345 16.462 13.344 2.533 1.774 2.88 5.385.694 7.572l-9.846 9.846c-1.976 1.976-1.934 5.209.109 7.115 9.292 8.669 19.464 15.909 30.254 21.735 2.904 1.568 3.458 5.501 1.124 7.835l-4.65 4.65c-1.976 1.976-1.939 5.212.11 7.113 49.012 45.46 125.175 48.647 188.894 12.501.783-.444 1.437-1.097 1.881-1.881 12.207-21.52 19.922-44.458 23.043-67.291-2.107-15.423-2.092-30.734.024-45.476z" fill="#09a76d"/>
     <path d="m219.598 425.784c-52.173 14.188-106.47 4.37-144.458-30.865-2.049-1.901-2.086-5.137-.11-7.113l4.65-4.65c2.334-2.334 1.78-6.267-1.124-7.835-10.79-5.825-20.963-13.065-30.254-21.735-2.043-1.907-2.086-5.139-.109-7.115l9.846-9.846c2.187-2.187 1.839-5.797-.694-7.572-5.71-4-11.217-8.443-16.462-13.344-2.043-1.909-2.089-5.142-.112-7.119l1.36-1.36c-.278-.265-.561-.522-.833-.794-2.929-2.929-2.929-7.678.001-10.606 2.929-2.929 7.678-2.929 10.606 0 .272.272.553.532.833.794l.048-.048c1.733-1.733 1.923-4.465.472-6.44-20.483-27.887-25.912-62.897-15.948-93.227-8.862 1.465-17.497 4.145-25.643 8.049-1 .479-1.811 1.291-2.29 2.291-15.633 32.622-11.648 73.09 11.431 104.511 1.451 1.975 1.26 4.707-.472 6.44l-12.017 12.013c-1.977 1.977-1.931 5.21.112 7.119 5.245 4.901 10.752 9.345 16.462 13.344 2.533 1.774 2.88 5.385.694 7.572l-9.846 9.846c-1.976 1.976-1.934 5.209.109 7.115 9.292 8.669 19.464 15.909 30.254 21.735 2.904 1.568 3.458 5.501 1.124 7.835l-4.65 4.65c-1.976 1.976-1.939 5.212.11 7.113 47.573 44.125 120.724 48.42 183.248 15.581z" fill="#02905d"/>
     <path d="m310.635 241.684c5.825-10.79 13.065-20.963 21.735-30.254 1.907-2.044 5.139-2.086 7.115-.109l9.846 9.846c2.187 2.187 5.798 1.839 7.572-.694 4-5.71 8.443-11.217 13.344-16.462 1.909-2.043 5.142-2.089 7.119-.112l12.016 12.016c1.733 1.733 4.465 1.923 6.44.472 31.421-23.078 71.889-27.064 104.511-11.431 1 .479 1.811 1.291 2.29 2.29 15.633 32.622 11.648 73.09-11.431 104.511-1.451 1.975-1.261 4.707.472 6.44l12.016 12.016c1.977 1.977 1.932 5.21-.112 7.119-5.245 4.901-10.752 9.345-16.462 13.344-2.533 1.774-2.88 5.385-.694 7.572l9.846 9.846c1.976 1.976 1.934 5.209-.109 7.115-9.292 8.669-19.464 15.909-30.254 21.735-2.904 1.568-3.458 5.501-1.124 7.835l4.65 4.65c1.976 1.976 1.939 5.212-.11 7.113-49.012 45.46-125.175 48.647-188.894 12.501-.784-.444-1.436-1.097-1.881-1.881-36.146-63.719-32.959-139.882 12.501-188.894 1.901-2.049 5.137-2.086 7.113-.11l4.65 4.65c2.334 2.334 6.268 1.78 7.835-1.124z" fill="#02905d"/>
     <path d="m301.855 280.516c1.901-2.049 5.136-2.086 7.113-.11l4.65 4.65c2.334 2.334 6.267 1.78 7.835-1.124 5.825-10.79 13.065-20.963 21.735-30.254 1.907-2.044 5.139-2.086 7.115-.109l9.846 9.846c2.187 2.187 5.797 1.839 7.572-.694 4-5.71 8.443-11.217 13.344-16.462 1.909-2.043 5.142-2.089 7.119-.112l12.016 12.016c1.733 1.733 4.465 1.923 6.44.472 31.421-23.078 71.889-27.064 104.511-11.431.295.142.568.32.826.516-.197-14.014-3.295-27.833-9.353-40.473-.479-1-1.291-1.811-2.29-2.29-32.622-15.633-73.09-11.648-104.511 11.431-1.975 1.451-4.707 1.261-6.44-.472l-12.016-12.016c-1.977-1.977-5.21-1.932-7.119.112-4.901 5.245-9.345 10.752-13.344 16.462-1.774 2.533-5.385 2.88-7.572.694l-9.846-9.846c-1.977-1.976-5.209-1.934-7.115.109-8.669 9.292-15.909 19.464-21.735 30.254-1.568 2.904-5.502 3.458-7.835 1.124l-4.65-4.65c-1.976-1.976-5.212-1.939-7.113.11-39.38 42.456-47.031 105.285-24.88 162.751-5.785-44.402 5.836-88.31 35.697-120.504z" fill="#017b4e"/>
     <path d="m470.702 295.829c-2.928-2.93-7.677-2.929-10.606 0-6.463 6.463-15.048 10.023-24.173 10.023-6.573 0-12.861-1.856-18.283-5.306l34.447-34.447c2.929-2.929 2.929-7.678 0-10.606-2.93-2.929-7.678-2.929-10.607 0l-64.698 64.698c-3.449-5.422-5.306-11.71-5.306-18.283 0-9.125 3.56-17.709 10.023-24.173 2.929-2.929 2.929-7.677 0-10.606s-7.678-2.929-10.606 0c-9.297 9.296-14.417 21.648-14.417 34.779 0 10.599 3.34 20.688 9.514 29.074l-49.209 49.209c-18.295-23.046-18.286-55.134 1.11-74.531 2.929-2.929 2.929-7.678 0-10.606-2.93-2.929-7.678-2.929-10.607 0-25.218 25.219-25.24 66.807-1.177 95.812l-50.107 50.106-50.107-50.107c24.062-29.005 24.041-70.593-1.177-95.812-2.929-2.929-7.677-2.93-10.607 0-2.929 2.929-2.929 7.678 0 10.606 19.397 19.397 19.405 51.485 1.11 74.531l-49.209-49.209c6.175-8.386 9.514-18.475 9.514-29.074 0-13.131-5.12-25.483-14.417-34.779-2.928-2.929-7.677-2.929-10.606 0s-2.929 7.678 0 10.606c6.464 6.463 10.023 15.048 10.023 24.173 0 6.573-1.856 12.862-5.306 18.283l-64.698-64.697c-2.93-2.929-7.678-2.929-10.607 0s-2.929 7.678 0 10.606l34.447 34.447c-5.422 3.449-11.71 5.306-18.283 5.306-9.125 0-17.71-3.56-24.173-10.023-2.929-2.929-7.678-2.929-10.606 0-2.93 2.929-2.93 7.677-.001 10.606 9.296 9.296 21.648 14.417 34.78 14.417 10.598 0 20.688-3.34 29.074-9.515l53.817 53.817c-19.587 14.891-46.462 14.549-62.85-1.84-2.93-2.929-7.678-2.929-10.607 0s-2.929 7.678 0 10.606c11.401 11.4 26.526 17.041 42.012 17.041 14.681 0 29.68-5.083 42.125-15.128l78.853 78.853v47.616c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-47.616l78.853-78.853c12.445 10.046 27.442 15.128 42.125 15.128 15.483 0 30.612-5.642 42.012-17.041 2.929-2.929 2.929-7.678 0-10.606-2.93-2.929-7.678-2.929-10.607 0-16.387 16.388-43.263 16.73-62.85 1.84l28.46-28.46c.002-.002.005-.004.007-.006s.004-.005.006-.007l25.344-25.344c8.386 6.175 18.475 9.515 29.074 9.515 13.132 0 25.484-5.12 34.78-14.417 2.927-2.929 2.927-7.677-.003-10.606z" fill="#017b4e"/>
    </g>
    </Svg>
  );
}