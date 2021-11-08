import React from 'react';
import { Text, View, FlatList, Button, TouchableOpacity, StyleSheet, ScrollView }
  from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';

import QuestStatus from '../models/quest_status';
import Quest from '../models/quest';
import QuestCompleted from '../models/quest_completed';
import QuestTask from '../models/quest_task';
import QuestProgress from '../models/quest_progress';
import Icon from '../models/icon';
import Positioner from '../models/positioner';
import { leaderTypes } from '../instances/leader_types';
import { utils } from '../utils';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { SVGS } from '../enums/svgs';

export default function QuestsComponent() {
  const dispatch = useDispatch();
  const questStatus = useTypedSelector(state => state.questStatus);
  const positioner = useTypedSelector(state => state.ui.positioner);

  const uiArray: UiItem[] = getUiArray(questStatus);

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome5" name="medal"
          color="#fff" size={20} style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Quests'}</Text>
      </View>
      <FlatList
        data={uiArray}
        renderItem={renderUiArray}
        keyExtractor={anEquipment => anEquipment.id}>
      </FlatList>
    </View>
  );

  function renderUiArray(data: { item: UiItem }) {
    switch(data.item.type) {
      case 'category':
      return <CategoryDescription name={data.item.id} positioner={positioner} />;

      case 'quest':
      if (data.item.quest) {
        return <QuestDescription quest={data.item.quest} positioner={positioner} />;
      } break;
    }
    return null;
  }

  function getUiArray(questStatus: QuestStatus) {
    let uiArray: UiItem[] = [];
    uiArray.push({ type: 'category', id: 'quests_active' });

    let quests: UiItem[] = [];
    Object.keys(questStatus.quests).forEach((id) => {
      const quest = questStatus.quests[id];
      quests.push({ type: 'quest', id: quest.id, quest});
    });
    quests = quests.sort((a, b) =>
      ( (a.quest?.beganAt || 0) - (b.quest?.beganAt || 0) ));
    uiArray = [...uiArray, ...quests];

    uiArray.push({ type: 'category', id: 'quests_completed' });
    let questsCompleted: UiItem[] = [];
    Object.keys(questStatus.questsCompleted).forEach((id) => {
      const questCompleted = questStatus.questsCompleted[id];
      questsCompleted.push({ type: 'quest', id: questCompleted.id, questCompleted });
    });
    questsCompleted = questsCompleted.sort((a, b) =>
      ( (a.questCompleted?.completedAt || 0) - (b.questCompleted?.completedAt || 0) ));
    uiArray = [...uiArray, ...questsCompleted];

    return uiArray;
  }
}

const defaultIcon = new Icon({ provider: 'svg', name: SVGS.ROAD_SIGN });
function QuestDescription(props: { quest: Quest, positioner: Positioner }) {
  const icon = props.quest.icon || defaultIcon;
  return (
    <View style={StyleSheet.flatten([styles.panelFlex,
      {minWidth: props.positioner.majorWidth,
        maxWidth: props.positioner.majorWidth}])} >
      <BadgeComponent icon={icon} size={29} />
      <View style={styles.containerSpacedColumn}>
        <Text>
          {props.quest.name}
        </Text>
        <Text style={{fontSize: 12, fontStyle: 'italic'}}>
          {props.quest.description}
        </Text>
        {renderTasks(props.quest)}
        {renderReward(props.quest)}
      </View>
    </View>
  );

  function renderTasks(quest: Quest) {
    return (
      <View style={styles.columns}>
        {quest.tasks.map((task, index) => {
          return renderTask(task, quest.progress[index]);
        })}
      </View>
    );
  }

  function renderTask(task: QuestTask, progress: QuestProgress) {
    const completed = task.isCompleted(progress);
    const color = completed ? "#6e78a2" : "#000";
    return (
      <View key={`${task.parentId}|${task.index}`} style={styles.rows}>
        {completed ?
          <IconComponent provider="FontAwesome" name="check-square-o"
            color={color} size={16} /> :
          <IconComponent provider="FontAwesome" name="square-o"
            color={color} size={16} />}
        <Text style={{fontSize: 12, color: color}}>{` ${task.label}`}</Text>
      </View>
    )
  }

  function renderReward(quest: Quest) {
    const buttonStyle = quest.readyToComplete ? styles.buttonRowItem :
      StyleSheet.flatten([styles.buttonRowItem, styles.buttonDisabled]);
    let actionLabel = 'Finish';
    let icon: Icon|null = null;
    let subjectLabel = '';
    if (quest.gainResources) {
      actionLabel = 'Gain ';
      const gain = quest.gainResources[0];
      const kind = utils.getMatchingResourceKind(gain.specificity, gain.type);
      icon = kind.icon;
      let quantity = Math.floor(gain.value / (kind.value || 1)).toString();
      (gain.specificity == RESOURCE_SPECIFICITY.EXACT) ? (quantity = 'x' + quantity) :
        (quantity = '~' + quantity);
      subjectLabel = `${kind.name} ${quantity}`;
      if (quest.gainResources.length > 1) { subjectLabel += ' and more'; }
    }
    if (quest.leaderJoins) {
      actionLabel = '';
      const leaderType = leaderTypes[quest.leaderJoins];
      icon = leaderType.icon;
      subjectLabel = leaderType.name + ' joins!';
    }
    if (!quest.readyToComplete) {
      actionLabel = 'Reward: ';
    }
    return (
      <View style={styles.buttonRow}>
        <TouchableOpacity style={buttonStyle} disabled={!quest.readyToComplete}
          onPress={() => { }} >
          <Text style={styles.buttonText}>{actionLabel}</Text>
          {icon && <BadgeComponent icon={icon} size={19} />}
          <Text style={styles.buttonText}>{subjectLabel}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const display: { [name: string] : { provider: string, name: string, label: string }} = {
  'quests_active': { provider: 'FontAwesome', name: 'flag-o', label: 'Active Quests' },
  'quests_completed': { provider: "FontAwesome", name: "flag",
    label: 'Completed Quests' }
}
function CategoryDescription(props: { name: string, positioner: Positioner }) {
  const width = props.positioner.majorWidth - 5;
  return (
    <View style={StyleSheet.flatten([styles.rows,
      {marginLeft: 10, marginTop: 10, minWidth: width, maxWidth: width}])} >
      <IconComponent provider={display[props.name].provider} style={styles.headingIcon}
        name={display[props.name].name} color="#fff" size={20} />
      <View style={StyleSheet.flatten([styles.containerStretchRow,
        {justifyContent: 'space-between'}])}>
        <View>
          <Text style={styles.bareText}>
            {` ${display[props.name].label}`}
          </Text>
        </View>
      </View>
    </View>
  );
}

interface UiItem {
  type: string;
  id: string;
  quest?: Quest;
  questCompleted?: QuestCompleted;
}
