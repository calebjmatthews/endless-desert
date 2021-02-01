import React, { useEffect, useState } from 'react';
import { Provider, useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles';

import ModalHandlerComponent from '../components/modal_handler';
import IconComponent from '../components/icon';
import { setUserId, setSessionId } from '../actions/account';
import { setGlobalState, displayModal } from '../actions/ui';

const SIGNUP_URL = 'http://localhost:8080/api/signup/'

export default function SignupComponent() {
  const dispatch = useDispatch();
  const positioner = useTypedSelector(state => state.ui.positioner);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordChk, setPasswordChk] = useState('');
  const startingInvalidMessages: string[] = [];
  const [invalidMessages, setInvalidMessages] = useState(startingInvalidMessages);
  const inputBoxStyle = StyleSheet.flatten([styles.inputBox, styles.inputBoxLarge,
    {minWidth: positioner.modalMajor, maxWidth: positioner.modalMajor}]);
  const submitButtonStyle = StyleSheet.flatten([styles.buttonRowItem,
    {paddingVertical: 8}]);

  return (
    <View style={styles.modalContent}>
      <View style={styles.headingWrapper}>
        <Text style={styles.heading1}>{'Sign up'}</Text>
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.bareText}>{'Email:'}</Text>
          <TextInput style={inputBoxStyle}
            onChangeText={text => setEmail(text)}
            autoCompleteType='email' placeholder='Email' value={email} />
        </View>
        <View style={styles.break}></View>
        <View>
          <Text style={styles.bareText}>{'Password:'}</Text>
          <TextInput style={inputBoxStyle}
            onChangeText={text => setPassword(text)} secureTextEntry={true}
            autoCompleteType='password' placeholder='Password' value={password} />
        </View>
        <View style={styles.break}></View>
        <View>
          <Text style={styles.bareText}>{'Password again:'}</Text>
          <TextInput style={inputBoxStyle}
            onChangeText={text => setPasswordChk(text)} secureTextEntry={true}
            autoCompleteType='password' placeholder='Password' value={passwordChk} />
        </View>
        <View style={styles.break}></View>
        {renderInvalidMessages()}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={submitButtonStyle} onPress={() => {submit()}} >
            <IconComponent provider="FontAwesome5" name="arrow-right" color="#fff"
              size={16} style={styles.headingIcon} />
            <Text style={styles.buttonTextLarge}>{' Go'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.break}></View>
      </View>
    </View>
  );

  function renderInvalidMessages() {
    if (invalidMessages.length > 0) {
      return (
        <View style={{minWidth: positioner.modalMajor,
          maxWidth: positioner.modalMajor}}>
          {invalidMessages.map((iMessage, index) => {
            return (
              <View key={index}>
                <Text style={styles.bareText}>
                  {iMessage}
                </Text>
              </View>
            );
          })}
        </View>
      );
    }
    return null;
  }

  function submit() {
    const validateRes = validate();
    setInvalidMessages(validateRes.newInvalidMessages);
    if (validateRes.valid) {
      fetch((SIGNUP_URL), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userReq: { email, password }
        })
      })
      .then((resRaw) => {
        if (resRaw) {
          return resRaw.json();
        }
        return false;
      })
      .then((resJson) => {
        if (resJson) {
          if (resJson.data) {
            if (resJson.data.succeeded == false) {
              setInvalidMessages([resJson.data.message]);
              return false;
            }
            if (resJson.data.userId) {
              AsyncStorage.setItem('@ed_session_id', resJson.data.sessionId);
              AsyncStorage.setItem('@ed_user_id', resJson.data.userId);
              dispatch(setSessionId(resJson.data.sessionId));
              dispatch(setUserId(resJson.data.userId));
              dispatch(setGlobalState('loaded'));
              dispatch(displayModal(null));
              return true;
            }

          }

        }
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  function validate() {
    let valid = true;
    let newInvalidMessages: string[] = [];

    if (email.length == 0) {
      valid = false;
      newInvalidMessages.push('Please enter an email address.');
    }
    if (password.length == 0) {
      valid = false;
      newInvalidMessages.push('Please enter a password.');
    }
    else if (password.length < 8) {
      valid = false;
      newInvalidMessages.push('Please enter a password eight characters or longer.');
    }
    else if (password != passwordChk) {
      valid = false;
      newInvalidMessages.push('Your password and retyped password do not match, '
       + 'please try again.');
    }

    return {valid, newInvalidMessages};
  }
}
