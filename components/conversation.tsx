import React, { useState, useEffect } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import { responseChosen } from '../actions/conversation_status';

import Leader from '../models/leader';
import Icon from '../models/icon';
import { Conversation, ConversationStatement, ConversationResponse }
  from '../models/conversation';
import { conversations, convoStatements, convoResponses }
  from '../instances/conversations';
import { SVGS } from '../enums/svgs';

const DEFAULT_PARTNER: Partner = {
  name: 'You',
  icon: new Icon({ provider: 'svg', name: SVGS.YOU })
};

export default function ConversationComponent(props: ConversationProps) {
  const dispatch = useDispatch();
  const leaders = useTypedSelector(state => state.leaders);
  const conversationStatus = useTypedSelector(state => state.conversationStatus);
  const positioner = useTypedSelector(state => state.ui.positioner);

  useEffect(() => {
    console.log('conversationStatus');
    console.log(conversationStatus);
  }, [])

  const [responseNames, setResponseNames] = useState<string[]>([]);

  const conversation = conversations[props.convoName];
  const statementFirst = convoStatements[conversation.statementName];
  return (
    <View style={styles.columns}>
      <View style={styles.columns}>
        {renderStatement(statementFirst)}
      </View>
      {responseNames.map((responseName) => (
        handleResponseName(responseName)
      ))}
    </View>
  );

  function renderStatement(statement: ConversationStatement) {
    let partner: Partner = DEFAULT_PARTNER;
    if (statement.partnerKind == 'leader') {
      const leader = getLeaderByName(statement.partnerType);
      if (leader) { partner = leader; }
    }
    return (
      <View style={styles.columns}>
        <View style={StyleSheet.flatten([styles.rows, { alignItems: 'flex-start' }])}>
          <View style={StyleSheet.flatten([styles.columns, { marginTop: 17 }])}>
            <BadgeComponent icon={partner.icon} size={55} marginless={true} />
          </View>
          <View style={styles.columns}>
            <Text style={StyleSheet.flatten([styles.bareText, {marginLeft: 5}])}>
              {partner.name}
            </Text>
            <View style={StyleSheet.flatten([styles.speechBubble,
              { maxWidth: positioner.speechBubbleWidth, marginLeft: 5,
                borderTopLeftRadius: 0 }])}>
              <Text>{statement.text}</Text>
            </View>
          </View>
        </View>
        <View style={styles.break} />
        {renderResponseOptions(statement)}
      </View>
    )
  }
  function getLeaderByName(partnerType: string): Leader|null {
    let leader: Leader|null = null;
    Object.keys(leaders).map((id) => {
      const cLeader = leaders[id];
      if (cLeader.name == partnerType) { leader = cLeader; }
    });
    return leader;
  }

  function renderResponseOptions(statement: ConversationStatement) {
    if (!statement.responseNames) { return null; }
    let responseGiven: boolean = false;
    responseNames.map((responseName) => {
      if (statement.responseNames) {
        statement.responseNames.map((sResponseName) => {
          if (responseName == sResponseName) {
            responseGiven = true;
          }
        });
      }
    });
    if (responseGiven) { return null; }
    return statement.responseNames.map((responseName, index) => {
      const response = convoResponses[responseName];
      const buttonStyle: any = StyleSheet.flatten([styles.columns,
        { minWidth: positioner.speechButtonWidth,
          maxWidth: positioner.speechButtonWidth,
          paddingVertical: 5, alignItems: 'flex-start' }]);
      return (
        <View key={index}>
          <TouchableOpacity style={styles.button} disabled={false}
            onPress={() => {
              dispatch(responseChosen(response.name)),
              setResponseNames([...responseNames, response.name ]);
            }} >
            <View style={buttonStyle}>
              <Text style={styles.buttonText}>
                {response.textIntro}
              </Text>
              {response.speechType && (
                <Text style={StyleSheet.flatten([styles.buttonText,
                  { opacity: 0.75 }])}>
                  {`(${response.speechType})`}
                </Text>
              )}
            </View>
          </TouchableOpacity>
          <View style={styles.break} />
        </View>
      )
    })
  }

  function handleResponseName(responseName: string) {
    const response = convoResponses[responseName];
    const statement = convoStatements[response.statementName];
    return (
      <View style={styles.columns} key={responseName}>
        {renderResponse(response)}
        <View style={styles.break} />
        {renderStatement(statement)}
        <View style={styles.break} />
      </View>
    )
  }

  function renderResponse(response: ConversationResponse) {
    const partner = DEFAULT_PARTNER;
    return (
      <View style={StyleSheet.flatten([styles.rows, { alignItems: 'flex-start' }])}>
        <View style={styles.columns}>
          <Text style={StyleSheet.flatten([styles.bareText, {marginLeft: 5}])}>
            {partner.name}
          </Text>
          <View style={StyleSheet.flatten([styles.speechBubble,
            { maxWidth: positioner.speechBubbleWidth, marginRight: 5,
              borderTopRightRadius: 0 }])}>
            <Text>{response.text}</Text>
          </View>
        </View>
        <View style={StyleSheet.flatten([styles.columns, { marginTop: 17 }])}>
          <BadgeComponent icon={partner.icon} size={55} marginless={true} />
        </View>
      </View>
    );
  }
}

interface ConversationProps {
  convoName: string;
}

interface Partner {
  name: string;
  icon: Icon;
}
