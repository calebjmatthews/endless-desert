import React from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';
import { addQuest, removeQuest, addQuestCompleted, addToActivityQueue, payQuestTaskCost,
  setQuestReadyToComplete } from '../actions/quest_status';
import { increaseResources, consumeResources } from '../actions/vault';
import { addEquipment } from '../actions/equipment';
import { addLeader } from '../actions/leaders';
import { addTimer } from '../actions/timers';
import { tradingPartnerJoins } from '../actions/trading_status';
import { addMessage } from '../actions/messages';
import { addMemos, displayModalValue, addGlowingTab } from '../actions/ui';

import QuestStatus from '../models/quest_status';
import Quest from '../models/quest';
import QuestCompleted from '../models/quest_completed';
import QuestTask from '../models/quest_task';
import QuestProgress from '../models/quest_progress';
import QuestActivity from '../models/quest_activity';
import Resource from '../models/resource';
import Equipment from '../models/equipment';
import Leader from '../models/leader';
import Vault from '../models/vault';
import Memo from '../models/memo';
import Icon from '../models/icon';
import Timer from '../models/timer';
import Message from '../models/message';
import Positioner from '../models/positioner';
import { quests } from '../instances/quests';
import { leaderTypes } from '../instances/leader_types';
import { resourceTypes } from '../instances/resource_types';
import { utils } from '../utils';
import { QUEST_TYPES } from '../enums/quest_types';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { QUESTS } from '../enums/quests';
import { SVGS } from '../enums/svgs';
import { MODALS } from '../enums/modals';
import { TABS } from '../enums/tabs';

export default function QuestsComponent() {
  const dispatch = useDispatch();
  const questStatus = useTypedSelector(state => state.questStatus);
  const vault = useTypedSelector(state => state.vault);
  const researchStatus = useTypedSelector(state => state.researchStatus);
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
        return <QuestDescription quest={data.item.quest} completeQuest={completeQuest}
          quitQuest={quitQuest} vault={vault} positioner={positioner} />;
      } break;

      case 'quest_completed':
      if (data.item.questCompleted) {
        return <QuestCompletedDescription questCompleted={data.item.questCompleted}
          positioner={positioner} />;
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
      questsCompleted.push({ type: 'quest_completed', id: questCompleted.id,
        questCompleted });
    });
    questsCompleted = questsCompleted.sort((a, b) =>
      ( (a.questCompleted?.completedAt || 0) - (b.questCompleted?.completedAt || 0) ));
    uiArray = [...uiArray, ...questsCompleted];

    return uiArray;
  }

  function quitQuest(quest: Quest) {
    dispatch(displayModalValue(MODALS.QUEST_QUIT_CONFIRM, 'open', quest));
  }

  function completeQuest(quest: Quest) {
    let memos = [new Memo({ name: quest.id, title: quest.name,
      text: quest.finishText })];
      
    if (quest.gainResources) {
      let resourcesGained: Resource[] = [];
      let resourceNames: string[] = [];
      quest.gainResources.forEach((gain) => {
        const rToGain = utils.getMatchingResourceQuantity(gain, resourceNames);
        resourcesGained.push(new Resource(rToGain));
        resourceNames.push(rToGain.type);
        dispatch(addToActivityQueue(new QuestActivity({ id: utils.randHex(16),
          resourceGained: { type: rToGain.type, quantity: rToGain.quantity }})));
      });
      dispatch(increaseResources(vault, resourcesGained));
      memos[0].resourcesGained = resourcesGained;
    }
    if (quest.leaderJoins) {
      const leaderCreateRes =
          leaderTypes[quest.leaderJoins].createLeader(vault, resourceTypes);
      let tempEquipment: { [id: string] : Equipment } = {};
      let newEquipment: Equipment[] = [];
      leaderCreateRes.equipment.map((anEquipment) => {
        if (anEquipment) {
          tempEquipment[anEquipment.id] = anEquipment;
          newEquipment.push(anEquipment);
        }
      });
      dispatch(addEquipment(newEquipment));
      let leader = new Leader(leaderCreateRes.leader);
      leader.calcEffects(tempEquipment, {}, new Vault(null), []);
      dispatch(addLeader(leader));
      memos[0].leaderJoined = quest.leaderJoins;
    }
    if (quest.questsBegin) {
      quest.questsBegin.forEach((questName) => {
        dispatch(addQuest(quests[questName]));
        dispatch(addGlowingTab(TABS.QUESTS));
        dispatch(addMessage(new Message({
          text: `You began the quest ${quests[questName].name}.`,
          type: '',
          icon: quests[questName].icon
        })));
        const rtgExisting = quests[questName].taskCheckExisting(vault, researchStatus);
        rtgExisting.forEach((questActivity) => {
          dispatch(addToActivityQueue(questActivity));
        });
      });
    }
    if (quest.conversationBegins) {
      memos.push(new Memo({
        name: quest.conversationBegins.name,
        title: quest.conversationBegins.title,
        convoName: quest.conversationBegins.name
      }));
    }
    if (quest.tradingPartnerJoins) {
      dispatch(tradingPartnerJoins(quest.tradingPartnerJoins));
    }

    if (quest.id == QUESTS.EARLY_DAYS_MARK_EQUIPMENT) {
      dispatch(addTimer(new Timer({
        name: 'Daily quest',
        endsAt: (new Date(Date.now()).valueOf() + 100),
        dailyQuestCheck: true
      })));
    }

    dispatch(removeQuest(quest));
    dispatch(addQuestCompleted(new QuestCompleted({ id: quest.id, name: quest.name,
      icon: quest.icon, isDaily: quest.isDaily })));
    dispatch(addMemos(memos));
  }
}

const defaultIcon = new Icon({ provider: 'svg', name: SVGS.ROAD_SIGN });
function QuestDescription(props: { quest: Quest, vault: Vault,
  quitQuest: (quest: Quest) => void,
  completeQuest: (quest: Quest) => void, positioner: Positioner }) {
  const dispatch = useDispatch();
  const { quest, vault, quitQuest, completeQuest, positioner } = props;
  const icon = quest.icon || defaultIcon;
  const mandatoryQuest = (quest.type == QUEST_TYPES.PARAMOUNT
    || quest.type == QUEST_TYPES.OBLIGATORY);
  return (
    <View style={StyleSheet.flatten([styles.panelFlex,
      {minWidth: positioner.majorWidth,
        maxWidth: positioner.majorWidth}])} >
      <BadgeComponent icon={icon} size={29} />
      <View style={styles.containerSpacedColumn}>
        <View style={styles.buttonTextRow}>
          <Text>{quest.name}</Text>
          {!mandatoryQuest && renderQuitButton()}
        </View>
        <Text style={{fontSize: 12, fontStyle: 'italic',
          maxWidth: positioner.bodyMedWidth}}>
          {quest.description}
        </Text>
        {renderTasks(quest)}
        {renderReward(quest)}
      </View>
    </View>
  );

  function renderQuitButton() {
    return (
      <TouchableOpacity style={StyleSheet.flatten([styles.button,
        styles.buttonOutlineAway])}
        onPress={() => { quitQuest(quest) }}>
        <IconComponent provider="FontAwesome" name="trash"
          color="#5a201e" size={14} />
        <Text style={StyleSheet.flatten([styles.buttonTextSmall,
          styles.buttonTextAway])}>
          {' Quit'}
        </Text>
      </TouchableOpacity>
    );
  }

  function renderTasks(quest: Quest) {
    return (
      <View style={styles.columns}>
        {quest.tasks.map((task, index) => {
          return (
            <View key={index}>
              {(index === 0) && (
                <View style={styles.breakSmall} />
              )}
              {renderTask(task, quest.progress[index])}
              <View style={styles.breakSmall} />
            </View>
          );
        })}
      </View>
    );
  }

  function renderTask(task: QuestTask, progress: QuestProgress) {
    if (task.resourceToGain?.consumed || task.resourceToProduce?.consumed) {
      return renderTaskButton(task, progress);
    }
    else {
      return renderStandardTask(task, progress);
    }
  }

  function renderStandardTask(task: QuestTask, progress: QuestProgress) {
    const completed = task.isCompleted(progress);
    const color = completed ? "#6e78a2" : "#000";
    const progressLabel = task.getProgressLabel(progress);
    return (
      <View key={`${task.parentId}|${task.index}`}
        style={StyleSheet.flatten([styles.rows,
          {maxWidth: positioner.bodyMedWidth}])}>
        <View style={{width: 15, marginRight: 3}}>
          {completed ?
          <IconComponent provider="FontAwesome" name="check-square-o"
            color={color} size={16} /> :
          <IconComponent provider="FontAwesome" name="square-o"
            color={color} size={16} />}
        </View>
        <Text style={{fontSize: 12, color: color}}>
          {`${task.label} ${progressLabel}`}
        </Text>
      </View>
    )
  }

  function renderTaskButton(task: QuestTask, progress: QuestProgress) {
    const specificity = task.resourceToGain?.specificity
      || task.resourceToProduce?.specType.split('|')[0] || '';
    const type = task.resourceToGain?.type
      || task.resourceToProduce?.specType.split('|')[1] || '';
    const quantity = task.resourceToGain?.quantity
      || task.resourceToProduce?.quantity || 0;
    const progressLabel = task.getProgressLabel(progress);
    const completed = task.isCompleted(progress);
    const buttonStyle: any[] = [styles.buttonRowItemSmall];
    if (completed) {
      buttonStyle.push(styles.buttonDisabled);
    }
    return (
      <TouchableOpacity key={`${task.parentId}|${task.index}`} style={buttonStyle}
        disabled={completed} onPress={() => { applyCost({progress, 
          aCost: { specificity, type, quantity }}) }} >
        <View style={{width: 15, marginRight: 3}}>
          {completed ?
          <IconComponent provider="FontAwesome" name="check-square-o" color={'#fff'} size={16} /> :
          <IconComponent provider="FontAwesome" name="square-o" color={'#fff'} size={16} />}
        </View>
        <Text style={styles.buttonTextSmall}>
          {`${task.label} ${!completed ? progressLabel : ''}`}
        </Text>
      </TouchableOpacity>
    )
  }

  function applyCost(args: {progress: QuestProgress,
    aCost: {specificity: string, type: string, quantity: number}}) {
    const { progress, aCost } = args;
    let rTypePool: string[] = [];
    switch(aCost.specificity) {
      case RESOURCE_SPECIFICITY.EXACT:
      rTypePool = [(aCost.type + '|0')];
      break;

      case RESOURCE_SPECIFICITY.TAG:
      let tagPool = vault.getTagResources(aCost.type);
      rTypePool = tagPool.map((resource) => {
        return (resource.type + '|' + resource.quality);
      });
      break;

      case RESOURCE_SPECIFICITY.SUBCATEGORY:
      let scPool = vault.getSubcategoryResources(aCost.type);
      rTypePool = scPool.map((resource) => {
        return (resource.type + '|' + resource.quality);
      });
      break;

      case RESOURCE_SPECIFICITY.CATEGORY:
      let catPool = vault.getCategoryResources(aCost.type);
      rTypePool = catPool.map((resource) => {
        return (resource.type + '|' + resource.quality);
      });
      break;
    }

    if (rTypePool.length === 1) {
      const qtSplit = rTypePool[0].split('|');
      dispatch(consumeResources(vault, [new Resource({type: qtSplit[0],
        quality: parseInt(qtSplit[1]), quantity: aCost.quantity})]));
      dispatch(payQuestTaskCost(progress, aCost));
      const tempQuest = new Quest(quest);
      tempQuest.progress[progress.index].resourcesConsumed = true;
      let readyToComplete = true;
      tempQuest.progress.forEach((questProgress) => {
        if (!questProgress.resourcesConsumed) { readyToComplete = false; }
      });
      if (readyToComplete) { dispatch(setQuestReadyToComplete(quest.id)); }
    }
    else {
      dispatch(displayModalValue(MODALS.RESOURCE_SELECT, 'open',
        {type: TABS.QUESTS, aCost, quest, questProgress: progress}));
    }
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
    if (!quest.gainResources && !quest.leaderJoins) {
      actionLabel = 'Reward Unknown';
    }
    return (
      <View style={styles.buttonRow}>
        <TouchableOpacity style={StyleSheet.flatten([buttonStyle,
          {minWidth: (positioner.bodyMedWidth - 10),
            maxWidth: (positioner.bodyMedWidth - 10)}])}
          disabled={!quest.readyToComplete}
          onPress={() => { rewardPress(quest) }} >
          <Text style={styles.buttonText}>{actionLabel}</Text>
          {icon && <BadgeComponent icon={icon} size={19} />}
          <Text style={styles.buttonText}>{subjectLabel}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function rewardPress(quest: Quest) {
    completeQuest(quest);
  }
}

function QuestCompletedDescription(props: { questCompleted: QuestCompleted,
  positioner: Positioner }) {
  const icon = props.questCompleted.icon || defaultIcon;
  return (
    <View style={StyleSheet.flatten([styles.panelFlex,
      {minWidth: props.positioner.majorWidth,
        maxWidth: props.positioner.majorWidth, opacity: 0.75}])} >
      <BadgeComponent icon={icon} size={23} />
      <View style={styles.containerSpacedColumn}>
        <Text>
          {props.questCompleted.name}
        </Text>
      </View>
    </View>
  );
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
