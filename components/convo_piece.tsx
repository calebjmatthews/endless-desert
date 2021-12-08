import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';

import { ConversationStatement, ConversationResponse }
  from '../models/conversation';
import Icon from '../models/icon';

const INIT_DELAY = 400;
const REVEAL_MULT = 40;
const RESET_DELAY = 10;

export default function ConvoPieceComponent(props: ConvoPieceProps) {
  const opacityAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(
      opacityAnim, {
        toValue: 1,
        duration: INIT_DELAY,
        useNativeDriver: true }
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
              minHeight: 30, marginLeft: 5, borderTopLeftRadius: 0 }])}>
            <ConvoText text={props.convoStatement.text} />
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
              minHeight: 30, marginRight: 5, borderTopRightRadius: 0 }])}>
            <ConvoText text={props.convoResponse.text} />
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

function ConvoText(props: { text: string }) {
  const [state, setState] = useState('initializing');
  const [revealedText, setRevealedText] = useState('');
  const [revealingText, setRevealingText] = useState<RevealTextProps|null>(null);
  const [unrevealedText, setUnrevealedText] = useState(['']);

  useEffect(() => {
    if (state == 'initializing') {
      setState('initialized');
      setUnrevealedText(processText(props.text));
      setTimeout(() => { setState('canReveal') }, (INIT_DELAY/4));
    }

    if (state == 'canReveal') {
      setState('revealing');
      const newRevealingText = {
        text: unrevealedText[0],
        delay: getDelay(unrevealedText[0])
      };
      setRevealingText(newRevealingText);
      setUnrevealedText(unrevealedText.slice(1));
      setTimeout(() => { setState('reset') }, newRevealingText.delay);
    }

    if (state == 'reset') {
      setState('resetting');
      setRevealedText(revealedText + revealingText?.text);
      setRevealingText(null);
      if (unrevealedText.length > 0) {
        setTimeout(() => { setState('canReveal') }, RESET_DELAY);
      }
      else { setState('done'); }
    }
  }, [state]);

  return (
    <Text>
      <Text>{revealedText}</Text>
      {revealingText && <RevealingText text={revealingText?.text}
        delay={revealingText?.delay} />}
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

  function splitText(text: string) {
    let array: string[] = [];
    for (let index = 0; index < text.length; index++) {
      array.push(text[index]);
    }
    return array;
  }

  function getDelay(text: string) {
    if (text.includes(',')) { return REVEAL_MULT * 2 * 3; }
    if (text.includes('.') || text.includes('!')) { return REVEAL_MULT * 2 * 6; }
    return text.length * REVEAL_MULT;
  }
}

function RevealingText(props: { text: string, delay: number }) {
  const opacityAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(
      opacityAnim, {
        toValue: 1,
        duration: props.delay,
        useNativeDriver: true }
    ).start();
  }, []);

  return (
    <Animated.Text style={{ opacity: opacityAnim }}>
      {props.text}
    </Animated.Text>
  );
}

interface ConvoPieceProps {
  convoStatement?: ConversationStatement;
  convoResponse?: ConversationResponse;
  partner: Partner;
  speechBubbleWidth: number;
}

interface Partner {
  name: string;
  icon: Icon;
}

interface RevealTextProps {
  text: string;
  delay: number;
}
