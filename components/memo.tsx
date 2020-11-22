import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

import IconComponent from './icon';

import { dismissMemo, displayModal } from '../actions/ui';

export default function MemoComponent() {
  const dispatch = useDispatch();
  const memos = useTypedSelector(state => state.ui.memos);
  const memo = memos[0];

  return (
    <View style={styles.container}>
      {renderHeading()}
      <View style={styles.panelFlexColumn}>
        <Text style={styles.bodyText}>
          {memo.text}
        </Text>
        <View style={styles.break} />
        <TouchableOpacity style={styles.buttonLarge}
          onPress={() => {dismissPress()}} >
          <IconComponent provider="FontAwesome" name="arrow-right" color="#fff" size={16}
            style={styles.headingIcon} />
          <Text style={styles.buttonTextLarge}>{' Next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  function renderHeading() {
    if (memo.title.length > 0) {
      return (
        <View style={styles.headingWrapper}>
          <Text style={styles.heading1}>{memo.title}</Text>
        </View>
      );
    }
    return null;
  }

  function dismissPress() {
    if (memos.length > 1) {
      dispatch(dismissMemo());
    }
    else {
      dispatch(dismissMemo());
      dispatch(displayModal(null));
    }
  }
}
