import React from 'react';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

export default function IconComponent(props: IconProps) {
  switch(props.provider) {
    case 'Entypo':
    return (
      <IconEntypo name={props.name} color={props.color} size={props.size}
        style={props.style} />
    );
    case 'FontAwesome':
    return (
      <IconFontAwesome name={props.name} color={props.color} size={props.size}
        style={props.style} />
    );
    case 'FontAwesome5':
    return (
      <IconFontAwesome5 name={props.name} color={props.color} size={props.size}
        style={props.style} />
    );
    case 'MaterialCommunityIcons':
    return (
      <IconMaterialCommunity name={props.name} color={props.color} size={props.size}
        style={props.style} />
    );
    case 'MaterialIcons':
    return (
      <IconMaterial name={props.name} color={props.color} size={props.size}
        style={props.style} />
    );
    default:
    return null;
  }
}

interface IconProps {
  provider: string,
  name: string,
  color: string,
  size?: number,
  style?: any
}
