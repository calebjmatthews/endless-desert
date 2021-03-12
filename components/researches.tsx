import React from 'react';
import { Text, View, FlatList, Button, TouchableOpacity, StyleSheet, ScrollView }
  from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

import { consumeResources } from '../actions/vault';
import { completeResearch } from '../actions/research_status';
import { startResearch } from '../actions/research_option_decks';
import { selectTab, displayModalValue } from '../actions/ui';
import BadgeComponent from './badge';
import IconComponent from './icon';
import ProgressBarComponent from './progress_bar';
import { styles } from '../styles';

import Research from '../models/research';
import ResearchStatus from '../models/research_status';
import Vault from '../models/vault';
import ResearchOptionDeck from '../models/research_option_deck';
import Timer from '../models/timer';
import Positioner from '../models/positioner';
import { researches } from '../instances/researches';
import { utils } from '../utils';
import { RESOURCE_TYPES } from '../enums/resource_types';
import { MODALS } from '../enums/modals';
import { RESEARCHES } from '../enums/researches';

export default function ResearchesComponent() {
  const dispatch = useDispatch();
  const vault = useTypedSelector(state => state.vault);
  const researchStatus = useTypedSelector(state => state.researchStatus);
  const researchOptionDecks =
    useTypedSelector(state => state.researchOptionDecks);
  const studyTimer = useTypedSelector(state => state.timers[RESEARCHES.STUDY]);
  const analysisTimer = useTypedSelector(state => state.timers[RESEARCHES.ANALYSIS]);
  const showCompletedResearches =
    useTypedSelector(state => state.account.showCompletedResearches);
  const positioner = useTypedSelector(state => state.ui.positioner);
  let researchArray = Object.keys(researchStatus.status).map((name) => {
    return {name: name, status: researchStatus.status[name]}
  });
  researchArray = researchArray.filter((r) => {
    if (r.status == 'visible' || r.status == 'completed') {
      return r;
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome" name="book" color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Research'}</Text>
      </View>
      {renderActions()}
      <View>
        <Text style={styles.bareText}>
          {utils.formatNumberShort(vault.resources[RESOURCE_TYPES.KNOWLEDGE + '|0']
          .quantity) + ' available knowledge'}
        </Text>
      </View>
      <FlatList
        data={researchArray}
        renderItem={(item) => renderResearch(item, startClick)}
        keyExtractor={research => research.name}>
      </FlatList>
    </View>
  );

  function renderResearch(research: any, startClick: Function) {
    return <ResearchDescription research={research} vault={vault}
      startClick={startClick} rods={researchOptionDecks} positioner={positioner}
      showCompletedResearches={showCompletedResearches} />
  }

  function renderActions() {
    let actions = researchStatus.actions['Research'];
    if (actions) {
      return (
        <View>
          {renderActionItems(actions)}
        </View>
      );
    }
    return null;
  }

  function renderActionItems(actionNames: string[]) {
    return actionNames.map((actionName) => {
      let research = researches[actionName];
      let buttonDisabled = false;
      let buttonStyle: any = StyleSheet.flatten([styles.buttonRowItem,
        {'flexGrow': 10}]);
      if (studyTimer) {
        buttonDisabled = true;
        buttonStyle = StyleSheet.flatten([styles.buttonRowItem, styles.buttonDisabled,
          {'flexGrow': 10}]);
      }
      return (
        <View key={actionName}
          style={StyleSheet.flatten([styles.panelFlex,
            {minWidth: positioner.majorWidth,
              maxWidth: positioner.majorWidth, minHeight: 0}])} >
          <View style={styles.containerStretchColumn}>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={buttonStyle} disabled={buttonDisabled}
                onPress={() => { actionClick(actionName) }}>
                <IconComponent provider={research.icon.provider}
                  name={research.icon.name}
                  color="#fff" size={16} />
                <Text style={styles.buttonText}>{' ' + research.name}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={StyleSheet.flatten([styles.buttonRowItem,
                styles.buttonLight])}>
                <IconComponent provider="FontAwesome5" name="question-circle"
                  color="#17265d" size={16} />
                <Text style={styles.buttonTextDark}>{' Help'}</Text>
              </TouchableOpacity>
            </View>
            {renderActionProgressBar(actionName)}
          </View>
        </View>
      );
    });
  }

  function renderActionProgressBar(actionName: string) {
    let matchingTimer: Timer|null = null;
    switch(actionName) {
      case RESEARCHES.STUDY:
      matchingTimer = studyTimer;
      break;

      case RESEARCHES.ANALYSIS:
      matchingTimer = analysisTimer;
      break;
    }
    if (matchingTimer) {
      return (
        <>
          <View style={styles.break} />
          <ProgressBarComponent staticDuration={true}
            startingProgress={matchingTimer.progress} endingProgress={1}
            duration={matchingTimer.endsAt - new Date(Date.now()).valueOf()}
            label={matchingTimer.remainingLabel} />
        </>
      );
    }
    return null;
  }

  function startClick(researchStatus: {name: string, status: string}, vault: Vault,
    resume: boolean = false) {
    let research = researches[researchStatus.name];
    let quantity = vault.resources[RESOURCE_TYPES.KNOWLEDGE + '|0'].quantity;
    if (resume) {
      dispatch(selectTab("Researching", researchStatus.name));
    }
    else if (quantity >= research.knowledgeReq) {
      dispatch(consumeResources(vault, [{
        type: RESOURCE_TYPES.KNOWLEDGE,
        quality: 0,
        quantity: research.knowledgeReq
      }]));
      dispatch(startResearch(researchStatus.name));
      dispatch(selectTab("Researching", researchStatus.name));
    }
    else {
      console.log('Not enough knowledge!');
    }
  }

  function actionClick(actionName: string) {
    dispatch(displayModalValue(MODALS.RESOURCE_SELECT_ONE, 'open',
      {type: actionName}));
  }
}

function ResearchDescription(props: {research: any, vault: Vault,
  startClick: Function, showCompletedResearches: boolean,
  rods: { [researchName: string] : ResearchOptionDeck}, positioner: Positioner}) {
  const researchStatus: {name: string, status: string} = props.research.item;
  const research = researches[researchStatus.name];

  if (!props.showCompletedResearches && researchStatus.status != 'visible') {
    return null;
  }

  return (
    <View style={StyleSheet.flatten([styles.panelFlex,
      {minWidth: props.positioner.majorWidth,
        maxWidth: props.positioner.majorWidth}])} >
      <BadgeComponent
        provider={research.icon.provider}
        name={research.icon.name}
        foregroundColor={research.foregroundColor}
        backgroundColor={research.backgroundColor}
        iconSize={18} />
      <View style={styles.containerStretchColumn}>
        <Text>{research.name}</Text>
        <Text>{renderCost(researchStatus)}</Text>
        <View style={styles.buttonRow}>
          {renderStart()}
          <TouchableOpacity style={StyleSheet.flatten([styles.buttonRowItem,
            styles.buttonLight])}>
            <IconComponent provider="FontAwesome5" name="angle-down"
              color="#17265d" size={16} />
            <Text style={styles.buttonTextDark}>{' Info'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  function renderCost(researchStatus: {name: string, status: string}) {
    const research = researches[researchStatus.name];
    if (researchStatus.status == 'visible') {
      return <View><Text>{'To start: ' + research.knowledgeReq + ' knowledge'}</Text></View>;
    }
    return null;
  }

  function renderStart() {
    if (props.rods[researchStatus.name]) {
      let rod = props.rods[researchStatus.name];
      if (rod.stepsCompleted < rod.stepsNeeded) {
        return (
          <TouchableOpacity style={styles.buttonRowItem}
            onPress={() => {props.startClick(researchStatus, props.vault, true)}} >
            <IconComponent provider="MaterialCommunityIcons" name="feather"
              color="#fff" size={16} />
            <Text style={styles.buttonText}>{' Resume'}</Text>
          </TouchableOpacity>
        );
      }
    }
    if (researchStatus.status == 'visible') {
      return (
        <TouchableOpacity style={styles.buttonRowItem}
          onPress={() => {props.startClick(researchStatus, props.vault)}} >
          <IconComponent provider="MaterialCommunityIcons" name="feather"
            color="#fff" size={16} />
          <Text style={styles.buttonText}>{' Start'}</Text>
        </TouchableOpacity>
      );
    }
    let buttonStyle = StyleSheet.compose(styles.buttonRowItem, styles.buttonDisabled);
    return (
      <TouchableOpacity style={buttonStyle}
        onPress={() => {}} disabled >
        <IconComponent provider="FontAwesome5" name="check"
          color="#fff" size={16} />
        <Text style={styles.buttonText}>{' Done'}</Text>
      </TouchableOpacity>
    );
  }
}
