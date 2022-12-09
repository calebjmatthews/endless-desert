import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import IconComponent from './icon';
import { setCurrentFortuity, fortuitySeen, setFortuityDailyLast }
  from '../actions/account';
import { increaseResources } from '../actions/vault';
import { addQuest, addToActivityQueue } from '../actions/quest_status';
import { addTimer } from '../actions/timers';
import { addMemos, addGlowingTab } from '../actions/ui';
import { addMessage } from '../actions/messages';

import Resource from '../models/resource';
import Timer from '../models/timer';
import Message from '../models/message';
import { quests } from '../instances/quests';
import { utils } from '../utils';
import { FORTUITY_BASE } from '../constants';
import { TABS } from '../enums/tabs';

export default function FortuityComponent() {
  const dispatch = useDispatch();
  const fortuityCurrent = useTypedSelector(state => state.account.fortuityCurrent);
  const vault = useTypedSelector(state => state.vault);
  const researchStatus = useTypedSelector(state => state.researchStatus);
  const positioner = useTypedSelector(state => state.ui.positioner);

  if (!fortuityCurrent) { return null; }
  return (
    <>
      <View style={styles.spacedRows}>
        <TouchableOpacity style={styles.buttonLarge}
          onPress={() => { fortuityPress() }}>
          <IconComponent provider="FontAwesome5" name="exclamation-circle"
            color="#fff" size={16} style={styles.headingIcon} />
          <Text style={[styles.buttonText, {marginLeft: 10, textAlign: 'left', 
            maxWidth: positioner.majorWidth}]}>
            {fortuityCurrent.openLine}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.break} />
    </>
  );

  function fortuityPress() {
    if (!fortuityCurrent) { return null; }
    let memos = fortuityCurrent.memos.slice() || [];
    if (fortuityCurrent.gainResources) {
      const fgr = fortuityCurrent.gainResources;
      let resourcesGained: Resource[] = [];
      let resourceNames: string[] = [];
      for (let index = 0; index < fgr.length; index++) {
        const resReq = fgr[index];
        const rToGain = utils.getMatchingResourceQuantity(resReq, resourceNames);
        resourcesGained.push(new Resource(rToGain));
        resourceNames.push(rToGain.type);
      }
      memos[memos.length-1].resourcesGained = resourcesGained;
      dispatch(increaseResources(vault, resourcesGained));
    }
    if (fortuityCurrent.questsBegin) {
      fortuityCurrent.questsBegin.forEach((questName) => {
        dispatch(addQuest(quests[questName]));
        dispatch(addGlowingTab(TABS.QUESTS));
        dispatch(addMessage(new Message({
          text: `You began the quest ${quests[questName].name}.`,
          type: '',
          icon: quests[questName].icon
        })));
        const rtgExisting = quests[questName].taskCheckExisting(vault,
          researchStatus);
        rtgExisting.forEach((questActivity) => {
          dispatch(addToActivityQueue(questActivity));
        });
      });
      memos[memos.length-1].questsBegin = fortuityCurrent.questsBegin;
    }
    dispatch(addMemos(fortuityCurrent.memos));
    dispatch(setCurrentFortuity(null));
    dispatch(fortuitySeen(fortuityCurrent.name));
    if (fortuityCurrent.repeatable) {
      const currentTimestamp = new Date(Date.now()).valueOf();
      dispatch(setFortuityDailyLast(currentTimestamp));
    }
    dispatch(addTimer(new Timer({
      name: 'Fortuity',
      endsAt: (new Date(Date.now()).valueOf()
        + Math.floor(utils.random() * FORTUITY_BASE) + (FORTUITY_BASE / 2)),
      fortuityCheck: true
    })));
  }
}
