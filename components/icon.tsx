import React from 'react';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

export default function IconComponent(props: IconProps) {
  switch(props.provider) {
    case 'Entypo':
    return (
      <IconEntypo name={props.name} color={props.color} size={props.size} />
    );
    case 'FontAwesome':
    return (
      <IconFontAwesome name={props.name} color={props.color} size={props.size} />
    )
    case 'FontAwesome5':
    return (
      <IconFontAwesome5 name={props.name} color={props.color} size={props.size} />
    )
    default:
    return null;
  }
}

interface IconProps {
  provider: string,
  name: string,
  color: string,
  size: number|undefined
}
