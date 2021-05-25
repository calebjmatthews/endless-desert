import * as React from 'react';
import Svg from 'react-native-svg';
import Icon from '../../../models/icon';

export default function GlazeSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <path d="m434.56 481.99h-357.11c-7.84 0-14.358-6.038-14.956-13.856l-31.079-406.24h449.18l-31.079 406.24c-0.599 7.817-7.117 13.856-14.957 13.856z" fill="#e9e4f0"/>
      <path d="m256 61.89v420.1h178.56c7.841 0 14.358-6.038 14.956-13.856l31.079-406.24z" fill="#cfc9d6"/>
      <path d="m469.88 30.014h-427.76c-17.604 0-31.875 14.271-31.875 31.875s14.271 31.875 31.875 31.875h14.979c21.654 0 39.181 17.604 39.086 39.258l-0.174 39.714c0 17.687 14.338 32.026 32.026 32.026 17.67 0 31.97-14.459 32.026-32.129 0.056-17.64 14.373-31.922 32.026-31.922 17.687 0 32.026 14.338 32.026 32.026v45.622c0 17.413 13.652 32.132 31.059 32.609 18.059 0.495 32.855-13.997 32.855-31.945v-46.287c0-17.687 14.338-32.026 32.026-32.026 17.687 0 32.026 14.338 32.026 32.026v46.287c0 17.649 14.308 31.957 31.957 31.957s31.957-14.308 31.957-31.957v-86.153c0-21.567 17.469-39.059 39.036-39.087l14.855-0.019c17.604 0 31.875-14.271 31.875-31.875-1e-3 -17.604-14.272-31.875-31.877-31.875z" fill={props.icon.color}/>
      <path d="m469.88 30.014h-213.88v220.96c17.68 0.036 32.026-14.275 32.026-31.946v-46.287c0-17.687 14.338-32.026 32.026-32.026 17.687 0 32.026 14.338 32.026 32.026v46.287c0 17.649 14.308 31.957 31.957 31.957s31.957-14.307 31.957-31.957v-86.154c0-21.567 17.469-39.059 39.037-39.087l14.855-0.019c17.604 0 31.875-14.271 31.875-31.875-1e-3 -17.604-14.272-31.875-31.877-31.875z" fill={props.icon.shadow}/>
    </Svg>
  );
}