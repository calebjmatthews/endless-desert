import React, { useEffect, useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles';

import { displayModal } from '../actions/ui';
import SpotComponent from './spot';
import ResourceDetailComponent from './resource_detail';
import ResourceSelectComponent from './resource_select';
import ResourceSelectOneComponent from './resource_select_one';
import ResourceSelectDishComponent from './resource_select_dish';
import ResourceSelectRateComponent from './resource_select_rate';
import BuildingSelectComponent from './building_select';
import EquipmentSelectComponent from './equipment_select';
import LeaderSelectComponent from './leader_select';
import MemoComponent from './memo';
import BuildingDetailComponent from './building_detail';
import LeaderDetailComponent from './leader_detail';
import LoginComponent from './login';
import SignupComponent from './signup';
import QuestQuitConfirmComponent from './quest_quit_confirm';
import MessagesComponent from './messages';
import { MODALS } from '../enums/modals';

const MODAL_HEIGHT_MAP: { [modalType: string] : string } = {
  [MODALS.RESOURCE_DETAIL]: '50%',
  [MODALS.LOGIN]: '60%',
  [MODALS.SIGNUP]: '70%',
  [MODALS.QUEST_QUIT_CONFIRM]: '50%'
}

export default function ModalHandlerComponent() {
  const dispatch = useDispatch();
  const modalType = useTypedSelector(state => state.ui.modalDisplayed);
  const memos = useTypedSelector(state => state.ui.memos);
  const positioner = useTypedSelector(state => state.ui.positioner);

  const [modalHeight, setModalHeight] = useState('80%');

  useEffect(() => {
    if (memos.length > 0) {
      dispatch(displayModal(MODALS.MEMO));
    }
  }, [memos])

  useEffect(() => {
    if (modalType) {
      setModalHeight(MODAL_HEIGHT_MAP[modalType] || '80%');
    }
  }, [modalType])

  function modalCancel() {
    if (modalType != MODALS.MEMO) {
      dispatch(displayModal(null));
    }
  }

  if (modalType == null) {
    return null;
  }
  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity style={styles.modalBackground}
        onPress={() => modalCancel()}>
      </TouchableOpacity>
      <LinearGradient style={StyleSheet.flatten([styles.modal,
        {minWidth: positioner.modalWidth, maxWidth: positioner.modalWidth,
          minHeight: modalHeight}])}
        colors={["#0034aa", "#6a41b4", "#f58f7d"]}>
        {renderModal(modalType)}
      </LinearGradient>
    </View>
  );
}

function renderModal(modalType: string) {
  switch (modalType) {
    case MODALS.SPOT:
    return <SpotComponent />;

    case MODALS.RESOURCE_DETAIL:
    return <ResourceDetailComponent />;

    case MODALS.RESOURCE_SELECT:
    return <ResourceSelectComponent />;

    case MODALS.RESOURCE_SELECT_ONE:
    return <ResourceSelectOneComponent />;

    case MODALS.RESOURCE_SELECT_DISH:
    return <ResourceSelectDishComponent />;

    case MODALS.RESOURCE_SELECT_RATE:
    return <ResourceSelectRateComponent />;

    case MODALS.BUILDING_SELECT:
    return <BuildingSelectComponent />;

    case MODALS.EQUIPMENT_SELECT:
    return <EquipmentSelectComponent />;

    case MODALS.LEADER_SELECT:
    return <LeaderSelectComponent />;

    case MODALS.MEMO:
    return <MemoComponent />;

    case MODALS.BUILDING_DETAIL:
    case MODALS.BUILD_DETAIL:
    return <BuildingDetailComponent />;

    case MODALS.LEADER_DETAIL:
    return <LeaderDetailComponent />;

    case MODALS.LOGIN:
    return <LoginComponent />;

    case MODALS.SIGNUP:
    return <SignupComponent />;

    case MODALS.QUEST_QUIT_CONFIRM:
    return <QuestQuitConfirmComponent />;

    case MODALS.MESSAGES:
    return <MessagesComponent />;

    default:
    return null;
  }
}
