import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';
import { selectTab, displayModalValue } from '../actions/ui';
import { dismissTradingPartner, welcomePendingTradingPartner, addPendingTradingPartner }
  from '../actions/trading_status';
import { addTimer } from '../actions/timers';

import TradingPartner from '../models/trading_partner';
import Trade from '../models/trade';
import Vault from '../models/vault';
import ResourceType from '../models/resource_type';
import ResourceTag from '../models/resource_tag';
import ResourceCategory from '../models/resource_category';
import Timer from '../models/timer';
import { tradingPartnerTypes } from '../instances/trading_partner_types';
import { resourceTypes } from '../instances/resource_types';
import { resourceTags } from '../instances/resource_tags';
import { resourceSubcategories } from '../instances/resource_subcategories';
import { resourceCategories } from '../instances/resource_categories';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { MODALS } from '../enums/modals';

export default function TradingComponent() {
  const dispatch = useDispatch();
  const tradingStatus = useTypedSelector(state => state.tradingStatus);
  const tradingPartnerArray = Object.keys(tradingStatus.tradingPartners).map((name) => {
    return tradingStatus.tradingPartners[name];
  });
  const vault = useTypedSelector(state => state.vault);
  const timer = useTypedSelector(state => state.timers[('Trading' + 0)]);

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="Entypo" name="address" color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Trading'}</Text>
      </View>
      <ScrollView>
        {renderTradingPartners(tradingPartnerArray)}
        {renderArrivingTradingPartner()}
      </ScrollView>

    </View>
  );

  function renderTradingPartners(tradingPartnerArray: TradingPartner[]) {
    return tradingPartnerArray.map((tradingPartner) => {
      return <TradingPartnerDescription key={tradingPartner.name}
        tradingPartner={tradingPartner}
        vault={vault} tradeClick={tradeClick} dismissClick={dismissClick} />
    });
  }

  function tradeClick(tradingPartner: string, tradeId: string) {
    dispatch(displayModalValue(MODALS.RESOURCE_SELECT_ONE, 'open',
      {type: 'Trading', tradingPartner: tradingPartner, tradeId: tradeId}));
  }

  function dismissClick(tradingPartner: string) {
    dispatch(dismissTradingPartner(tradingStatus.tradingPartners[tradingPartner]));
  }

  function welcomeClick() {
    let newTradingPartner = tradingStatus.createPendingTradingPartner(vault);
    let newTimer = new Timer({
      name: ('Trading' + 0),
      startedAt: new Date(Date.now()).valueOf(),
      endsAt: (new Date(Date.now()).valueOf() + 300000),
      progress: 0,
      remainingLabel: '1m',
      tradingPartnerToArrive: newTradingPartner.name,
      messageToDisplay: 'A trader is waiting outside the gate.',
      iconToDisplay: {provider: 'FontAwesome5', name: 'question'},
      iconForegroundColor: '#fff',
      iconBackgroundColor: '#444'
    });
    dispatch(addTimer(newTimer));
    dispatch(welcomePendingTradingPartner());
    dispatch(addPendingTradingPartner(newTradingPartner));
  }

  function renderArrivingTradingPartner() {
    if (timer || tradingStatus.tpPending.length > 0) {
      let contents = null;
      if (timer) {
        contents = (
         <Text>
           {'A trader is arriving in ' + timer.remainingLabel}
         </Text>
       );
      }
      else if (tradingStatus.tpPending.length > 0
        && Object.keys(tradingStatus.tradingPartners).length == 0) {
        contents = (
         <>
           <Text style={styles.bodyTextMed}>
             {'A trader is waiting outside the gate.'}
           </Text>
           <View style={styles.buttonRow}>
             <TouchableOpacity style={styles.buttonRowItem}
               onPress={() => { welcomeClick() }}>
               <IconComponent provider={'FontAwesome5'}
                 name={'hand-holding'} color="#fff" size={16} />
               <Text style={styles.buttonText}>{' Welcome in'}</Text>
             </TouchableOpacity>
           </View>
         </>
       );
      }
      else if (tradingStatus.tpPending.length > 0
        && Object.keys(tradingStatus.tradingPartners).length > 0) {
          contents = (
           <>
             <Text style={styles.bodyTextMed}>
               {'A trader is waiting outside the gate, but there\'s only room for '
                + 'one at the trading post.'}
             </Text>
             <View style={styles.buttonRow}>
               <TouchableOpacity style={StyleSheet.flatten([styles.buttonRowItem,
                 styles.buttonDisabled])} disabled
                 onPress={() => { welcomeClick() }}>
                 <IconComponent provider={'FontAwesome5'}
                   name={'hand-holding'} color="#fff" size={16} />
                 <Text style={styles.buttonText}>{' Welcome in'}</Text>
               </TouchableOpacity>
             </View>
           </>
         );
      }

      return (
        <View style={styles.panelFlexColumn}>
          <View style={styles.containerStretchRow}>
            <View style={{width: 40, height: 40}}>
              <IconComponent style={{position: 'absolute'}}
                provider={'MaterialCommunityIcons'}
                name={'shield'}
                color={'#444'}
                size={36} />
              <IconComponent style={{position: 'absolute', paddingHorizontal: 11,
                  paddingVertical: 8}}
                provider={'FontAwesome5'}
                name={'question'}
                color={'#fff'}
                size={18} />
            </View>
            <View style={styles.containerStretchColumn}>
              {contents}
            </View>
          </View>
        </View>
      );
    }
    return null;
  }
}

function TradingPartnerDescription(props: any) {
  let tradingPartner: TradingPartner = props.tradingPartner;
  let tradingPartnerType = tradingPartnerTypes[tradingPartner.name];

  return (
    <View style={styles.panelFlexColumn}>
      <View style={styles.containerStretchRow}>
        <View style={{width: 40, height: 40}}>
          <IconComponent style={{position: 'absolute'}}
            provider={'MaterialCommunityIcons'}
            name={'shield'}
            color={tradingPartnerType.backgroundColor}
            size={36} />
          <IconComponent style={{position: 'absolute',
              paddingHorizontal: tradingPartnerType.paddingHorizontal,
              paddingVertical: tradingPartnerType.paddingVertical}}
            provider={tradingPartnerType.icon.provider}
            name={tradingPartnerType.icon.name}
            color={tradingPartnerType.foregroundColor}
            size={18} />
        </View>
        <View style={styles.containerStretchColumn}>
          <Text>
            {tradingPartner.name}
          </Text>
          <View style={styles.buttonRow}>
            {renderGoodbye(tradingPartner.trades, tradingPartner.traded)}
            <TouchableOpacity style={StyleSheet.flatten([styles.buttonRowItem,
              styles.buttonLight])}>
              <IconComponent provider="FontAwesome5" name="question-circle"
                color="#071f56" size={16} />
              <Text style={styles.buttonTextDark}>{' Info'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {renderTrades(tradingPartner.trades, props.vault, tradingPartner.traded,
        props.tradeClick)}
    </View>
  );

  function renderTrades(trades: { [id: string] : Trade}, vault: Vault,
    traded: { [id: string] : {given: { type: string, quantity: number },
      received: { type: string, quantity: number }} }, tradeClick: Function) {
    return Object.keys(trades).map((tradeId) => {
      const trade = trades[tradeId];
      const wasTraded = traded[tradeId];

      if (!wasTraded) {
        return renderTrade(trade, tradeClick);
      }
      return renderWasTraded(trade, wasTraded);
    });
  }

  function renderTrade(trade: Trade, tradeClick: Function) {
    const give = resourceTypes[trade.give.type];
    const receive = getMatchingResource(trade.receive.specificity, trade.receive.type);

    return (
      <TouchableOpacity key={trade.id} style={StyleSheet.flatten([styles.buttonRowItem,
        styles.buttonLight, {justifyContent: 'flex-start', alignSelf: 'stretch'}])}
        onPress={() => { tradeClick(trade.tradingPartnerType, trade.id) }} >
        <BadgeComponent
          provider={give.icon.provider}
          name={give.icon.name}
          foregroundColor={give.foregroundColor}
          backgroundColor={give.backgroundColor}
          iconSize={16} />
        <Text style={styles.buttonTextDark}>
          {' ' + give.name + ' (' + trade.give.quantity + ') for '}
        </Text>
        <BadgeComponent
          provider={receive.icon.provider}
          name={receive.icon.name}
          foregroundColor={receive.foregroundColor}
          backgroundColor={receive.backgroundColor}
          iconSize={16} />
        <Text style={styles.buttonTextDark}>
          {receive.name}
        </Text>
      </TouchableOpacity>
    );
  }

  function renderWasTraded(trade: Trade, wasTraded:
    {given: { type: string, quantity: number },
    received: { type: string, quantity: number }} ) {
    const give = resourceTypes[wasTraded.given.type];
    const receive = resourceTypes[wasTraded.received.type];

    return (
      <TouchableOpacity key={trade.id} style={StyleSheet.flatten([styles.buttonRowItem,
        styles.buttonDisabled, {justifyContent: 'flex-start', alignSelf: 'stretch'}])}
        disabled >
        <BadgeComponent
          provider={give.icon.provider}
          name={give.icon.name}
          foregroundColor={give.foregroundColor}
          backgroundColor={give.backgroundColor}
          iconSize={16} />
        <Text style={styles.buttonTextDark}>
          {give.name + ' x' + wasTraded.given.quantity + ' for '}
        </Text>
        <BadgeComponent
          provider={receive.icon.provider}
          name={receive.icon.name}
          foregroundColor={receive.foregroundColor}
          backgroundColor={receive.backgroundColor}
          iconSize={16} />
        <Text style={styles.buttonTextDark}>
          {receive.name + ' x' + wasTraded.received.quantity}
        </Text>
      </TouchableOpacity>
    );
  }

  function renderGoodbye(trades: { [id: string] : Trade},
    traded: { [id: string] : {given: { type: string, quantity: number },
      received: { type: string, quantity: number }} }) {
    let allTraded = true;
    Object.keys(trades).map((tradeId) => {
      if (!traded[tradeId]) { allTraded = false; }
    });

    if (!allTraded) {
      return (
        <TouchableOpacity style={styles.buttonRowItem}
          onPress={() => { props.dismissClick(tradingPartner.name) }}>
          <IconComponent provider={'FontAwesome5'}
            name={'hand-paper'} color="#fff" size={16} />
          <Text style={styles.buttonText}>{' No thanks'}</Text>
        </TouchableOpacity>
      );
    }
    else {
      return (
        <TouchableOpacity style={styles.buttonRowItem}
          onPress={() => { props.dismissClick(tradingPartner.name) }}>
          <IconComponent provider={'FontAwesome5'}
            name={'hand-peace'} color="#fff" size={16} />
          <Text style={styles.buttonText}>{' Farewell'}</Text>
        </TouchableOpacity>
      );
    }
  }

  function getMatchingResource(specificity: string, type: string):
    ResourceType|ResourceTag|ResourceCategory {
    switch(specificity) {
      case RESOURCE_SPECIFICITY.EXACT:
      return resourceTypes[type];

      case RESOURCE_SPECIFICITY.TAG:
      return resourceTags[type];

      case RESOURCE_SPECIFICITY.SUBCATEGORY:
      return resourceSubcategories[type];

      case RESOURCE_SPECIFICITY.CATEGORY:
      return resourceCategories[type];

      default:
      return resourceTypes[type];
    }
  }
}
