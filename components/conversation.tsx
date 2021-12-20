import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Animated }
  from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import ConvoPieceComponent from './convo_piece';
import { responseChosen } from '../actions/conversation_status';
import { increaseResources, consumeResources } from '../actions/vault';
import { addEquipment } from '../actions/equipment';
import { addLeader } from '../actions/leaders';
import { unlockTab } from '../actions/account';
import { addQuest } from '../actions/quest_status';

import Leader from '../models/leader';
import Resource from '../models/resource';
import Equipment from '../models/equipment';
import Vault from '../models/vault';
import Icon from '../models/icon';
import Account from '../models/account';
import Positioner from '../models/positioner';
import ConversationStatus from '../models/conversation_status';
import { Conversation, ConversationStatement, ConversationResponse,
  ConversationNarration } from '../models/conversation';
import { conversations, convoStatements, convoResponses, convoNarrations }
  from '../instances/conversations';
import { leaderTypes } from '../instances/leader_types';
import { resourceTypes } from '../instances/resource_types';
import { quests } from '../instances/quests';
import { utils } from '../utils';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { TABS } from '../enums/tabs';
import { SVGS } from '../enums/svgs';
import { QUESTS } from '../enums/quests';
import { SPECIAL } from '../enums/special';
import { FADE_IN_DELAY, FADE_CHAR_DELAY } from '../constants';

const DEFAULT_PARTNER: Partner = {
  name: 'You',
  icon: new Icon({ provider: 'svg', name: SVGS.YOU })
};

export default function ConversationComponent(props: { convoName: string }) {
  const leaders = useTypedSelector(state => state.leaders);
  const conversationStatus = useTypedSelector(state => state.conversationStatus);
  const vault = useTypedSelector(state => state.vault);
  const account = useTypedSelector(state => state.account);
  const positioner = useTypedSelector(state => state.ui.positioner);

  return useMemo(() => {
    return <ConversationStatic convoName={props.convoName} leaders={leaders}
      conversationStatus={conversationStatus} vault={vault} account={account}
      positioner={positioner} />;
  }, [positioner])
}

function ConversationStatic(props: ConversationProps) {
  const dispatch = useDispatch();
  const leaders = props.leaders;
  const conversationStatus = props.conversationStatus;
  const vault = props.vault;
  const account = props.account;
  const positioner = props.positioner;

  const [state, setState] = useState('initializing');
  const [conversation, setConversation] = useState<Conversation>(new Conversation(null));
  const [segments, setSegments] = useState<Segment[]>([]);
  // statementResourcesGained, for multiple possible sets of resources between
  //  ConversationStatements
  const [segmentsToAdd, setSegmentsToAdd] = useState<Segment[]|null>(null);
  const [sResourcesGained, setSResourcesGained] =
    useState<{[ sName: string ] : Resource[]}>({});
  let scrollView : React.RefObject<ScrollView> = useRef(null);

  useEffect(() => {
    if (state == 'initializing') {
      setState('initialized');
      const convo = conversations[props.convoName];
      setConversation(convo);
      if (convo.statementName) {
        setSegmentsToAdd([{ name: convo.statementName, kind: 'statement' }]);
      }
      else if (convo.narrationName) {
        setSegmentsToAdd([{ name: convo.narrationName, kind: 'narration' }]);
      }
    }
  }, [state]);
  
  useEffect(() => {
    if (segmentsToAdd == null) { return; }

    let newSegments: Segment[] = [];
    setState('animating');
    setSegmentsToAdd(null);
    segmentsToAdd.forEach((segmentToAdd) => {
      let newSegment: Segment = { ...segmentToAdd };
      switch(segmentToAdd.kind) {
        case 'statement':
        const statement = convoStatements[segmentToAdd.name];
        if (statement.responseNames) {
          newSegment.nextSegments = statement.responseNames.map((responseName) => {
            return { id: utils.randHex(8), name: responseName, kind: 'responseOption' };
          });
        }
        else if (statement.narrationName) {
          newSegment.nextSegments = [{ name: (statement.narrationName),
            kind: 'narration' }];
        }
        break;

        case 'responseOption':
        break;

        case 'response':
        const response = convoResponses[segmentToAdd.name];
        if (response.statementName) {
          newSegment.nextSegments = [{ name: (response.statementName),
            kind: 'statement' }];
        }
        else if (response.narrationName) {
          newSegment.nextSegments = [{ name: (response.narrationName),
            kind: 'narration' }];
        }
        break;

        case 'nextButton':
        break;

        case 'narration':
        const narration = convoNarrations[segmentToAdd.name];
        if (narration.statementName) {
          newSegment.nextSegments = [{ name: '', kind: 'nextButton',
            nextSegments: [{ name: (narration.statementName), kind: 'statement' }]}];
        }
        else if (narration.responseName) {
          newSegment.nextSegments = [{ name: '', kind: 'nextButton',
            nextSegments: [{ name: (narration.responseName), kind: 'response' }]}];
        }
        break;
      }
      newSegments.push(newSegment);
    });

    setSegments([...segments, ...newSegments]);
  }, [segmentsToAdd, segments]);

  return (
    <ScrollView style={styles.columns}
      ref={scrollView}
      onContentSizeChange={() => {
        if (scrollView.current) { scrollView.current.scrollToEnd({animated: true}); }
      }}>
      {segments.map((segment) => ( renderSegment(segment.name, segment.kind,
        segment.nextSegments)))}
    </ScrollView>
  )

  function renderSegment(name: string, kind: string, nextSegments?: Segment[]) {
    switch(kind) {
      case 'statement':
      return <Statement statement={convoStatements[name]}
        speechBubbleWidth={positioner.speechBubbleWidth}
        sResourcesGained={sResourcesGained}
        addAllSegments={addAllSegments} leaders={leaders}
        nextSegments={nextSegments} />;

      case 'responseOption':
      return <ResponseOption key={name} response={convoResponses[name]} vault={vault}
        responseOptionPress={responseOptionPress}
        speechButtonWidth={positioner.speechButtonWidth} />;

      case 'response':
      return <Response key={name} response={convoResponses[name]}
        speechBubbleWidth={positioner.speechBubbleWidth}
        setSegmentsToAdd={setSegmentsToAdd} nextSegments={nextSegments} />;

      case 'nextButton':
      return <NextButton key={name} speechButtonWidth={positioner.speechButtonWidth}
        nextButtonPress={nextButtonPress} nextSegments={nextSegments} />;

      case 'narration':
      return <Narration key={name} narration={convoNarrations[name]}
        modalMajor={positioner.modalMajor}
        setSegmentsToAdd={setSegmentsToAdd} nextSegments={nextSegments} />;
    }
  }

  function addAllSegments(nextSegments?: Segment[]) {
    if (nextSegments) {
      setSegmentsToAdd(nextSegments);
      setTimeout(() => { setState('waiting'); }, FADE_IN_DELAY);
    }
  }

  function responseOptionPress(response: ConversationResponse) {
    if (response.cost) { applyCost(response.cost); }
    let filteredSegments = [...segments].filter((segment) => {
      if (segment.kind != 'responseOption') { return segment; }
    });
    setSegments(filteredSegments);
    setSegmentsToAdd([{ name: response.name, kind: 'response' }]);

    const statement = convoStatements[response.statementName];
    if (statement.leaderJoins) {
      if (!utils.arrayIncludes(account.tabsUnloked, TABS.LEADERS)) {
        dispatch(unlockTab(TABS.LEADERS));
        dispatch(unlockTab(TABS.EQUIPMENT));
        dispatch(addQuest(quests[QUESTS.LEADER_SETUP]));
      }
      const leaderCreateRes =
        leaderTypes[statement.leaderJoins].createLeader(vault, resourceTypes);
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
      leader.calcEffects(tempEquipment, {}, new Vault(null));
      dispatch(addLeader(leader));
    }

    if (statement.gainResources) {
      const fgr = statement.gainResources;
      let resourcesGained: Resource[] = [];
      let resourceNames: string[] = [];
      for (let index = 0; index < fgr.length; index++) {
        const resReq = fgr[index];
        const rToGain = utils.getMatchingResourceQuantity(resReq, resourceNames);
        resourcesGained.push(new Resource(rToGain));
        resourceNames.push(rToGain.type);
      }
      dispatch(increaseResources(vault, resourcesGained));
      setSResourcesGained(Object.assign(sResourcesGained,
        { [statement.name] : resourcesGained }));
    }
  }

  function nextButtonPress(nextSegments?: Segment[]) {
    let filteredSegments = [...segments].filter((segment) => {
      if (segment.kind != 'nextButton') { return segment; }
    });
    setSegments(filteredSegments);
    if (nextSegments) {
      setSegmentsToAdd(nextSegments);
    }
  }

  function applyCost(aCost: {specificity: string, type: string, quantity: number}) {
    let resourceMap:{ [typeQuality: string] : Resource } = {};
    switch(aCost.specificity) {
      case RESOURCE_SPECIFICITY.EXACT:
      let exPool = vault.getExactResources(aCost.type);
      exPool.forEach((resource) => {
        resourceMap[resource.type + '|' + resource.quality] = resource;
      });
      break;

      case RESOURCE_SPECIFICITY.TAG:
      let tagPool = vault.getTagResources(aCost.type);
      tagPool.forEach((resource) => {
        resourceMap[resource.type + '|' + resource.quality] = resource;
      });
      break;

      case RESOURCE_SPECIFICITY.SUBCATEGORY:
      let scPool = vault.getSubcategoryResources(aCost.type);
      scPool.forEach((resource) => {
        resourceMap[resource.type + '|' + resource.quality] = resource;
      });
      break;

      case RESOURCE_SPECIFICITY.CATEGORY:
      let catPool = vault.getCategoryResources(aCost.type);
      catPool.forEach((resource) => {
        resourceMap[resource.type + '|' + resource.quality] = resource;
      });
      break;
    }

    if (Object.keys(resourceMap).length == 1) {
      const resource = resourceMap[Object.keys(resourceMap)[0]];
      dispatch(consumeResources(vault, [new Resource({...resource,
        quantity: aCost.quantity})]));
    }
    else {
      console.log('Time to implement this!');
    }
  }
}

function Statement(props: { statement: ConversationStatement, speechBubbleWidth: number,
  sResourcesGained: {[ sName: string ] : Resource[]},
  addAllSegments: (nextSegments?: Segment[]) => void,
  leaders: { [id: string] : Leader }, nextSegments?: Segment[] }) {
  const statement = props.statement;
  let partner: Partner = DEFAULT_PARTNER;
  if (statement.partnerKind == 'leader') {
    const leader = getLeaderByName(statement.partnerType);
    if (leader) { partner = leader; }
  }
  else if (statement.partnerKind == 'special') {
    partner = {
      name: statement.partnerType,
      icon: new Icon({ provider: 'svg', name: statement.partnerType})
    };
  }
  const leaderJoining = (statement.leaderJoins)
    ? leaderTypes[statement.leaderJoins] : null;
  return (
    <View key={statement.name} style={styles.columns}>
      {<ConvoPieceComponent convoStatement={statement} partner={partner}
        speechBubbleWidth={props.speechBubbleWidth}
        finishedAnimating={() => props.addAllSegments(props.nextSegments)} />}
      <View style={styles.break} />
      {leaderJoining && (
        <View style={styles.containerStretchRow}>
          <BadgeComponent icon={leaderJoining.icon} size={37} />
          <Text style={styles.bareText}>{' ' + leaderJoining.name + ' joined you!'}</Text>
        </View>
      )}
      {props.sResourcesGained[statement.name]
      && (
        <View style={styles.panelFlexColumn}>
          <Text>{"You gained:"}</Text>
          {props.sResourcesGained[statement.name].map((resource, index) => {
            const resourceType = utils.getResourceType(resource);
            return (
              <View key={index} style={styles.containerStretchRow}>
                <BadgeComponent icon={resourceType.icon} size={21} />
                <Text style={styles.bodyText}>
                  {' +' + utils.formatNumberShort(resource.quantity) + ' '
                    + utils.getResourceName(resource)}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );

  function getLeaderByName(partnerType: string): Partner|null {
    let leader: Partner|null = null;
    Object.keys(props.leaders).map((id) => {
      const cLeader = props.leaders[id];
      if (cLeader.name == partnerType) { leader = cLeader; }
    });
    if (!leader) {
      leader = leaderTypes[partnerType];
    }
    return leader;
  }
}


function ResponseOption(props: {response: ConversationResponse, vault: Vault,
  responseOptionPress: (response: ConversationResponse) => void,
  speechButtonWidth: number }) {
  const response = props.response;
  const opacityAnim = { [response.name] : useRef(new Animated.Value(0)).current};
  React.useEffect(() => { Animated.timing(opacityAnim[response.name],
    { toValue: 1, duration: FADE_IN_DELAY, useNativeDriver: true }
  ).start(); }, []);

  let buttonStyle: any = styles.button;
  let buttonDisabled: boolean = false;
  let requirement = null;
  let requirementIcon = null;
  let requirementLabel = null;
  if (response.cost) {
    const resourceKind = utils.getMatchingResourceKind(response.cost.specificity,
      response.cost.type);
    const resourceQuantity = Math.floor(props.vault
      .getQuantity(response.cost.specificity, response.cost.type));
    requirementIcon = resourceKind.icon;
    requirementLabel = `${utils.formatNumberShort(response.cost.quantity)} (of ${utils.formatNumberShort(resourceQuantity)}) ${response.cost.type}`;
    if (resourceQuantity < response.cost.quantity) {
      buttonStyle = StyleSheet.flatten([styles.button, styles.buttonDisabled]);
      buttonDisabled = true;
    }
  }
  else if (response.requirementLabel) {
    requirementIcon = response.requirementIcon;
    requirementLabel = response.requirementLabel;
    if (!response.available({ vault: props.vault })) {
      buttonStyle = StyleSheet.flatten([styles.button, styles.buttonDisabled]);
      buttonDisabled = true;
    }
  }
  if (response.cost || response.requirementLabel) {
    requirement = (
      <View style={styles.columns}>
        <Text style={StyleSheet.flatten([styles.buttonText,
          { alignSelf: 'flex-start', opacity: 0.75 }])}>
          {'Requires:'}
        </Text>
        <View style={styles.rows}>
          {requirementIcon && (
            <BadgeComponent icon={requirementIcon} size={19} />
          )}
          <Text style={styles.buttonText}>
            {requirementLabel}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <Animated.View style={{ opacity: opacityAnim[response.name] }}>
      <TouchableOpacity style={buttonStyle} disabled={buttonDisabled}
        onPress={() => props.responseOptionPress(response)} >
        <View style={StyleSheet.flatten([styles.columns,
          { minWidth: props.speechButtonWidth,
            maxWidth: props.speechButtonWidth,
            paddingVertical: 5, alignItems: 'flex-start' }])}>
          <Text style={styles.buttonText}>
            {response.textIntro}
          </Text>
          {response.speechType && (
            <Text style={StyleSheet.flatten([styles.buttonText,
              { opacity: 0.75 }])}>
              {`(${response.speechType})`}
            </Text>
          )}
          {requirement}
        </View>
      </TouchableOpacity>
      <View style={styles.break} />
    </Animated.View>
  );
}

function Response(props: {response: ConversationResponse, speechBubbleWidth: number,
setSegmentsToAdd: (segments: Segment[]) => void, nextSegments?: Segment[]}) {
  return (
    <View key={props.response.name}
      style={StyleSheet.flatten([styles.rows, { alignItems: 'flex-start' }])}>
      {<ConvoPieceComponent convoResponse={props.response} partner={DEFAULT_PARTNER}
        speechBubbleWidth={props.speechBubbleWidth}
        finishedAnimating={() => setResponseSegmentsToAdd(props.nextSegments)} />}
    </View>
  );

  function setResponseSegmentsToAdd(nextSegments?: Segment[]) {
    if (nextSegments) {
      setTimeout(() => props.setSegmentsToAdd(nextSegments), FADE_IN_DELAY*2);
    }
  }
}

function NextButton(props: {speechButtonWidth: number, nextSegments?: Segment[],
  nextButtonPress: (segments?: Segment[]) => void}) {
  const nextBtnOpacity = useRef(new Animated.Value(0)).current;
  React.useEffect(() => { Animated.timing(nextBtnOpacity,
    { toValue: 0.95, duration: FADE_IN_DELAY, useNativeDriver: true }
  ).start()});

  return (
    <Animated.View style={{ opacity: nextBtnOpacity }}>
      <TouchableOpacity key='nextButton' style={styles.button}
        onPress={() => props.nextButtonPress(props.nextSegments)} >
        <View style={StyleSheet.flatten([styles.columns,
          { minWidth: props.speechButtonWidth,
            maxWidth: props.speechButtonWidth,
            paddingVertical: 5 }])}>
          <Text style={styles.buttonText}>
            {"Next"}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

function Narration(props: { narration: ConversationNarration,
  nextSegments?: Segment[], modalMajor: number,
  setSegmentsToAdd: (segments: Segment[]) => void }) {
  const narration = props.narration;
  const narrationOpacity = useRef(new Animated.Value(0)).current;
  React.useEffect(() => { Animated.timing(narrationOpacity,
    { toValue: 0.95, duration: FADE_IN_DELAY*4, useNativeDriver: true }
  ).start(() => {
    if (props.nextSegments) { props.setSegmentsToAdd(props.nextSegments); }
  }); }, []);

  return (
    <Animated.View style={StyleSheet.flatten([styles.panelFlex,
      { minWidth: props.modalMajor, maxWidth: props.modalMajor,
        textAlign: 'center', padding: 10, opacity: narrationOpacity }])}>
      <Text>{narration.text}</Text>
    </Animated.View>
  );
}

interface ConversationProps {
  convoName: string;
  leaders: { [id: string] : Leader };
  conversationStatus: ConversationStatus;
  vault: Vault;
  account: Account;
  positioner: Positioner;
}

interface Partner {
  name: string;
  icon: Icon;
}

interface Segment {
  name: string;
  kind: string;
  nextSegments?: Segment[];
}
