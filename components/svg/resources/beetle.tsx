import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import Icon from '../../../models/icon';

export default function BeetleSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <G transform="translate(0 -1)">
        <Path d="m324.14 172.71c-44.817 10.547-91.469 10.547-136.29 0l-76.919-18.099s25.6 4.267 25.6 119.47c0 37.171 12.143 73.421 35.132 102.64 18.893 24.013 46.293 50.15 84.335 68.028 38.042-17.877 65.442-44.015 84.326-68.028 22.989-29.218 35.14-65.468 35.14-102.64 0-115.2 25.6-119.47 25.6-119.47l-76.928 18.099z" fill="#95755d"/><Path d="m324.14 172.7c-23.927 4.3575-38.953 7.9004-68.296 8.9587l0.15794 263.08c38.042-17.877 65.442-44.015 84.326-68.028 22.989-29.218 35.14-65.468 35.14-102.64 0-115.2 25.6-119.47 25.6-119.47z" fill="#755945"/>
          <Path d="m494.94 325.28c-0.887 0-1.801-0.145-2.697-0.444l-25.6-8.533c-1.801-0.597-3.354-1.784-4.403-3.362l-32.179-48.256-39.194-7.842c-0.742-0.145-1.468-0.393-2.142-0.734l-17.067-8.533c-4.216-2.108-5.931-7.236-3.823-11.452 2.125-4.215 7.228-5.922 11.452-3.814l16.043 8.021 41.549 8.311c2.219 0.444 4.173 1.749 5.427 3.635l32.512 48.759 22.818 7.612c4.471 1.493 6.886 6.323 5.393 10.795-1.186 3.576-4.514 5.837-8.089 5.837" fill="#534338"/><Path d="m409.61 513.01c-3.132 0-6.144-1.724-7.646-4.719l-34.133-68.267c-1.058-2.116-1.186-4.591-0.35-6.81l24.286-64.785-23.936-47.872c-2.108-4.215-0.393-9.335 3.823-11.452 4.215-2.099 9.335-0.393 11.452 3.823l25.6 51.2c1.058 2.116 1.186 4.591 0.358 6.81l-24.294 64.785 32.469 64.939c2.108 4.215 0.393 9.335-3.823 11.452-1.221 0.606-2.526 0.896-3.806 0.896" fill="#534338"/>
          <Path d="m102.4 513.01c-1.28 0-2.586-0.29-3.806-0.896-4.215-2.116-5.931-7.236-3.823-11.452l32.469-64.939-24.294-64.785c-0.828-2.219-0.7-4.693 0.358-6.81l25.6-51.2c2.116-4.215 7.236-5.922 11.452-3.823 4.215 2.116 5.931 7.236 3.823 11.452l-23.936 47.872 24.286 64.785c0.836 2.219 0.708 4.693-0.35 6.81l-34.133 68.267c-1.502 2.996-4.515 4.719-7.646 4.719" fill="#6d5a4e"/>
          
          <Path d="m17.07 325.28c-3.575 0-6.903-2.261-8.09-5.837-1.493-4.471 0.922-9.301 5.393-10.795l22.818-7.612 32.512-48.759c1.254-1.886 3.209-3.191 5.427-3.635l41.549-8.311 16.043-8.021c4.215-2.108 9.335-0.401 11.452 3.814 2.108 4.215 0.393 9.344-3.823 11.452l-17.067 8.533c-0.674 0.341-1.399 0.589-2.142 0.734l-39.194 7.842-32.178 48.256c-1.05 1.579-2.603 2.765-4.403 3.362l-25.6 8.533c-0.897 0.299-1.81 0.444-2.697 0.444" fill="#6d5a4e"/>
          <Path d="m307.2 111.94c-3.985 0-7.552-2.807-8.354-6.861-0.93-4.617 2.074-9.114 6.69-10.035l39.194-7.842 32.179-48.265c1.254-1.877 3.209-3.191 5.427-3.627l39.194-7.842 15.113-22.665c2.611-3.917 7.902-4.992 11.836-2.364 3.925 2.611 4.983 7.91 2.364 11.836l-17.067 25.6c-1.254 1.877-3.209 3.191-5.427 3.627l-39.194 7.842-32.18 48.265c-1.254 1.877-3.209 3.191-5.427 3.627l-42.667 8.533c-0.563 0.12-1.135 0.171-1.681 0.171" fill="#534338"/>
          <Path d="m204.81 111.94c-0.555 0-1.118-0.051-1.681-0.171l-42.667-8.533c-2.219-0.435-4.173-1.749-5.427-3.627l-32.179-48.265-39.194-7.842c-2.219-0.435-4.173-1.749-5.427-3.627l-17.067-25.6c-2.62-3.925-1.562-9.225 2.364-11.836 3.934-2.628 9.225-1.553 11.836 2.364l15.113 22.665 39.194 7.842c2.219 0.435 4.173 1.749 5.427 3.627l32.179 48.265 39.194 7.842c4.617 0.922 7.62 5.419 6.69 10.035-0.803 4.053-4.37 6.861-8.355 6.861" fill="#6d5a4e"/>
        
        
        
          <Path d="m298.67 69.273-42.667-8.533-42.667 8.533s6.665 85.333-102.4 85.333l76.928 18.099c44.817 10.547 91.46 10.547 136.28 0l76.928-18.099c-109.06 0-102.4-85.333-102.4-85.333" fill="#6d5a4e"/>
          <Path d="m372.11 257.7-119.47 51.2c-4.335 1.852-6.34 6.869-4.48 11.204 1.382 3.234 4.531 5.171 7.842 5.171 1.118 0 2.261-0.222 3.354-0.691l116.08-49.749c0-0.247 0.034-0.503 0.034-0.759 0-5.99 0.077-11.614 0.213-17.024-1.203-0.034-2.406 0.136-3.575 0.648" fill="#534338"/>
          
          <Path d="m256 325.28c3.311 0 6.46-1.946 7.842-5.171 1.86-4.335-0.154-9.353-4.48-11.204l-119.47-51.2c-1.169-0.512-2.381-0.683-3.575-0.649 0.128 5.41 0.213 11.025 0.213 17.024 0 0.247 0.034 0.503 0.034 0.759l116.07 49.741c1.093 0.479 2.237 0.7 3.363 0.7" fill="#6d5a4e"/>
        <Path d="m247.47 180.37v259.98c2.816 1.485 5.581 3.004 8.533 4.386 2.953-1.382 5.717-2.901 8.533-4.386v-259.98c-5.691 0.162-11.374 0.162-17.066 0" fill="#6d5a4e"/><Path d="m298.67 69.273-42.667-8.533-0.15794 120.92c8.6909-1.2947 23.479 1.5883 68.296-8.9587l76.928-18.099c-109.06 0-102.4-85.333-102.4-85.333" fill="#534338"/><Path d="m255.72 180.37v259.98c1.4554 1.485 2.8844 3.004 4.41 4.386 1.5262-1.382 2.9546-2.901 4.41-4.386v-259.98c-2.9412 0.162-5.8783 0.162-8.82 0" fill="#534338" strokeWidth=".7189"/>
      </G>
    </Svg>
  );
}