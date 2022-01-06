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
import { addQuest, addToActivityQueue } from '../actions/quest_status';
import { dismissMemo, displayModal } from '../actions/ui';

import Leader from '../models/leader';
import Resource from '../models/resource';
import Equipment from '../models/equipment';
import Vault from '../models/vault';
import Icon from '../models/icon';
import Account from '../models/account';
import Positioner from '../models/positioner';
import ConversationStatus from '../models/conversation_status';
import QuestActivity from '../models/quest_activity';
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
        let nextButtonAlreadyPresent: boolean = false;
        segments.forEach((segment) => {
          if (segment.kind == 'nextButton') { nextButtonAlreadyPresent = true; }
        });
        if (!nextButtonAlreadyPresent) { newSegments.push(newSegment); }
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
      if (segmentToAdd.kind != 'nextButton') { newSegments.push(newSegment); }
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
      return <Statement key={name} statement={convoStatements[name]}
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

      case 'consequence':
      return <Consequence key={`rgained-${name}`}
        modalMajor={positioner.modalMajor}
        setSegmentsToAdd={setSegmentsToAdd} nextSegments={nextSegments}
        resourcesGained={sResourcesGained[name]}
        resourcesSpent={convoResponses[name]?.cost}
        leaderJoins={convoStatements[name]?.leaderJoins}
        questsBegin={convoStatements[name]?.questsBegin} />;

      case 'nextButton':
      return <NextButton key={name} speechButtonWidth={positioner.speechButtonWidth}
        nextButtonPress={nextButtonPress} nextSegments={nextSegments} />;

      case 'narration':
      return <Narration key={name} narration={convoNarrations[name]}
        modalMajor={positioner.modalMajor}
        setSegmentsToAdd={setSegmentsToAdd} nextSegments={nextSegments} />;
    }
  }

  function addAllSegments(statement: ConversationStatement, nextSegments?: Segment[]) {
    const segmentsToAdd = nextSegments || [{ name: '', kind: 'nextButton' }];
    if (sResourcesGained[statement.name] || statement.leaderJoins
      || statement.questsBegin) {
      setSegmentsToAdd([{ name: statement.name, kind: 'consequence',
        nextSegments: segmentsToAdd }]);
    }
    else {
      setSegmentsToAdd(segmentsToAdd);
    }
    setTimeout(() => { setState('waiting'); }, FADE_IN_DELAY);
  }

  function responseOptionPress(response: ConversationResponse) {
    let newSegmentsToAdd: Segment[] = [{ name: response.name, kind: 'response' }];
    if (response.cost) {
      applyCost(response.cost);
      newSegmentsToAdd.unshift({ name: response.name, kind: 'consequence' })
    }
    let filteredSegments = [...segments].filter((segment) => {
      if (segment.kind != 'responseOption') { return segment; }
    });
    setSegments(filteredSegments);
    setSegmentsToAdd(newSegmentsToAdd);

    const statement = convoStatements[response.statementName];
    if (statement.leaderJoins) {
      if (!utils.arrayIncludes(account.tabsUnloked, TABS.LEADERS)) {
        dispatch(unlockTab(TABS.LEADERS));
        dispatch(unlockTab(TABS.EQUIPMENT));
        dispatch(addQuest(quests[QUESTS.EARLY_DAYS_LEADER_SETUP]));
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
        dispatch(addToActivityQueue(new QuestActivity({ id: utils.randHex(16),
          resourceGained: { type: rToGain.type, quantity: rToGain.quantity }})));
      }
      dispatch(increaseResources(vault, resourcesGained));

      setSResourcesGained(Object.assign(sResourcesGained,
        { [statement.name] : resourcesGained }));
    }
    if (statement.questsBegin) {
      statement.questsBegin.forEach((questName) => {
        dispatch(addQuest(quests[questName]));
        const rtgExisting = quests[questName].resourceToGainCheckExisting(vault);
        rtgExisting.forEach((questActivity) => {
          dispatch(addToActivityQueue(questActivity));
        });
      });
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
    else {
      dispatch(dismissMemo());
      dispatch(displayModal(null));
    }
  }

  function applyCost(costs: {specificity: string, type: string, quantity: number}[]) {
    let resources: Resource[] = [];
    costs.forEach((cost) => {
      let resourceMap:{ [typeQuality: string] : Resource } = {};
      switch(cost.specificity) {
        case RESOURCE_SPECIFICITY.EXACT:
        let exPool = vault.getExactResources(cost.type);
        exPool.forEach((resource) => {
          resourceMap[resource.type + '|' + resource.quality] = resource;
        });
        break;

        case RESOURCE_SPECIFICITY.TAG:
        let tagPool = vault.getTagResources(cost.type);
        tagPool.forEach((resource) => {
          resourceMap[resource.type + '|' + resource.quality] = resource;
        });
        break;

        case RESOURCE_SPECIFICITY.SUBCATEGORY:
        let scPool = vault.getSubcategoryResources(cost.type);
        scPool.forEach((resource) => {
          resourceMap[resource.type + '|' + resource.quality] = resource;
        });
        break;

        case RESOURCE_SPECIFICITY.CATEGORY:
        let catPool = vault.getCategoryResources(cost.type);
        catPool.forEach((resource) => {
          resourceMap[resource.type + '|' + resource.quality] = resource;
        });
        break;
      }
      if (Object.keys(resourceMap).length == 1) {
        const resource = resourceMap[Object.keys(resourceMap)[0]];
        resources.push(new Resource({...resource, quantity: cost.quantity}));
      }
      else {
        console.log('Time to implement this!');
      }
    });

    dispatch(consumeResources(vault, resources));
  }
}

function Statement(props: { statement: ConversationStatement, speechBubbleWidth: number,
  sResourcesGained: {[ sName: string ] : Resource[]},
  addAllSegments: (statement: ConversationStatement,  nextSegments?: Segment[]) => void,
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

  return (
    <View key={statement.name} style={styles.columns}>
      <ConvoPieceComponent convoStatement={statement} partner={partner}
        speechBubbleWidth={props.speechBubbleWidth}
        finishedAnimating={() => props.addAllSegments(statement, props.nextSegments)}
        />
      <View style={styles.break} />
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
  let costLabels: { icon: Icon, text: string }[] = [];
  if (response.cost) {
    let missingCost: boolean = false;
    response.cost.forEach((cost) => {
      const resourceKind = utils.getMatchingResourceKind(cost.specificity,
        cost.type);
      const resourceQuantity = Math.floor(props.vault
        .getQuantity(cost.specificity, cost.type));

      costLabels.push({ icon: resourceKind.icon, text:
        `${utils.formatNumberShort(cost.quantity)} (of ${utils.formatNumberShort(resourceQuantity)}) ${cost.type}` });

      if (resourceQuantity < cost.quantity) {
        missingCost = true;
      }
    });

    if (missingCost) {
      buttonStyle = StyleSheet.flatten([styles.button, styles.buttonDisabled]);
      buttonDisabled = true;
    }
  }
  else if (response.requirementLabel) {
    if (!response.available({ vault: props.vault })) {
      buttonStyle = StyleSheet.flatten([styles.button, styles.buttonDisabled]);
      buttonDisabled = true;
    }
  }
  if (response.requirementLabel) {
    requirement = (
      <View style={styles.columns}>
        <Text style={StyleSheet.flatten([styles.buttonText,
          { alignSelf: 'flex-start', opacity: 0.75 }])}>
          {'Requires:'}
        </Text>
        <View style={styles.rows}>
          {response.requirementIcon && (
            <BadgeComponent icon={response.requirementIcon} size={19} />
          )}
          <Text style={styles.buttonText}>
            {response.requirementLabel}
          </Text>
        </View>
      </View>
    );
  }
  else if (response.cost) {
    requirement = (
      <View style={styles.columns}>
        <Text style={StyleSheet.flatten([styles.buttonText,
          { alignSelf: 'flex-start', opacity: 0.75 }])}>
          {'Cost:'}
        </Text>
        {costLabels.map((costLabel) => (
          <View key={costLabel.text} style={styles.rows}>
            <BadgeComponent icon={costLabel.icon} size={19} />
            <Text style={styles.buttonText}>{costLabel.text}</Text>
          </View>
        ))}
      </View>
    );
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
      <View style={styles.breakSmall} />
    </Animated.View>
  );
}

function Consequence(props: { modalMajor: number,
  setSegmentsToAdd: (segments: Segment[]) => void,
  resourcesGained?: Resource[],
  resourcesSpent?: {specificity: string, type: string, quantity: number}[],
  leaderJoins?: string, questsBegin?: string[], nextSegments?: Segment[] } ) {
  const [finished, setFinished] = useState(false);
  const consequenceOpacity = useRef(new Animated.Value(finished ? 0.9 : 0)).current;
  React.useEffect(() => { Animated.timing(consequenceOpacity,
    { toValue: 0.9, duration: (FADE_IN_DELAY*2), useNativeDriver: true }
  ).start(() => {
    if (!finished && props.nextSegments) { props.setSegmentsToAdd(props.nextSegments); }
    setFinished(true);
  })});

  let consequences: React.ReactFragment[] = [];

  const leaderJoining = props.leaderJoins ? leaderTypes[props.leaderJoins] : null;
  if (leaderJoining) {
    consequences.push(
      <View style={styles.panelFlexColumn}>
        <BadgeComponent icon={leaderJoining.icon} size={37} />
        <Text>
          {` ${leaderJoining.name} joined you!`}
        </Text>
      </View>
    );
  }
  if (props.questsBegin) {
    consequences.push(
      <View style={styles.panelFlexColumn}>
        <Text>
          {(props.questsBegin.length == 1) ? "You began the quest:"
            : "You began the quests:"}
        </Text>
        {props.questsBegin.map((questName) => {
          const quest = quests[questName];
          return (
            <View key={quest.id} style={styles.rows}>
              <BadgeComponent icon={quest.icon} size={37} />
              <Text>
                {`${quest.subtitle}: ${quest.name}`}
              </Text>
            </View>
          )
        })}
      </View>
    );
  }
  if (props.resourcesGained) {
    consequences.push(
      <View style={styles.panelFlexColumn}>
        <Text style={styles.heading3}>{"You gained:"}</Text>
        {props.resourcesGained.map((resource) => {
          const resourceType = utils.getResourceType(resource);
          return (
            <View key={`${resource.type}|${resource.quality}`}
              style={styles.containerStretchRow}>
              <BadgeComponent icon={resourceType.icon} size={21} />
              <Text>
                {` +${utils.formatNumberShort(resource.quantity)}  ${utils.getResourceName(resource)}`}
              </Text>
            </View>
          );
        })}
      </View>
    );
  }
  if (props.resourcesSpent) {
    consequences.push(
      <View style={styles.panelFlexColumn}>
        {props.resourcesSpent.map((cost, index) => {
          const resourceKind = utils.getMatchingResourceKind(cost.specificity,
            cost.type);
          return (
            <View key={`${cost.specificity}|${cost.type}`}
              style={styles.containerStretchRow}>
              <BadgeComponent icon={resourceKind.icon} size={17} />
              <Text style={styles.bodyText}>
                {` -${utils.formatNumberShort(cost.quantity)} ${resourceKind.name}`}
              </Text>
            </View>
          );
        })}
      </View>
    );
  }
  if (consequences.length > 0) {
    return (
      <>
        <Animated.View style={{opacity: consequenceOpacity}}>
          {consequences.map((consequence, index) => (
            <View key={index}>
              {consequence}
            </View>
          ))}
        </Animated.View>
        <View style={styles.break} />
      </>
    )
  }
  return null;
}

function Response(props: {response: ConversationResponse, speechBubbleWidth: number,
setSegmentsToAdd: (segments: Segment[]) => void, nextSegments?: Segment[]}) {
  return (
    <View key={props.response.name}
      style={StyleSheet.flatten([styles.rows, { alignItems: 'flex-start' }])}>
      <ConvoPieceComponent convoResponse={props.response} partner={DEFAULT_PARTNER}
        speechBubbleWidth={props.speechBubbleWidth}
        finishedAnimating={() => setResponseSegmentsToAdd(props.nextSegments)} />
      <View style={styles.break} />
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
      <View style={styles.break} />
    </Animated.View>
  );
}

function Narration(props: { narration: ConversationNarration,
  nextSegments?: Segment[], modalMajor: number,
  setSegmentsToAdd: (segments: Segment[]) => void }) {
  const narration = props.narration;
  const narrationOpacity = useRef(new Animated.Value(0)).current;
  React.useEffect(() => { Animated.timing(narrationOpacity,
    { toValue: 0.9, duration: FADE_IN_DELAY*4, useNativeDriver: true }
  ).start(() => {
    if (props.nextSegments) { props.setSegmentsToAdd(props.nextSegments); }
  }); }, []);

  return (
    <>
      <Animated.View style={StyleSheet.flatten([styles.panelFlex,
        { minWidth: props.modalMajor, maxWidth: props.modalMajor,
          textAlign: 'center', padding: 10, opacity: narrationOpacity }])}>
        <Text>{narration.text}</Text>
      </Animated.View>
      <View style={styles.break} />
    </>
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
