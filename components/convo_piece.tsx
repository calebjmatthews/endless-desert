import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Text, View, StyleSheet, Animated, Platform } from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';

import { ConversationStatement, ConversationResponse }
  from '../models/conversation';
import Icon from '../models/icon';
import { utils } from '../utils';

import { FADE_IN_DELAY, FADE_CHAR_DELAY, FADE_CHAR_MULT } from '../constants';

export default function ConvoPieceComponent(props: ConvoPieceProps) {
  const opacityAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(
      opacityAnim, { toValue: 1, duration: FADE_IN_DELAY, useNativeDriver: true }
    ).start();
  }, []);

  if (props.convoStatement) {
    return (
      <Animated.View style={StyleSheet.flatten([styles.rows,
        { alignItems: 'flex-start', opacity: opacityAnim }])}>
        <View style={StyleSheet.flatten([styles.columns, { marginTop: 17 }])}>
          <BadgeComponent icon={props.partner.icon} size={55} marginless={true} />
        </View>
        <View style={styles.columns}>
          <Text style={StyleSheet.flatten([styles.bareText, {marginLeft: 5}])}>
            {props.partner.name}
          </Text>
          <View style={StyleSheet.flatten([styles.speechBubble,
            { minWidth: props.speechBubbleWidth,  maxWidth: props.speechBubbleWidth,
              minHeight: 30, marginRight: 5, borderTopLeftRadius: 0 }])}>
            <ConvoTextSection text={props.convoStatement.text} skipAnimation={props.skipAnimation}
              finishedAnimating={() => { props.finishedAnimating(); }} />
          </View>
        </View>
      </Animated.View>
    );
  }
  else if (props.convoResponse) {
    return (
      <Animated.View style={StyleSheet.flatten([styles.rows,
        { alignItems: 'flex-start' }])}>
        <View style={styles.columns}>
          <Text style={StyleSheet.flatten([styles.bareText, {marginLeft: 5}])}>
            {props.partner.name}
          </Text>
          <View style={StyleSheet.flatten([styles.speechBubble,
            { minWidth: props.speechBubbleWidth, maxWidth: props.speechBubbleWidth,
              minHeight: 30, marginLeft: 5, borderTopRightRadius: 0 }])}>
            <ConvoTextSection text={props.convoResponse.text} skipAnimation={props.skipAnimation}
              finishedAnimating={() => { props.finishedAnimating(); }} />
          </View>
        </View>
        <View style={StyleSheet.flatten([styles.columns, { marginTop: 17 }])}>
          <BadgeComponent icon={props.partner.icon} size={55} marginless={true} />
        </View>
      </Animated.View>
    );
  }
  return null;
}

function ConvoTextSection(props: { text: string, skipAnimation: boolean, finishedAnimating: () => void }) {
  return useMemo(() => ((Platform.OS === 'web' && !props.skipAnimation) ?
    <GradualTextSection text={props.text}
      finishedAnimating={props.finishedAnimating} /> :
    <AtOnceTextSection text={props.text} skipAnimation={props.skipAnimation}
      finishedAnimating={props.finishedAnimating} />
  ), [props.skipAnimation]);
}

function AtOnceTextSection(props: { text: string, skipAnimation: boolean,
  finishedAnimating: () => void }) {
  const textOpacity = useRef(new Animated.Value(0)).current;
  const duration = (!props.skipAnimation) ? FADE_IN_DELAY*4 : 0;
  React.useEffect(() => { Animated.timing(textOpacity,
    { toValue: 1, duration, useNativeDriver: true }
  ).start(() => {
    props.finishedAnimating();
  }); }, []);

  return (
    <Animated.Text style={{opacity: textOpacity }}>
      {props.text}
    </Animated.Text>
  );
}

function GradualTextSection(props: { text: string, finishedAnimating: () => void }) {
  const [state, setState] = useState('initializing');
  const [revealedText, setRevealedText] = useState('');
  const [revealingText, setRevealingText] =
    useState<{ id: string, text: string }[]>([]);
  const [toReset, setToReset] = useState(false);
  const [unrevealedText, setUnrevealedText] = useState(['']);

  useEffect(() => {
    if (state == 'initializing') {
      setState('initialized');
      setUnrevealedText(splitText(props.text));
      setTimeout(() => { setState('canReveal') }, (FADE_IN_DELAY/4));
    }

    if (state == 'canReveal') {
      setState('revealing');
      const newRevealingText = { id: utils.randHex(8), text: unrevealedText[0]};
      setRevealingText([...revealingText, newRevealingText]);
      setUnrevealedText(unrevealedText.slice(1));
      if (unrevealedText.length > 0) {
        setTimeout(() => { setState('canReveal'); },
          utils.getCharDelay(newRevealingText.text, FADE_CHAR_DELAY));
      }
      else {
        setState('done');
        props.finishedAnimating();
      }
      setTimeout(() => { setToReset(true); },  (FADE_CHAR_DELAY * FADE_CHAR_MULT));
    }
  }, [state]);

  useEffect(() => {
    if (toReset) {
      setToReset(false);
      const cRevealingText = revealingText[0];
      setRevealedText(revealedText + (cRevealingText?.text || ''));
      setRevealingText(revealingText.slice(1));
    }
  }, [toReset]);

  return (
    <Text>
      <Text>{revealedText}</Text>
      {revealingText.map((aRevealingText, index) => (
        <RevealingText key={aRevealingText.id} id={aRevealingText.id}
          text={aRevealingText.text} />
      ))}
    </Text>
  );

  function processText(text: string) {
    let array: string[] = [];
    let word = '';
    for (let index = 0; index < text.length; index++) {
      const char = text[index];
      if (char == ' ') { word += char; array.push(word); word = ''; }
      else if (char == '.' || char == ',' || char == '!') {
        array.push(word); word = ''; word += char; array.push(word); word = '';
      }
      else { word += char; }
    }
    array.push(word);
    return array;
  }
}

function splitText(text: string) {
  let array: string[] = [];
  for (let index = 0; index < text.length; index++) {
    array.push(text[index]);
  }
  return array;
}

function RevealingText(props: { id: string, text: string }) {
  const opacityAnim = { [props.id] : useRef(new Animated.Value(0)).current};
  useEffect(() => {
    Animated.timing(
      opacityAnim[props.id], {
        toValue: 1,
        duration: (FADE_CHAR_DELAY * FADE_CHAR_MULT),
        useNativeDriver: false }
    ).start();
  }, []);

  return (
    <Animated.Text key={props.text} style={{ opacity: opacityAnim[props.id] }}>
      {props.text}
    </Animated.Text>
  );
}

interface ConvoPieceProps {
  convoStatement?: ConversationStatement;
  convoResponse?: ConversationResponse;
  partner: Partner;
  speechBubbleWidth: number;
  skipAnimation: boolean;
  finishedAnimating: () => void;
}

interface Partner {
  name: string;
  icon: Icon;
}
