import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import IconComponent from './icon';
import SvgComponent from './svg';
import BadgeComponent from './badge';
import RatingComponent from './rating';
import { selectTab, displayModalValue } from '../actions/ui';
import { dismissTradingPartnerVisit, welcomePendingTradingPartnerVisit,
  addPendingTradingPartnerVisit, talkTo } from '../actions/trading_status';
import { addTimer } from '../actions/timers';

import TradingPartnerVisit from '../models/trading_partner_visit';
import TradingPartner from '../models/trading_partner';
import Trade from '../models/trade';
import Vault from '../models/vault';
import ResourceType from '../models/resource_type';
import ResourceTag from '../models/resource_tag';
import ResourceCategory from '../models/resource_category';
import Timer from '../models/timer';
import Icon from '../models/icon';
import { tradingPartnerTypes } from '../instances/trading_partner_types';
import { resourceTypes } from '../instances/resource_types';
import { resourceTags } from '../instances/resource_tags';
import { resourceSubcategories } from '../instances/resource_subcategories';
import { resourceCategories } from '../instances/resource_categories';
import { utils } from '../utils';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { INTRO_STATES } from '../enums/intro_states';
import { MODALS } from '../enums/modals';

export default function TradingComponent() {
  const dispatch = useDispatch();
  const tradingStatus = useTypedSelector(state => state.tradingStatus);
  const positioner = useTypedSelector(state => state.ui.positioner);
  const tradingPartnerVisitArray = Object.keys(tradingStatus.tradingPartnerVisits)
    .map((name) => { return tradingStatus.tradingPartnerVisits[name]; });
  const vault = useTypedSelector(state => state.vault);
  const timer = useTypedSelector(state => state.timers[('Trading' + 0)]);
  const introState = useTypedSelector(state => state.account.introState);

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="Entypo" name="address" color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Trading'}</Text>
      </View>
      {renderBody()}
    </View>
  );

  function renderBody() {
    if (introState == INTRO_STATES.REFURBISH_HUTS || introState == INTRO_STATES.DONE) {
      return (
        <ScrollView>
          {renderTradingPartnerVisits(tradingPartnerVisitArray)}
          {renderArrivingTradingPartnerVisit()}
        </ScrollView>
      );
    }
    else {
      return (
        <ScrollView>
          <View style={styles.break}></View>
          <Text style={StyleSheet.flatten([styles.bareText, { textAlign: 'center'}])}>
            {'You\'ll have to repair the market before trading with anyone.'}
          </Text>
        </ScrollView>

      );
    }
  }

  function renderTradingPartnerVisits(tradingPartnerVisitArray: TradingPartnerVisit[]) {
    return tradingPartnerVisitArray.map((tradingPartnerVisit) => {
      const tradingPartner = tradingStatus.tradingPartners[tradingPartnerVisit.name];
      return <TradingPartnerVisitDescription key={tradingPartnerVisit.name}
        tradingPartnerVisit={tradingPartnerVisit} tradingPartner={tradingPartner}
        vault={vault} positioner={positioner} tradePress={tradePress}
        dismissPress={dismissPress} talkPress={talkPress} />
    });
  }

  function tradePress(tradingPartnerVisit: string, tradeId: string) {
    dispatch(displayModalValue(MODALS.RESOURCE_SELECT_ONE, 'open',
      {type: 'Trading', tradingPartner: tradingPartnerVisit, tradeId: tradeId}));
  }

  function dismissPress(tradingPartnerVisit: string) {
    dispatch(dismissTradingPartnerVisit
      (tradingStatus.tradingPartnerVisits[tradingPartnerVisit]));
  }

  function welcomePress() {
    let newTradingPartnerVisit = tradingStatus.createPendingTradingPartnerVisit();
    let newTimer = new Timer({
      name: ('Trading' + 0),
      startedAt: new Date(Date.now()).valueOf(),
      endsAt: (new Date(Date.now()).valueOf() + 300000),
      progress: 0,
      remainingLabel: '1m',
      tradingPartnerToArrive: newTradingPartnerVisit.name,
      messageToDisplay: 'A trader is waiting outside the gate.',
      iconToDisplay: new Icon({provider: 'FontAwesome5', name: 'question'})
    });
    dispatch(addTimer(newTimer));
    dispatch(welcomePendingTradingPartnerVisit());
    dispatch(addPendingTradingPartnerVisit(newTradingPartnerVisit));
  }

  function talkPress(tradingPartnerVisit: TradingPartnerVisit) {
    dispatch(talkTo(tradingPartnerVisit.name));
  }

  function renderArrivingTradingPartnerVisit() {
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
        && Object.keys(tradingStatus.tradingPartnerVisits).length == 0) {
        contents = (
         <>
           <Text style={styles.bodyTextMed}>
             {'A trader is waiting outside the gate.'}
           </Text>
           <View style={styles.buttonRow}>
             <TouchableOpacity style={styles.buttonRowItem}
               onPress={() => { welcomePress() }}>
               <IconComponent provider={'FontAwesome5'}
                 name={'hand-holding'} color="#fff" size={16} />
               <Text style={styles.buttonText}>{' Welcome in'}</Text>
             </TouchableOpacity>
           </View>
         </>
       );
      }
      else if (tradingStatus.tpPending.length > 0
        && Object.keys(tradingStatus.tradingPartnerVisits).length > 0) {
          contents = (
           <>
             <Text style={styles.bodyTextMed}>
               {'A trader is waiting outside the gate, but there\'s only room for '
                + 'one at the trading post.'}
             </Text>
             <View style={styles.buttonRow}>
               <TouchableOpacity style={StyleSheet.flatten([styles.buttonRowItem,
                 styles.buttonDisabled])} disabled
                 onPress={() => { welcomePress() }}>
                 <IconComponent provider={'FontAwesome5'}
                   name={'hand-holding'} color="#fff" size={16} />
                 <Text style={styles.buttonText}>{' Welcome in'}</Text>
               </TouchableOpacity>
             </View>
           </>
         );
      }

      return (
        <View style={StyleSheet.flatten([styles.panelFlexColumn,
          {minWidth: positioner.majorWidth,
            maxWidth: positioner.majorWidth}])}>
          <View style={styles.containerStretchRow}>
            <View style={{width: 40, height: 40}}>
              <IconComponent style={{position: 'absolute'}}
                provider={'MaterialCommunityIcons'} name={'shield'}
                color={'#444'} size={36} />
              <IconComponent style={{position: 'absolute', paddingHorizontal: 11,
                  paddingVertical: 8}}
                provider={'FontAwesome5'} name={'question'}
                color={'#fff'} size={19} />
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

function TradingPartnerVisitDescription(props: any) {
  const tradingPartnerVisit: TradingPartnerVisit = props.tradingPartnerVisit;
  const tpt = tradingPartnerTypes[tradingPartnerVisit.name];
  const tp: TradingPartner = props.tradingPartner;
  const emptyIcon = new Icon({ provider: 'FontAwesome', name: 'star-o',
    color: '#8a6100', size: 18 });
  const filledIcon = new Icon({ provider: 'FontAwesome', name: 'star',
    color: '#ffb400', size: 18 });
  const tier = tpt.getTier(tp.trust);
  const ratingNumerator = tier.value + 1 + (tier.toNext / 100);

  return (
    <View style={StyleSheet.flatten([styles.panelFlexColumn,
      {minWidth: props.positioner.majorWidth,
        maxWidth: props.positioner.majorWidth}])}>
      <View style={styles.containerStretchRow}>
        <View style={StyleSheet.flatten([styles.container, {width: 40, height: 40}])}>
          <IconComponent style={{position: 'absolute', zIndex: -1}}
            provider={'MaterialCommunityIcons'}
            name={'shield'} color={tpt.icon.backgroundColor} size={36} />
          <SvgComponent icon={new Icon({...tpt.icon, size: 19})} />
        </View>
        <View style={styles.containerStretchColumn}>
          <Text>
            {tradingPartnerVisit.name}
          </Text>
          <View style={styles.rows}>
            <Text style={{fontSize: 12}}>{"Trust: "}</Text>
            <RatingComponent numerator={ratingNumerator} denominator={5}
              iconCount={5} emptyIcon={emptyIcon} filledIcon={filledIcon}
              width={84} />
            <Text style={{fontSize: 12}}>{" (" + tp.trust + ")"}</Text>
          </View>
          <View style={styles.buttonRow}>
            {renderGoodbye(tradingPartnerVisit.trades, tradingPartnerVisit.traded)}
            <TouchableOpacity style={StyleSheet.flatten([styles.buttonRowItem,
              styles.buttonLight])} onPress={() => props.talkPress(tradingPartnerVisit)}>
              <IconComponent provider="FontAwesome5" name="angle-down"
                color="#071f56" size={16} />
              <Text style={styles.buttonTextDark}>{' Hello'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {renderTrades(tradingPartnerVisit.trades, props.vault, tradingPartnerVisit.traded,
        props.tradePress)}
    </View>
  );

  function renderTrades(trades: { [id: string] : Trade}, vault: Vault,
    traded: { [id: string] : {
    given: { type: string, quantity: number,  quality: number },
    received: { type: string, quantity: number,  quality: number }} },
    tradePress: Function) {
    return Object.keys(trades).map((tradeId) => {
      const trade = trades[tradeId];
      const wasTraded = traded[tradeId];

      if (!wasTraded) {
        return renderTrade(trade, tradePress);
      }
      return renderWasTraded(trade, wasTraded, vault);
    });
  }

  function renderTrade(trade: Trade, tradePress: Function) {
    const give = resourceTypes[trade.give.type];
    const receive = utils.getMatchingResourceKind(trade.receive.specificity,
      trade.receive.type);

    return (
      <TouchableOpacity key={trade.id} style={StyleSheet.flatten([styles.buttonRowItem,
        styles.buttonLight, {justifyContent: 'flex-start', alignSelf: 'stretch'}])}
        onPress={() => { tradePress(trade.tradingPartnerType, trade.id) }} >
        <BadgeComponent icon={give.icon} size={21} />
        <Text style={styles.buttonTextDark}>
          {' ' + give.name + ' for '}
        </Text>
        <BadgeComponent icon={receive.icon} size={21} />
        <Text style={styles.buttonTextDark}>
          {receive.name}
        </Text>
      </TouchableOpacity>
    );
  }

  function renderWasTraded(trade: Trade, wasTraded:
    {given: { type: string, quantity: number },
    received: { type: string, quantity: number, quality: number }}, vault: Vault ) {
    const give = resourceTypes[wasTraded.given.type];
    const receive = utils.getResourceType(vault.resources[wasTraded.received.type
      + '|' + wasTraded.received.quality]);

    return (
      <TouchableOpacity key={trade.id} style={StyleSheet.flatten([styles.buttonRowItem,
        styles.buttonDisabled, {justifyContent: 'flex-start', alignSelf: 'stretch'}])}
        disabled >
        <BadgeComponent icon={give.icon} size={21} />
        <Text style={styles.buttonTextDark}>
          {give.name + ' x' + utils.formatNumberShort(wasTraded.given.quantity)
          + ' for '}
        </Text>
        <BadgeComponent icon={receive.icon} size={21} />
        <Text style={styles.buttonTextDark}>
          {receive.name + ' x' + utils.formatNumberShort(wasTraded.received.quantity)}
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
          onPress={() => { props.dismissPress(tradingPartnerVisit.name) }}>
          <IconComponent provider={'FontAwesome5'}
            name={'hand-paper'} color="#fff" size={16} />
          <Text style={styles.buttonText}>{' No thanks'}</Text>
        </TouchableOpacity>
      );
    }
    else {
      return (
        <TouchableOpacity style={styles.buttonRowItem}
          onPress={() => { props.dismissPress(tradingPartnerVisit.name) }}>
          <IconComponent provider={'FontAwesome5'}
            name={'hand-peace'} color="#fff" size={16} />
          <Text style={styles.buttonText}>{' Farewell'}</Text>
        </TouchableOpacity>
      );
    }
  }
}
