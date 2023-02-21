import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { View, Text, ScrollView } from 'react-native';
import { styles } from '../../styles';

import SceneSegmentComponent from './segment';
import { addSceneStep, gainSceneResources } from '../../actions/scene_status';
import { increaseResources } from '../../actions/vault';
import { increaseExpeditionResources, updateExpeditionCurrentCoordinates }
  from '../../actions/expedition_status';
import { unlockTab } from '../../actions/account';
import { addQuest, addToActivityQueue } from '../../actions/quest_status';
import { addGlowingTab } from '../../actions/ui';
import { addMessage } from '../../actions/messages';
import { addEquipment } from '../../actions/equipment';
import { addLeader } from '../../actions/leaders';
import { completeResearch } from '../../actions/research_status';

import SceneStatus from '../../models/scene_status';
import Leader from '../../models/leader';
import Vault from '../../models/vault';
import ExpeditionStatus from '../../models/expedition_status';
import Resource from '../../models/resource';
import Account from '../../models/account';
import QuestStatus from '../../models/quest_status';
import Message from '../../models/message';
import Equipment from '../../models/equipment';
import ResearchStatus from '../../models/research_status';
import Positioner from '../../models/positioner';
import { scenes, sceneTexts, sceneActions } from '../../instances/scenes';
import { quests } from '../../instances/quests';
import { leaderTypes } from '../../instances/leader_types';
import { resourceTypes } from '../../instances/resource_types';
import { utils } from '../../utils';
import { TABS } from '../../enums/tabs';
import { QUESTS } from '../../enums/quests';

const SceneComponent = () => {
  const sceneStatus = useTypedSelector(state => state.sceneStatus);
  const leaders = useTypedSelector(state => state.leaders);
  const vault = useTypedSelector(state => state.vault);
  const expeditionStatus = useTypedSelector(state => state.expeditionStatus);
  const questStatus = useTypedSelector(state => state.questStatus);
  const account = useTypedSelector(state => state.account);
  const researchStatus = useTypedSelector(state => state.researchStatus);
  const pos = useTypedSelector(state => state.ui.positioner);

  return useMemo(() => (
    <SceneStatic sceneStatus={sceneStatus} leaders={leaders} vault={vault}
      expeditionStatus={expeditionStatus} account={account} questStatus={questStatus}
      researchStatus={researchStatus} pos={pos} />
  ), [pos]);
}

const SceneStatic = (props: SceneStaticProps) => {
  const { sceneStatus, leaders, vault, expeditionStatus, account, questStatus, researchStatus } = props;
  const dispatch = useDispatch();
  let scrollView : React.RefObject<ScrollView> = useRef(null);
  const [initialized, setInitialized] = useState(false);
  const [segments, setSegments] = useState<Segment[]>([]);

  const scene = scenes[sceneStatus.sceneId];

  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      if (sceneStatus.steps.length === 0) {
        setSegments([{ id: scene.next?.ids[0] || '', type: 'SceneText', animate: true }]);
      }
      // setSegments from sceneState here
    }
  }, [initialized]);

  const doneAnimating = (args: { id: string, type: string }) => {
    const { id, type } = args;
    const newSegments: Segment[] = [...segments];
    let segmentsChanged: boolean = false;

    switch(type) {
      case 'SceneText':
      const sceneText = sceneTexts[id];
      dispatch(addSceneStep(id));

      sceneText.next?.ids.forEach((nextId) => {
        if (sceneText.next?.type === 'SceneAction') {
          newSegments.push({ id: nextId, type: 'SceneAction', animate: true });
          segmentsChanged = true;
        }
        else if (sceneText.next?.type === 'SceneText') {
          const nextSceneText = sceneTexts[sceneText.next?.ids[0]];
          if (nextSceneText) {
            // If two narrations in a row, a WaitButton should be used
            // to leave a "..." SceneActed behind
            const type = (sceneText.subType !== 'narration' || nextSceneText.subType !== 'narration')
              ? 'NextButton' : 'WaitButton';
            newSegments.push({ id, type, animate: true });
            segmentsChanged = true;
          }
        }
      });

      if (sceneText.outcome) {
        newSegments.push({ id, type: 'SceneOutcome', animate: true });
        segmentsChanged = true;
      }

      if (!sceneText.next) {
        newSegments.push({ id, type: 'FinalButton', animate: true });
        segmentsChanged = true;
      }
      break;

      case 'SceneOutcome':
      // render NextButton?
      break;
    }

    if (segmentsChanged) {
      setSegments(newSegments);
    }
  };

  const handlePress = (args: { id: string, type: string }) => {
    const { id, type } = args;
    console.log(`{ id, type }`, { id, type });
    let newSegments: Segment[] = [...segments];
    let segmentsChanged: boolean = false;

    switch(type) {
      // SceneAction => add to sceneStatus.steps, remove SceneActions, add SceneActed, 
      // render .next SceneText
      case 'SceneAction':
      const sceneAction = sceneActions[id];
      dispatch(addSceneStep(id));
      newSegments = newSegments.filter((segment) => (segment.type !== 'SceneAction'));
      newSegments.push({ id, type: 'SceneActed', animate: false });
      segmentsChanged = true;
      sceneAction.next?.ids.forEach((nextId) => {
        newSegments.push({ id: nextId, type: sceneAction.next?.type || 'SceneText', animate: true });
      });
      break;

      // NextButton => remove NextButton, render .next SceneText using previous' id
      case 'NextButton':
      newSegments = newSegments.filter((segment) => (segment.type !== 'NextButton'));
      segmentsChanged = true;
      const sceneTextNB = sceneTexts[id];
      sceneTextNB.next?.ids.forEach((nextId) => {
        newSegments.push({ id: nextId, type: sceneAction.next?.type || 'SceneText', animate: true });
      });
      break;

      // WaitButton => remove WaitButton, add "..." SceneActed, render .next SceneText using previous' id
      case 'WaitButton':
      newSegments = newSegments.filter((segment) => (segment.type !== 'WaitButton'));
      segmentsChanged = true;
      newSegments.push({ id, type: 'SceneActed', animate: false });
      const sceneTextWB = sceneTexts[id];
      sceneTextWB.next?.ids.forEach((nextId) => {
        newSegments.push({ id: nextId, type: sceneTextWB.next?.type || 'SceneText', animate: true });
      });
      break;

      // FinalButton => perform endScene()
      case 'FinalButton':
      break;
    }

    let nextId = (type === 'SceneAction') ? sceneActions[id].next?.ids[0] : sceneTexts[id].next?.ids[0];
    const sceneText = sceneTexts[nextId || id || ''];
    if (sceneText?.outcome && type !== 'FinalButton') {
      const { gainResources, affectLeader, changeLocation, leaderJoins, questsBegin } = sceneText.outcome;
      const expedition = props.expeditionStatus.expeditions[sceneStatus.expeditionId || ''];
      // const expeditions = props.expeditionStatus.expeditions;
      // const expedition = expeditions[Object.keys(expeditions)[0]];
      let gainedResources: Resource[] = [];
      gainResources?.map((gainResource) => {
        const gainedResource = utils.getResourceMatchingSelector(gainResource);
        if (gainedResource) { gainedResources.push(gainedResource); }
        else { console.log(`No matching resource found for: `, gainResource); }
      });
      if (gainedResources.length > 0) {
        dispatch(gainSceneResources({ sceneActionId: sceneText.id, resources: gainedResources }));
        if (expedition) {
          dispatch(increaseExpeditionResources({
            expeditionId: expedition.id,
            rti: gainedResources
          }));
        }
        else {
          dispatch(increaseResources(vault, gainedResources));
        }
      }

      // Todo: affectLeader
      if (affectLeader) {

      }

      if (changeLocation && expedition) {
        const { towardsDestination, distance, percentage } = changeLocation;
        let extent = distance || percentage || 1;
        if (percentage && expedition) {
          extent = utils.distanceBetweenPoints([0, 0], expedition.targetCoordinates) * (percentage/100);
        }
        if (!towardsDestination) { extent *= -1; }
        const newCoordinates = utils.travelAlongPoints(expedition.originCoordinates,
          expedition.targetCoordinates, extent);
        dispatch(updateExpeditionCurrentCoordinates({ expeditionId: expedition.id, newCoordinates }));
      }

      if (leaderJoins) {
        if (!utils.arrayIncludes(account.tabsUnlocked, TABS.LEADERS)) {
          dispatch(unlockTab(TABS.LEADERS));
          dispatch(unlockTab(TABS.EQUIPMENT));
          dispatch(addQuest(quests[QUESTS.EARLY_DAYS_LEADER_SETUP]));
          const quest = quests[QUESTS.EARLY_DAYS_LEADER_SETUP];
          dispatch(addGlowingTab(TABS.QUESTS));
          dispatch(addMessage(new Message({
            text: `You began the quest ${quest.name}.`,
            type: '',
            icon: quest.icon
          })));
        }
        const leaderCreateRes = leaderTypes[leaderJoins].createLeader(vault, resourceTypes);
        let tempEquipment: { [id: string] : Equipment } = {};
        let equipmentArray: Equipment[] = [];
        leaderCreateRes.equipment.map((anEquipment) => {
          if (anEquipment) {
            tempEquipment[anEquipment.id] = anEquipment;
            equipmentArray.push(anEquipment);
          }
        });
        dispatch(addEquipment(equipmentArray));
        let leader = new Leader(leaderCreateRes.leader);
        leader.calcEffects(tempEquipment, {}, new Vault(null), []);
        dispatch(addLeader(leader));
      }

      if (questsBegin) {
        questsBegin.forEach((questName) => {
          dispatch(addQuest(quests[questName]));
          const rtgExisting = quests[questName].taskCheckExisting(vault, researchStatus);
          rtgExisting.forEach((questActivity) => {
            dispatch(addToActivityQueue(questActivity));
          });
        });
      }

      // Two things named completeResearch!
      if (sceneText.outcome.completeResearch) {
        sceneText.outcome.completeResearch.forEach((researchName) => {
          dispatch(completeResearch(researchName));
        });
      }  
    }

    if (segmentsChanged) {
      setSegments(newSegments);
    }
  }

  return (
    <View style={styles.modalContent}>
      <View style={styles.headingWrapper}>
        <Text style={styles.heading1}>{scene.name}</Text>
      </View>
      <ScrollView style={styles.columns}
        ref={scrollView}
        onContentSizeChange={() => {
          if (scrollView.current) { scrollView.current.scrollToEnd({animated: true}); }
        }}>
        {segments.map((segment) => (
          <SceneSegmentComponent key={`${segment.type}-${segment.id}`} {...props} id={segment.id}
            type={segment.type} animate={segment.animate} doneAnimating={doneAnimating}
            handlePress={handlePress} leaders={leaders} vault={vault}  questStatus={questStatus}
            expeditionStatus={expeditionStatus} />
        ))}
      </ScrollView>
    </View>
  );
}

interface SceneStaticProps {
  sceneStatus: SceneStatus;
  leaders: { [id: string] : Leader };
  vault: Vault;
  expeditionStatus: ExpeditionStatus;
  account: Account;
  questStatus: QuestStatus;
  researchStatus: ResearchStatus;
  pos: Positioner;
}

interface Segment {
  id: string;
  type: 'SceneText'|'SceneAction'|'SceneActed'|'NextButton'|'WaitButton'|'FinalButton'|'SceneOutcome';
  animate: boolean;
}

export default SceneComponent;