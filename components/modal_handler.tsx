import React from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles';

import { displayModal } from '../actions/ui';
import BuildComponent from './build';
import ResourceSelectComponent from './resource_select';
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
      <LinearGradient style={styles.modal}
        colors={["#f58f7d", "#6a41b4", "#0034aa"]}>
        {renderModal(modalType)}
      </LinearGradient>
    </View>
  );
}

function renderModal(modalType: string) {
  switch (modalType) {
    case MODALS.BUILD:
    return <BuildComponent />;

    case MODALS.RESOURCE_SELECT:
    return <ResourceSelectComponent />;

    default:
    return null;
  }
}
