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
import ResearchBranch from '../models/research_branch';
import Vault from '../models/vault';
import Resource from '../models/resource';
import ResearchOptionDeck from '../models/research_option_deck';
import Timer from '../models/timer';
import Positioner from '../models/positioner';
import { researches } from '../instances/researches';
import { utils } from '../utils';
import { RESOURCE_TYPES } from '../enums/resource_types';
import { MODALS } from '../enums/modals';
import { RESEARCHES } from '../enums/researches';
import { TABS } from '../enums/tabs';

export default function ResearchesComponent() {
  const dispatch = useDispatch();
  const vault = useTypedSelector(state => state.vault);
  const researchStatus = useTypedSelector(state => state.researchStatus);
  const researchOptionDecks =
    useTypedSelector(state => state.researchOptionDecks);
  const studyTimer = useTypedSelector(state => state.timers[RESEARCHES.STUDY]);
  const analysisTimer = useTypedSelector(state => state.timers[RESEARCHES.ANALYSIS]);
  const notesTimer = useTypedSelector(state => state.timers[RESEARCHES.FIELD_NOTES]);
  const showCompletedResearches =
    useTypedSelector(state => state.account.showCompletedResearches);
  const positioner = useTypedSelector(state => state.ui.positioner);
  let uiArray: ResearchBranch[] = [];
  researchStatus.actions[TABS.RESEARCH].map((action) => {
    uiArray.push(new ResearchBranch({ type: 'action', name: action, status: '',
      children: [] }));
  });
  let researchArray = Object.keys(researchStatus.status).map((name) => {
    return {name: name, status: researchStatus.status[name]}
  });
  researchArray = researchArray.filter((r) => {
    if (r.status == 'visible' || r.status == 'completed') {
      return r;
    }
  });
  const researchTree = researchStatus.getResearchTree(showCompletedResearches);
  Object.keys(researchTree).map((rName) => {
    const rBranch = researchTree[rName];
    if (rBranch.children.length > 0) {
      uiArray.push(rBranch);
      rBranch.children.map((child) => {
        uiArray.push(child);
      });
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome" name="book" color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Research'}</Text>
      </View>
      <View>
        <Text style={styles.bareText}>
          {utils.formatNumberShort(vault.resources[RESOURCE_TYPES.KNOWLEDGE + '|0']
          .quantity) + ' available knowledge'}
        </Text>
      </View>
      <FlatList
        data={uiArray}
        renderItem={(item) => renderUiItem(item)}
        keyExtractor={research => research.name}>
      </FlatList>
    </View>
  );

  function renderUiItem(data: any) {
    switch(data.item.type) {
      case 'action':
      return <>{renderActionItem(data.item.name)}</>

      case 'research':
      return <ResearchDescription branch={data.item} vault={vault}
        startClick={startClick} rods={researchOptionDecks} positioner={positioner}
        showCompletedResearches={showCompletedResearches} />

      case 'category':
      return <CategoryDescription branch={data.item} positioner={positioner} />

      default:
      return null;
    }
  }

  function renderActionItem(actionName: string) {
    let research = researches[actionName];
    let buttonDisabled = false;
    let buttonStyle: any = StyleSheet.flatten([styles.buttonRowItem,
      {'flexGrow': 10}]);
    if (studyTimer || analysisTimer || notesTimer) {
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

      case RESEARCHES.FIELD_NOTES:
      matchingTimer = notesTimer;
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
      dispatch(consumeResources(vault, [new Resource({
        type: RESOURCE_TYPES.KNOWLEDGE,
        quality: 0,
        quantity: research.knowledgeReq
      })]));
      dispatch(startResearch(researchStatus.name));
      dispatch(selectTab("Researching", researchStatus.name));
    }
    else {
      console.log('Not enough knowledge!');
    }
  }

  function actionClick(actionName: string) {
    switch(actionName) {
      case RESEARCHES.STUDY:
      case RESEARCHES.ANALYSIS:
      dispatch(displayModalValue(MODALS.RESOURCE_SELECT_ONE, 'open',
        {type: actionName})); break;

      case RESEARCHES.FIELD_NOTES:
      dispatch(displayModalValue(MODALS.BUILDING_SELECT, 'open',
        {type: TABS.RESEARCH, subType: actionName})); break;
    }
  }
}

function ResearchDescription(props: {branch: ResearchBranch, vault: Vault,
  startClick: Function, showCompletedResearches: boolean,
  rods: { [researchName: string] : ResearchOptionDeck}, positioner: Positioner}) {
  const research = researches[props.branch.name];

  if (!props.showCompletedResearches && props.branch.status != 'visible') {
    return null;
  }

  return (
    <View style={StyleSheet.flatten([styles.panelFlex,
      {minWidth: props.positioner.majorWidth,
        maxWidth: props.positioner.majorWidth}])} >
      <BadgeComponent icon={research.icon} size={29} />
      <View style={styles.containerStretchColumn}>
        <Text>{research.name}</Text>
        <Text>{renderCost(props.branch)}</Text>
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
      return (
        <View>
          <Text>{'To start: ' + utils.formatNumberShort(research.knowledgeReq)
            + ' knowledge'}</Text>
        </View>);
    }
    return null;
  }

  function renderStart() {
    if (props.rods[props.branch.name]) {
      let rod = props.rods[props.branch.name];
      if (rod.stepsCompleted < rod.stepsNeeded) {
        return (
          <TouchableOpacity style={styles.buttonRowItem}
            onPress={() => {props.startClick(props.branch, props.vault, true)}} >
            <IconComponent provider="MaterialCommunityIcons" name="feather"
              color="#fff" size={16} />
            <Text style={styles.buttonText}>{' Resume'}</Text>
          </TouchableOpacity>
        );
      }
    }
    if (props.branch.status == 'visible') {
      return (
        <TouchableOpacity style={styles.buttonRowItem}
          onPress={() => {props.startClick(props.branch, props.vault)}} >
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

function CategoryDescription(props: {branch: ResearchBranch, positioner: Positioner}) {
  const rCat = researches[props.branch.name];

  return (
    <View style={StyleSheet.flatten([styles.rows,
      {marginLeft: 10, marginTop: 10, minWidth: props.positioner.majorWidth,
        maxWidth: props.positioner.majorWidth}])} >
      <IconComponent provider={rCat.icon.provider} name={rCat.icon.name}
        color="#fff" size={20} style={styles.headingIcon} />
      <View style={styles.containerStretchRow}>
        <View>
          <Text style={styles.bareText}>
            {' ' + rCat.name}
          </Text>
        </View>
      </View>

    </View>
  );
}
