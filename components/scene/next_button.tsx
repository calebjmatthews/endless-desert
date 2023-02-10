import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../../styles';

import IconComponent from '../icon';

import Positioner from '../../models/positioner';

const NextButtonComponent = (props: NextButtonProps) => {
  const { id, type, pos, handlePress } = props;
  return (
    <View style={styles.centeredRows}>
      <TouchableOpacity style={[styles.button, styles.sceneActionButton,
        {minWidth: pos.speechButtonWidth,  maxWidth: pos.speechButtonWidth, }]}
        onPress={() => handlePress({ id, type })}>
        <View style={[styles.rows, { paddingVertical: 5 }]}>
          <IconComponent provider="FontAwesome" color="#fff" size={14} style={styles.headingIcon}
            name="arrow-right" />
          <Text style={styles.buttonText}>
            {` Next`}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

interface NextButtonProps {
  id: string;
  type: string;
  handlePress: (args: { id: string, type: string }) => void;

  pos: Positioner;
}

export default NextButtonComponent;