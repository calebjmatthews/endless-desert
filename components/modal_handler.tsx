import React from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles';

import { displayModal } from '../actions/ui';
import BuildComponent from './build';
import { MODALS } from '../enums/modals';

export default function ModalHandlerComponent() {
  const dispatch = useDispatch();
  const modalType = useTypedSelector(state => state.ui.modalDisplayed);

  function modalCancel() {
    dispatch(displayModal(null));
  }

  if (modalType == null) {
    return null;
  }
  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity style={styles.modalBackground}
        onPress={() => modalCancel()}>
      </TouchableOpacity>
      {renderModal(modalType)}
    </View>
  );
}

function renderModal(modalType: string) {
  switch (modalType) {
    case MODALS.BUILD:
    return (
      <LinearGradient style={styles.modal}
        colors={["#f58f7d", "#6a41b4", "#0034aa"]}>
        <BuildComponent />
      </LinearGradient>
    )
    default:
    return null;
  }
}
