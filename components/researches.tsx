import React from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

import { consumeResources } from '../actions/vault';
import { startResearch } from '../actions/research_option_decks';
import { selectTab, displayModalValue } from '../actions/ui';
import BadgeComponent from './badge';
import IconComponent from './icon';
import ProgressBarComponent from './progress_bar';
import { styles } from '../styles';

import ResearchBranch from '../models/research_branch';
import Vault from '../models/vault';
import Resource from '../models/resource';
import ResearchOptionDeck from '../models/research_option_deck';
import Timer from '../models/timer';
import Icon from '../models/icon';
import Positioner from '../models/positioner';
import { researches } from '../instances/researches';
import { utils } from '../utils';
import { RESOURCE_TYPES } from '../enums/resource_types';
const RTY = RESOURCE_TYPES;
import { MODALS } from '../enums/modals';
import { RESEARCHES } from '../enums/researches';
import { TABS } from '../enums/tabs';
import { resourceTypes } from '../instances/resource_types';
import SvgComponent from './svg';

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
  const milestones = useTypedSelector(state => state.account.milestones);
  const positioner = useTypedSelector(state => state.ui.positioner);
  let uiArray: ResearchBranch[] = [];
  researchStatus.actions[TABS.RESEARCH]?.map((action) => {
    uiArray.push(new ResearchBranch({ type: 'action', name: action, status: '',
      children: [] }));
  });
  let researchArray = Object.keys(researchStatus.status).map((name) => {
    return {name: name, status: researchStatus.status[name]}
  });
  researchArray = researchArray.filter((r) => {
    if (r.status == 'visible' || r.status == 'repeatable' || r.status == 'completed') {
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
  const knowledgeIcon = new Icon({provider: 'FontAwesome5', name: 'graduation-cap',
    color: '#fff', size: 16});

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome" name="book" color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Research'}</Text>
      </View>
      <View style={styles.rows}>
        <Text style={styles.bareText}>
          {`${utils.formatNumberShort(vault.resources[RTY.KNOWLEDGE + '|0'].quantity)} available `}
        </Text>
        <IconComponent {...knowledgeIcon} />
        <Text style={styles.bareText}>{`Knowledge`}</Text>
      </View>
      <FlatList
        data={uiArray}
        renderItem={(item) => renderUiItem(item)}
        keyExtractor={research => research.type + '|' + research.name}>
      </FlatList>
    </View>
  );

  function renderUiItem(data: any) {
    switch(data.item.type) {
      case 'action':
      return renderActionItem(data.item.name);

      case 'research':
      return <ResearchDescription branch={data.item} vault={vault}
        startClick={startClick} rods={researchOptionDecks}
        milestones={milestones} positioner={positioner}
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
    if (studyTimer || analysisTimer || notesTimer) { buttonDisabled = true; }
    if (actionName === RESEARCHES.STUDY) {
      const resourcesToStudy = utils.filterOutZero(researchStatus.getResourcesToStudy(vault));
      if (resourcesToStudy.length === 0) { buttonDisabled = true; }
    }
    if (buttonDisabled) {
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
            width={positioner.majorWidth - positioner.minorPadding}
            startingProgress={matchingTimer.progress} endingProgress={1}
            duration={matchingTimer.endsAt - new Date(Date.now()).valueOf()}
            label={matchingTimer.remainingLabel} />
        </>
      );
    }
    return null;
  }

  function startClick(researchStatus: {name: string, status: string}, vault: Vault,
    milestones: { [name: string] : boolean }, resume: boolean = false) {
    let research = researches[researchStatus.name];
    const costType = (research.otherCost ? research.otherCost.type : RTY.KNOWLEDGE);
    const costResource = new Resource({
      type: costType,
      quality: 0,
      quantity: (research.otherCost ? research.otherCost.quantity : research.knowledgeCost)
    });
    if (resume) {
      dispatch(selectTab("Researching", researchStatus.name));
    }
    else if (costResource.quantity >= vault.resources[`${costResource.type}|0`]?.quantity) {
      dispatch(consumeResources(vault, [costResource]));
      dispatch(startResearch(researchStatus.name,
        utils.getResearchOptionSlots(milestones)));
      dispatch(selectTab("Researching", researchStatus.name));
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
  rods: { [researchName: string] : ResearchOptionDeck},
  milestones: { [name: string] : boolean }, positioner: Positioner}) {
  const {branch, vault, startClick, showCompletedResearches, rods, milestones, positioner} = props;
  const research = researches[branch.name];
  const resume = (rods[branch.name] !== undefined);

  if ((!showCompletedResearches && (branch.status != 'visible'
    && branch.status != 'repeatable')) || research.hidden) {
    return null;
  }
  
  return (
    <TouchableOpacity style={StyleSheet.flatten([styles.panelFlex,
      {minWidth: positioner.majorWidth, maxWidth: positioner.majorWidth}])} 
        onPress={() => {startClick(branch, vault, milestones, resume)}}>
      <BadgeComponent icon={research.icon} size={29} />
      <View style={styles.containerStretchColumn}>
        <Text>{research.name}</Text>
        <View style={styles.breakSmall} />
        <Text style={{fontSize: 12, fontStyle: 'italic', minWidth: positioner.bodyMedWidth, 
          maxWidth: positioner.bodyMedWidth}}>
          {research.unlocks}
        </Text>
        <View style={styles.breakSmall} />
        <Text>{renderCost(branch)}</Text>
      </View>
    </TouchableOpacity>
  );

  function renderCost(researchStatus: {name: string, status: string}) {
    const research = researches[researchStatus.name];
    const costType = (research.otherCost ? research.otherCost.type : RTY.KNOWLEDGE);
    const costResource = new Resource({
      type: costType,
      quality: 0,
      quantity: (research.otherCost ? research.otherCost.quantity : research.knowledgeCost)
    });
    const costIcon = new Icon({...resourceTypes[costType].icon, size: 20});
    if (rods[branch.name]) {
      let rod = rods[branch.name];
      if (rod.stepsCompleted < rod.stepsNeeded) {
        return (
          <Text>
            {`Resume: ${Math.round((rod.stepsCompleted / rod.stepsNeeded) * 100)}% completed`}
          </Text>
        )
      }
    }
    if (researchStatus.status == 'visible' || researchStatus.status == 'repeatable') {
      const prefix = researchStatus.status == 'visible' ? 'To start' : 'To repeat';
      let labelStyle: any[] = [styles.rows, {minWidth: positioner.bodyMedTextWidth, 
        maxWidth: positioner.bodyMedTextWidth}];
      const vaultQuantity = vault.resources[`${costResource.type}|0`]?.quantity || 0;
      if (vaultQuantity < costResource.quantity) {
        labelStyle.push({opacity: 0.5});
      }
      return (
        <View style={styles.rows}>
          <Text>{`${prefix}: `}</Text>
          <View style={labelStyle}>
            <Text>{`${utils.formatNumberShort(costResource.quantity)} `}</Text>
            <SvgComponent icon={costIcon} />
            <Text style={{marginLeft: 2}}>{`${costResource.type} (of ${utils.formatNumberShort(vaultQuantity)})`}</Text>
          </View>
        </View>);
    }
    return null;
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