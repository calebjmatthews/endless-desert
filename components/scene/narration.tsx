import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { styles } from '../../styles';

import { SceneText } from '../../models/scene';
import Positioner from '../../models/positioner';

import { FADE_IN_DELAY } from '../../constants';

const SceneNarrationComponent = (props: SceneNarrationProps) => {
  const { id, type, animate, sceneText, handlePress, doneAnimating, pos } = props;

  const [shouldAnimate, setShouldAnimate] = useState(animate);
  const handleInnerPress = () => {
    setShouldAnimate(false);
    handlePress({ id, type });
  }

  return (shouldAnimate)
    ? <SceneNarrationAnimatedComponent id={id} type={type} sceneText={sceneText}
      handleInnerPress={handleInnerPress} doneAnimating={doneAnimating} pos={pos} />
    : <SceneNarrationStaticComponent sceneText={sceneText} pos={pos} />;
}

const SceneNarrationAnimatedComponent = (props: SceneNarrationAnimatedProps) => {
  const { id, type, sceneText, handleInnerPress, doneAnimating, pos } = props;
  const textOpacity = useRef(new Animated.Value(0)).current;
  useEffect(() => { Animated.timing(textOpacity,
    { toValue: 0.9, duration: FADE_IN_DELAY*4, useNativeDriver: true }
  ).start(() => {
    doneAnimating({ id, type });
  }); }, []);

  return (
    <TouchableOpacity key={sceneText.id} onPress={() => handleInnerPress()} 
      style={styles.columns}>
      <Animated.View style={[styles.panelFlex,
        { minWidth: pos.modalMajor, maxWidth: pos.modalMajor, padding: 10, opacity: textOpacity }]}>
        <Text>{JSON.stringify(sceneText.text)}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const SceneNarrationStaticComponent = (props: SceneNarrationStaticProps) => {
  const { sceneText, pos } = props;
  return (
    <View key={sceneText.id} style={styles.columns}>
      <View style={[styles.panelFlex,
        { minWidth: pos.modalMajor, maxWidth: pos.modalMajor, padding: 10 }]}>
        <Text>{JSON.stringify(sceneText.text)}</Text>
      </View>
    </View>
  )
}

interface SceneNarrationProps {
  id: string;
  type: string;
  animate: boolean;
  sceneText: SceneText;
  doneAnimating: (args: { id: string, type: string }) => void;
  handlePress: (args: { id: string, type: string }) => void;

  pos: Positioner;
}

interface SceneNarrationAnimatedProps {
  id: string;
  type: string;
  sceneText: SceneText;
  handleInnerPress: () => void;
  doneAnimating: (args: { id: string, type: string }) => void;

  pos: Positioner;
}

interface SceneNarrationStaticProps {
  sceneText: SceneText;

  pos: Positioner;
}

export default SceneNarrationComponent;