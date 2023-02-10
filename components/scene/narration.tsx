import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { styles } from '../../styles';

import RichTextRenderer from '../rich_text_renderer';

import { SceneText } from '../../models/scene';
import Positioner from '../../models/positioner';

import { FADE_IN_DELAY } from '../../constants';

const SceneNarrationComponent = (props: SceneNarrationProps) => {
  const { id, type, animate, sceneText, doneAnimating, pos } = props;

  const [shouldAnimate, setShouldAnimate] = useState(animate);
  const handleInnerPress = () => {
    setShouldAnimate(false);
  }
  const innerDoneAnimating = () => {
    setShouldAnimate(false);
    doneAnimating({ id, type });
  }

  return (shouldAnimate)
    ? <SceneNarrationAnimatedComponent sceneText={sceneText} innerDoneAnimating={innerDoneAnimating}
      handleInnerPress={handleInnerPress} pos={pos} />
    : <SceneNarrationStaticComponent sceneText={sceneText} pos={pos} />;
}

const SceneNarrationAnimatedComponent = (props: SceneNarrationAnimatedProps) => {
  const { sceneText, handleInnerPress, innerDoneAnimating, pos } = props;
  const textOpacity = useRef(new Animated.Value(0)).current;
  useEffect(() => { Animated.timing(textOpacity,
    { toValue: 0.9, duration: FADE_IN_DELAY*6, useNativeDriver: true }
  ).start(() => {
    innerDoneAnimating();
  }); }, []);

  return (
    <TouchableOpacity key={sceneText.id} onPress={() => handleInnerPress()} 
      style={styles.columns}>
      <Animated.View style={[styles.panelFlex,
        { minWidth: pos.modalMajor, maxWidth: pos.modalMajor, padding: 10, opacity: textOpacity }]}>
        <RichTextRenderer richText={sceneText.text} />
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
        <RichTextRenderer richText={sceneText.text} />
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

  pos: Positioner;
}

interface SceneNarrationAnimatedProps {
  sceneText: SceneText;
  handleInnerPress: () => void;
  innerDoneAnimating: () => void;

  pos: Positioner;
}

interface SceneNarrationStaticProps {
  sceneText: SceneText;

  pos: Positioner;
}

export default SceneNarrationComponent;