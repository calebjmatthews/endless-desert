import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import KnowledgeSvgComponent from './knowledge';
import LentilSvgComponent from './lentil';

import Icon from '../../models/icon';
import { SVGS } from '../../enums/svgs';

// <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

export default function SvgComponent(props: { icon: Icon }) {
  switch (props.icon.name) {
    case SVGS.KNOWLEDGE:
    return <KnowledgeSvgComponent icon={props.icon} />
    case SVGS.LENTILS:
    return <LentilSvgComponent icon={props.icon} />
  }
  return null;
}
