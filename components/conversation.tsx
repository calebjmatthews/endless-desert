import React, { useState, useEffect } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import { responseChosen } from '../actions/conversation_status';
import { increaseResources, consumeResources } from '../actions/vault';
import { addEquipment } from '../actions/equipment';
import { addLeader } from '../actions/leaders';
import { unlockTab } from '../actions/account';

import Leader from '../models/leader';
import Resource from '../models/resource';
import Equipment from '../models/equipment';
import Vault from '../models/vault';
import Icon from '../models/icon';
import { Conversation, ConversationStatement, ConversationResponse }
  from '../models/conversation';
import { conversations, convoStatements, convoResponses }
  from '../instances/conversations';
import { leaderTypes } from '../instances/leader_types';
import { utils } from '../utils';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { TABS } from '../enums/tabs';
import { SVGS } from '../enums/svgs';

const DEFAULT_PARTNER: Partner = {
  name: 'You',
  icon: new Icon({ provider: 'svg', name: SVGS.YOU })
};

export default function ConversationComponent(props: ConversationProps) {
  const dispatch = useDispatch();
  const leaders = useTypedSelector(state => state.leaders);
  const conversationStatus = useTypedSelector(state => state.conversationStatus);
  const vault = useTypedSelector(state => state.vault);
  const account = useTypedSelector(state => state.account);
  const positioner = useTypedSelector(state => state.ui.positioner);

  const [responseNames, setResponseNames] = useState<string[]>([]);
  // statementResourcesGained, for multiple possible sets of resources between
  //  ConversationStatements
  const [sResourcesGained, setSResourcesGained] = useState
    <{[ sName: string ] : Resource[]}>({});

  const conversation = conversations[props.convoName];
  const statementFirst = convoStatements[conversation.statementName];
  return (
    <ScrollView style={styles.columns}>
      <View style={styles.columns}>
        {renderStatement(statementFirst)}
      </View>
      {responseNames.map((responseName) => (
        handleResponseName(responseName)
      ))}
    </ScrollView>
  );

  function renderStatement(statement: ConversationStatement) {
    let partner: Partner = DEFAULT_PARTNER;
    if (statement.partnerKind == 'leader') {
      const leader = getLeaderByName(statement.partnerType);
      if (leader) { partner = leader; }
    }
    const leaderJoining = (statement.leaderJoins)
      ? leaderTypes[statement.leaderJoins] : null;
    return (
      <View style={styles.columns}>
        <View style={StyleSheet.flatten([styles.rows, { alignItems: 'flex-start' }])}>
          <View style={StyleSheet.flatten([styles.columns, { marginTop: 17 }])}>
            <BadgeComponent icon={partner.icon} size={55} marginless={true} />
          </View>
          <View style={styles.columns}>
            <Text style={StyleSheet.flatten([styles.bareText, {marginLeft: 5}])}>
              {partner.name}
            </Text>
            <View style={StyleSheet.flatten([styles.speechBubble,
              { maxWidth: positioner.speechBubbleWidth, marginLeft: 5,
                borderTopLeftRadius: 0 }])}>
              <Text>{statement.text}</Text>
            </View>
          </View>
        </View>
        <View style={styles.break} />
        {leaderJoining && (
          <View style={styles.containerStretchRow}>
            <BadgeComponent icon={leaderJoining.icon} size={37} />
            <Text style={styles.bareText}>{' ' + leaderJoining.name + ' joined you!'}</Text>
          </View>
        )}
        {sResourcesGained[statement.name]
        && (
          <View style={styles.panelFlexColumn}>
            <Text>{"You gained:"}</Text>
            {sResourcesGained[statement.name].map((resource, index) => {
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
        {renderResponseOptions(statement)}
      </View>
    )
  }
  function getLeaderByName(partnerType: string): Partner|null {
    let leader: Partner|null = null;
    Object.keys(leaders).map((id) => {
      const cLeader = leaders[id];
      if (cLeader.name == partnerType) { leader = cLeader; }
    });
    if (!leader) {
      leader = leaderTypes[partnerType];
    }
    return leader;
  }

  function renderResponseOptions(statement: ConversationStatement) {
    if (!statement.responseNames) { return null; }
    let responseGiven: boolean = false;
    responseNames.map((responseName) => {
      if (statement.responseNames) {
        statement.responseNames.map((sResponseName) => {
          if (responseName == sResponseName) {
            responseGiven = true;
          }
        });
      }
    });
    if (responseGiven) { return null; }
    return statement.responseNames.map((responseName, index) => {
      const response = convoResponses[responseName];
      let buttonStyle: any = styles.button;
      let buttonDisabled: boolean = false;
      let requirement = null;
      let requirementIcon = null;
      let requirementLabel = null;
      if (response.cost) {
        const resourceKind = utils.getMatchingResourceKind(response.cost.specificity,
          response.cost.type);
        const resourceQuantity = Math.floor(vault
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
        if (!response.available({ vault })) {
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
        <View key={index}>
          <TouchableOpacity style={buttonStyle} disabled={buttonDisabled}
            onPress={() => responseOptionPress(response)} >
            <View style={StyleSheet.flatten([styles.columns,
              { minWidth: positioner.speechButtonWidth,
                maxWidth: positioner.speechButtonWidth,
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
        </View>
      )
    });
  }

  function handleResponseName(responseName: string) {
    const response = convoResponses[responseName];
    const statement = convoStatements[response.statementName];
    return (
      <View style={styles.columns} key={responseName}>
        {renderResponse(response)}
        <View style={styles.break} />
        {renderStatement(statement)}
        <View style={styles.break} />
      </View>
    )
  }

  function renderResponse(response: ConversationResponse) {
    const partner = DEFAULT_PARTNER;
    return (
      <View style={StyleSheet.flatten([styles.rows, { alignItems: 'flex-start' }])}>
        <View style={styles.columns}>
          <Text style={StyleSheet.flatten([styles.bareText, {marginLeft: 5}])}>
            {partner.name}
          </Text>
          <View style={StyleSheet.flatten([styles.speechBubble,
            { maxWidth: positioner.speechBubbleWidth, marginRight: 5,
              borderTopRightRadius: 0 }])}>
            <Text>{response.text}</Text>
          </View>
        </View>
        <View style={StyleSheet.flatten([styles.columns, { marginTop: 17 }])}>
          <BadgeComponent icon={partner.icon} size={55} marginless={true} />
        </View>
      </View>
    );
  }

  function responseOptionPress(response: ConversationResponse) {
    if (response.cost) { applyCost(response.cost); }
    dispatch(responseChosen(response.name));
    setResponseNames([...responseNames, response.name ]);

    const statement = convoStatements[response.statementName];
    if (statement.leaderJoins) {
      if (!utils.arrayIncludes(account.tabsUnloked, TABS.LEADERS)) {
        dispatch(unlockTab(TABS.LEADERS));
        dispatch(unlockTab(TABS.EQUIPMENT));
      }
      const leaderCreateRes =
        leaderTypes[statement.leaderJoins].createLeader(vault);
      let tempEquipment: { [id: string] : Equipment } = {};
      leaderCreateRes.equipment.map((equip) => {
        if (equip) {
          tempEquipment[equip.id] = equip;
          dispatch(addEquipment(equip));
        }
      });
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

  function applyCost(aCost: {specificity: string, type: string, quantity: number}) {
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

    if (rTypePool.length == 1) {
      const qtSplit = rTypePool[0].split('|');
      dispatch(consumeResources(vault, [new Resource({type: qtSplit[0],
        quality: parseInt(qtSplit[1]), quantity: aCost.quantity})]));
    }
    else {
      console.log('Time to implement this!');
    }
  }
}

interface ConversationProps {
  convoName: string;
}

interface Partner {
  name: string;
  icon: Icon;
}
